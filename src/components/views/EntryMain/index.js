import React from 'react';
import { TabView } from '@components/widgets';
import { ProfileSettings, ShareData } from '..';
import { AppState} from 'react-native';
import { HeaderIcon } from '@components/widgets';
import { colors } from '@common/styles'; 
//import { wallets as WalletsStore } from '@common/stores'; 
import { WalletsOverview } from '../WalletsOverview';

export class EntryMain extends React.Component {

  static navigatorStyle = {
    disabledBackGesture: true, 
  };
    static userStatic;
    static toUserTypeStatic;
    static navigationOptions = ({ navigation, screenProps }) => {
      //const { params = {} } = navigation.state; 
       ////console.log('navigationOptions process.env.NODE_ENV: ', process.env.NODE_ENV);
       if(!navigation.state.params)
          navigation.state.params = {};
       const { state } = navigation; 
       const paramtitle =  navigation.getParam('title');
       console.log('EntryMain navigationOptions paramtitle: ', paramtitle);
       const rightIcon =  navigation.getParam('rightIcon'); 
  
       const plus = <HeaderIcon
           name='add'
           size='large'
           color={colors.white}
           onPress={() => { 
            
           }} />;
      let left;
      if(paramtitle == 'Market' || paramtitle == 'Shop')
        left = '';
      else left = plus;
 
      let right;
      if(paramtitle == 'Profile Settings'){ 
          const support =  navigation.getParam('support'); 
          right = support;//navigation.state.params.headerRight;
      }
      else if(paramtitle == 'Shop'){
        right = rightIcon;
      } else if(paramtitle == 'Home' || paramtitle == 'Topics' || paramtitle == 'Tokenpon Detail'){
        const share =  navigation.getParam('Share');
        right = share;//navigation.state.params.headerRight;
      }  else {
        right = null;
      }
      left = null;
    
      console.log('EntryMain navigationOptions left: ', left);
      return {
        headerStyle: {
          backgroundColor: '#6CB553', 
        },
        headerTintColor: '#6CB553', 
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
        //title: `${state.params && state.params.title ? state.params.title : 'BASE TITLE'}`,
        title: paramtitle? navigation.getParam('title') : 'Home',
        headerLeft: left,
        headerRight: right
    }};
    
    tabsCustomer = [
      { id: 'Home', label: 'Home', icon: '', content: <WalletsOverview {...this.props} /> },
      { id: 'Share', label: 'Share', icon: '', content: <ShareData {...this.props} /> }, 
      { id: 'Settings', label: 'Settings', icon: '', content: <ProfileSettings {...this.props} /> }
    ];
    
    constructor(props) {
        super(props);
        console.log("EntryMain constructor props: ", props); 
        let user = null; let userType = 'individual';
        let viewName = '';
        if(this.props.navigation.state.params){
          user = this.props.navigation.state.params.user
          if(user && user.local)
            userType = user.local.accountType;
            
        }  
        if(!userType){
          userType = 'individual';
        }
        this.state = {
          user: user,
          hasWallet: false,
          userType: userType,
          appState: AppState.currentState,
          viewName: viewName,
          loggedIn: false
        }
       
        this.tabs = this.tabsCustomer;
       
    } 
    
    componentDidUpdate(){ 
      console.log('EntryMain componentDidUpdate this.props.navigation.state: ', this.props.navigation.state);
     // WalletsStore.userType = this.state.userType;
      if(this.state.viewName=='Mine'){
        this.setTabActive('Mine');
      }else if(this.state.viewName=='Tracking'){
        this.setTabActive('Tracking');
      }else if(this.state.viewName=='Settings'){
        this.setTabActive('Settings');
      }else if(this.state.viewName=='Home'){
        this.setTabActive('Home');
      }
    }
    componentDidMount () {
      //console.log("EntryMain componentDidMount WalletsStore.userType: ", WalletsStore.userType);
      //  AppState.addEventListener('change', this._handleAppStateChange);
     // WalletsStore.userType = this.state.userType;
      //this.setTabActive(3);
      if(this.state.user){
         this.state.user.local.accountType = this.state.userType;
         //this.loggedIn = true;
         this.setState({loggedIn: true});
      }else
      this.setState({loggedIn: false});
      this.props.navigation.state.params.setTabActive = this.setTabActive.bind(this);
        
    }
    componentWillUnmount() {
      console.log('EntryMain componentWillUnmount ... '); 
    }
    _handleAppStateChange = (nextAppState) => {
      //console.log('EntryMain handlePutAppToBackground AppState.currentState: ', AppState.currentState);
      if(AppState.currentState=='background' || AppState.currentState =='inactive'){  
      } 
    };
    setTabActive = (id) => {
      console.log('EntryMain setTabActive id: ', id);
      this.state.viewName = id;
      this.tabRef.onPressItem(id);
    }
    onPressView = (viewName) =>{
      console.log('EntryMain onPressView viewName, this.state.user: ', viewName, this.state.user);
      this.state.viewName = viewName;
      if(!this.state.user){
         console.log('EntryMain onPressView viewName: ', viewName);
         console.log('EntryMain onPressView this.props.navigation: ', this.props.navigation);
         this.props.navigation.navigate('Login', {viewName}); 
      }
    }
    onPressViewLoggedIn = (viewName) =>{
      console.log('EntryMain onPressViewLoggedIn viewName, this.state.user: ', viewName,this.state.user);
      this.state.viewName = viewName;
      
    }
    render() {
      console.log('EntryMain render this.state: ', this.state);
     
        return (
          <TabView 
            ref={ref => this.tabRef = ref} 
            onPressView = {this.onPressView}
            onPressViewLoggedIn = {this.onPressViewLoggedIn}
            loggedIn = {this.state.loggedIn}
            tabs={this.tabs} 
          />
        )

    }
}

 