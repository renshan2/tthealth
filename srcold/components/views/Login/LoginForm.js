import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableWithoutFeedback,View, Keyboard } from 'react-native' 
import { CustomButton, CustomTextInput } from '@components/widgets'
import metrics from '../../../config/metrics'
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal';


export default class LoginForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onLoginPress: PropTypes.func.isRequired,
    onSignupLinkPress: PropTypes.func.isRequired,
    onForgotPwdPress: PropTypes.func.isRequired
  }

  state = {
    email: '',
    mobile: '17037253746',
    password: 'Ddu73834488',
    isFocused: false,
    pickerData: null,
    cca2: '',
    refresh: false,
    countryModalOpen: false
  }
  componentWillMount(){
    //console.log("LoginForm componentWillMount this.props: ", this.props);
    this.setState({mobile: this.props.mobile});
  }
  componentDidMount(){
    //console.log("LoginForm componentDidMount this.props: ", this.props);
    this.setState({pickerData: this.phone.getPickerData()});
    this.forceUpdate();
  }
  setCountryModalOpen = (open) => {
    this.setState({countryModalOpen: open});
  }
  onPressFlag = () => {
    this.setCountryModalOpen(!this.state.countryModalOpen);
  }

  selectCountry = (country) => {
    if(__DEV__){
    console.log("selectCountry country: ", country);
    }
    this.setCountryModalOpen(false);
    this.phone.selectCountry(country.cca2.toLowerCase());
    this.setState({ cca2: country.cca2 });
  }
  hideForm = async () => {
    //console.log("LoginForm hideForm this.props: ", this.props);
    /*
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
    */
  }
  setLoginUsername = (mobile) =>{
    //console.log("setLoginUsername mobile: ", mobile);
    this.setState({mobile});
    this.phone.placeholder = mobile;
  }
  render () {
    const { email, mobile, password, isFocused} = this.state
    const { isLoading, onSignupLinkPress, onLoginPress, onForgotPwdPress, clearError } = this.props
    //console.log("LoinForm render mobile: ", mobile);
    //console.log("LoinForm render isLoading: ", isLoading);
    //console.log("LoinForm render this.props: ", this.props);
    const borderColor = isFocused ? 'white' : 'rgba(255,255,255,0.4)';
    //const isValid = (mobile !== '') && password !== ''

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
        <View style={{borderBottomWidth: 1, marginBottom: 5, borderColor: borderColor}}>
              <PhoneInput style={{marginTop:8, marginBottom: 0,padding:0,height:40, borderBottomWidth: 1}}
                  textStyle={{color: 'black', fontSize: 17}}
                  selectionColor={'green'}
                  ref={(ref) => { this.phone = ref; }}
                  onPressFlag={this.onPressFlag}
                  onChangePhoneNumber={(value) => {
                    clearError();
                    this.setState({ mobile: value });
                   }
                  }
                  textProps={{
                    placeholder: "mobile" , 
                    placeholderTextColor: 'rgba(0,0,0,0.4)',
                    onSubmitEditing : () => { this.passwordInputRef.focus()}, 
                    onFocus: () => {
                     // console.log("phoneINput onFocus...")
                      this.setState({ isFocused: true }) 
                      this.passwordInputRef.setState({ isFocused: false })}
                      
                  }
                  }
                  defaultProps={{selectionColor: 'yellow'}}
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
               onClose={() => this.setCountryModalOpen(false)}
             >
             <View />
          </CountryPicker>
          
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => {
              clearError();
              this.setState({ password: value });
            }

            }
            isEnabled={!isLoading}
            onFocus={()=> {
              //console.log("passwordInputRef onFocus")
              this.setState({ isFocused: false }) 
              this.passwordInputRef.setState({ isFocused: true })}
            }
          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref}>
            <CustomButton
              onPress={() => {
                //console.log("onPress for login mobile, email, password: ", mobile, email, password),
                //console.log("calling onSignupPress ...")
                
                onLoginPress(mobile, email, password)

              }
              }
              
              isEnabled={true}
              isLoading={isLoading}
              buttonStyle={styles.loginButton}
              textStyle={styles.loginButtonText}
              text={'Sign In'}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              ref={(ref) => this.linkRef = ref}
              style={styles.signupLink}
              onPress={onSignupLinkPress}
            >
              {'Sign-up'}
            </Text>
            <Text
              ref={(ref) => this.pwdRef = ref}
              style={styles.signupLink}
              onPress={() => {
                //console.log("onPress for mobile: ", mobile),
                //console.log("calling onForgotPwdPress ...")
                onForgotPwdPress(mobile)
              }
              }
            >
              {'Forgot Password'}
            </Text>
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
    paddingTop: 50
  },
  form: {
    marginTop: 10
  },
  footer: {
    height: 100,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'green',
    borderRadius: 8,
  },
  loginButtonText: {
    color: 'white',//3E464D
    fontWeight: 'bold',
    fontSize: 24
  },
  signupLink: {
    color: 'rgba(0,0,0,0.6)',
    alignSelf: 'center',
    padding: 6,
    fontSize: 13
  }
})


/**
 * 
 * <CustomTextInput
            name={'Mobile'}
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Mobile'}
            keyboardType={'numeric'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}
            onChangeText={(value) => {
              if(value.includes("@")){
                this.setState({ email: value, mobile: '' })
              }else{
                this.setState({ mobile: value, email: '' })
              }
              
            }}
            isEnabled={!isLoading}
          />
 */