import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Image, View,
  TouchableOpacity,} from 'react-native'; 
import { colors, measures } from 'eslint-config-populist'; 
import NoCards from './NoCards'; 
import CategoryCard from './CategoryCard'; 
    
export class UploadCategory extends React.Component {
   
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: '#6CB553', 
    },
    headerTintColor: 'black',
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
    title: "Add Record Category",
    headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
   
  })

  constructor(props) {
    super(props);
    //console.log("WalletsOverview constructor this.props: ", this.props); 
    let list = '', username='', user=null;
      if(this.props.navigation.state.params && this.props.navigation.state.params.list){
        list = this.props.navigation.state.params.list;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.username){
        username = this.props.navigation.state.params.username;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.user){
        user = this.props.navigation.state.params.user;
      }
    this.state = {  
      loading: false,
      list: list,
      user: user,
      username: username,
      mobile: '7037253746', 
    }; 
  }


    get loading() {
        return this.state.loading;
    }
 
    componentWillMount() {
      //console.log('WalletsOverview componentWillMount this.props: ', this.props); 
    }
     async componentDidMount() {
        //console.log('WalletsOverview navigationOptions process.env.NODE_ENV: ', process.env.NODE_ENV);
        //console.log('WalletsOverview navigationOptions process.env: ', process.env);
        
        //console.log('WalletsOverview componentDidMount list: ', list);
        //debugger;
        this.props.navigation.setParams({
          title: 'Upload Category',
        }); 
        await this.populate();
    }
    async populate() {
        try { 
          const { list } = this.state;
          if(__DEV__)
          console.log(" populate list: ", list);
          
         this.setState({list});

        } catch (e) {
            console.log('WalletsOverview populate e.message: ', e.message);
            GeneralActions.notify(e.message, 'long');
        }
    }
    onPressCategory = () =>{
      if(__DEV__)
      console.log('WalletsOverview onPressCategory  ...');
      this.props.navigation.navigate('UploadAction', { username: this.state.mobile, category: "Medical" });
    }
    renderItem = (item) => <CategoryCard wallet={item} onPress={(itemClicked) => this.onPressCategory(item, itemClicked)} />

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
        const { username, list } = this.state; 
        if(__DEV__)
        console.log('WalletsOverview render username: ', username);
        return ( 
              <View style={styles.container1}> 
                <View style={styles.content4}>
                        {this.renderBody(list)}
                </View> 
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