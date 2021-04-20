import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from 'common-style';

export default () => (
    <View style={styles.container}>
        <Text style={styles.message}>
            There are no app keys for you.
        </Text>
    </View>
);

const styles = StyleSheet.create({
    container: {},
    message: {
        color: colors.black
    }
});