import React from 'react';
import { FlatList, Alert, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'; 
import { measures } from 'eslint-config-populist';
import ShareFlatCard from './ShareFlatCard';
import NoSharedData from './NoSharedData'; 
import { Api as ApiService } from '@common/services';
//import { Image } from 'react-native-animatable'; 
import metrics from '../../../config/metrics';  

import { mobileAppName } from '../../../common/constants/Data';

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.35

 
export class MedicalShareHistory extends React.Component {
 
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerStyle: {
      backgroundColor: '#6CB553', 
    },
    headerTintColor: 'black',
    headerTitleStyle: {
        fontWeight: 'bold',
        color: 'white'
      },
    title: "Shared History",
    headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
   
  })

  constructor(props) {
    super(props);
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
        user: user,
        username: user?user.local.dname:'',
        mobile: user?user.local.mobile:'',
        category: category,
        list: [],
        hasError: false,  
        profession: user?user.local.profession:'doctor',
    }
  }
   
    async componentDidMount() {
        //console.log('TransactionHistory componentDidMount called.... this.state: ', this.state);
        let profession = 'doctor';
        const { user } = this.state;
        if(user && user.local.profession){
          profession = user.local.profession;
        }
        this.state.profession = profession;
        await this.populate(); 
     }
    
    async updateHistory() { 
      await this.populate();
    }
    async populate() { 
        try {
            this.setState({hasError: false}); 
            const resultdata = await ApiService.getShareData(1, mobileAppName, this.state.profession);
            if(__DEV__)
            console.log("MedicalShareHistory populate resultdata: ", resultdata);
            //this.setState({ visible: false });
            if(resultdata && !resultdata.error){
                 let data = resultdata.data;
                 if(data && Array.isArray(data)){
                     this.setState({list: data});
                 }else{
                   if(data){
                       if(data.data && Array.isArray(data.data)){
                          this.setState({list: data.data});
                       }else{
                        data = [];
                        this.setState({list: data});
                         if(data.message) {
                          Alert.alert(
                            'Message',
                            data.message,
                            [
                              {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
                            ],
                            { cancelable: false }
                          )
                         }
                       }
                   }else{
                      data = [];
                      this.setState({list: data});
                   }
                 } 
                 
            }else{
              this.setState({hasError: true});
              let error = resultdata.error;
              if(error && error.response.data){
                  if(error.response.data.message){
                    let msg = error.response.data.message + " for App "+mobileAppName;
                    Alert.alert(
                      'error',
                      msg,
                      [
                        {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
                      ],
                      { cancelable: false }
                    )
                  }else{
                      let msg = "Error to get shared data.";
                      Alert.alert(
                        'error',
                        msg,
                        [
                          {text: 'Ok', onPress: () => console.log('Ok Pressed'), style: 'cancel'},
                        ],
                        { cancelable: false }
                      )
                  }
              }
            }
        } catch (e) {
            console.log('populate e.message: ', e.message); 
        }
    }
      
    renderItem = () => (item) => <ShareFlatCard shareData={item}/>
 
    renderBody = ({ item }) =>  (!this.state.list.length && !this.state.loading && !this.state.hasError) ? <NoSharedData /> : (
        <FlatList
            style={styles.content}
            data={this.state.list}
            refreshing={this.state.loading} 
            onRefresh={this.updateHistory.bind(this)}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem(item)} />
    );

    render() {
      //console.log('TransactionHistory render this.props: ', this.props);
      const {username, list} = this.state;
      let displayName =username;
      if(__DEV__)
      console.log('populate list: ', list); 
        return (
            <View style={styles.container}>
              
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                              borderColor: 'rgba(50,50,255,1)',  borderTopWidth: 0, borderBottomWidth: 1, padding: 5}}>
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                      <View style={{marginBottom: 3, marinTop: 0}}> 
                          <Text style={{fontSize: 16, fontWeight: 'bold', 
                              color: '#111111'}}>{displayName}</Text> 
                      </View> 
                    </View> 
                  </View>
                {this.renderBody(list)}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        flex: 1,
        backgroundColor: 'white',
        padding: measures.defaultPadding
    },
    content: {
        marginTop: measures.defaultMargin
    },
    logoImg: {
      justifyContent: 'center',
      width: 60,
      height: 60,
      borderRadius: 20
    },
});
