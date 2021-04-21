import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, Image, View,Dimensions,
  TouchableOpacity,} from 'react-native'; 
import { colors, measures } from 'eslint-config-populist'; 
import NoCards from './NoCards'; 
import ShareCard from './ShareCard';  

//let deviceWidth = Dimensions.get('window').width;
//let deviceHeight = Dimensions.get('window').height;


export class ShareData extends React.Component {
  static navigationOptions = {
    headerShown: false,  //ren-added
    headerStyle: {
      backgroundColor: 'white', 
    },
    headerTintColor: 'black',
    headerTitleStyle: {
        fontWeight: 'bold',
      },
    title: "Share Data",
    headerBackImage: <Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20}} />,
   
  }
  constructor(props) {
    super(props);
    //console.log("WalletsOverview constructor this.props: ", this.props); 
    let list = [], username='';
      if(this.props.navigation.state.params && this.props.navigation.state.params.list){
        list = this.props.navigation.state.params.list;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.username){
        username = this.props.navigation.state.params.username;
      }
      let user = null;
      if(this.props.navigation.state.params && this.props.navigation.state.params.user){
        user = this.props.navigation.state.params.user;
      }
      let mobile = "";
      if(user && user.local){
        mobile = user.local.mobile;
      }
      if(__DEV__)
      console.log('ShareData  user: ', user);
    this.state = {  
      loading: false,
      list: list,
      user: user,
      username: username, 
      selectedCategory: '',
      mobile: mobile,  
    }; 
  }


    get loading() {
        return this.state.loading;
    }
    async componentDidMount() { 
        this.props.navigation.setParams({
          title: 'Share Data',
        }); 
        await this.populate();
    }
    async populate() {
        try {
          if(__DEV__)
          console.log('ShareData populate  ...');
          const { username, mobile } = this.state;
          if(__DEV__)
          console.log(" populate username, mobile: ", username, mobile);
          let item = {
            name: "Medical",
            description: "",
            total: 20
          }
          let list = [];
          list.push(item);
          item = {
            name: "Education",
            description: "",
            total: 16
          } 
          this.setState({list});

        } catch (e) {
            console.log('ShareData populate e.message: ', e.message);
            GeneralActions.notify(e.message, 'long');
        }
    }
 
    onPressCategory = (itemClicked) =>{
      if(__DEV__)
      console.log('ShareData onPressCategory  itemClicked', itemClicked); 
        let category = itemClicked.item.name;
        if(__DEV__)
        console.log('ShareData onPressCategory  category', category); 
        if(category && category.length>0) {
            this.setState({selectedCategory: category});
        }
        const { user, mobile } = this.state;
        this.props.navigation.navigate('ShareAction', { user, username: mobile, category: "Medical" });
    }
    renderItem = (item) => <ShareCard wallet={item} onPress={(itemClicked) => this.onPressCategory(item, itemClicked)} />

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
        if(__DEV__)
        console.log('ShareData render selected, selectedCategory: ', selected, selectedCategory);
        return ( 
              <View style={styles.container1}> 
                <View>
                    <Text>Select a category: </Text>
                </View>
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