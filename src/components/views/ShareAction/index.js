import React from 'react';
import { StyleSheet, View,TextInput, Image,Dimensions, TouchableOpacity, Text} from 'react-native';
import { colors, measures } from 'eslint-config-populist'; 
import Checkbox from 'react-native-modest-checkbox';
import { Api as ApiService } from 'common-services';
import { CustomButton } from 'react-widgets'  
import Spinner from 'react-native-loading-spinner-overlay';

import { mobileAppName } from '../../../common/constants/Data';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export class ShareAction extends React.Component {
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
       
      })
      
    constructor(props) {
      super(props);
      //console.log("WalletsOverview constructor this.props: ", this.props); 
      let username = '', category="", user=null;
      if(this.props.navigation.state.params && this.props.navigation.state.params.username){
        username = this.props.navigation.state.params.username;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.user){
        user = this.props.navigation.state.params.user;
      }
      if(this.props.navigation.state.params && this.props.navigation.state.params.category){
        category = this.props.navigation.state.params.category;
      }
      this.state = {  
            loading: false,
            mobile: user?user.local.mobile:'', 
            username: username,
            category: category,
            bloodPressure: '',
            cholesterol: '',
            temperature: '',
            isFocused: false,
            user: user,
            cca2: '', 
            pickerData: null,
            bloodPressureChecked: false,
            cholesterolChecked: false,
            temperatureChecked: false,
            countryModalOpen: false,
            allChecked: false,
            message: '',
            error: ''
      }; 
    }

    async componentDidMount() {
        this.props.navigation.setParams({ title: "Share" }); 
        const {user} = this.state;
        if(user){
            if(user.local) {
                this.setState({mobile: user.local.mobile})
            }
        }
    }
    checkAll = (cbox) =>{
        if(__DEV__)
        console.log("checkAll cbox: ", cbox);
        this.setState({allChecked: cbox.checked, bloodPressureChecked:cbox.checked,
            heartRateChecked:cbox.checked,cholesterolChecked:cbox.checked,temperatureChecked:cbox.checked,});
    }
    checkBloodPressure = (cbox) =>{
        if(__DEV__)
        console.log("checkBloodPressure cbox: ", cbox);
        this.setState({bloodPressureChecked: cbox.checked});
    }
    checkHeartRate = (cbox) =>{
        if(__DEV__)
        console.log("checkHeartRate cbox: ", cbox);
        this.setState({heartRateChecked: cbox.checked});
    }
    checkCholesterol = (cbox) =>{
        if(__DEV__)
        console.log("checkCholesterol cbox: ", cbox);
        this.setState({cholesterolChecked: cbox.checked});
    }
    checkTemperature = (cbox) =>{
        if(__DEV__)
        console.log("checkTemperature cbox: ", cbox);
        this.setState({temperatureChecked: cbox.checked});
    }
    onChangeCholesterol = (value) =>{
        if(__DEV__)
        console.log("onChangeCholesterol value: ", value);
    }
    onChangeBloodPressure = (value) =>{
        if(__DEV__)
        console.log("onChangeBloodPressure value: ", value);
    }
    onChangeTemperature = (value) =>{
        if(__DEV__)
        console.log("onChangeTemperature value: ", value);
    }
   
    shareBackHome= () =>{
        this.props.navigation.pop(2);
    }
    shareContinue = async () =>{
        const { user} = this.state;
        let fields = "";
        try{
            this.setState({ message: "", error: "" });
            if(this.state.bloodPressureChecked){
                fields = "blood_pressure";
            }
            if(this.state.temperatureChecked){
                if(fields.length>0)
                fields = fields + ", temperature";
                else 
                fields = "temperature";
            }
            if(this.state.cholesterolChecked){
                if(fields.length>0)
                fields = fields + ", glucose";
                else fields = "glucose";
            }
            if(this.state.heartRateChecked){
                if(fields.length>0)
                fields = fields + ", heart_rate";
                else fields = "heart_rate";
            }
            if(fields.length>0){
                 this.props.navigation.navigate('ShareActionConfirm', { user: user, fields});
            }else{
                this.setState({error: "ShareTo is required."});
            }
        }catch(error){
            console.log("Share request error: ", error);
        }
    }
    shareContinue2 = async () =>{
        let fields = "";
        try{
            this.setState({ message: "", error: "" });
            if(this.state.bloodPressureChecked){
                fields = "blood_pressure";
            }
            if(this.state.temperatureChecked){
                if(fields.length>0)
                fields = fields + ", temperature";
                else 
                fields = "temperature";
            }
            if(this.state.cholesterolChecked){
                if(fields.length>0)
                fields = fields + ", glucose";
                else fields = "glucose";
            }
            if(this.state.heartRateChecked){
                if(fields.length>0)
                fields = fields + ", heart_rate";
                else fields = "heart_rate";
            }
            if(fields.length>0){
                const {mobile} = this.state;
                let data = { 
                        "data_type": 1,
                        "device_id":mobileAppName,
                        "owner":mobile,
                        "viewer": mobile,
                        "fields": fields
                    
                }

                this.setState({ loading: true });
                const resultdata = await ApiService.requestshare(data);
                if(__DEV__)
                console.log(" shareContinue resultdata: ", resultdata); 
                if(resultdata && !resultdata.error){
                    if(__DEV__)
                    console.log(" shareContinue resultdata: ", resultdata);
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
                this.setState({error: "No fields are selected to share."});
            }
        }catch(error){
            console.log("Share request error: ", error);
        }
        this.setState({ loading: false }); 
    }
    render() {
          //console.log('WalletsOverview render this.props: ', this.props);
          //console.log('WalletsOverview render this.props.navigation.state.params: ', this.props.navigation.state.params);
          if(__DEV__)
          console.log('ShareAction render: '); 
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
                    <View style={styles.container}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center',alignItems: 'center',
                        width: deviceWidth*0.9, borderBottomColor: 'gray', borderBottomWidth: 0, marginBottom:20}}>
                            <View style={{flex:1, flexDirection:'row', marginBottom:10}}>
                                <Checkbox
                                    label='Blood Pressure'
                                    checked={this.state.bloodPressureChecked}
                                    onChange={(checked) => this.checkBloodPressure(checked)}
                                />
                            </View>
                            {false && <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoFocus={true}
                                autoCorrect={false}
                                value={this.state.bloodPressure}
                                onChangeText={this.onChangeBloodPressure}
                                underlineColorAndroid="transparent"
                                placeholder=''
                                placeholderTextColor={colors.black} />} 
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', width: deviceWidth*0.9, justifyContent:'center',alignItems: 'center',
                            borderBottomColor: 'gray', borderBottomWidth: 0, marginBottom:20}}>
                             <View style={{flex:1, flexDirection:'row', marginBottom:10}}>
                                <Checkbox
                                    label='Temperature'
                                    checked={this.state.temperatureChecked}
                                    onChange={(checked) => this.checkTemperature(checked)}
                                />
                            </View>
                            {false && <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoFocus={true}
                                autoCorrect={false}
                                value={this.state.temperature}
                                onChangeText={this.onChangeTemperature}
                                underlineColorAndroid="transparent"
                                placeholder=''
                            placeholderTextColor={colors.black} />} 
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center',alignItems: 'center',
                        width: deviceWidth*0.9, borderBottomColor: 'gray', borderBottomWidth: 0, marginBottom:20}}>
                            <View style={{flex:1, flexDirection:'row', marginBottom:10}}>
                                <Checkbox
                                    label='Glucos'
                                    checked={this.state.cholesterolChecked}
                                    onChange={(checked) => this.checkCholesterol(checked)}
                                />
                            </View>
                            {false && <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoFocus={true}
                                autoCorrect={false}
                                value={this.state.cholesterol}
                                onChangeText={this.onChangeCholesterol}
                                underlineColorAndroid="transparent"
                                placeholder=''
                              placeholderTextColor={colors.black} />} 
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', width: deviceWidth*0.9, justifyContent:'center',alignItems: 'center',
                            borderBottomColor: 'gray', borderBottomWidth: 0, marginBottom:20}}>
                             <View style={{flex:1, flexDirection:'row', marginBottom:10}}>
                                <Checkbox
                                    label='Heart Rate'
                                    checked={this.state.heartRateChecked}
                                    onChange={(checked) => this.checkHeartRate(checked)}
                                />
                            </View>
                            {false && <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                autoFocus={true}
                                autoCorrect={false}
                                value={this.state.temperature}
                                onChangeText={this.onChangeTemperature}
                                underlineColorAndroid="transparent"
                                placeholder=''
                            placeholderTextColor={colors.black} />} 
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', width: deviceWidth*0.9, justifyContent:'center',alignItems: 'center',
                            borderBottomColor: 'gray', borderBottomWidth: 0, marginBottom:20}}>
                             <View style={{flex:1, flexDirection:'row', marginBottom:10}}>
                                <Checkbox
                                    label='All'
                                    checked={this.state.allChecked}
                                    onChange={(checked) => this.checkAll(checked)}
                                />
                            </View> 
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
                            onPress={this.shareContinue}
                            buttonStyle={styles.createAccountButton}
                            textStyle={styles.createAccountButtonText}
                            text={'Continue'}
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
        width: 170, 
        borderRadius: 10,
        marginBottom: 20
      },
      createAccountButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
      
      },
      spinnerTextStyle: { color: 'black' },
});
  