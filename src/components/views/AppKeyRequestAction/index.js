import React from 'react';
import { StyleSheet, View,TextInput, Image,Dimensions,TouchableOpacity, Text, Clipboard} from 'react-native';
import { colors, measures } from 'eslint-config-populist'; 
import Checkbox from 'react-native-modest-checkbox';
import { Api as ApiService } from 'common-services';
import { CustomButton } from 'react-widgets'
// { General as GeneralActions } from '@common/actions';
import Spinner from 'react-native-loading-spinner-overlay';
import Share from 'react-native-share';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export class AppKeyRequestAction extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
      headerStyle: {
        backgroundColor: '#6CB553', 
      },
      headerTintColor: 'black',
      headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white'
        },
        title: "App Key Request",
        headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
       
      })
    constructor(props) {
      super(props);
      //console.log("WalletsOverview constructor this.props: ", this.props); 
      let username = '', category="", user=null, mobile="";
      if(this.props.navigation.state.params && this.props.navigation.state.params.username){
        username = this.props.navigation.state.params.username;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.category){
        category = this.props.navigation.state.params.category;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.user){
        user = this.props.navigation.state.params.user;
      } 
      if(this.props.navigation.state.params && this.props.navigation.state.params.mobile){
        mobile = this.props.navigation.state.params.mobile;
      } 
      this.state = {  
        loading: false, 
        user: user,
        username: username,
        appkey: '',
        appName: '',
        category: category,
        mobile: user?user.local.mobile: mobile, 
        message: '',
        error: ''
      }; 

      this.shareOptions = {
        title: "Share App Key",
        message: "Share app key",
        //url: this.state.ShareUrl,
        subject: "App Key", // for email
        social: ''
      };
    }
    
    async componentDidMount() {
        this.props.navigation.setParams({ title: "App Key Request" });
    }
    copyAppKey = async () =>{
        //console.log('copyToClipboard this.state: ', this.state);
        const {appkey} = this.state;
        if(appkey && appkey.length>0){ 
          await Clipboard.setString(appkey); 
          //GeneralActions.notify('Copied to clipboard', 'short');
        }
    }
    shareAppKey = () =>{
      if(__DEV__)
      console.log(' shareAppKey appkey: ',this.state.appkey); 
      setTimeout(() => { 
          this.shareOptions.appkey = this.state.appkey;
          this.shareOptions.social = 'social'; 

          Share.open(this.shareOptions).catch((err) => { 
              err && console.log(err);  
          });
      },300);
    } 
    sendAPIKeyRequest = async () =>{
      const {category, appName, mobile} = this.state;
      if(__DEV__)
      console.log(" sendAPIKeyRequest category, appName, mobile: ", category, appName, mobile);
      if(appName && appName.length>0 ){
        const resultdata = await ApiService.getAppKey("MobileApp", appName, mobile);
        if(__DEV__)
        console.log(" sendAPIKeyRequest resultdata: ", resultdata);
         
        if(resultdata && !resultdata.error){
            //resultdata
            let data = resultdata.data;
            if(data && data.message){
              if(data.message=="success"){
                  let appkey = data.appkey;
                  if(appkey && appkey.length>0)
                     this.setState({appkey: appkey});
              }else{
                let appkey = data.appkey;
                if(!appkey || appkey.length==0){ 
                  if(data.message && data.message.length>0)
                   this.setState({message: data.message});
                }
              }
            }
        }else{
          let error = resultdata.error;
          if(error && error.response && error.response.data && error.response.data.message){
              this.setState({error: error.response.data.message});
          }else if(error && error.message)
              this.setState({error: error.message});
          else this.setState({error: "Error occurred."});
        }
      }else{
        this.setState({error: "App Name is missing."});
      }
    } 
  
    render() {
        //console.log('WalletsOverview render this.props: ', this.props);
        //console.log('WalletsOverview render this.props.navigation.state.params: ', this.props.navigation.state.params);
        const { username, appkey, message } = this.state; 
        if(__DEV__)
        console.log(' render username: ', username);
        let hasKey = false;
        if(appkey && appkey.length>0){
          hasKey = true;
        }
        let hasMsg = false;
        if(message && message.length>0){
            hasMsg = true;
        }
        let hasError = false;
          if(this.state.error && this.state.error.length>0){
            hasError = true;
          }
        return ( 
              <View style={styles.container1}>  
                
                {<View style={{ flex: 1,height: 60, paddingRight: 0, borderWidth: 0, borderColor: 'red', marginBottom: 20}}>
                        <Text>App Name: </Text>
                        <TextInput 
                            placeholder={'App name'}
                            editable={true}
                            returnKeyType={'done'}
                            secureTextEntry={false}
                            withRef={true}
                            value={this.state.appName}
                            onChangeText={(value) => {

                                this.setState({ appName: value, appkey:'', message:''}); 
                            }
                            }
                            isEnabled={true}
                            onFocus={()=> {
                                //console.log("businessNameRef onFocus")
                                this.setState({ isFocused: false }); 
                                
                            }}
                            style={{flex: 0,backgroundColor: 'white',fontSize: 16, paddingVertical: 0,
                                textAlignVertical: 'center', paddingBottom:0, borderWidth:1,
                                marginLeft: 35,marginTop: 20,marginRight:35,paddingLeft: 5,
                                borderRadius: 4,color: 'black', height: 40 }}
                        />
                </View>} 
                {hasKey && <View style={{flex:0, flexDirection: 'column',marginBottom:50, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{fontSize: 19, color: 'green', marginBottom: 20}}>App Key:</Text>
                      <Text style={{color: 'green'}}>{this.state.appkey}</Text>
                </View>}
                {hasMsg && <View style={{flex:0, flexDirection: 'row',marginBottom:50, justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={{color: 'red'}}>{this.state.message}</Text>
                </View>}
                {hasError && <View style={{flex:0, flexDirection: 'row', height: 50, justifyContent:'center', alignItems: 'center'}}>
                      <Text style={{color: 'red'}}>{this.state.error}</Text>
                </View>}
                <View style={{flex:0, flexDirection: 'row', marginBottom: 30, justifyContent: 'center', alignItems:'center'}}>
                    {!hasKey && <CustomButton
                        onPress={this.sendAPIKeyRequest}
                        isEnabled={true}
                        isLoading={false}
                        buttonStyle={{backgroundColor: 'green', width: 110, borderRadius: 8}}
                        textStyle={{color: 'white', fontWeight: 'bold'}}
                        text={'Submit'}
                    />}
                    {hasKey && <CustomButton
                        onPress={this.copyAppKey}
                        isEnabled={true}
                        isLoading={false}
                        buttonStyle={{backgroundColor: 'green', width: 110, borderRadius: 8}}
                        textStyle={{color: 'white', fontWeight: 'bold'}}
                        text={'Copy'}
                    />}
                    {hasKey && <CustomButton
                        onPress={this.shareAppKey}
                        isEnabled={true}
                        isLoading={false}
                        buttonStyle={{backgroundColor: 'green', width: 110, borderRadius: 8}}
                        textStyle={{color: 'white', fontWeight: 'bold'}}
                        text={'Share'}
                    />}
                </View>
                <Spinner
                    visible={this.state.spinner}
                    textContent="Loading..."
                    textStyle={styles.spinnerTextStyle}
                    />
              </View> 
        );
    }
}
  const styles = StyleSheet.create({
      container1: {
          flex: 1,
          flexDirection: 'column',
          padding: measures.defaultPadding,
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
      },
      container: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 40,
        flexDirection: 'column',
        borderBottomWidth: 0,
        borderBottomColor: colors.lightGray
    }, 
    button: {
        position: 'absolute',
        top: 20,
        padding: 10,
    }, 
    leftColumn: {
      flex: 1
    },
    title: {
      fontSize: measures.fontSizeMedium,
      color: colors.gray,
      borderWidth: 0,
    }, 
    input: {
        width: '20%',
        borderBottomWidth: 1,
        borderBottomColor: colors.black,
        padding: 4,
        paddingLeft: 0,
        marginRight: 2,
        textAlign: 'center',
        color: colors.black
    },
    createAccountButton: {
        backgroundColor: 'green',
        width: 150, 
        borderRadius: 10,
        marginBottom: 20
      },
      createAccountButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
      
      },
     spinnerTextStyle: { color: 'black' },
});
  

