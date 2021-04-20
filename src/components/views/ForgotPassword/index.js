import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet,View,Image, Alert,TouchableOpacity} from 'react-native'
//import { Image, View } from 'react-native-animatable'
import { CustomButton, CustomTextInput } from 'react-widgets'
import metrics from '../../../config/metrics' 
import { Api as ApiService } from 'common-services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.7

export class ForgotPassword extends Component {
   
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: '#6CB553', 
    },
    headerTintColor: 'black',
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
        title: 'Forgot Password',
    headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
   
  })
  constructor(props) {
    super(props);
    //console.log("ForgotPassword constructor props: ", props);
    //console.log("ForgotPassword constructor navigation: ", this.props.navigation);
    this.state = {
      mobile: this.props.navigation.state.params? this.props.navigation.state.params.mobile:'',
      isLoading: false,
      isFocused: false,
      pickerData: null,
      cca2: '',
      countryModalOpen: false
    }
    //this.countryPicker = React.createRef();
  }
  componentDidMount(){
    this.setState({pickerData: this.phone.getPickerData()});
  } 
  
  setCountryModalOpen = (open) => {
    this.setState({countryModalOpen: open});
  }
  onPressFlag = () => {
    //this.countryPicker.openModal();
    console.log("onPressFlag this: ", this);
    //this.countryPicker.openModal();
    this.setCountryModalOpen(!this.state.countryModalOpen);
  }

  selectCountry = (country) => {
    console.log("selectCountry country: ", country);
    this.setCountryModalOpen(false);
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
    
  }

  forgotPasswordPress = async () => {
    //console.log("forgotPasswordPress this.state: ", this.state);
    if(this.state.mobile && this.state.mobile !=''){
        let mobile = this.state.mobile;
        if(mobile.startsWith("+")){
            mobile = mobile.substring(1);
        }
        //forgotPassword(username)
      //const resultdata = await ApiService.forgotPassword(mobile);
      const resultdata = await ApiService.sendSMS(mobile);
      console.log("forgotPasswordPress resultdata: ", resultdata);
      if(resultdata && resultdata.status==200){
        const body =  resultdata.data;
        console.log("forgotPasswordPress body: ", body);
        if (body.status === 'error') {
            Alert.alert(body.message);
            return
        }else{
          this.props.navigation.navigate('VerifyPinResetPWD', { mobile: mobile});
         
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
    }else{
      Alert.alert("Please input mobile number.")
    }
  }
 

  render () {
    const { mobile, isLoading, isFocused } = this.state
    //const { isLoading, onLoginPress } = this.props
    //const isValid = mobile !== ''
    const borderColor = isFocused ? 'white' : 'rgba(255,255,255,0.4)';
    //console.log("Verify render mobile, isLoading: ", mobile, isLoading)
    return (
        <KeyboardAwareScrollView
              style={{ backgroundColor: '#4c69a5', paddingBottom: 0 }}
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={styles.container}
              scrollEnabled={true}
              extraHeight={150} //150
            >
            <View style={styles.container}>
            <View style={styles.form} ref={(ref) => this.formRef = ref}>
              
              <View style={{borderBottomWidth: 1, marginBottom: 5, borderColor: borderColor}}>
                  <PhoneInput style={{marginTop:8, marginBottom: 0,padding:0,height:40, borderBottomWidth: 1}}
                      textStyle={{color: 'black', fontSize: 17}}
                            selectionColor={'blue'}
                            ref={(ref) => { this.phone = ref; }}
                            onPressFlag={this.onPressFlag}
                            onChangePhoneNumber={(value) => this.setState({ mobile: value })}
                            textProps={{
                                placeholder: "mobile" , 
                                placeholderTextColor: 'rgba(255,255,255,0.4)',
                                //onSubmitEditing : () => { this.buttonRef.focus()}, 
                                onFocus: () => {
                                //console.log("phoneINput onFocus...")
                                this.setState({ isFocused: true }) 
                                //this.buttonRef.setState({ isFocused: false })
                              }
                                
                            }
                            }
                        />
                    </View>
                    <CountryPicker
                        onSelect={value => this.selectCountry(value)}
                        //onSelect={({ cca2 }) =>{
                          //console.log("phoneINput onSelect...cca2: ", cca2);
                          //this.phone.current && this.phone.current.selectCountry(cca2.toLowerCase())
                          //}
                        //}
                        placeholder= ''
                        translation='eng'
                        cca2={this.state.cca2}
                        modalProps={{
                          visible: this.state.countryModalOpen,
                        }}
                        //onClose={() => this.setCountryModalOpen(false)}
                      >
                      <View />
                    </CountryPicker>
                    <View style={styles.footer}>
                        <View ref={(ref) => this.buttonRef = ref}>
                            <CustomButton
                            onPress={() => this.forgotPasswordPress(mobile)}
                            isEnabled={true}
                            isLoading={isLoading}
                            buttonStyle={styles.loginButton}
                            textStyle={styles.loginButtonText}
                            text={'Get PIN'}
                            />
                        </View>
                    </View>
                    <View style={{height: 20}}></View>  
                </View>
                 
            </View>
      </KeyboardAwareScrollView>
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
    marginVertical: 1
  },
  bottom: {
    backgroundColor: '#1976D2'
  },
  form: {
    marginTop: 120,
    //backgroundColor: '#1976D2',
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  footer: {
    height: 50,
    justifyContent: 'center',
    backgroundColor: 'white',
    //paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
    width: metrics.DEVICE_WIDTH * 0.8,
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 8
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})
