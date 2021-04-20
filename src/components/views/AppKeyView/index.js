import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, Image, View,Dimensions,
  TouchableOpacity,} from 'react-native'; 
import { colors, measures } from 'eslint-config-populist'; 
import NoCards from './NoCards'; 
import AppKeyCard from './AppKeyCard';  
import { Api as ApiService } from 'common-services';
 

export class AppKeyView extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
            headerStyle: {
            backgroundColor: '#6CB553', 
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: 'bold',
                color: 'white'
            },
        title: "My App Keys",
        headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
        
    })
  constructor(props) {
    super(props);
    //console.log("WalletsOverview constructor this.props: ", this.props); 
      let mobile='';
      
      if(this.props.navigation.state.params && this.props.navigation.state.params.mobile){
        mobile = this.props.navigation.state.params.mobile;
      }
    this.state = {  
      loading: false,
      mobile: mobile,
      list: [], 
      message: '',
      error: ''
    }; 
  }


    get loading() {
        return this.state.loading;
    }
  
     async componentDidMount() {
       
        this.props.navigation.setParams({
          title: 'My App Keys',
        }); 
        await this.populate();
    }
    async populate() {
        try {
            if(__DEV__)
          console.log('getAppKeysByUser  ...');
          const {  mobile } = this.state;

          this.setState({ message: "", error: "" });
          if(__DEV__)
          console.log(" getAppKeysByUser mobile: ", mobile);
          
          const resultdata = await ApiService.getAppKeysByUser(mobile);
          if(__DEV__)
          console.log(" getAppKeysByUser resultdata: ", resultdata);
           
          if(resultdata && !resultdata.error){ 
                let data = resultdata.data;
                if(data && data.data)
                    this.setState({list: data.data});
                else if(data) {
                    this.setState({list: data});
                }
          }else{
            let error = resultdata.error;
            if(error && error.response && error.response.data && error.response.data.message){
                this.setState({error: error.response.data.message});
            }else if(error && error.message)
                this.setState({error: error.message});
            else this.setState({error: "Error occurred."});
          }

        }catch (e) {
            console.log(' getAppKeysByUser e.message: ', e.message); 
        }
    }
    onPressKey = (item) =>{
        if(__DEV__)
        console.log(" onPressKey item: ". item);

    } 
    renderItem = (item) => <AppKeyCard wallet={item} onPress={(itemClicked) => this.onPressKey(item, itemClicked)} />

    renderBody = (list) => (!list.length && !this.loading) ? <NoCards /> : (
          <FlatList
              style={styles.content}
              data={list}
              refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
              keyExtractor={(item, index) => String(index)}
              renderItem={this.renderItem} />
      );
    render() {
        //console.log('WalletsOverview render this.props: ', this.props);
        //console.log('WalletsOverview render this.props.navigation.state.params: ', this.props.navigation.state.params);
        const { username, list, selectedCategory } = this.state; 
        let selected = false;
        if(selectedCategory && selectedCategory.length>0){
            selected = true;
        }
        let hasMsg = false;
        if(this.state.message && this.state.message.length>0){
            hasMsg = true;
        }
        let hasError = false;
        if(this.state.error && this.state.error.length>0){
          hasError = true;
        }
        if(__DEV__)
        console.log('WalletsOverview render selected, selectedCategory: ', selected, selectedCategory);
        return ( 
              <View style={styles.container1}> 
                   
                    <View style={styles.content4}>
                            {this.renderBody(list)}
                    </View> 
                    {hasMsg && <View style={{flex:0, height: 50, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'green', fontSize: 17}}>{this.state.message}</Text>
                    </View>}
                    {hasError && <View style={{flex:0, height: 50, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'red', fontSize: 17}}>{this.state.error}</Text>
                    </View>}
              </View> 
        );
    }
}

const styles = StyleSheet.create({
    container1: {
        flex: 1,
        padding: measures.defaultPadding,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
    },
    container: {
      flex: 0,
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 60,
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGray
  },
    content: {
        marginTop: measures.defaultMargin
    },
    content4: {
      flex: 0,           // Center horizontally
      backgroundColor: 'rgba(255, 255, 255, 0.75)',       // '#C2185B' Darker background for content area
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  }, 
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  leftColumn: {
    flex: 1
},
title: {
    fontSize: measures.fontSizeLarge-3,
    color: colors.gray
},
balance: {
    fontSize: measures.fontSizeMedium,
    fontWeight: 'bold',
    color: colors.gray
},
fiatBalance: {
    fontSize: measures.fontSizeLarge + 3,
    color: colors.gray
},
rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20
}
});