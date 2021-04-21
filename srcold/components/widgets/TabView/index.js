import React from 'react';
import { StyleSheet, View } from 'react-native';
import TabBar from './TabBar';

export class TabView extends React.Component {

    state = { active: 0 };

    onPressItem(id) {
        //console.log("TabView onPressItem id: ", id);
        const active = this.props.tabs.findIndex(tab => tab.id === id);
        //this.props.setTabActive(id);
        this.setState({ active });
    }

    render() {
        const { tabs } = this.props;
        const { active } = this.state;
       //console.log("TabView onPressItem active: ", active);
        //console.log("TabView onPressItem tabs: ", tabs);
        return (
            <View style={styles.container}>
                <View style={styles.body} children={tabs[active].content} />
                <TabBar active={active} tabs={tabs} onPressTabItem={(id) => this.onPressItem(id)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        flexDirection: 'column'
    },
    body: {
        flex: 1
    }
});