import React, { Component, useState } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Platform,View, Alert,TouchableOpacity, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
 
import { CustomButton, CustomTextInput } from 'react-widgets'
import metrics from '../../../config/metrics'
//import { CheckBox } from 'react-native-elements'
import DisplayModal from './DisplayModal';
import PDFView from 'react-native-view-pdf';
import HTML from 'react-native-render-html';
import PhoneInput from 'react-native-phone-input';

import CountryPicker from 'react-native-country-picker-modal';

const htmlContent = `
    <p style="color: black; margin-left: 0">I agree to the <a href="agreement" style="color: blue">User Agreement</a>
    <br>and <a style="color: blue" href="privacy">Privacy Policy</a></p>
`;
const resources = {
  file: Platform.OS === 'ios' ? 'downloadedDocument.pdf' : '/sdcard/Download/downloadedDocument.pdf',
  url1: 'https://ixinhub.co/license',
  url2: 'https://ixinhub.co/privacy-policy',
  base64: 'JVBERi0xLjMKJcfs...',
};

export default class SignupForm extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onSignupPress: PropTypes.func.isRequired,
    onLoginLinkPress: PropTypes.func.isRequired
  }
  //const [countryModalOpen, setCountryModalOpen] = useState<boolean>(false);

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      mobile: '',
      userName: '',
      password: '',
      passwordAgain: '',
      checked: false,
      display: false,
      resource: resources.url1,
      spinner: false,
      canReload: false,
      dropdown: null,
      pickerData: null,
      cca2: 'US',
      isFocused: false,
      countryModalOpen: false,
      profession: ''
    }
    //this.countryPicker = React.createRef();
  }
   
  componentDidMount() {
    this.setState({pickerData: this.phone.getPickerData()});
  }
  
  setCountryModalOpen = (open) => {
    this.setState({countryModalOpen: open});
  }
  onPressFlag = () => {
    //this.countryPicker.openModal();
    if(__DEV__){
    console.log("onPressFlag this: ", this);
    }
    //this.countryPicker.openModal();
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

  triggerModal() {
    this.setState(prevState => {
      return {
        display: true,
        spinner: true
      }
    });
  }

  onError = (error: Error) => {
    //console.log("onError error: ", error);
    
    if(this.state.resource = resources.url1){
      this.setState({
        resource: resources.url2
      })
    }else{
      this.setState({
        resource: resources.url1
      })
    }
    this.setState({ spinner: false, canReload: true });
  }
 agreeAction = () => {
     //console.log("agreeAction state: ", this.state);
     this.setState({ spinner: false, display: false, checked: true });
   }

  handlePageChanged = (page: number, pageCount: number) => {
    //console.log(`page ${page + 1} out of ${pageCount}`);
  }


  reloadPDF = async () => {
    const pdfRef = this._pdfRef;

    if (!pdfRef) {
      return;
    }

    this.setState({ spinner: true });
    try {
      await pdfRef.reload();
    } catch (err) {
      this.setState({ spinner: false });
      setTimeout(() => {
        Alert.alert('Oops!', err.message);
      })
      /*
      if (this._dropdownRef) {
        this._dropdownRef.alertWithType(
          'error',
          'Document reload failed',
          `error message: ${err.message}`,
        );
      }*/
    }
  }


  onRef = (ref: ?PDFView) => {
    this._pdfRef = ref;
  }


  handleLoadEnd = () => {
      //console.log("handleLoadEnd state: ", this.state);
      this.setState({ spinner: false, canReload: true });
      if (this.dropdown) {
        this.dropdown.alertWithType(
          'success',
          'Document loaded',
          `Loading time: ${((new Date()).getTime() - this._renderStarted)}`,
        );
      }
    }

  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        //this.buttonRef.zoomOut(200),
        //this.formRef.fadeOut(300),
        //this.linkRef.fadeOut(300)
      ])
    }
  }
  onLinkPress = (evt, href, htmlAttribs) => {
    //console.log(`Opened ${href} ! Attributes: ${JSON.stringify(htmlAttribs)}`);
    if(href=="agreement"){
      this.setState({
        resource: resources.url1
      })
      
    }else{
      this.setState({
        resource: resources.url2
      })
      
    }
    //console.log("onLinkPress this.state: ", this.state);
    this.triggerModal();
    this.setState({
      spinner: false
    })
         //alert(`Opened ${href} ! Attributes: ${JSON.stringify(htmlAttribs)}`);
  }
  
  render () {
    //console.log("render state: ", this.state);
    //console.log("render this.state.resource: ", this.state.resource);
    const { password, passwordAgain, mobile, userName,profession, checked, isFocused } = this.state
    const { isLoading, onLoginLinkPress, onSignupPress } = this.props
    //console.log("render onSignupPress: ", onSignupPress);
    const isValid = checked && mobile !== '' && password !== '' && passwordAgain !== ''
    //const formStyle = { marginTop: 40 }
    //console.log("render SignupForm  isValid: ", isValid);
    //const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: 40 }
    const borderColor = isFocused ? 'white' : 'rgba(255,255,255,0.4)';
   
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => this.formRef = ref}>          
          <View style={{borderBottomWidth: 1, marginBottom: 5, borderColor: borderColor}}>
              <PhoneInput style={{marginTop:8, marginBottom: 0,padding:0,height:40, borderBottomWidth: 1}}
                  placeholder='Phone number'
                  textStyle={{color: 'black', fontSize: 17}}
                  selectionColor={'blue'}
                  ref={(ref) => { this.phone = ref; }}
                  onPressFlag={this.onPressFlag}
                  onChangePhoneNumber={(value) => this.setState({ mobile: value })}
                  textProps={{
                    placeholder: "mobile" , 
                    placeholderTextColor: 'rgba(255,255,255,0.4)',
                    onSubmitEditing : () => { console.log("ON SUBMIT EDITING"); }, 
                    onFocus: ()=> {
                     // console.log("phoneINput onFocus...")
                      this.setState({ isFocused: true }) }
                      
                  }
                  }
              />
          </View>
          {<CountryPicker
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
          </CountryPicker>}
          <CustomTextInput
                ref={(ref) => this.userNameRef = ref}
                placeholder={'User name'}
                editable={!isLoading}
                returnKeyType={'next'}
                secureTextEntry={false}
                withRef={true}
                onSubmitEditing={() => {
                    //console.log("onSubmitEditing password")
                    this.setState({ isFocused: false });
                    this.passwordRef.focus()
                  }
                }
                onChangeText={(value) => this.setState({ userName: value })}
                isEnabled={!isLoading}
                onFocus={()=> {
                  //console.log("passwordInputRef onFocus")
                  this.setState({ isFocused: false }) 
                  this.passwordInputRef.setState({ isFocused: true })}
                }
          />
          <CustomTextInput
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'next'}
            secureTextEntry={true}
            withRef={true}
            onSubmitEditing={() => {
                //console.log("onSubmitEditing password")
                this.setState({ isFocused: false });
                this.passwordAgainInputRef.focus()
              }
            }
            onChangeText={(value) => this.setState({ password: value })}
            isEnabled={!isLoading}
            onFocus={()=> {
              //console.log("passwordInputRef onFocus")
              this.setState({ isFocused: false }) 
              this.passwordInputRef.setState({ isFocused: true })}
            }
          />
          <CustomTextInput
            ref={(ref) => this.passwordAgainInputRef = ref}
            placeholder={'Password again'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
            onChangeText={(value) => this.setState({ passwordAgain: value })}
            isEnabled={!isLoading}
          />
{/*           <CustomTextInput
            ref={(ref) => this.professionInputRef = ref}
            placeholder={'Profession'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={false}
            withRef={true}
            onChangeText={(value) => this.setState({ profession: value })}
            isEnabled={!isLoading}
          /> */}
        </View>
        <View style={styles.footer}>
          <View style={{flexDirection: 'row', height: 70, marginTop: 0}}>
                {/*<CheckBox
                  size={20}
                  containerStyle={{marginLeft: 0, marginRight: 5, paddingLeft: 0,paddingRight:0, backgroundColor: 'white', width: 30, borderColor: 'white'}}
                  title=''
                  checked={this.state.checked}
                  checkedColor='pink'
                  uncheckedColor='red'
                  textStyle={{color: 'black'}}
                  onPress={() => this.setState({checked: !this.state.checked})}
                />
                <HTML html={htmlContent} onLinkPress={this.onLinkPress}/>*/}
            </View>
          <View ref={(ref) => this.buttonRef = ref}>
            {/*<TouchableOpacity
                    style={styles.createAccountButton}
                    onPress={() => {
                      //console.log("calling onSignupPress ...")
                      onSignupPress(mobile, email, password, passwordAgain, checked)
                      
                    }}
                  >
                  <Text style={styles.createAccountButtonText}>Sign Up</Text>
                  </TouchableOpacity>*/}
            {<CustomButton
              onPress={() => {
                //console.log("calling onSignupPress ...")
                onSignupPress(mobile, userName, password, passwordAgain,profession, checked)
                
              }}
              isEnabled={true}
              isLoading={isLoading}
              buttonStyle={styles.createAccountButton}
              textStyle={styles.createAccountButtonText}
              text={"Sign Up"}
            />}
          </View>
          <View style={{flex:0, flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
              <Text
                ref={(ref) => this.linkRef = ref}
                style={styles.loginLink}
                onPress={onLoginLinkPress}
              >
                {'Already signed up:'}
              </Text>
              <Text 
                style={[styles.loginLink,{color:'green'}]}
                onPress={onLoginLinkPress}
              >
                {'sign in'}
              </Text>
          </View>
        </View>
        {/*<DisplayModal
            resource={this.state.resource}
            onLoad={this.handleLoadEnd}
            onError={this.onError}
            onRef={this.onRef}
            onPageChanged={this.handlePageChanged}
            display = { this.state.display }
            spinner = {this.state.spinner}
            agreeAction = {this.agreeAction}
        />*/}
         
      </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
    paddingBottom: 65
  },
  form: {
    marginTop: 5
  },
  footer: {
    height: 150,
    justifyContent: 'center'
  },
  bottom: {
    backgroundColor: '#1976D2'
  },
  createAccountButton: {
    backgroundColor: 'green',
    borderRadius: 8,
    margin: 0
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22
  },
  loginLink: {
    color: 'rgba(0,0,0,0.6)',
    alignSelf: 'center',
    padding: 20
  },
  spinnerTextStyle: { color: 'black' },
  underline: {textDecorationLine: 'underline'}
})


/*

          <View style={{flexDirection: 'row', height: 65}}>
              <CheckBox
                size={30}
                containerStyle={{marginLeft: 0, marginRight: 0, paddingLeft: 0,paddingRight:0, backgroundColor: '#1976D2', width: 48, borderColor: '#1976D2'}}
                title=''
                checked={this.state.checked}
                checkedColor='pink'
                uncheckedColor='red'
                textStyle={{color: 'white'}}
                onPress={() => this.setState({checked: !this.state.checked})}
              />
              <HTML html={htmlContent} onLinkPress={this.onLinkPress}/>
          </View>

          <CustomTextInput
            ref={(ref) => this.mobileInputRef = ref}
            placeholder={'Mobile'}
            keyboardType={'phone-pad'}
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