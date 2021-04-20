import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import { colors, measures } from 'common-style';  
 
export default class TotalBalance extends React.Component {
 
    render() {
        console.log("TotalBalance user: ", this.props.user);
        let username = "Testing one";
        if(this.props.user){
            username = this.props.user.username;
        }
        return (
            <MenuProvider>
                <View style={styles.container}>
                        <View style={styles.leftColumn}>
                            <Text style={styles.title}>{username}</Text>
                        </View>
                        <View style={styles.rightColumn}> 
                            
                            <Menu>
                                <MenuTrigger> 
                                    <Text style={styles.fiatBalance}>+</Text> 
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption onSelect={() => this.addContact()} text='Add Contact' />
                                    <MenuOption onSelect={() => this.scan()} text='Scan' />
                                    <MenuOption onSelect={() => this.upload()} text='Upload' />
                                    <MenuOption onSelect={() => this.requestAppKey()} text='Request App Key' />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                </MenuProvider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 60,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray
    },
    leftColumn: {
        flex: 1
    },
    title: {
        fontSize: measures.fontSizeLarge,
        color: colors.gray
    },
    balance: {
        fontSize: measures.fontSizeMedium,
        fontWeight: 'bold',
        color: colors.gray
    },
    fiatBalance: {
        fontSize: measures.fontSizeMedium - 3,
        color: colors.gray
    },
    rightColumn: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});
