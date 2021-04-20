import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Alert, Image, View, TouchableOpacity  } from 'react-native'
//import { Image, View } from 'react-native-animatable'
import { CustomButton, CustomTextInput } from 'react-widgets'
import metrics from '../../../config/metrics'
import imgLogo from '../../../assets/ixin.png' 
import { Api as ApiService } from '@common/services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

export class VerifyPin extends React.Component {
  //static propTypes = {
   // onLoginPress: PropTypes.func.isRequired,
   // onSignupLinkPress: PropTypes.func.isRequired
  //} 

  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: '#6CB553', 
    },
    headerTintColor: 'black',
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
    title: "Verify Pin",
    headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
   
  })
  
  constructor(props) {
    super(props);
    //console.log("VerifyPin constructor props: ", props);
    //console.log("VerifyPin constructor navigation: ", this.props.navigation);
    this.state = {
      mobile: this.props.navigation.state.params?this.props.navigation.state.params.mobile:'18888888888',
      pin: '',
      isLoading: false,
      display: false,
     // mnemonic: this.props.navigation.state.params?this.props.navigation.state.params.mnemonic:'word letter money short long tan, ken, mind, do feed quick you',
    }
    //console.log("VerifyPin constructor this.state: ", this.state);
  }

  onVerifyPress = async () => {
    //console.log("onVerifyPress this.state: ", this.state);
    if(this.state.pin !=''){
      const resultdata = await ApiService.verifySMSCode(this.state.mobile, this.state.pin);
      if(__DEV__)
      console.log("onVerifyPress resultdata: ", resultdata);
      if(resultdata && resultdata.status==200){
        const body = resultdata.data;
        if (body.status === 'error') {
            Alert.alert(body.message)
            return
        }else{
          //show mnemonics --> now moved to login process
        //this.props.navigation.navigate('RecoveryOnSignup', { mobile: this.state.mobile, mnemonics: this.state.mnemonic});
        this.props.navigation.navigate('Login', { mobile: this.state.mobile, visibleForm: 'LOGIN' });
         
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
      Alert.alert("Please input PIN.")
    }
  }
  componentDidMount () { 
    Alert.alert(
      'success',
      'A PIN has been sent, please use it to activate your account',
      [
        {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }
 
  render () {
    const { mobile, pin, isLoading } = this.state
    //const { isLoading, onLoginPress } = this.props
    const isValid = mobile !== '' && pin !== ''
    //console.log("Verify render mobile, pin, isLoading: ", mobile, pin, isLoading)
    return (
      <KeyboardAwareScrollView
              style={{ backgroundColor: '#4c69a5', paddingBottom: 0 }}
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={styles.container}
              scrollEnabled={true}
              extraHeight={210}
            >
        <View style={styles.container}>
          <Image
            ref={(ref) => this.logoImgRef = ref}
            style={styles.logoImg}
            source={imgLogo}
          />
          <View style={{backgroundColor: 'white'}}>
          <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
            <CustomTextInput
              name={'mobile'}
              ref={(ref) => this.emailInputRef = ref}
              placeholder={mobile}
              keyboardType={'numeric'}
              editable={false}
              returnKeyType={'next'}
              blurOnSubmit={false}
              withRef={true}
              onSubmitEditing={() => this.pinInputRef.focus()}
              onChangeText={(value) => this.setState({ mobile: value })}
              isEnabled={!isLoading}
            />
            <CustomTextInput
              name={'pin'}
              ref={(ref) => this.pinInputRef = ref}
              placeholder={'Pin'}
              editable={!isLoading}
              returnKeyType={'done'}
              secureTextEntry={true}
              withRef={true}
              onChangeText={(value) => this.setState({ pin: value })}
              isEnabled={!isLoading}
            />
          </View>

          <View style={styles.footer}>
            <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
              <CustomButton
                onPress={() => this.onVerifyPress(mobile, pin)}
                isEnabled={isValid}
                isLoading={isLoading}
                buttonStyle={styles.loginButton}
                textStyle={styles.loginButtonText}
                text={'Activate'}
              />
            </View>
            </View>
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
    marginVertical: 30
  },
  bottom: {
    backgroundColor: 'white'
  },
  form: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  loginButton: {
    backgroundColor: '#1E90FF'
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
