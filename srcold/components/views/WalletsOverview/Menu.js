import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import { Icon } from '@components/widgets';
import { colors, measures } from 'eslint-config-populist';


const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'pink',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  container: {
      alignItems: 'stretch',
      backgroundColor: colors.white,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: measures.defaultPadding,
      marginBottom: measures.defaultMargin,
      height: 70
  },
  leftColumn: {
      width: 40,
      alignItems: 'flex-start',
      justifyContent: 'center'
  },
  middleColumn: {
      flex: 2
  },
  title: {
      fontSize: measures.fontSizeMedium,
      color: colors.gray,
      fontWeight: 'bold'
  },
});

export default function Menu({ onItemSelected }) {
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
            <Icon name='wallet' size='large' type='ent' />
        </View>
        <View style={styles.middleColumn}>
            <Text
              onPress={() => onItemSelected('Wallet 1')}
              style={styles.title}
            >
              Wallet 1
            </Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
            <Icon name='wallet' size='large' type='ent' />
        </View>
        <View style={styles.middleColumn}>
            <Text
              onPress={() => onItemSelected('Wallet 2')}
              style={styles.title}
            >
              Wallet 2
            </Text>
        </View>
      </View>
    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
