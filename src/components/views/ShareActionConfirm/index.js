import React from 'react';
import { StyleSheet, View,TextInput, Image,Dimensions, TouchableOpacity, Text} from 'react-native';
import { colors, measures } from 'eslint-config-populist'; 
import Checkbox from 'react-native-modest-checkbox';
import { Api as ApiService } from '@common/services';
import { CustomButton } from 'react-widgets' 
import metrics from '../../../config/metrics'
import PhoneInput from 'react-native-phone-input';
import CountryPicker from 'react-native-country-picker-modal'; 
import Spinner from 'react-native-loading-spinner-overlay';
import { mobileAppName } from '../../../common/constants/Data';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export class ShareActionConfirm extends React.Component {
     
      static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
          backgroundColor: '#6CB553', 
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
        title: "Share To",
        headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
       
      });

    constructor(props) {
      super(props);
      //console.log("WalletsOverview constructor this.props: ", this.props); 
      let category="", fields = "", user=null;
      if(this.props.navigation.state.params && this.props.navigation.state.params.user){
        user = this.props.navigation.state.params.user;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.category){
        category = this.props.navigation.state.params.category;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.fields){
        fields = this.props.navigation.state.params.fields;
      }
      if(__DEV__)
      console.log("ShareActionConfirm user: ", user);
      this.state = { 
            loading: false, 
            mobileTo: '', //share to
            user: user,
            category: category,
            fields: fields,
            bloodPressure: '',
            cholesterol: '',
            temperature: '',
            isFocused: false,
            cca2: '', 
            pickerData: null,
            from: '',
            to: '',
            recordCount: 0,
            bloodPressureChecked: false,
            cholesterolChecked: false,
            temperatureChecked: false,
            countryModalOpen: false,
            message: '',
            error: '',
            viewer: '',
            profession: user?user.local.profession:'doctor',
      }; 
    }

    async componentDidMount() {
        this.props.navigation.setParams({ title: "Share To" });
        let profession = 'doctor';
        const { user } = this.state;
        if(user && user.local.profession){
          profession = user.local.profession;
        }
        this.setState({pickerData: this.phone.getPickerData(), profession});
    }
    setCountryModalOpen = (open) => {
        this.setState({countryModalOpen: open});
      }
      onPressFlag = () => {
        this.setCountryModalOpen(!this.state.countryModalOpen);
      }
    
      selectCountry = (country) => {
        if(__DEV__)
        console.log("selectCountry country: ", country);
        this.setCountryModalOpen(false);
        this.phone.selectCountry(country.cca2.toLowerCase());
        this.setState({ cca2: country.cca2 });
      } 
    checkCholesterol = (cbox) =>{
      if(__DEV__)
        console.log("checkCholesterol cbox: ", cbox);
        this.setState({cholesterolChecked: cbox.checked});
    }    
   
    onSelect = item => {
        //console.log('Referral onSelect item: ', item);
        let theItem = item.item;
        //console.log('Referral onSelect theItem: ', theItem);
        let mobile = theItem.mobilePhone;
        if(!mobile){
          mobile = theItem.iphone;
        }
        //console.log('Referral onSelect mobile: ', mobile);
        let addPlus = false; let addPlusOne = false;
        if(mobile && mobile.trim().startsWith("1(")){
           addPlus = true;
        }
        if(mobile && mobile.trim().startsWith("(")){
          addPlusOne = true;
        }
       // if(mobile)
        //  mobile = mobile.replace(/[^\d]/g, '');
        //console.log('Referral onSelect mobile: ', mobile);
        //this.phone.inputPhone.clear();
        if(addPlus) {
          mobile = "+"+mobile;
        }
        if(addPlusOne) {
          mobile = "+1"+mobile;
        }
        if(mobile){
          if(mobile.replace(/[^0-9]/g,"").length == 10){
            mobile = "1"+mobile;
          }
          this.setState({ mobileTo: mobile });
          this.phone.inputPhone.props.value=mobile;
          this.phone.state.formattedNumber=mobile;
          this.phone.selectCountry('us');
          this.setState({ cca2:'US' });
        }else {
          this.phone.inputPhone.props.value="+1";
          this.phone.state.formattedNumber="+1";
          this.phone.selectCountry('us');
          this.setState({ cca2:'US' });
        }
      };
    contactClicked = () =>{
        this.props.navigation.navigate('MobileContacts', { onSelect: this.onSelect });
    }
    confirmRequestShare = async () =>{
        const { fields, mobileTo, user, viewer } = this.state;
        try{
          if(__DEV__)
          console.log(" confirmRequestShare fields, mobileTo, user: ", fields, mobileTo, user); 
            if(user && user.local && user.local.mobile.length>0){
                let mobile = user.local.mobile;
                this.setState({ message: "", error: "" });
                
                if(fields.length>0 && mobileTo.length>0){
                    const {user} = this.state;
                    let sentTo = mobileTo;
                    if(sentTo.startsWith("+")){
                      sentTo = sentTo.substring(1);
                    }
                    //request me to share  to others
                    //requestshareTo others
                    let data = { 
                            "data_type": 1,
                            "device_id":mobileAppName,
                            "owner":mobile,
                            "viewer": mobileTo,
                            "fields": fields
                        
                    }

                    this.setState({ loading: true });
                    const resultdata = await ApiService.requestshare(data);
                    if(__DEV__)
                    console.log(" confirmRequestShare resultdata: ", resultdata); 
                    if(resultdata && !resultdata.error){ 
                        if(resultdata.status==200){
                            this.setState({message: "Share Request has been sent successfully."});
                        }else{
                            let status = resultdata.status;
                            if(status) {
                                this.setState({error: "Error occurred, status "+status});
                            }else 
                                this.setState({error: "Error occurred."});
                        }
                    }else{
                        let error = resultdata.error;
                        if(error && error.response && error.response.data && error.response.data.message){
                          this.setState({error: error.response.data.message + " for App "+mobileAppName});
                        }else if(error && error.message)
                          this.setState({error: error.message});
                        else this.setState({error: "Error occurred."});
                    }
                }else{
                    this.setState({error: "No fields or receipient is selected to share."});
                }
              }else{
                this.setState({error: "User is not defined."});
            }
        }catch(error){
            console.log("Share request error: ", error);
        }
        this.setState({ loading: false }); 
    }

    shareBackHome= () =>{
      this.props.navigation.pop(3);
    }
    render() {
          //console.log('WalletsOverview render this.props: ', this.props);
          //console.log('WalletsOverview render this.props.navigation.state.params: ', this.props.navigation.state.params);
          if(__DEV__)
          console.log('UploadAction render: ');
          const { mobile, isLoading, isFocused } = this.state
          const borderColor = isFocused ? 'white' : 'rgba(255,255,255,0.4)';
          let hasMsg = false;
          if(this.state.message && this.state.message.length>0){
              hasMsg = true;
          }
          let hasError = false;
          if(this.state.error && this.state.error.length>0){
            hasError = true;
          }
          return ( 
                <View style={styles.container1}> 
                    <View style={{height: 5}}>
                    </View>  
                    <View style={{flex: 0, flexDirection:'row'}}>
                            <Text>Share to: </Text>
                    </View>
                    <View style={{ flex: 0,flexDirection: 'row', height: 50, paddingRight: 0, marginTop: 10}}>
                       
                        <View style={{marginTop: 0,marginBottom: 0, borderWidth: 0, borderColor: 'red',flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={[styles.form,{width: metrics.DEVICE_WIDTH}]} ref={(ref) => { this.formRef = ref }}>
                                        <View style={{borderBottomWidth: 1, marginBottom: 5, borderBottomColor: 'gray', marginLeft:5}}>
                                                <PhoneInput style={{flex: 1, marginTop:0, marginBottom: 0, borderWidth: 0, borderColor: 'red',
                                                        width: metrics.DEVICE_WIDTH * 0.8,  height: 40, backgroundColor: 'white'}}
                                                    textStyle={{color: 'black', fontSize: 17}}
                                                    ref={(ref) => { this.phone = ref; }}
                                                    onPressFlag={this.onPressFlag}
                                                    onChangePhoneNumber={(value) => this.setState({ mobileTo: value })}
                                                    textProps={{
                                                        placeholder: "mobile" , 
                                                        placeholderTextColor: 'rgba(255,255,255,0.4)',
                                                        onFocus: () => {
                                                        // console.log("phoneINput onFocus...")
                                                        this.setState({ isFocused: true }) }
                                                        
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
                                            onClose={() => this.setCountryModalOpen(false)}
                                            >
                                            <View />
                                        </CountryPicker>
                                        <View style={{flex: 1, flexDirection: 'row',borderWidth: 0, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                                                <CustomButton
                                                    onPress={this.contactClicked}
                                                    isEnabled={true}
                                                    isLoading={false}
                                                    buttonStyle={{backgroundColor: 'green', borderWidth: 0, borderColor: 'red', width: 40, height: 40, marginTop: 2, marginLeft: 6}}
                                                    textStyle={{color: 'white', fontWeight: 'bold'}}
                                                    text={'...'}
                                                />
                                        </View>
                                </View>
                                
                            </View>
                    </View> 
                    {/*<View style={{flex: 0, flexDirection:'row', marginBottom: 5, marginTop: 10}}>
                        <Text>Viewer: </Text>
                    </View>
                    <View style={{flex: 0, flexDirection:'row'}}>
                        <TextInput 
                            placeholder={'mobile'}
                            editable={true}
                            returnKeyType={'done'}
                            secureTextEntry={false}
                            withRef={true}
                            value={this.state.viewer}
                            onChangeText={(value) => {
                                this.setState({ viewer: value}); 
                            }
                            }
                            isEnabled={true}
                            onFocus={()=> {
                                //console.log("businessNameRef onFocus")
                                this.setState({ isFocused: false }); 
                                
                            }}
                            style={{flex: 1,backgroundColor: 'white',fontSize: 16, paddingVertical: 0,
                                textAlignVertical: 'center', paddingBottom:0, borderWidth:1,
                                marginLeft: 5,marginTop: 0,marginRight:5,paddingLeft: 5,
                                borderRadius: 4,color: 'black', height: 40 }}
                        />
                        </View>*/}
                    <View style={{flex:0, flexDirection:'row', margin: 20}}>
                                
                                <Checkbox
                                    label='Latest'
                                    checked={this.state.cholesterolChecked}
                                    onChange={(checked) => this.checkCholesterol(checked)}
                                />
                            </View>
                    <View style={{flex: 0, flexDirection:'row'}}>
                        <Text>Date range: </Text>
                    </View>
                    <View style={{ flex: 0,flexDirection: 'row', height: 50, paddingRight: 0, marginTop: 10}}>
                       
                        <View style={{flex: 0.8, flexDirection:'row'}}>
                        <TextInput 
                            placeholder={'from'}
                            editable={true}
                            returnKeyType={'done'}
                            secureTextEntry={false}
                            withRef={true}
                            value={this.state.from}
                            onChangeText={(value) => {
                                this.setState({ mobile: value}); 
                            }
                            }
                            isEnabled={true}
                            onFocus={()=> {
                                //console.log("businessNameRef onFocus")
                                this.setState({ isFocused: false }); 
                                
                            }}
                            style={{flex: 1,backgroundColor: 'white',fontSize: 16, paddingVertical: 0,
                                textAlignVertical: 'center', paddingBottom:0, borderWidth:1,
                                marginLeft: 5,marginTop: 0,marginRight:5,paddingLeft: 5,
                                borderRadius: 4,color: 'black', height: 40 }}
                        />
                        <TextInput 
                            placeholder={'to'}
                            editable={true}
                            returnKeyType={'done'}
                            secureTextEntry={false}
                            withRef={true}
                            value={this.state.to}
                            onChangeText={(value) => {
                                this.setState({ mobile: value}); 
                            }
                            }
                            isEnabled={true}
                            onFocus={()=> {
                                //console.log("businessNameRef onFocus")
                                this.setState({ isFocused: false }); 
                                
                            }}
                            style={{flex: 1,backgroundColor: 'white',fontSize: 16, paddingVertical: 0,
                                textAlignVertical: 'center', paddingBottom:0, borderWidth:1,
                                marginLeft: 5,marginTop: 0,marginRight:5,paddingLeft: 5,
                                borderRadius: 4,color: 'black', height: 40 }}
                        />
                        </View>
                    </View> 
                    <View style={{flex: 0, flexDirection:'row'}}>
                            <Text>Most recent: </Text>
                    </View>
                    <View style={{ flex: 0,flexDirection: 'row', height: 50, paddingRight: 0, marginTop: 10}}>
                         
                        <TextInput 
                            placeholder={''}
                            editable={true}
                            returnKeyType={'done'}
                            secureTextEntry={false}
                            withRef={true}
                            value={String(this.state.recordCount)}
                            onChangeText={(value) => {
                                this.setState({ recordCount: ""+value}); 
                            }
                            }
                            isEnabled={true}
                            onFocus={()=> {
                                //console.log("businessNameRef onFocus")
                                this.setState({ isFocused: false }); 
                                
                            }}
                            style={{flex: 0, width: 50, backgroundColor: 'white',fontSize: 16, paddingVertical: 0,
                                textAlignVertical: 'center', paddingBottom:0, borderWidth:1,
                                marginLeft: 5,marginTop: 0,marginRight:5,paddingLeft: 5,
                                borderRadius: 4,color: 'black', height: 35 }}
                        />
                        <View style={{flex: 0.6, flexDirection:'row'}}>
                            <Text> count of records </Text>
                        </View>
                    </View> 
                    {hasMsg && <View style={{flex:0, height: 50, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'green', fontSize: 17}}>{this.state.message}</Text>
                    </View>}
                    {hasError && <View style={{flex:0, height: 50, justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color: 'red', fontSize: 17}}>{this.state.error}</Text>
                    </View>}
                    <Spinner
                        visible={this.state.loading}
                        textContent="Loading..."
                        textStyle={styles.spinnerTextStyle}
                      />
                   <View style={{flex:0, flexDirection: 'row', marginTop: 50, justifyContent: 'center', alignItems: 'center'}}>
                    
                    <CustomButton
                        onPress={this.confirmRequestShare}
                        buttonStyle={styles.createAccountButton}
                        textStyle={styles.createAccountButtonText}
                        text={'Submit'}
                    />
                </View>
                    {/*<View style={{flex:0, flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignItems: 'center'}}>
                    
                        <CustomButton
                            onPress={this.shareBackHome}
                            buttonStyle={styles.createAccountButton}
                            textStyle={styles.createAccountButtonText}
                            text={'Back to Home'}
                        />
                    </View>*/}
                    
                </View> 
          );
      }
  }
  
  const styles = StyleSheet.create({
      container1: {
          flex: 1,
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
    form: {
        flex:1, 
        flexDirection: 'row',
        marginTop: 0,
        borderWidth: 0,
        borderColor: 'black',
       // paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
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
        width: 180, 
        borderRadius: 10,
        marginBottom: 20
      },
      createAccountButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
      
      }
});
  