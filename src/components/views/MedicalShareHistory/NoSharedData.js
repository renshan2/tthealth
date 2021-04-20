import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, measures } from 'common-style';

export default () => (
    <View style={styles.container}>
        <Text style={styles.message}>
            There is no shared data.
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: measures.defaultPadding
    },
    message: {
        color: colors.black
    }
});