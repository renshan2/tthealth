import React from 'react';
import { StyleSheet, View,TextInput, Image,Dimensions,TouchableOpacity, Text, Alert} from 'react-native';
import { colors, measures } from '@common/styles'; 
import Checkbox from 'react-native-modest-checkbox';
import { Api as ApiService } from '@common/services';
import { CustomButton } from '@components/widgets'
import { mobileAppName, mobileAppKey } from '../../../common/constants/Data';

import Spinner from 'react-native-loading-spinner-overlay';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export class UploadAction extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
            backgroundColor: '#6CB553', 
          },
          headerTintColor: 'black',
          headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white'
            },
        title: "Add Record",
        headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
       
      })
    constructor(props) {
      super(props);
      //console.log("WalletsOverview constructor this.props: ", this.props); 
      let username = '', category="", user=null;
      if(this.props.navigation.state.params && this.props.navigation.state.params.username){
        username = this.props.navigation.state.params.username;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.category){
        category = this.props.navigation.state.params.category;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.user){
        user = this.props.navigation.state.params.user;
      }
      this.state = {  
            loading: false,
            mobile: '17037253746', 
            user: user,
            username: username,
            category: category,
            bloodPressureHigh: '',
            bloodPressureLow: '',
            cholesterol: '',
            temperature: '',
            heartRate: '',
            bloodPressureChecked: false,
            cholesterolChecked: false,
            temperatureChecked: false,
            heartRateChecked: false,
            message: '',
            error: ''
      }; 
    }
    checkBloodPressure = (cbox) =>{
        if(__DEV__)
        console.log("checkBloodPressure cbox: ", cbox);
        this.setState({bloodPressureChecked: cbox.checked});
    }
    checkCholesterol = (cbox) =>{
        if(__DEV__)
        console.log("checkCholesterol cbox: ", cbox);
        this.setState({cholesterolChecked: cbox.checked});
    }
    checkHeartRate = (cbox) =>{
        if(__DEV__)
        console.log("checkCholesterol cbox: ", cbox);
        this.setState({heartRateChecked: cbox.checked});
    }
    checkTemperature = (cbox) =>{
        if(__DEV__)
        console.log("checkTemperature cbox: ", cbox);
        this.setState({temperatureChecked: cbox.checked});
    }
    onChangeCholesterol = (value) =>{
        if(__DEV__)
        console.log("onChangeCholesterol value: ", value);
        this.setState({cholesterol: value});
    }
    onChangeHeartRate = (value) =>{
        if(__DEV__)
        console.log("onChangeHeartRate value: ", value);
        this.setState({heartRate: value});
    }
    onChangeBloodPressureHigh = (value) =>{
        if(__DEV__)
        console.log("onChangeBloodPressure value: ", value);
        this.setState({bloodPressureHigh: value});
    }
    onChangeBloodPressureLow = (value) =>{
        if(__DEV__)
        console.log("onChangeBloodPressure value: ", value);
        this.setState({bloodPressureLow: value});
    }
    onChangeTemperature = (value) =>{
        if(__DEV__)
        console.log("onChangeTemperature value: ", value);
        this.setState({temperature: value});
    }
    async componentDidMount() {
        this.props.navigation.setParams({ title: "Upload" });
    }
    callUpload= async () => {
        //console.log('onPressContinue this.state: ', this.state);
        let {mobile, user } = this.state;
        //console.log("SendTokens onPressContinue amount, tokenName, toAddress, mobile: ", amount, tokenName, toAddress, mobile);
        this.setState({message: "", error: ""});
        if(!mobile) {
            mobile = user.local.mobile;
        }
        if (!mobile) {
            Alert.alert(
                'Warning:',
                'No user specified!',
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              ) 
        }else {
            //let uniqueId = DeviceInfo.getUniqueId();
            let cholHigh = 0;
            let cholLow = 0;
            let glucose = 0;
            let heartRate = 0;
            let temperature = 0;
            let phigh = 0;
            let plow = 0;
            //this.state.cholesterol
            if(this.state.cholesterolChecked) {
                glucose = this.state.cholesterol;
                //chols = chols.split("/");
                //cholHigh = chols[0];
                //cholLow = chols[1];
            }
            if(this.state.heartRateChecked) {
                heartRate = this.state.heartRate; 
            }
            if(this.state.temperatureChecked) {
                temperature = this.state.temperature; 
            }
            if(this.state.bloodPressureChecked){
                let bloodPressureHigh = this.state.bloodPressureHigh; 
                phigh = bloodPressureHigh;
                let bloodPressureLow = this.state.bloodPressureLow; 
                plow = bloodPressureLow; 
            }
            if (cholHigh==0&&cholLow==0&&phigh==0&&plow==0) {
                Alert.alert(
                    'Warning:',
                    'No data to add!',
                    [
                      {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                  )
            }else {
                /*
                let data = {
                        "data_type": 1,
                        "device_id": mobile,
                        "device_data": {
                            "issuer": mobile,
                            "owner": mobile,
                            "med_data": {
                                "weight": 200,
                                "height": 100,
                                "gender": "female",
                                "blood_pressure": {
                                    "high": phigh,
                                    "low": plow
                                },
                                "cholesterol": {
                                    "HDL": cholHigh,
                                    "LDL": cholLow
                                }
                            }
                        }
                } */
                let data = {
                    "data_type": 1, 
                    "device_id": mobileAppName, 
                    "key": "datetime",
                    "required_field": "datetime",
                    "device_data": [
                        {
                            "datetime": new Date().toUTCString(),
                            "issuer": mobile,
                            "owner": mobile,
                            "med_data": {
                                "temperature": temperature,
                                "heart_rate": heartRate,
                                "glucose": glucose,
                                "blood_pressure": {
                                    "high": phigh,
                                    "low": plow
                                }
                            }
                        }
                    ]
                }
                this.setState({ loading: true });
                const resultdata = await ApiService.uploadData(data);
                if(__DEV__)
                console.log(" uploadData resultdata: ", resultdata);
               
                if(resultdata && !resultdata.error){ 
                     if(resultdata.status==200){
                         if(resultdata.data && (typeof resultdata.data === 'string' || resultdata.data instanceof String))
                            this.setState({message: resultdata.data});
                         else
                            this.setState({message: "Record added."});
                     }else{
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
                this.setState({ loading: false });
            }
        }
    }
    
  
    render() {
          //console.log('WalletsOverview render this.props: ', this.props);
          //console.log('WalletsOverview render this.props.navigation.state.params: ', this.props.navigation.state.params);
          const {message, error} = this.state;
          let hasMessage = false;
          let hasError = false;
          if(message && message.length>0)
              hasMessage = true;
          if(error && error.length>0)
              hasError = true;
        if(__DEV__)
          console.log('UploadAction render: ');
          return ( 
                <View style={styles.container1}> 
                    <View style={{height: 50}}>
                    </View> 
                    <View style={styles.container}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center',alignItems: 'center',
                        width: deviceWidth*0.9, borderBottomColor: 'gray', borderBottomWidth: 0}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Checkbox
                                    label='Blood Pressure'
                                    checked={this.state.bloodPressureChecked}
                                    onChange={(checked) => this.checkBloodPressure(checked)}
                                />
                            </View>
                            {this.state.bloodPressureChecked && <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    autoFocus={true}
                                    autoCorrect={false}
                                    keyboardType='numeric'
                                    value={this.state.bloodPressureHigh}
                                    onChangeText={this.onChangeBloodPressureHigh}
                                    underlineColorAndroid="transparent"
                                    placeholder=''
                                    placeholderTextColor={colors.black} />
                                 <View style={{flex: 0, height: 30, padding:0, margin:0, width: 30, 
                                    marginTop: 3, borderWidth: 0, justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{fontSize: 22, }}>/</Text></View>
                                 <TextInput
                                    style={[styles.input,{marginLeft: 0}]}
                                    autoCapitalize="none"
                                    autoFocus={true}
                                    autoCorrect={false}
                                    keyboardType='numeric'
                                    value={this.state.bloodPressureLow}
                                    onChangeText={this.onChangeBloodPressureLow}
                                    underlineColorAndroid="transparent"
                                    placeholder=''
                                    placeholderTextColor={colors.black} />
                                </View>}
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', width: deviceWidth*0.9, justifyContent:'center',alignItems: 'center',
                            borderBottomColor: 'gray', borderBottomWidth: 0}}>
                             <View style={{flex:1, flexDirection:'row'}}>
                                <Checkbox
                                    label='Temperature'
                                    checked={this.state.temperatureChecked}
                                    onChange={(checked) => this.checkTemperature(checked)}
                                />
                            </View>
                            {this.state.temperatureChecked && <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                keyboardType='numeric'
                                autoFocus={true}
                                autoCorrect={false}
                                value={this.state.temperature}
                                onChangeText={this.onChangeTemperature}
                                underlineColorAndroid="transparent"
                                placeholder=''
                            placeholderTextColor={colors.black} />} 
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center',alignItems: 'center',
                        width: deviceWidth*0.9, borderBottomColor: 'gray', borderBottomWidth: 0}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Checkbox
                                    label='Glucose'
                                    checked={this.state.cholesterolChecked}
                                    onChange={(checked) => this.checkCholesterol(checked)}
                                />
                            </View>
                            {this.state.cholesterolChecked && <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                keyboardType='numeric'
                                autoFocus={true}
                                autoCorrect={false}
                                value={this.state.cholesterol}
                                onChangeText={this.onChangeCholesterol}
                                underlineColorAndroid="transparent"
                                placeholder=''
                              placeholderTextColor={colors.black} />} 
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center',alignItems: 'center',
                        width: deviceWidth*0.9, borderBottomColor: 'gray', borderBottomWidth: 0}}>
                            <View style={{flex:1, flexDirection:'row'}}>
                                <Checkbox
                                    label='Heart Rate'
                                    checked={this.state.heartRateChecked}
                                    onChange={(checked) => this.checkHeartRate(checked)}
                                />
                            </View>
                            {this.state.heartRateChecked && <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                keyboardType='numeric'
                                autoFocus={true}
                                autoCorrect={false}
                                value={this.state.heartRate}
                                onChangeText={this.onChangeHeartRate}
                                underlineColorAndroid="transparent"
                                placeholder=''
                              placeholderTextColor={colors.black} />} 
                        </View>
                            
                    </View>
                    {hasMessage && <View style={{flex: 0, height: 40, flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'green'}}>{message}</Text>
                    </View>}
                    {hasError && <View style={{flex: 0, height: 40, flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'red'}}>{error}</Text>
                    </View>}
                    <Spinner
                        visible={this.state.loading}
                        textContent="Processing..."
                        textStyle={styles.spinnerTextStyle}
                      />
                    <View style={{flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
                    
                        <CustomButton
                            onPress={this.callUpload}
                            buttonStyle={styles.createAccountButton}
                            textStyle={styles.createAccountButtonText}
                            text={'Add'}
                        />
                    </View>
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
  


