import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { inject, observer } from 'mobx-react';
import { colors, measures } from '../../../common/styles';



export default class Panel extends React.Component {

    state = { amount: '' };

    get amount() {
        return this.state.amount || 0;
    }
/*
    get fiatAmount() {
      var token = this.props.token;
      //console.log('fiatAmount token: ', token)
      var found = this.props.prices.tokens.filter( (item) => { return item.token === token; });
      //console.log('fiatAmount found: ', found)
      if(found.length > 0)
        return (this.amount * found[0].usd).toFixed(2);
      else return 0;
    }
*/
    onChange(value) {
        let { amount } = this.state;
        switch (value) {
            case 'erase':
                amount = amount.slice(0, amount.length-1);
                break;

            case '.':
                if (amount.indexOf('.') > -1) return;
                else if (!amount.length) amount += '0.';
                else amount += '.';
                break;

            default:
                if (amount === '0') amount = value;
                else amount += value;
                break;
        }
        this.setState({ amount });
    }

    render() {
     // console.log('itemClicked ', this.props);//token name
        return (
            <View style={styles.container}>
                <View style={styles.row}>
                    <Text style={styles.amount}>{this.amount}</Text>
                    <Text style={styles.unit}>{this.props.token}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.fiat}>US$ {this.fiatAmount}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    row: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    amount: {
        fontSize: measures.fontSizeLarge,
        fontWeight: 'bold'
    },
    unit: {
        fontSize: measures.fontSizeMedium,
        color: colors.gray,
        marginLeft: measures.defaultMargin
    }
});
