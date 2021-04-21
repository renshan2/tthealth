import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { StyleSheet, Text, View} from 'react-native' 
import { CustomButton } from '@components/widgets'
import metrics from '../../../config/metrics'

export default class Opening extends Component {
  static propTypes = {
    onCreateAccountPress: PropTypes.func.isRequired,
    onSignInPress: PropTypes.func.isRequired
  }
  componentDidMount(){
   this.forceUpdate();
  }
  componentWillMount(){
      
  }
  render () {
    console.log("Opening render this.props: ", this.props);
    return (
      <View style={styles.container}>
        
        <View>
          <View style={{flex: 0, flexDirection:'row',marginBottom:10, justifyContent:'center', alignItems:'center'}}>
            <Text>For Existing User</Text>
          </View>
          <CustomButton style={{borderWidth: 1, borderColor: 'white'}}
            text={'Sign In'}
            onPress={this.props.onSignInPress}
            buttonStyle={styles.signInButton}
            textStyle={styles.signInButtonText}
          />
        </View>
        <View style={styles.separatorContainer}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorOr}>{'Or'}</Text>
          <View style={styles.separatorLine} />
        </View>
        <View>
          <View style={{flex: 0, flexDirection:'row',marginBottom:10, justifyContent:'center', alignItems:'center'}}>
              <Text>For New User</Text>
          </View>
          <CustomButton
            text={'Sign up'}
            onPress={this.props.onCreateAccountPress}
            buttonStyle={styles.createAccountButton}
            textStyle={styles.createAccountButtonText}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1
  },
  createAccountButton: {
    backgroundColor: 'green',
    borderRadius: 8,
  },
  createAccountButtonText: {
    color: 'white',
    fontSize: 23
  },
  separatorContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  separatorLine: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    height: StyleSheet.hairlineWidth,
    borderColor: '#9B9FA4'
  },
  separatorOr: {
    color: '#9B9FA4',
    marginHorizontal: 8
  },
  signInButton: {
    backgroundColor: 'green', //1976D2
    borderRadius: 8,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 23
  }
})
