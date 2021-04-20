import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'; 
import Clipboard from '@react-native-community/clipboard';
import { CustomButton } from 'react-widgets';
import { colors, measures } from 'eslint-config-populist'; 
import metrics from '../../../config/metrics'; 
import { General as GeneralActions } from '@common/actions';
import Share from 'react-native-share';
 
export default class AppKeyCard extends React.Component { 
    shareOptions = {
        title: "Share App Key",
        message: "Share app key",
        //url: this.state.ShareUrl,
        subject: "App Key", // for email
        social: ''
      };

    onPress = (item) => {
        //console.log('WalletCard  onPress item: ', item);
        //console.log('WalletCard  onPress this.props: ', this.props);
        this.props.onPress(item);
    }; 
    copyAppKey = async () =>{
        if(__DEV__)
        console.log('copyToClipboard this.props: ', this.props);
        const {wallet} = this.props;
        let item = wallet.item;
        if(item && item.appkey && item.appkey.length>0){ 
            let appkey = item.appkey;
            if(__DEV__)
            console.log('copyToClipboard appkey: ', appkey);
          await Clipboard.setString(appkey); 
          GeneralActions.notify('Copied to clipboard', 'short');
        }
    }
    shareAppKey = () =>{
        if(__DEV__)
      console.log(' shareAppKey: ',this.props); 
      const {wallet} = this.props;
      let item = wallet.item;
      if(item && item.appkey && item.appkey.length>0){ 
          let appkey = item.appkey;
            setTimeout(() => { 
                this.shareOptions.appkey = appkey;
                this.shareOptions.social = 'social'; 

                Share.open(this.shareOptions).catch((err) => { 
                    err && console.log(err);  
                });
            },300);
            }
    } 
  render() {
      //console.log('WalletCard render this.props: ', this.props);
     const { wallet } = this.props;
     if(__DEV__)
      console.log('AppKeyCard render wallet: ', wallet);
      let item = wallet.item;
      if(__DEV__)
      console.log('AppKeyCard render item: ', item);     
      return (
          <TouchableOpacity onPress={this.onPress}>
              <View style={styles.container}>
                  {/*<View style={styles.leftColumn}>
                      <Icon name='wallet' size='large' type='ent' />
                  </View>*/}
                  <View style={styles.middleColumn}>
                      <Text style={styles.title}>{item.appkey}</Text>
                      {/*<Text style={styles.description}>{item.description}</Text>*/}
                  </View>
                  {<View style={{flex:0, flexDirection: 'row', marginBottom: 30, justifyContent: 'center', alignItems:'center'}}>
                     
                        <CustomButton
                            onPress={this.copyAppKey}
                            isEnabled={true}
                            isLoading={false}
                            buttonStyle={{backgroundColor: 'green', width: 110, borderRadius: 8, marginRight:10}}
                            textStyle={{color: 'white', fontWeight: 'normal'}}
                            text={'Copy'}
                        />
                        <CustomButton
                            onPress={this.shareAppKey}
                            isEnabled={true}
                            isLoading={false}
                            buttonStyle={{backgroundColor: 'green', width: 110, borderRadius: 8, marginLeft:10}}
                            textStyle={{color: 'white', fontWeight: 'normal'}}
                            text={'Share'}
                        />
                </View>}
                  {/*<View style={styles.rightColumn}> 
                          <Text style={styles.description}>{total}</Text>
 
                  </View>*/}
              </View>
          </TouchableOpacity>
      );
  }


}
/*
<FlatList
    style={styles.content}
    data={list}
    refreshControl={<RefreshControl refreshing={this.loading} onRefresh={() => this.populate()} />}
    keyExtractor={(item, index) => String(index)}
    renderItem={this.renderItem} />

*/

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        alignItems: 'stretch',
        backgroundColor: colors.white,
        flexDirection: 'column',
        alignItems: 'center',
        //paddingHorizontal: measures.defaultPadding,
        marginBottom: measures.defaultMargin,
        width: metrics.DEVICE_WIDTH,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 160
    },
    leftColumn: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 0.8,
        borderWidth: 0,
        borderColor: 'red'
    },
    rightColumn: {
        flex: 0.2,
        justifyContent: 'flex-start',
        flexDirection: 'row', 
    },
    title: {
        fontSize: measures.fontSizeMedium,
        color: colors.blue,
        fontSize: 13,
        fontWeight: 'bold'
    },
    description: {
        fontSize: measures.fontSizeMedium - 2,
        color: colors.blue,
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column'
    },
    balance: {
        fontSize: measures.fontSizeMedium - 1,
        color: colors.blue,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.blue,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.blue
    }
});
