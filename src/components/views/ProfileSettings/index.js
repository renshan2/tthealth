import React from 'react';
import { Alert,Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity,ActivityIndicator,Linking, Image} from 'react-native';
import { measures } from 'eslint-config-populist';
import { Api as ApiService } from '@common/services'
import metrics from '../../../config/metrics';
import { CustomButton } from 'react-widgets';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet';
//import person from '../../../assets/person.png';  
import { NavigationActions, StackActions } from 'react-navigation';
  
import RNFetchBlob from 'rn-fetch-blob';
import { Url } from '@common/constants';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const htmlContent = `<a style="color: blue; font-size: 18px;" href="https://t.me/ixinsupport">Support</a>`;
const height = metrics.DEVICE_WIDTH
const width = metrics.DEVICE_WIDTH


const resources = {
    url1: 'https://img1.wsimg.com/blobby/go/2b587003-ee9b-4dd0-b55d-99b3601d1115/downloads/terms_conditions.pdf?ver=1592742343129',
    url2: 'https://img1.wsimg.com/blobby/go/2b587003-ee9b-4dd0-b55d-99b3601d1115/downloads/license_agreement.pdf?ver=1592742343129',
    url3: 'https://img1.wsimg.com/blobby/go/2b587003-ee9b-4dd0-b55d-99b3601d1115/downloads/privacy_policy.pdf?ver=1592742343129',
  };

  const options = [
    'Terms & Conditions',
    'User Agreement',
    'Privacy Policy',
    <Text style={{color: 'red'}}>Cancel</Text>
  ]
 

export class ProfileSettings extends React.Component {

    
    static navigationOptions = ({ navigation, screenProps }) => {
        //const { params = {} } = navigation.state;
         //console.log('navigationOptions ProfileSettings navigation.state.params: ', navigation.state.params);
          
        return {
            headerStyle: {
                backgroundColor: '#6CB553', 
              },
              headerTintColor: '#6CB553', 
              headerTitleStyle: {
                  fontWeight: 'bold',
                  color: 'white'
                },
          title: navigation.getParam('title'),
          headerRight: navigation.getParam('support')
      }};
    
      constructor(props) {
        super(props);
        //console.log('ProfileSettings constructor props: ', props);
        let user = null; let mobile = '';let email = '';
        if(this.props.navigation.state.params){
          user = this.props.navigation.state.params.user;
        };
        //console.log('ProfileSettings constructor user: ', user);
        let userId = '', account = '123456'; let userType = 'individual';let dname = null;
        let icon = null;
        if(user && user.local){
          userId = user._id;
          account = user.local.account;
          mobile = user.local.mobile;
          userType = user.local.accountType;
          email = user.local.email;
          dname = user.local.dname;
          icon = user.local.icon;
        }
        //console.log('ProfileSettings constructor userId: ', userId);
        //console.log('ProfileSettings constructor account: ', account);
        this.state = {
          account: account,
          userId: userId,
          user: user,
          dname: dname?dname:userId,
          mnemonics: '',
          userType: userType,
          mobile: mobile,
          image: icon?icon:Url.base64Person,
          email: email,
          visible: false,
          display: false,
          resource: resources.url1,
          spinner: false,
          hide: true,
        };
      }
      componentWillMount() {
        //console.log('componentWillMount ProfileSettings this.props: ', this.props)
  
        const title = 'Profile Settings';
       
        this.props.navigation.setParams({ title: title});
        //console.log('componentWillMount ProfileSettings this.props: ', this.props)
        //console.log('componentDidMount called.... this.props.navigation: ', this.props.navigation);
        const support2 = <CustomButton
                onPress={this.supportClicked.bind(this)}
                isEnabled={true}
                buttonStyle={{backgroundColor: '#6CB553', width: 70,marginRight:10, borderWidth:0}}
                textStyle={{color: 'white',fontSize: 16, fontWeight: 'bold'}}
                text={'Support'}
            />
        this.props.navigation.setParams({ title: title, support: support2 });
        //console.log('componentWillMount ProfileSettings title: ', title)
        //this.props.navigation.setParams({supportClicked:this.supportClicked.bind(this)});
      }
      componentDidMount(){
      
      } 
      componentDidUpdate(){
        //console.log('componentDidUpdate ProfileSettings this.state: ', this.state);
      }
      hideSpinner = () => {
        //console.log(' ProfileSettings... hideSpinner');
        this.setState({ visible: false });
      }
      supportClicked = () => {
          //https://www.zhihu.com/question/21096632
        //console.log('supportClicked ProfileSettings this.state: ', this.state);
        //Linking.openURL("https://t.me/ixinsupport");
        //Linking.openURL(Url.support64);
        Linking.canOpenURL("https://www.google.com")
            .then((supported) => {
                if (!supported) {
                console.log("Can't handle this... ");
                } else {
                return Linking.openURL("https://www.google.com");
                }
            })
            .catch((err) => console.error('An error occurred', err));
      }
    onPressAdvancedSettings = () =>{
        //console.log('onPressAdvancedSettings ProfileSettings this.state: ', this.state);
       
        //this.props.navigation.navigate('AdvancedSettings', { address: this.state.account, user: this.state.user });
        
    }
    onPressRecoveryPhrase = () =>{
        //console.log('onPressRecoveryPhrase ProfileSettings this.state: ', this.state);
       
        //this.props.navigation.navigate('RecoveryPhrase', { address: this.state.account });
        
    }
    actionClicked =  (index) => {
        //console.log(' DeApps actionClicked...index: ', index);
        //console.log(' DeApps actionClicked...this.props.navigation: ', this.props.navigation);
        
        if(index === 0){
            //console.log('actionClicked... license ');
            this.setState({
                resource: resources.url1
            }) 
            if(__DEV__)
            console.log("onPressLegal resources.url1: ", resources.url1);
            //this.triggerModal();
            this.props.navigation.navigate('LegalModal', { resource: resources.url1 });
        }
        else if(index === 1){
            //console.log('showActionSheet DeApps actionClicked...1 index: ', index);
            this.setState({
                resource: resources.url2
            }) 
            //console.log("onPressLegal this.state: ", this.state);
            this.props.navigation.navigate('LegalModal', { resource: resources.url2 });
        }else if(index === 2){
            //console.log('showActionSheet DeApps onBack index: ', index);
            this.setState({
                resource: resources.url3
            }) 
            //console.log("onPressLegal this.state: ", this.state);
            this.props.navigation.navigate('LegalModal', { resource: resources.url3 });
        }
    }
    onPressLegal = () => {
        this.ActionSheet.show();
    }
    
    onPressReferral = () =>{
        //console.log('onPressReferral ProfileSettings this.state: ', this.state);
       
        //this.props.navigation.navigate('Referral', { user: this.state.user, userid: this.state.userid });
    }
    onPressSignOut = () =>{
        //console.log('onPressSignOut ProfileSettings ... ');
       
        const resultRes = ApiService.logout();
        //console.log('onPressSignOut resultRes: ', resultRes);
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' })
            ]
            });
            this.props.navigation.dispatch(resetAction);
            //this.props.navigation.navigate('Login')
        
        
    }
    onLinkPress = (evt, href) => {
        //https://t.me/ixinsupport
        //console.log('onPressUser href: ', href);
        Linking.openURL(href);
        //html
   }
    merchantClicked = (value) => {
        //console.log("merchantClicke...")
        
        this.setState({value});
        if(value) {
            this.setState({userType: 'merchant'});
            this.userTypeClicked('merchant');
        }else{
            this.individualClicked();
        }
    }
    individualClicked = () => {
        //console.log("individualClicked...")
        this.setState({userType: 'individual'});
        this.userTypeClicked('individual');
    }
    bothClicked = () => {
        this.userTypeClicked('both');
    }
    onPressGetKeys= () => {
        //AppKeyView
        const {mobile } = this.state;
        this.props.navigation.navigate('AppKeyView', { mobile });
    }
    onPressAccounts= () => {
        if(__DEV__)
        console.log('onPressAccounts this.state: ', this.state);
        const {mobile, userId} = this.state;
        this.props.navigation.navigate('ScanMe', { mobile });
        /*
        if(this.state.userType=='individual'){
            this.props.navigation.navigate('AccountIndividual', 
                {user: this.state.user, userid: this.state.userid});
        }else{
            this.props.navigation.navigate('AccountMerchant', 
            {user: this.state.user, userid: this.state.userid});
        }*/
    }
    /*
    onPressUser = () => {
        //console.log('onPressUser this.state: ', this.state);
        if(this.state.userType=='individual'){
            this.props.navigation.navigate('UserProfile', 
                {user: this.state.user, userid: this.state.userid, 
                image: this.state.image, onGoBackDName: (dname) => this.setUserDName(dname),
                onGoBack: (image) => this.setUserIcon(image)});
        }else{
            this.props.navigation.navigate('BusinessProfile', 
            {user: this.state.user, userid: this.state.userid, image: this.state.image, 
                onGoBack: (image) => this.setUserIcon(image)});
        }
    }
    */
    setUserIcon = (image) => {
        //console.log('onPressUser image: ', image);
        this.setState({image})
    }
    setUserDName = (dname) => {
        //console.log('setUserDName dname: ', dname);
        this.setState({dname});
        this.state.user.local.dname = dname;
    }
    userTypeClicked = async (accountType) => {
        //console.log('userTypeClicked accountType: ', accountType);
        //console.log('userTypeClicked this.state.user: ', this.state.user);
        if(this.state.user.local.userType == accountType){
            Alert.alert("You cannot change to the same user type: " + accountType);
            return;
        }
        try{
            this.setState({ visible: true });
            //switch userType to the type of accountType
            //updateUserProfile
            const resultdata = await ApiService.updateUserType(this.state.userId, accountType);
            if(__DEV__)
            console.log("userTypeClicked resultdata: ", resultdata);
            this.setState({ visible: false });
            if(resultdata && !resultdata.error){
                const body = await resultdata.json()
                //console.log("userTypeClicked body: ", body);
                if (body.status === 'error') {
                    Alert.alert(body.message)
                    return
                }else{
                    //console.log("userTypeClicked body.message: ", body.message);
                    Alert.alert(
                        'Alert',
                        'Updated to ' +accountType+' and will go to home screen for '+accountType,
                        [
                            {text: 'Ok', onPress: () => {
                                
                                let resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [
                                    NavigationActions.navigate({ routeName: 'EntryMain', params: {toUserType: accountType, user: this.state.user} })
                                    ]
                                });
                                this.props.navigation.dispatch(resetAction);
                                
                                //this.props.navigation.dispatch(backAction)
                                //console.log("userTypeClicked this.props.navigation.state: ", this.props.navigation.state);
                            
                            }
                        },
                        ],
                        { cancelable: false }
                    )
                }
            }else{
                Alert.alert(
                    'error',
                    resultdata.error.message,
                    [
                      {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
                    ],
                    { cancelable: false }
                  )
            }
        }catch(error){
            //console.log('ProfileSettings render error: ', error);
            this.setState({ visible: false });
        }
    }


    render() {
        //console.log('ProfileSettings render this.state: ', this.state);
       // console.log('ProfileSettings render this.state.userType: ', this.state.userType)
        let active = false;
        if(this.state.userType=='individual'){
            active = false;
        }else {
            active = true;
            
        }
        //console.log("ProfileSettings render active: ", active); 
        return (
            
            <ScrollView style={styles.container}>
                <View style={{height: 30,flex: 1,flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, 
                     textAlign: 'left', position: 'absolute', bottom:5}}>User Type</Text>
                </View>
                <View style={{marginTop: 0,marginBottom: 0, flex: 1,width: metrics.DEVICE_WIDTH*0.9, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 14, color:"#ba2a8f", fontWeight: 'bold', marginRight: 14}}>Doctor</Text>
                    
                  {/*<Switch
                        style={{margin:6}}
                        active={active}
                        buttonRadius={14}
                        switchHeight={20}
                        switchWidth={80}
                        activeBackgroundColor='rgba(206, 182, 255, 0.74)'
                        inactiveBackgroundColor='rgba(252, 16, 148, 0.2)'
                        activeButtonColor='#6d3abf'
                        activeButtonPressedColor='#7943d1'
                        inactiveButtonColor='#ba2a8f'
                        inactiveButtonPressedColor='#cf39a2'
                        onActivate={this.merchantClicked}
                        onDeactivate={this.individualClicked}
                  />
                  <Switch
                        width={60}
                        height={30}
                        style={{marginTop: 20}}
                        value={this.state.value}
                        onSyncPress={(value) => this.merchantClicked}
                    />
                  
                    <Text style={{fontSize: 14, color:'#6d3abf', fontWeight: 'bold', marginLeft: 10}}>Merchant</Text>*/}
                </View>
                {this.state.visible && (
                    <ActivityIndicator
                      style={{ position: "absolute", top: height / 2, left: width / 2 }}
                      size="large"
                    />
                  )}
                <View style={{height: 30,flex: 1,flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, 
                     textAlign: 'left', position: 'absolute', bottom:5}}>My accounts</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>ttData Account</Text>
                            </View>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressAccounts}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}>></Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </View> 
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                        flexDirection : 'row', justifyContent:'space-between'}}> 
                        <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                            <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>App Keys</Text>
                        </View>
                        <View style={{marginRight: 30, alignItems: 'center'}}>
                            <TouchableOpacity onPress={this.onPressGetKeys}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}>></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                 </View>
                
                {/*<View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
                    {!this.state.hide && <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Sessions</Text>
                            </View>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressHistory}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}></Text>
                                </TouchableOpacity>
                            </View>
                    </View>}
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, marginTop: 5, marginBottom: 5, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Refer Friends</Text>
                            </View>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressReferral}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}>></Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                                </View>*/}
                {/*<View style={{height: 30,flex: 1,flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, 
                     textAlign: 'left', position: 'absolute', bottom:5}}>Security</Text>
                  </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Recovery Phrase</Text>
                            </View>
                            <View style={{marginRight: 30, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressRecoveryPhrase}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}>></Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    {!this.state.hide && <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, marginTop: 5, marginBottom: 5, alignItems: 'center', backgroundColor:'white',
                        flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Device Lock</Text>
                            </View>
                            <View style={{marginRight: 30, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressHistory}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}></Text>
                                </TouchableOpacity>
                            </View>
                    </View>}
                </View>
                <View style={{height: 30,flex: 1,flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, 
                     textAlign: 'left', position: 'absolute', bottom:5}}>Advanced</Text>
                  </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Advanced Settings</Text>
                            </View>
                            <View style={{marginRight: 30, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressAdvancedSettings}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}>></Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                   
                </View>*/}
                <View style={{height: 30,flex: 1,flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, 
                     textAlign: 'left', position: 'absolute', bottom:5}}>About this APP</Text>
                </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Version</Text>
                            </View>
                            <View style={{marginRight: 30, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressHistory}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                     color: '#1111FF', alignItems: 'center'}}>1.0</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, marginTop: 5, marginBottom: 5, alignItems: 'center', backgroundColor:'white',
                        flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Legal</Text>
                            </View>
                            <View style={{marginRight: 30, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressLegal}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 30, color: '#1111FF', alignItems: 'center'}}>></Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                    
                </View>
                
                <View style={{height: 30,flex: 1,flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start'}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, 
                     textAlign: 'left', position: 'absolute', bottom:5}}>Other</Text>
                  </View>
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 2}}>
                    
                   {!this.state.hide && <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Local currency</Text>
                            </View>
                            <View style={{marginRight: 30, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressHistory}>
                                    <Text style={{textAlign: 'center', alignSelf:'center',justifyContent:'center', 
                                    fontSize: 25, color: '#1111FF', alignItems: 'center'}}></Text>
                                </TouchableOpacity>
                            </View>
                    </View>}
                    <View style={{width: metrics.DEVICE_WIDTH*0.9, height: 40,flex: 1, alignItems: 'center', backgroundColor:'white',
                    flexDirection : 'row', marginTop: 5, justifyContent:'space-between'}}>
                            <View style={{marginRight: 30,marginLeft: 10, alignItems: 'center'}}>
                                <TouchableOpacity onPress={this.onPressSignOut}>
                                    <Text style={{color: 'red', textAlign: 'center', alignSelf:'center',justifyContent:'center', alignItems: 'center'}}>Sign Out</Text>
                                </TouchableOpacity>
                            </View>
                    </View>
                </View>  
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Choose one:'}
                    //options={['Add', 'Delete', 'Edit']}
                    options={options}
                    cancelButtonIndex={3}
                    destructiveButtonIndex={3}
                    onPress={this.actionClicked }
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    icon: {
        width: 24,
        height: 24,
        margin: measures.defaultMargin
    },
    itemTitle: {
        fontSize: measures.fontSizeMedium
    }
});


/*
<View style={{height: 38,flex: 0,flexDirection: 'column', alignItems: 'flex-start', justifyContent:'flex-start'}}>
                    <View style={{ flex: 0, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, paddingLeft: 0 }}>
                            <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 10, 
                            textAlign: 'left', position: 'absolute', bottom:0}}>Profile</Text>
                        </View>
                   
<View style={{ flex: 1, paddingLeft: 0, marginRight: 25, justifyContent:'flex-end', alignItems: 'flex-end'}}>
                            <HTML style={{textAlign: 'right', alignSelf:'right',justifyContent:'flex-end', alignItems: 'flex-end'}}
                                html={htmlContent} onLinkPress={this.onLinkPress}/>
                                
                        </View>
     
                    </View>
                </View>

{this.renderItems([
                    { title: 'Change currency', iconName: 'attach-money', iconType: 'md', action: () => this.goToChangeCurrencyPage() },
                    { title: 'Erase all data', iconName: 'trash', iconType: '', action: () => this.confirmErase() },
                ])}

*/