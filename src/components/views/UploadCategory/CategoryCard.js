import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { Icon } from '@components/widgets';
import { colors, measures } from '@common/styles'; 
import metrics from '../../../config/metrics';




export default class CategoryCard extends React.Component {


  //  state = {selected: (new Map(): Map<string, boolean>)};
    onPress = (item) => {
        //console.log('WalletCard  onPress item: ', item);
        //console.log('WalletCard  onPress this.props: ', this.props);
        this.props.onPress(item);
      };


  render() {
      //console.log('WalletCard render this.props: ', this.props);
     const { onPress, wallet } = this.props;
     if(__DEV__)
      console.log('WalletCard render wallet: ', wallet);
      let item = wallet.item;
      if(__DEV__)
      console.log('WalletCard render item: ', item);
      let total = Number(item.total); 

      return (
          <TouchableOpacity onPress={this.onPress}>
              <View style={styles.container}>
                  {/*<View style={styles.leftColumn}>
                      <Icon name='wallet' size='large' type='ent' />
                    </View>*/}
                  <View style={styles.middleColumn}>
                      <Text style={styles.title}>{item.name}</Text>
                      {/*<Text style={styles.description}>{item.description}</Text>*/}
                  </View>
                  <View style={styles.rightColumn}> 
                          <Text style={styles.description}>{total}</Text>
 
                  </View>
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
        flexDirection: 'row',
        alignItems: 'center',
        //paddingHorizontal: measures.defaultPadding,
        marginBottom: measures.defaultMargin,
        width: metrics.DEVICE_WIDTH,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 60
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
