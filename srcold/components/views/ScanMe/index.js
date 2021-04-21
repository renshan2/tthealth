import React from 'react'
import { Image, View, StyleSheet,Text,TouchableOpacity,Dimensions, TextInput } from 'react-native';
 
import { CustomButton } from '@components/widgets';
import QRCode from 'react-native-qrcode-svg'; 
import { Url } from '@common/constants';
 
import Share from 'react-native-share';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export class ScanMe extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
      headerStyle: {
        backgroundColor: '#6CB553', 
      },
      headerTintColor: 'black',
      headerTitleStyle: {
          fontWeight: 'bold',
          color: 'white'
        },
        title: "Scan",
        headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
       
      });


      constructor (props){
        super(props);
        //console.log('constructor Tokenpon props: ', props); 
        let mobile = ""; 
        if(this.props.navigation.state.params && this.props.navigation.state.params.mobile){
            mobile = this.props.navigation.state.params.mobile;
        }
        this.state = {
           mobile: "17035674536", 
        
        }
        this.shareOptions = {
          title: "User",
          message: "Mobile phone",
          //url: this.state.ShareUrl,
          subject: "Mobile", // for email
          social: ''
        };
        //props.navigation.setParams({title: 'Market Test'});
      }
      componentWillMount() {
        //console.log('componentWillMount Tokenpon this.state: ', this.state)
  
        const title = 'Scan';
        
        this.props.navigation.setParams({ title: title });
        //console.log('componentWillMount Tokenpon title: ', title)
  
      }
      callShare = () =>{
        if(__DEV__)
        console.log('ScanMe callShare mobile: ',this.state.mobile);
        
        setTimeout(() => { 
            this.shareOptions.mobile = this.state.mobile;
            this.shareOptions.social = 'social'; 
  
            Share.open(this.shareOptions).catch((err) => { 
                err && console.log(err);  
            });
        },300);
      }
      render() {

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'white'}}>
                <View style={{height: 15}}></View>
                <View style={{ marginLeft: 10, alignItems: 'center'}}>
                    <Text style={{textAlign: 'center',fontSize: 20,fontWeight: 'bold', alignSelf: 'center', alignItems: 'center'}}>
                        User ID to be scanned: 
                    </Text>
                </View>
                <View style={{flex: 0,margin: 10, height: 60, width: deviceWidth*0.7, flexDirection: 'column'}}> 
                    <TextInput
                        style={{flex: 0, height: 40, color: 'black', borderColor: 'gray', borderWidth: 0}}
                        value={this.state.mobile}
                        multiline={false}
                        editable={false}
                        numberOfLines={10}
                    />
                </View>
                <View style={{flex: 0.8, marginTop: 20}}>
                <QRCode
                    size = {256}
                    value={this.state.mobile}
                    logo={{uri: Url.base64Logo}}
                    logoSize={30}
                    logoBackgroundColor='transparent'
                    getRef={(c) => (svgTopic = c)}
                    />
                </View>
                <View style={{height: 15}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <CustomButton
                        onPress={this.callShare}
                        buttonStyle={styles.createAccountButton}
                        textStyle={styles.createAccountButtonText}
                        text={'Share'}
                    /> 
                </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    image: {
      marginTop: 20,
      marginLeft: 90,
      height: 200,
      width: 200
    },
    text: {
      fontSize: 20,
      marginLeft: 150
    },
    createAccountButton: {
      backgroundColor: 'green',
      width: 120,
      margin: 15,
      borderRadius: 8
    },
    createAccountButtonText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20
    
    }
  })
  

const IXIN_ICON = "data:image/png;base64,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";