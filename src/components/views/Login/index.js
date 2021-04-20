import React, { Component } from 'react'
import { View ,Text, Alert, StyleSheet } from 'react-native';
import AuthScreen from './AuthScreen'
import { Api as ApiService } from '../../../common/services'   
import metrics from '../../../config/metrics'
import { YellowBox } from 'react-native'; 
import CheckEmail from './CheckEmail';
import { NavigationActions, StackActions } from 'react-navigation';

// React native 0.55.4 is currently migrating to a new React API.
// Some warnings are expected in this version.
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader requires main queue setup',
    'Module RNFetchBlob requires main queue setup',
    'Could not find image file:///',
]);

/** 
 * The root component of the application.
 * In this component I am handling the entire application state, but in a real app you should
 * probably use a state management library like Redux or MobX to handle the state (if your app gets bigger).
 */
export class Login extends Component {

   

    static navigationOptions = ({ navigation, screenProps }) => ({
      headerStyle: {
          backgroundColor: '#6CB553', 
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
          title: 'Login',
      //headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon2.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
     
    })

  constructor(props) {
      super(props);
      console.log("Login constructor... props: ", props);
      this.state = {
        isLoggedIn: false, // Is the user authenticated?
        isLoading: false, // Is the user loggingIn/signinUp?
        isAppReady: false, // Has the app completed the login animation?
        dropdown: null,
        waddress: '',
        display: false,
        user: null,
        email: '',
        mobile: '',
        error: ''
      }

      this.viewName = '';

  }

  componentDidMount(){
    if(__DEV__){
      console.log("Login componentDidMount this.props.navigation.state: ", this.props.navigation.state);
      console.log("Login render this.authscreen: ", this.authscreen);
    }
    if(this.props.navigation.state && 
      this.props.navigation.state.params &&
      this.props.navigation.state.params.visibleForm){
      //console.log("Login componentDidMount _setVisibleForm Login... ");
      this.authscreen._setVisibleForm('LOGIN');
    }
  }
  componentWillMount(){
    if(__DEV__){
    console.log("Login componentWillMount this.props.navigation.state: ", this.props.navigation.state);
    }
      if(this.props.navigation.state && 
        this.props.navigation.state.params &&
        this.props.navigation.state.params.viewName){
          this.viewName = this.props.navigation.state.params.viewName;
      }
      this.props.navigation.setParams({ title: 'Login' });
      
  } 
  _resetPassword = async (mobile) => {
    if(__DEV__){
    console.log("Login _resetPassword this.props: ", this.props);
    }
    //console.log("Login _resetPassword mobile: ", mobile);
    if(!mobile)
      mobile = "";
      await this.props.navigation.navigate('ForgotPassword', {mobile: mobile, viewName: this.viewName});
  }

  clearError = () =>{
    this.setState({error: ''});
  }
  /**
   * Two login function that waits 1000 ms and then authenticates the user succesfully.
   * In your real app they should be replaced with an API call to you backend.
   */
  
  _simulateSignup = async (mobile, dname, password, passwordAgain,profession, checked) => {
    if(__DEV__){
    console.log("_simulateSignup mobile, dname, password, passwordAgain,profession, checked: ", mobile, dname, password, passwordAgain,profession, checked)
    }
    if((mobile=='' || password==''|| 
      passwordAgain=='')) {
        /*
          this.dropdown.alertWithType(
            'warn',
            'Warning:',
            'Please input all fields!',
          );
          return;*/
          this.setState({error: 'Please input all fields!'})
          return;
    }
    //debugger;
   
    if(mobile && mobile.startsWith("+")){
      mobile = mobile.substring(1);
    }
    if(!mobile || mobile==''){
      Alert.alert('mobile is required field!');
      return;
    }
    //if(!checked){
     // Alert.alert('the Agreement is not checked.');
     // return;
    //}
    let isMobile = (mobile != '')? true : false;
    if(__DEV__){
    console.log("_simulateSignup isMobile: ", isMobile);
    
    console.log("_simulateSignup mobile, password, passwordAgain: ", mobile, password, passwordAgain);
    }
    if(password === passwordAgain) {
      //check agreement 

      this.setState({ isLoading: true });
      let resultdata = "";
      //let walletName = mobile;
      //let walletDescription = walletName + " wallet";
      //await WalletsActions.removeStoreWallets();
      //await WalletsActions.loadWallets(walletName);
      //let list = WalletsStore.list;
      //let wallet = null;
      //let bal = 0;
     // let tokenAddress = IXIN;
     //console.log("_simulateSignup IXIN tokenAddress: ", tokenAddress);
      //console.log("_simulateSignup list.length: ", list.length);
      /*
      if(list.length == 0) {
          wallet = WalletUtils.createWalletWithMnemonics();
          await WalletsActions.addWallet(walletName, wallet, 'iXin', tokenAddress, bal, walletDescription);
         
      } else {
        //find out if this wallet name exists
        for (let walletObj of list) {
          if(walletObj.walletName == walletName){
            wallet = walletObj;
          }
        }
        if(wallet==null)
        {
            wallet = WalletUtils.createWalletWithMnemonics();
            await WalletsActions.addWallet(walletName, wallet, 'iXin', tokenAddress, bal, walletDescription);
          
        }
      }*/
     //console.log("_simulateSignup wallet: ", wallet);
      //const waddress = wallet.getAddress();
      //console.log("_simulateSignup waddress, IXIN: ", waddress, IXIN);
      //temperorially
      //await WalletsActions.saveWallets();
      
      //this.setState({waddress});
      //is mobile phone or email as userid
      if(isMobile) {
          resultdata = await ApiService.registerMobile(mobile, password, dname, profession);
      }else {
          resultdata = await ApiService.registerEmail(email, password, dname);
      }
      if(__DEV__){
      console.log("_simulateSignup resultdata: ", resultdata);
      }
      if(resultdata && resultdata.status==200){
        //const body = resultdata;
        const body = resultdata.data;
        if(__DEV__){
       console.log("_simulateSignup body: ", body);
        }
        if (body.status === 'error') {
          this.setState({ isLoggedIn: false, isLoading: false, isAppReady: false })
          //console.log("_simulateSignup body.message: ", body.message);
          if(body.message.includes("already logged in")) {
            Alert.alert(
              'Error',
              body.message,
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Logout', onPress: async () => {
                  const resultRes = await ApiService.logout();
                  this.props.navigation.navigate('Login', { mobile });
                  //console.log('_simulateSignup logout resultRes: ', resultRes)
                }
                },
              ],
              { cancelable: false }
            )
          }else {
            this.dropdown.alertWithType(
              'error',
              `Error: `,
              `error message: ${body.message}`,
            );
          }
        }else{
          //when no error
         
         //console.log('Signup saveWallets......');
          //await WalletsActions.saveWallets();
          if(isMobile){
            this.setState({ isLoggedIn: false, isLoading: false, isAppReady: false })
            //const { mnemonic } = wallet;
           //console.log("_simulateSignup mobile, mnemonic: ", mobile, mnemonic);
            this.props.navigation.navigate('VerifyPin', { mobile });
            if (this.dropdown) {
                this.dropdown.alertWithType(
                  'success',
                  'Registration:',
                  'A PIN has been sent, please use it to activate your account',
                );
            }
          }else{
            //is email registration
            this.setState({ isLoggedIn: false, isLoading: false, isAppReady: false });
            Alert.alert(
              'Reminder',
              'Please check your email to activate your account...',
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => {
                  //this.props.navigation.navigate('Login', { email });
                  this.authscreen._setVisibleForm('LOGIN')
                  //console.log('OK Pressed')
                }
                },
              ],
              { cancelable: false }
            )
          }
        }
      } else if(resultdata && resultdata.error && resultdata.error.response && 
        resultdata.error.response.data && resultdata.error.response.data.message){
            Alert.alert(
              'error',
              resultdata.error.response.data.message,
              [
                {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
              
              ],
              { cancelable: false }
            )
            //console.log("_simulateLogin leaving loginWithPhonePassword  resultdata.error: ", resultdata.error);
      } 
      else{
        this.setState({ isLoggedIn: false, isLoading: false, isAppReady: false });
        Alert.alert(
          'Error',
          `${resultdata.error.message}`,
          [
            {text: 'OK', onPress: () => {
              //console.log('OK Pressed')
            }
            },
          ],
          { cancelable: false }
        )
      }

    }else{
      Alert.alert('Two passwords do not match');

    }
   // setTimeout(() => this.setState({ isLoggedIn: true, isLoading: false }), 1000)
  }

  _simulateLogin = async (mobile, email, password) => {
      //console.log("_simulateLogin mobile, email, password: ", mobile, email, password)
      this.setState({error: ''})
      if((mobile=='' || password=='' )) {
            /*
            this.dropdown.alertWithType(
              'warn',
              'Warning:',
              'Please input both mobile and password!',
            );
            //return;
           
            */
          // mobile = "17037253746";
          // password = "Ddu73834488";
          this.setState({error: 'Please input both mobile and password!'});
          return;
      }
      if(mobile && mobile.startsWith("+")){
        mobile = mobile.substring(1);
      }
      if(!mobile || mobile==''){
       // Alert.alert('mobile is required field!');
        //return;
      }
      //await WalletsActions.removeStoreWallets();
      this.setState({ isLoading: true, mobile });
       
      //if(mobile && mobile !=='')
      let resultdata = await ApiService.loginWithPhonePassword(mobile, password);
     // else
        // resultdata = await ApiService.loginWithEmailPassword(email, password);
        if(__DEV__){
          console.log("_simulateLogin loginWithPhonePassword resultdata: ", resultdata);
        }
      if(resultdata && resultdata.status == 200){
        //const body = resultdata;
        let body = resultdata.data;
        //console.log("_simulateLogin body: ", body);
        if (body.status === 'error') {
          if (body.message.includes("has not been activated")) {
            if(mobile && mobile !==''){
              this.props.navigation.navigate('VerifyPin', { mobile });
            }
          } else if (body.message.includes("Network request failed")) {
            Alert.alert(
              'error',
              body.message,
              [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Ok', onPress: async () => {
                  this.props.navigation.navigate('Login', { mobile });
                }
                },
              ],
              { cancelable: false }
            )
          }else
          {
            alert(body.message);
          }
        }else {
          //logged in
          let user = body.user;
         //console.log("_simulateLogin user: ", user);
          this.setState({ user, isLoggedIn: true ,isLoading: false, isAppReady: false })
          //WalletActions.loadWallets(); will load in HomeOverview tab
          //await this.getSysInfo(user);
          user.local.pwd = password;
          let userId = user._id;
          //console.log("_simulateLogin userId: ", userId);
          let email = '';
          if(user.local.email){
             email = user.local.email;
             email = email.trim();
             //console.log("_simulateLogin email: ", email);
             this.setState({email});
          }
          if(email.length==0){
            await this.getUserTokenponEmail(userId);
            email = this.state.email;
          }
          await this.checkEmailOrNavigate(mobile,user,email);
        }
      }else if (resultdata && resultdata.error && resultdata.error.message && resultdata.error.message.includes("Network request failed")) {
        Alert.alert(
          'error',
          resultdata.error.message,
          [
            {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
           
          ],
          { cancelable: false }
        )
      } else if(resultdata && resultdata.error && resultdata.error.response && 
          resultdata.error.response.data && resultdata.error.response.data.message){
        Alert.alert(
          'error',
          resultdata.error.response.data.message,
          [
            {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
           
          ],
          { cancelable: false }
        )
        //console.log("_simulateLogin leaving loginWithPhonePassword  resultdata.error: ", resultdata.error);
      }
      this.setState({ isLoading: false });
      
  }
  getUserTokenponEmail = async (userId)=>{
    try{
      if(__DEV__){
      console.log("getUserTokenponEmail Login userId: ", userId);
      }
      const resultdata = await ApiService.getUserTokenProfile(userId);
      if(__DEV__){
      console.log("getUserTokenponEmail Login resultdata: ", resultdata);
      }
      if(resultdata && resultdata.status==200){
        //const body = resultdata;
        body = resultdata.data;
        //console.log("getUserTokenponEmail body: ", body);
        if (body.status === 'error') {
            //error
            Alert.alert(
            'error',
            body.message,
            [
                {text: 'Ok', onPress: () => {
                  //return '';
                },
                }
            ],
            { cancelable: false }
            )
        }else{
          //no error
          let messages = body.message;
          //let messages = JSON.parse(body.message);
          if(__DEV__){
          console.log("getUserTokenponEmail messages: ", messages);
          }
          if(messages.email){
            let email = messages.email;
            email = email.trim();
            //console.log("getUserTokenponEmail email: ", email);
            this.setState({email});
            //return email;
          }
        }
      }else{
      //error
      Alert.alert(
          'error',
          resultdata.error.message,
          [
          {text: 'Ok', onPress: () => { console.log('Ok Pressed'); }, style: 'cancel'},
          
          ],
          { cancelable: false }
      )
      }
  }catch(error){
     //console.log("getUserTokenponEmail error: ", error);
      Alert.alert(
        'Error',
        `${error.message}`,
        [
          {text: 'OK', onPress: () => {
           //console.log('OK Pressed');
            }
          },
        ],
        { cancelable: false }
      )
    }
}
//if no email, then ask users to input email 
  checkEmailOrNavigate = async (mobile,user, email) => {
  //console.log("checkEmailOrNavigate mobile,user, email: ", mobile,user, email);
    //debugger;
    if(email && email.length > 0) {
      //has email retrieved
        if(!user.local.email || user.local.email.length==0){
          user.local.email = email;
        }
    }
   //console.log("checkEmailOrNavigate user: ", user);
    //let wallet = await WalletsActions.walletExists(mobile);
   //console.log("checkEmailOrNavigate wallet: ", wallet);
   //console.log("checkEmailOrNavigate user.local.logInTime, user.local.userStartTime: ", user.local.logInTime,user.local.userStartTime);
    //if(user.local.userStartTime == user.local.logInTime) { //== user.local.logInTime
     //console.log("checkEmailOrNavigate first time login..");
      //if(wallet) {
        //const {mnemonic} = wallet;
       //console.log("checkEmailOrNavigate mnemonic: ", mnemonic);
        //this.props.navigation.navigate('WelcomeOne', { user, mobile, mnemonic, viewName: this.viewName});
     // }else{
     //   this.props.navigation.navigate('WelcomeOne', { user, mobile, viewName: this.viewName});
     // }
   // }else{
      if(email && email.length > 0) {
        
        
            if(__DEV__){
            console.log("checkEmailOrNavigate viewName: ", this.viewName);
            }
            
              //this.props.navigation.navigate('Tracking', { user });
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'EntryMain', params: { user, viewName: this.viewName} })
                ]
              });
              this.props.navigation.dispatch(resetAction);
          

          //}else{
           // this.props.navigation.navigate('ImportLostWallet', { user, mobile, viewName: this.viewName });
          //}
      }else {
        //no email, need email UI for user to type in email
        this.triggerModal();
      }
    //}
  }
  getSysInfo = async (user) => {
    try {
      if(__DEV__){
        console.log("Login getSysInfo this.state: ", this.state);
      }
        let resultdata = await ApiService.getSysInfo();
        if(__DEV__){
        console.log("Login getSysInfo resultdata: ", resultdata);
        }
        if(resultdata && resultdata.status==200){
            
            const body = resultdata.data;
            if(__DEV__){
            console.log("Login getSysInfo body: ", body);
            }
            if (body.status === 'error') {
                Alert.alert(
                    'Error',
                    `${body.message}`,
                    [
                      {text: 'OK', onPress: () => {
                       //console.log('OK Pressed')
                      }
                      },
                    ],
                    { cancelable: false }
                  )
            }else{
                let result = body.message;
                if(__DEV__){
                console.log("Login getSysInfo result: ", result);
                }
                let tokenponsUrl = result.tokenponsUrl;
                let hottopicsUrl = result.hottopicsUrl;
                let trackingUrl = result.trackingUrl;
                user.local.tokenponsUrl = tokenponsUrl;
                user.local.hottopicsUrl = hottopicsUrl;
                user.local.trackingUrl = trackingUrl;
                //console.log("Login getSysInfo user: ", user);
               
            }
        }else{
            Alert.alert(
                'Error',
                `${resultdata.error.message}`,
                [
                  {text: 'OK', onPress: () => {
                   //console.log('OK Pressed')
                  }
                  },
                ],
                { cancelable: false }
              )
        }
      }
      catch (e) {
         //console.log('Login getSysInfo e.message: ', e.message);
          Alert.alert(
            'Error',
            `${e.message}`,
            [
              {text: 'OK', onPress: () => {
               //console.log('OK Pressed')
              }
              },
            ],
            { cancelable: false }
          )
      }
      this.setState({loading: false});
      //console.log('Login getSysInfo  this.state: ', this.state);
}

  triggerModal() {
    this.setState(prevState => {
      return {
        display: true,
      }
    });
  }
  skipAction = async () => {
    //console.log("skipAction....  ");
    try{
        this.setState({ display: false});
        const { user, mobile} = this.state;
        if(user && user._id) {
           //let wallet = await WalletsActions.walletExists(mobile);
           //console.log("skipAction wallet: ", wallet);
           
            if(__DEV__){
              console.log(" skipAction viewName: ", this.viewName);
            }
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'EntryMain', params: { user, viewName: this.viewName} })
                ]
              });
              this.props.navigation.dispatch(resetAction);
          //}else{
            //this.props.navigation.navigate('ImportLostWallet', { user, mobile, viewName:this.viewName});
          //}
        }
        
    }catch(error){
     //console.log("skipAction error: ", error);
      Alert.alert(
        'Error',
        `${error.message}`,
        [
          {text: 'OK', onPress: () => {
           //console.log('OK Pressed')
          }
          },
        ],
        { cancelable: false }
      )
    }
  }
  setEmail = (email) => {
   //console.log("setEmail email: ", email);
    this.setState({email});
    if(email && email.length > 0) {
      //has email retrieved
        if(this.state.user.local){
           this.state.user.local.email = email;
        }
    }
  }
 sendEmailAction = async () => {
     //console.log("sendEmailAction state: ", this.state);
     
      const { user, email, mobile } = this.state;
      let userId = user._id;
      if(!email || email.indexOf("@") < 0){
        Alert.alert(
          'Alert',
          'Please provide correct email address!',
          [
            {text: 'OK', onPress: () => {
             //console.log('OK Pressed')
            }
            },
          ],
          { cancelable: false }
        )
      }else{
        try{
            let resultdata = await ApiService.updateUserEmail(userId, email)
            if(__DEV__){
            console.log("sendEmailAction resultdata: ", resultdata);
            }
            if(resultdata && resultdata.status==200){
              //const body = resultdata;
              const body = resultdata.data;
              if(__DEV__){
              console.log("sendEmailAction body: ", body);
              }
              if (body.status === 'error') {
              }else{
                //console.log("sendEmailAction update success body: ", body);
              }
            }
          }catch(error){
           //console.log("sendEmailAction error: ", error);
          }
          this.setState({ display: false});
          //let exist = await WalletsActions.walletExists(mobile);
          //console.log("sendEmailAction exist: ", exist);
          
            if(__DEV__){
              console.log(" skipAction viewName: ", this.viewName);
            }
              const resetAction = StackActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: 'EntryMain', params: { user, viewName: this.viewName} })
                ]
              });
              this.props.navigation.dispatch(resetAction);
          //}else{
            //this.props.navigation.navigate('ImportLostWallet', { user, mobile, viewName:this.viewName });
          //}
        }
   }
  /**
   * Simple routing.
   * If the user is authenticated (isAppReady) show the HomeScreen, otherwise show the AuthScreen
   */
  render () {
    if(__DEV__){
      console.log("Login render this.props: ", this.props);
      console.log("Login render this.authscreen: ", this.authscreen);
    }
      let hasError = false;
      if(this.state.error.length>0){
        hasError = true;
      }
      return (
        <View style={styles.container}>
          <AuthScreen
            ref={component => this.authscreen = component}
            login={this._simulateLogin}
            signup={this._simulateSignup}
            clearError={this.clearError}
            resetpwd={this._resetPassword}
            isLoggedIn={this.state.isLoggedIn}
            isLoading={this.state.isLoading}
            onLoginAnimationCompleted={() => this.setState({ isAppReady: true })}
          />
           {hasError && <View style={{flex:0, height: 50,marginBottom:80, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'red', fontSize: 13}}>{this.state.error}</Text>
                    </View>}
          <CheckEmail
            skipAction= {this.skipAction} 
            setEmail = {this.setEmail} 
            display = { this.state.display }
            sendAction = {this.sendEmailAction}
          />
          {/*<DropdownAlert 
            ref={ref => this.dropdown = ref} 
            warnColor="black"
          closeInterval={5000}/>*/}
        </View>
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
  }
})


/*

        <RNImage style={styles.logoImg}  
          source={require('../../../assets/logo.png')}/>
*/