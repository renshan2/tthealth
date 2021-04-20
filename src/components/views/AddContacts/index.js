import React from 'react';
import { StyleSheet, View, TextInput,Dimensions,Image, Text, TouchableOpacity } from 'react-native';
import { colors, measures } from 'eslint-config-populist'; 
import { Camera } from 'react-widgets';
import { CustomButton } from 'react-widgets'
import { Api as ApiService } from 'common-services'; 
import Spinner from 'react-native-loading-spinner-overlay';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export class AddContacts extends React.Component {
     
      static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
          backgroundColor: '#6CB553', 
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
        title: "Add Contact",
        headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
       
      });

    constructor(props) {
      super(props);
      //console.log("WalletsOverview constructor this.props: ", this.props); 
      let username = '';
      if(this.props.navigation.state.params && this.props.navigation.state.params.username){
        username = this.props.navigation.state.params.username;
      }
      this.state = { 
        user: null, 
        loading: false,
        requesterMobile: username,
        mobile: '', 
        username: username,
        message: '',
        error: ''
      }; 
    }
    async componentDidMount() {
        this.props.navigation.setParams({ title: "Add Contact" });
    }

    onPressReferal = () =>{
      this.setState({message: '', error:''});
      this.props.navigation.navigate('MobileContacts', { onSelect: this.onSelect });
      //this.props.navigation.navigate('Referral', { user: this.state.user, userid: this.state.mobile });
    }
    onPressBarCode = (code) =>{ 
      this.setState({ mobile: code, message: '', error:''});
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
          mobile = "+1"+mobile;
        }
        if(mobile.startsWith("+"))
           mobile = mobile.substring(1);
        mobile = mobile.split("-").join(""); 
        this.setState({ cca2:'US', mobile });
      }else {
        //this.phone.inputPhone.props.value="+1";
        //this.phone.state.formattedNumber="+1";
        //.phone.selectCountry('us');
        this.setState({ cca2:'US' });
      }
    };
    submitClicked = async () =>{
      let contacts = [];
      if(this.state.mobile && this.state.mobile.length>0){ 
          contacts.push(this.state.mobile);
          this.setState({loading: true});
          let resultdata = await ApiService.addContacts(this.state.requesterMobile, contacts);
          if(__DEV__)
          console.log("submitClicked iXin resultdata: ", resultdata);
          
          if(resultdata && !resultdata.error){
            if(__DEV__)
              console.log("submitClicked iXin resultdata.error: ", resultdata.error);
             if(resultdata.data && resultdata.data.success){
               this.setState({message: 'The contact added successfully.'});
                   
             }
             
          }else{
            if(__DEV__)
            console.log("submitClicked error resultdata: ", resultdata);
            this.setState({error: resultdata.error});
          }
          this.setState({loading: false});
      }else{
        this.setState({error: 'No contact provided.'}); 
      } 
    }
    onScanPressed = () => {
      this.setState({message: '', error:''});
      this.refs.camera.show();
    }
    render() {
          //console.log('WalletsOverview render this.props: ', this.props);
          //console.log('WalletsOverview render this.props.navigation.state.params: ', this.props.navigation.state.params);
          let hasMsg = false;
          if(this.state.message && this.state.message.length>0){
             hasMsg = true;
          }
          let hasError = false;
          if(this.state.error && this.state.error.length>0){
            hasError = true;
          }
          if(__DEV__)
          console.log('AddContacts render: ');
          return ( 
                <View style={styles.container1}> 
                    <View style={{height: 50}}>
                    </View>
                    <View style={{ flex: 0,height: 40, paddingRight: 0}}>
                        <TextInput 
                            placeholder={'username/mobile'}
                            editable={true}
                            returnKeyType={'done'}
                            secureTextEntry={false}
                            withRef={true}
                            value={this.state.mobile}
                            onChangeText={(value) => {
                                this.setState({ mobile: value, message: '', error: ''}); 
                            }
                            }
                            isEnabled={true}
                            onFocus={()=> {
                                //console.log("businessNameRef onFocus")
                                this.setState({ isFocused: false }); 
                                
                            }}
                            style={{flex: 1,backgroundColor: 'white',fontSize: 16, paddingVertical: 0,
                                textAlignVertical: 'center', paddingBottom:0, borderWidth:1,
                                marginLeft: 35,marginTop: 0,marginRight:35,paddingLeft: 5,
                                borderRadius: 4,color: 'black', height: 40 }}
                        />
                    </View> 
                    <View style={styles.container}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center',alignItems: 'center',
                        width: deviceWidth*0.9, borderBottomColor: 'gray', borderBottomWidth: 1}}>
                            <Text style={styles.title}>Invite Friends</Text> 
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', width: deviceWidth*0.9, justifyContent:'center',alignItems: 'center',
                            borderBottomColor: 'gray', borderBottomWidth: 1}}>
                            <TouchableOpacity onPress={this.onScanPressed}>
                                <Text style={styles.title}>Scan QR code</Text> 
                            </TouchableOpacity>
                        </View>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent:'center',alignItems: 'center',
                        width: deviceWidth*0.9, borderBottomColor: 'gray', borderBottomWidth: 1}}>
                            <TouchableOpacity onPress={this.onPressReferal}>
                               <Text style={styles.title}>Mobile Contacts</Text> 
                            </TouchableOpacity>
                        </View>
                        <Camera
                              ref="camera"
                              modal
                              onClose={() => this.refs.camera.hide()}
                              onBarCodeRead={address => this.onPressBarCode(address)} />
                    </View>
                    {hasMsg && <View style={{flex:0, flexDirection: 'row', height: 50, justifyContent:'center', alignItems: 'center'}}>
                      <Text style={{color: 'green'}}>{this.state.message}</Text>
                    </View>}
                    {hasError && <View style={{flex:0, flexDirection: 'row', height: 50, justifyContent:'center', alignItems: 'center'}}>
                      <Text style={{color: 'red'}}>{this.state.error}</Text>
                    </View>}
                    <View style={{flex:0, flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems:'center'}}>
                      <CustomButton
                          onPress={this.submitClicked}
                          isEnabled={true}
                          isLoading={false}
                          buttonStyle={{backgroundColor: 'green', width: 110, borderRadius: 8}}
                          textStyle={{color: 'white', fontWeight: 'bold'}}
                          text={'Submit'}
                      />
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
  // this.props.navigation.navigate('Referral', { user: this.state.user, userid: this.state.userid });
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
        borderBottomWidth: 1,
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
   spinnerTextStyle: { color: 'black' },
});
  


