import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { KeyboardAvoidingView,Image,Text, View, LayoutAnimation, Platform, StyleSheet,Dimensions, UIManager } from 'react-native'
 
import imgLogo from '../../../assets/ttdata.png'
import metrics from '../../../config/metrics'
import Opening from './Opening'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8
const screenHeight = Dimensions.get('window');

if (Platform.OS === 'android') UIManager.setLayoutAnimationEnabledExperimental(true)

/**
 * The authentication screen.
 * It shows three different sub-screens:
 * - The opening screen, with the two buttons that redirect to the login/signup forms (if this.state.visibleForm === null)
 * - The signup form (if this.state.visibleForm === 'SIGNUP')
 * - The login form (if this.state.visibleForm === 'LOGIN')
 *
 * The app state (isLoggedIn, isLoading) and the login/signup functions are received as props from src.app.js
 *
 * The animations are delegated to:
 * - react-native-animatable: for the simpler animations of the components (in e.g. bounceIn animation of the logo)
 * - react-native's LayoutAnimation: for the form show/hide animation
 * - react-native's KeyboardAvoidingView: for applying a bottom padding when a keyboard show-up is detected
 *
 * An example of this screen animation flow is the following:
 * - The user opens the app.
 * - The logo shows up using the bounceIn animation of react-native-animatable, while the "Opening" subscreen animates the button
 *   using the fadeIn animation of react-native-animatable.
 * - The user taps on the "Create account" button.
 * - _setVisibleForm gets called with the 'SIGNUP' parameter. It configures the next animation and sets this.state.visibleForm to 'SIGNUP'.
 *   The state change triggers a render and the change of formStyle gets animated (thanks to the animation configuration previously
 *   applied by _setVisibleForm).
 * - Just after the signup form has become visible it animates the form button using the bounceIn animation of react-native-animatable.
 * - The user fills up its info and signup succesfully.
 * - componentWillUpdate checks the isLoggedIn props and after realizing that the user has just authenticated it calls _hideAuthScreen.
 *   _hideAuthScreen then 1. calls the SignupForm.hideForm(), that hides the form buttons (zoomOut) and the form itself (fadeOut),
 *   2. fadeOut the logo, 3. tells the container that the login animation has completed and that the app is ready to show the next screen (HomeScreen).
 */
export default class AuthScreen extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    signup: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    onLoginAnimationCompleted: PropTypes.func.isRequired // Called at the end of a succesfull login/signup animation
  }

  state = {
    visibleForm: null, // Can be: null | SIGNUP | LOGIN
    mobile: ''
  }
  async componentDidMount(){
    console.log("AuthScreen componentDidMount this.state.visibleForm: ", this.state.visibleForm);
    await this._setVisibleForm(this.state.visibleForm);
  }
  componentDidUpdate (nextProps) {
    // If the user has logged/signed up succesfully start the hide animation
    if (!this.props.isLoggedIn && nextProps.isLoggedIn) {
      this._hideAuthScreen()
    }
  }

  _hideAuthScreen = async () => {
    // 1. Slide out the form container
    await this._setVisibleForm(null)
    // 2. Fade out the logo
   // await this.logoImgRef.fadeOut(800)
    // 3. Tell the container (app.js) that the animation has completed
    this.props.onLoginAnimationCompleted()
  }

  _setVisibleForm = async (visibleForm) => {
    // 1. Hide the current form (if any)
    console.log('AuthScreen _setVisibleForm visibleForm: ', visibleForm);
    if (this.state.visibleForm && this.formRef && this.formRef.hideForm) {
      await this.formRef.hideForm()
    }
    // 2. Configure a spring animation for the next step
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    // 3. Set the new visible form
    this.setState({ visibleForm })
  }
  setLoginFormPlaceHolder = async (mobile) => {
    //console.log("AuthScreen setLoginFormPlaceHolder mobile: ", mobile);
    ////console.log("AuthScreen setLoginFormPlaceHolder this.formRef.setLoginUsername: ", this.formRef.setLoginUsername);
    this.setState({mobile});
    if(this.formRef && this.formRef.setLoginUsername){
      this.formRef.setLoginUsername(mobile);
    }
  }
  render () {
    const { isLoggedIn, isLoading, signup, login, resetpwd, clearError} = this.props
    const { visibleForm, mobile} = this.state
    console.log("AuthScreen render visibleForm, isLoggedIn: ", visibleForm, isLoggedIn);
   // console.log("AuthScreen render mobile: ", mobile);
   // console.log("AuthScreen render signup: ", signup);
   // console.log("AuthScreen render resetpwd: ", resetpwd);
    // The following style is responsible of the "bounce-up from bottom" animation of the form
    var top = 30;
    if(visibleForm === 'SIGNUP')
      top = 0
    const formStyle = (!visibleForm) ? { height: 0 } : { marginTop: top }
    return (
      <View style={styles.container}>
        {(visibleForm == null) && <View style={{flex: 2, flexDirection:'column', top:20, justifyContent:'space-evenly', alignItems:'center'}}>
            <Image  
                style={{width: 128, height: 128, alignItems: 'center'}}
                source={imgLogo}
            />
            <Text style={{fontSize: 50}}>ttHealth</Text>
        </View>}
        {(!visibleForm && !isLoggedIn) && (
          <Opening
            onCreateAccountPress={() => this._setVisibleForm('SIGNUP')}
            onSignInPress={() => this._setVisibleForm('LOGIN')}
          />
        )}
        
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          behavior={'padding'}
          style={[formStyle, styles.bottom]}
          enabled
        >
          {(visibleForm === 'SIGNUP') && (
            <SignupForm
              ref={(ref) => this.formRef = ref}
              onLoginLinkPress={() => this._setVisibleForm('LOGIN')}
              onSignupPress={signup}
              isLoading={isLoading}
            />
          )}
          {(visibleForm === 'LOGIN') && (
            <LoginForm
              ref={(ref) => this.formRef = ref}
              onSignupLinkPress={() => this._setVisibleForm('SIGNUP')}
              onForgotPwdPress={resetpwd}
              onLoginPress={login}
              clearError={clearError}
              mobile={mobile}
              isLoading={isLoading}
            />
          )}
        </KeyboardAvoidingView>
       
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT-80,
    //height: screenHeight - 320,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: 'white'
  },
  logoImg: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 0
  },
  bottom: {
    backgroundColor: 'white', //1976D2
    paddingBottom: 150,
    borderWidth: 2,
    borderColor: 'white'
  }
})
