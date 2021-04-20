import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-widgets';
import { colors, measures } from 'common-style';
import person from '../../../assets/person.png';
import checkImg from '../../../assets/sel128.png';
import { Image } from 'react-native-animatable';

export default class ContactCard extends React.Component {


  //  state = {selected: (new Map(): Map<string, boolean>)};
    /*
familyName: "Bell"
givenName: "Kate"
hasThumbnail: false
jobTitle: "Producer"
middleName: ""
note: ""
phoneNumbers: Array(2)
0: {label: "mobile", number: "(555) 564-8583"}

    */
  render() {
      //console.log('ContactCard render this.props: ', this.props);
     let { onPressDetail, onPressSelect, item } = this.props;
      //console.log('ContactCard render item: ', item);
      //debugger;
      item = item.item;
      
        //console.log('ContactCard render item.familyName: ', item.familyName);
        //console.log('ContactCard render item.firstName: ', item.firstName);
        //console.log('ContactCard render item.middleName: ', item.middleName);
        //console.log('ContactCard render item.mobilePhone: ', item.mobilePhone);

        let allName = '';
        if(item.firstName)
            allName = item.firstName;
        if(item.givenName)
            allName = item.givenName;
        if(item.familyName && allName)
            allName = allName + ' ' + item.familyName;
        if(item.middleName) {
            allName = allName + ', ' + item.middleName;
        }
        //const openIcon = <Image style={{width: 25, height: 25}} source={checkImg}/>
       // const closeIcon = <Image style={{width: 25, height: 25}} source={checkdim}/>
      const homephoneText =<Text style={styles.description}>H: {item.homePhone}</Text>
      let hasHomePhone = false;
      if(item.homePhone){
        hasHomePhone = true;
      }

      return (
          <TouchableWithoutFeedback>
              <View style={styles.container}>
                  <View style={styles.leftColumn}>
                     <Image style={{width: 25, height: 25}} source={person}/>
                  </View>
                  <View style={styles.middleColumn}>
                      <Text style={styles.title}>{allName}</Text>
                      <Text style={styles.description}>M: {item.mobilePhone}</Text>
                      {(hasHomePhone) && homephoneText}
                  </View>
                  <View style={styles.rightColumn}>
                      <View style={styles.balanceContainer}>
                         <TouchableOpacity onPress={()=>onPressDetail(item)}>
                            <Text style={styles.description}></Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{borderWidth: 0, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      
                        <TouchableHighlight onPress={(item) =>onPressSelect(item)}>
                            <Image style={{width: 25, height: 25, marginRight: 10}}
                                source={checkImg}
                            />
                            </TouchableHighlight> 
                        </View>
                  </View>
                  
              </View>
          </TouchableWithoutFeedback>
      );
  }


}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        //paddingHorizontal: measures.defaultPadding,
        marginBottom: measures.defaultMargin,
        height: 70,
        borderWidth: 0

    },
    leftColumn: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    middleColumn: {
        flex: 2,
        borderWidth: 0
    },
    rightColumn: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 0
    },
    title: {
        fontSize: measures.fontSizeMedium,
        color: colors.gray,
        fontWeight: 'bold'
    },
    description: {
        fontSize: measures.fontSizeMedium - 2,
        color: colors.gray,
        borderWidth: 0
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'column',
        borderWidth: 0
    },
    balance: {
        fontSize: measures.fontSizeMedium - 1,
        color: colors.gray,
        marginLeft: measures.defaultMargin,
        fontWeight: 'bold'
    },
    fiatbalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.gray,
        marginLeft: measures.defaultMargin
    },
    next: {
        color: colors.lightGray
    }
});