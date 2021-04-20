//import React from 'react';
import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View, Image,
  TouchableOpacity,} from 'react-native'; 
import { colors, measures } from 'eslint-config-populist';
//import { General as GeneralActions, Wallets as WalletActions,  MarketPrices as MarketPricesActions } from '@common/actions';
import NoWallets from './NoWallets';
import WalletCard from './WalletCard';
//var async = require('async');
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
 
import { Camera } from 'react-widgets';
    
import HistoryTabs from './HistoryTabs';
  
export class WalletsOverview extends Component {
  
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
        backgroundColor: '#6CB553', 
      },
      headerTintColor: '#6CB553', 
      headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white'
        },
        title: 'Home',
    //headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon2.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
   
  })
  constructor(props) {
    super(props);
    console.log("WalletsOverview constructor this.props: ", this.props); 

    let user = null;
    if(this.props.navigation.state.params && this.props.navigation.state.params.user){
      user = this.props.navigation.state.params.user;
    }
    let mobile = "";
    if(user && user.local){
      mobile = user.local.mobile;
    }
    this.state = { 
      isOpen: false,
      loading: false,
      list: [],
      user: user,
      username: user?user.local.dname:'',
      mobile: mobile,
      selectedItem: 'About',
      display: false
    };  
  }


    get loading() {
        return this.state.loading;
    }
 
    componentWillMount() {
      //console.log('WalletsOverview componentWillMount this.props: ', this.props); 
    }
     async componentDidMount() { 
        this.props.navigation.setParams({
          title: 'Home',
        }); 
        await this.populate();
    }

    async populate() {
        try {
          if(__DEV__)
          console.log('WalletsOverview populate  user: ', this.state.user);
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
          //list.push(item);
             
            this.setState({list});

        } catch (e) {
            console.log('WalletsOverview populate e: ', e);
            //GeneralActions.notify(e.message, 'long');
        }
    }
     
    onPressWallet(item) {
      if(__DEV__)
        console.log('WalletsOverview onPressWallet item: ',item);
        const { user, username } = this.state;
        this.props.navigation.navigate('MedicalShareHistory', { user, username, category: item.name });
    }
    updateMenuState(isOpen) {
      this.setState({ isOpen });
    }

    onMenuItemSelected = item => {
        this.setState({
          isOpen: false,
          selectedItem: item,
        });
        //console.log('WalletsOverview onMenuItemSelected item: ', item);
    }
    addContact =()=>{
      if(__DEV__)
        console.log('WalletsOverview addContact... ');
        //AddContacts
        this.props.navigation.navigate('AddContacts', { username: this.state.mobile });
    }
    doScan =()=>{
      if(__DEV__)
      console.log('WalletsOverview doScan... mobile: ', this.state.mobile);
      this.props.navigation.navigate('ScanMe', { mobile: this.state.mobile });
      
  }
   
    upload =()=>{
      if(__DEV__)
      console.log('WalletsOverview upload... ');//UploadCategory
      this.props.navigation.navigate('UploadCategory', { username: this.state.mobile, list: this.state.list });
    }
   
    onPressBarCode = (code) =>{
      this.setState({ mobile: code});
    }
    requestShare =()=>{
      if(__DEV__)
      console.log('requestShare ... ');
      const {user} = this.state;
      this.props.navigation.navigate('ShareRequestCategory', { username: this.state.mobile,user, list: this.state.list });
    }
    requestAppKey =()=>{
      if(__DEV__)
      console.log('requestAppKey ... ');
      const {user} = this.state;
      this.props.navigation.navigate('AppKeyRequest', { user, username: this.state.mobile, list: this.state.list });
    }
    setActiveTab = async (index) => {
      //if(__DEV__)
      if(__DEV__)
      console.log(" TokenDetail setActiveTab: ", index);
       
    }
    renderItem = (item) => <WalletCard wallet={item} onPress={(itemClicked) => this.onPressWallet(itemClicked)} />

    renderBodyShare = (list) => (!list.length && !this.loading) ? <NoWallets /> : (
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
        const { username,mobile, list } = this.state; 
        if(__DEV__)
        console.log('WalletsOverview render username, mobile: ', username, mobile);
        return (
          <MenuProvider>
              <View style={styles.container1}>
                  <View style={styles.container}>
                      <View style={styles.leftColumn}>
                          <Text style={styles.title}>{username}</Text>
                      </View>
                      <View style={styles.rightColumn}> 
                          <Menu>
                            <MenuTrigger> 
                                <Text style={styles.fiatBalance}> + </Text> 
                            </MenuTrigger>
                            <MenuOptions>
                                <MenuOption onSelect={() => this.addContact()} text='Add Contact' />
                                {/*<MenuOption onSelect={() => this.doScan()} text='Scan' />*/}
                                <MenuOption onSelect={() => this.requestShare()} text='Request Share' />
                                <MenuOption onSelect={() => this.upload()} text='Add Record' />
                                <MenuOption onSelect={() => this.requestAppKey()} text='Register App' />
                            </MenuOptions>
                          </Menu>
                      </View>
                      <Camera
                              ref="camera"
                              modal
                              onClose={() => this.refs.camera.hide()}
                              onBarCodeRead={address => this.onPressBarCode(address)} />
                </View>
                <HistoryTabs tabAction = {this.setActiveTab}>
                    <View title="Shared" style={styles.content4}>
                          {this.renderBodyShare(list)}
                    </View>
                    <View title="Received" style={styles.content4}>
                          {this.renderBodyShare(list)}
                    </View>
                </HistoryTabs>
                {/*show && <QRModal
                    display = { this.state.display }
                    mobile = {mobile}
                    callShare = {this.callShare}
                    cancelClicked = {this.cancelClicked}
                />*/}
              </View>
          </MenuProvider>
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
      backgroundColor: 'white',       // '#C2185B' Darker background for content area
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
