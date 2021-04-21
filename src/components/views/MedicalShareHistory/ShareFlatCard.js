import React from 'react';
import { StyleSheet, Text, TouchableHighlight, View,ScrollView, Image } from 'react-native'; 
import { colors, measures } from '@common/styles';  
 
export default class ShareFlatCard extends React.Component {
 
 
 
    render() {
        const { shareData, username} = this.props; 
        if(__DEV__)
        console.log("render shareData: ", shareData);
        let item = shareData.item;
        return (
            <View style={styles.container}> 
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.title}>
                        <Text style={{fontSize: 15, fontWeight: 'bold', marginBottom: 15}}>Medical Data</Text>
                    </View> 
                    <View style={styles.row}>
                        <Text style={styles.label}>Date:</Text>
                        <Text style={styles.value}>{item.datetime}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>ID:</Text>
                        <Text style={styles.value}>{item.id}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Issuer:</Text>
                        <Text style={styles.value}>{item.issuer}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Owner:</Text>
                        <Text style={styles.value}>{item.owner}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Blood Pressure:</Text>
                        <Text style={styles.value}>{item.device_data.blood_pressure.high}/{item.device_data.blood_pressure.low}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Glucose:</Text>
                        <Text style={styles.value}>{item.device_data.glucose}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Heart Rate:</Text>
                        <Text style={styles.value}>{item.device_data.heart_rate}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.label}>Temperature:</Text>
                        <Text style={styles.value}>{item.device_data.temperature}</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingHorizontal: measures.defaultPadding,
        maxHeight: 550,
        borderRadius: 10
    },
    leftColumn: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    centerColumn: {
        flex: 1,
        height: 64,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    operatorLabel: {
        fontWeight: 'bold',
        fontSize: measures.fontSizeMedium
    },
    rightColumn: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        marginRight: 10
    },
    title: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    header: {
        paddingVertical: measures.defaultPadding,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    content: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: colors.secondary,
        borderWidth: 0,
        borderColor: 'red',
        marginBottom: 10
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: measures.defaultMargin / 4,
        marginLeft: 10
    },
    label: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    amountContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    confirmationsContainer: {
        marginLeft: measures.defaultMargin,
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    balanceContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'column'
    },
    amountLabel: {
        fontWeight: 'bold',
        fontSize: measures.fontSizeMedium
    },
    fiatLabel: {
        fontSize: measures.fontSizeMedium - 4
    },
    value: {
        marginLeft: 5
    }
});