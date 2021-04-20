import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Alert, Image,TouchableOpacity, View } from 'react-native'
//import { Image, View } from 'react-native-animatable'
import { CustomButton, CustomTextInput } from 'react-widgets'
import metrics from '../../../config/metrics'
import imgLogo from '../../../assets/ixin.png' 
import { Api as ApiService } from '@common/services'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8

export class VerifyPinResetPWD extends React.Component {
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
    //console.log("VerifyPinResetPWD constructor props: ", props);
    //console.log("VerifyPinResetPWD constructor navigation: ", this.props.navigation);
    this.state = {
      mobile: this.props.navigation.state.params?this.props.navigation.state.params.mobile:'',
     // token: this.props.navigation.state.params?this.props.navigation.state.params.token:'',
      pin: '',
      isLoading: false
    }
    //console.log("VerifyPinResetPWD constructor this.state: ", this.state);
  }

  verifyPinPress = async (mobile, pin) => {
    //console.log("verifyPinPress  mobile, pin, token: ", mobile, pin);
    if(this.state.pin !=''){
      const resultdata = await ApiService.verifySMSCode(mobile, pin);
      console.log("verifyPinPress resultdata: ", resultdata);
      if(resultdata && resultdata.status==200){
        const body = resultdata.data;
        //console.log("verifyPinPress body: ", body);
        if (body.status === 'error') {
            Alert.alert(body.message)
            return
        }else{
          this.props.navigation.navigate('PasswordReset', { mobile });
          
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
  }
  render () {
    const { mobile, pin, token, isLoading } = this.state
    //const { isLoading, onLoginPress } = this.props
    const isValid = mobile !== '' && pin !== ''
    //console.log("Verify render mobile, pin, token: ", mobile, pin, token)
    return (
        <KeyboardAwareScrollView
              style={{ backgroundColor: '#4c69a5', paddingBottom: 0 }}
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={styles.container}
              scrollEnabled={true}
              extraHeight={150}
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
                            name={'pin'}
                            ref={(ref) => this.pinInputRef = ref}
                            keyboardType='numeric'
                            placeholder={'PIN here'}
                            editable={!isLoading}
                            returnKeyType={'done'}
                            secureTextEntry={false}
                            withRef={true}
                            onChangeText={(value) => this.setState({ pin: value })}
                            isEnabled={!isLoading}
                        />
                    </View>

                    <View style={styles.footer}>
                        <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
                            <CustomButton
                            onPress={() => this.verifyPinPress(mobile, pin, token)}
                            isEnabled={true}
                            isLoading={isLoading}
                            buttonStyle={styles.loginButton}
                            textStyle={styles.loginButtonText}
                            text={'Verify PIN'}
                            />
                        </View>
                    </View>
                    <View style={{height: 200}}></View>
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
    height: 50,
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
