import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Platform, StyleSheet, View, Text,Image, Keyboard,FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
//import { Image, View } from 'react-native-animatable'
import metrics from '../../../config/metrics'
import ContactCard from './ContactCard';
import { inject, observer } from 'mobx-react';
import Contacts from 'react-native-contacts';
import { SearchBar } from 'react-native-elements';
import { PermissionsAndroid } from 'react-native';


const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.7



@inject('referrals')
@observer
export class MobileContacts extends React.Component {

  static navigatorStyle = {
    disabledBackGesture: true, 
  };
  
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: '#6CB553', 
    },
    headerTintColor: 'black',
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
    title: "Contacts",
    headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
   
  });
  
  constructor(props) {
    super(props);
    //console.log("MobileContacts constructor props: ", props);
    //console.log("MobileContacts constructor navigation: ", this.props.navigation);
    //console.log('MobileContacts constructor props: ', props);
    
    let user = null; let userid = '';
    let userId = '', account = '123456';
    if(this.props.navigation.state.params){
      user = this.props.navigation.state.params.user;
      userid = this.props.navigation.state.params.userid;
      if(user){
        userId = user._id;
        account = user.local.account;
      }
    };
    //console.log('MobileContacts constructor user: ', user);
    
    //console.log('MobileContacts constructor userId: ', userId);
    //console.log('MobileContacts constructor account: ', account);
    
    this.state = {
        isLoading: false,
      data: [],
      mobile: '',
      account: account,
      userId: userId,
      user: user,
      userid: userid,
      isFocused: false,
      pickerData: null,
      cca2: '',
      message: '',
      contacts: null,
      searched: false,
      searchname: '',
      contactList: []
    };
    this.arrayholder = [];
    //this.state.data.push(referData);
    //console.log("MobileContacts constructor this.state: ", this.state);
  }
  
 async componentDidMount() {
  //  await this.populate();
  this.props.navigation.setParams({ title: 'Contacts' });
  if(Platform.OS === 'android'){ 
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts for referrals.'
        },
        PermissionsAndroid.PERMISSIONS.READ_PROFILE,
        {
          'title': 'Contacts',
          'message': 'This app would like to view your contacts for referrals.'
        }
      ).then(() => {
        //permissions approved by user
        Contacts.getAll((err, contacts) => {
          if (err) {
            console.log('MobileContacts componentDidMount contacts: ', err);
            throw err;
          }
          // contacts returned
          console.log('MobileContacts componentDidMount contacts: ', contacts);
          this.applyContacts(contacts);
        })
      })
    }else {
        //iOS 
        Contacts.getAll((err, contacts) => {
          if (err) {
            console.log('MobileContacts componentDidMount err: ', err);
            throw err;
          }
          // contacts returned
          console.log('MobileContacts componentDidMount contacts: ', contacts);
          this.applyContacts(contacts);
        })
    }
    
    //console.log('MobileContacts componentDidMount state: ', this.state);
  }
applyContacts = (contacts) => {
  console.log('MobileContacts applyContacts contacts: ', contacts);
    if(!this.state.contacts){
        console.log('MobileContacts applyContacts first time get contacts.... ');
        this.state.contacts = contacts;
        let contactList = [];
        var ii=0;
        for (let contact of contacts) {
            let phones = contact.phoneNumbers;
            let mobilePhone = '';
            let homePhone = '';
            if(phones && phones.length > 0) {
                for(let phoneRec of phones) {
                    //console.log('ContactCard render phoneRec: ', phoneRec);
                    if(phoneRec.label == 'mobile'){
                        mobilePhone = phoneRec.number;
                    }
                    if(phoneRec.label=='home' || phoneRec.label == 'main'){
                        homePhone = phoneRec.number;
                    }
                }
            }
            let familyName = contact.familyName;
            let firstName = contact.givenName;
            let middleName = contact.middleName;
            let contactRec = {
                _id : ''+ii++,
                familyName: familyName,
                firstName: firstName,
                middleName: middleName,
                mobilePhone: mobilePhone,
                homePhone: homePhone
            }
            contactList.push(contactRec);
        }
        this.setState({contactList});
        this.arrayholder = contactList;
      }
}
onPressFlag = () => {
  this.countryPicker.openModal();
}

selectCountry = (country) => {
  this.phone.selectCountry(country.cca2.toLowerCase());
  this.setState({ cca2: country.cca2 });
  
}
  



sendClicked =  async () => { 
  //console.log("MobileContacts sendClicked this.state: ", this.state);
  this.setState({isLoading: true});
    
    this.setState({isLoading: false});
}
searchFilterFunction = text => {
    console.log("searchFilterFunction text: ", text);
    this.setState({ searchname: text });
    const newData = this.arrayholder.filter(item => {
        console.log("searchFilterFunction item: ", item);
        let itemData = '';
        if(item.firstName && item.familyName){
           itemData = `${item.firstName.toUpperCase()} ${item.familyName.toUpperCase()}`;
        }else if(item.firstName){
            itemData = `${item.firstName.toUpperCase()}`;
        }else{
            itemData = `${item.familyName.toUpperCase()}`;
        }
      //console.log("searchFilrFunction itemData: ", itemData);
      const textData = text.toUpperCase();
      //console.log("searchFilrFunction textData: ", textData);
      if(itemData){
        let index = itemData.indexOf(textData);
        //console.log("searchFilrFunction index: ", index);
        return index > -1;
      }else{
        return false;
      }
    });
    this.setState({
        contactList: newData,
    });
  };
  onPressDetail =  (item) =>{
    //console.log("onPressDetail item: ", item);

}
  onPressSelect =  (item) =>{
    //console.log("onPressSelect item: ", item);
    //this.props.navigation.setParams({item});
    //this.props.navigation.state.params.onSelect({ selected: true });
    this.props.navigation.goBack();
    //this.props.navigation.setParams({item});
    this.props.navigation.state.params.onSelect({ item: item.item });
  };

  renderItem = (item) => <ContactCard item={item} 
        onPressDetail={() => this.onPressDetail(item)}
        onPressSelect={() => this.onPressSelect(item)} />

  render () {
    //console.log("MobileContacts render this.props: ", this.props)
    //const {status, message }
    const { mobile, searchname, isFocused, contactList } = this.state
    //console.log("MobileContacts render contactList: ", contactList)
    //const { isLoading, onLoginPress } = this.props
    //const isValid = mobile !== ''
    const borderColor = isFocused ? 'white' : 'rgba(255,255,255,0.4)';
    //console.log("MobileContacts render mobile, isLoading: ", mobile, isLoading)
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      
        <View style={{flex: 1, flexDirection: 'column', backgroundColor:'white'}}>
         
          <View style={{flexDirection: 'column',backgroundColor:'green', borderBottomWidth: 1, marginTop: 0, justifyContent: 'center',alignItems: 'center'}}>
                
                <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
                    <View style={{borderBottomWidth: 1, marginBottom: 2,backgroundColor:'green',
                        borderColor: borderColor, width: metrics.DEVICE_WIDTH}}>
                    <SearchBar
                        round
                        lightTheme
                        style={[styles.textInput,{backgroundColor:'green',}]}
                        inputStyle={{backgroundColor: 'white'}}
                        containerStyle={{backgroundColor: '#6CB553', borderWidth: 0, borderRadius: 0}}
                        placeholderTextColor={'#555555'}
                        searchIcon={{ size: 30 }}
                        onChangeText={text => this.searchFilterFunction(text)}
                        onClear={this.onClear}
                        value={searchname}
                        placeholder='name...' />
                    </View>
                    
                </View>
          </View>
          <View style={{flex: 0, borderColor: 'black', borderBottomWidth: 1, flexDirection: 'column',backgroundColor:'white',width:metrics.DEVICE_WIDTH, paddingLeft:10, marginTop: 5, marginLeft: 0, marginBottom: 8}}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>Contact List: {contactList.length}</Text>
          </View>
          
            <FlatList
              data={contactList}
              renderItem={this.renderItem}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
            />
        
        
        </View>
        
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 24,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 10
  },
  bottom: {
    backgroundColor: '#1976D2'
  },
  form: {
    marginTop: 10,
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#1976D2',
    //paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
    width: metrics.DEVICE_WIDTH * 0.8,
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  },
  textInput:{
    flex:1,
  }
})


/*
(6) [{…}, {…}, {…}, {…}, {…}, {…}]
0:
birthday: {day: 20, month: 0, year: 1978}
company: "Creative Consulting"
emailAddresses: [{…}]
familyName: "Bell"
givenName: "Kate"
hasThumbnail: false
jobTitle: "Producer"
middleName: ""
note: ""
phoneNumbers: Array(2)
0: {label: "mobile", number: "(555) 564-8583"}
1: {label: "main", number: "(415) 555-3695"}
length: 2
__proto__: Array(0)
postalAddresses: Array(1)
0:
city: "Hillsborough"
country: ""
label: "work"
postCode: "94010"
region: "CA"
state: "CA"
street: "165 Davis Street"
__proto__: Object
length: 1
__proto__: Array(0)
recordID: "177C371E-701D-42F8-A03B-C61CA31627F6"
thumbnailPath: ""
urlAddresses: Array(1)
0: {label: "homepage", url: "www.icloud.com"}
length: 1
__proto__: Array(0)
__proto__: Object
1:
*/