import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from '../../../components/widgets';
import { colors } from '../../../common/styles';

const getLabelColor = (active) => active ? styles.activeLabel : styles.label;

export default ({ active, icon, label, onPress, ...props }) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
            <Text style={getLabelColor(active)}>{label}</Text>
            <Icon style={{height:24, marginTop:0}} color={active ? colors.black : colors.gray} {...props} name={icon} />
        </View>
    </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        //height:40,
        flex: 1
    },
    activeLabel: {
        color: colors.black,
        fontWeight:'bold',
        marginBottom:0,
        paddingBottom:0,
        height:20, 
    },
    label: {
        color: colors.gray,
        marginBottom:0,
        paddingBottom:0,
        height:20, 
    }
});
