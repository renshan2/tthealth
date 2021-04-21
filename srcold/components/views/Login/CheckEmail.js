import React from 'react'
import { Modal, View, StyleSheet, Text } from 'react-native';
import { CustomButton, CustomTextInput } from '../../../components/widgets';
import metrics from '../../../config/metrics';
// Without Flow type annotations
// import PDFView from 'react-native-view-pdf/lib/index';

const CheckEmail = (props) => {
   // console.log("CheckEmail props: ", props);
   
    return (

        <Modal visible={ props.display } animationType = "slide" 
                onRequestClose={ () => console.log('closed') }>

            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                {/* Some Controls to change PDF resource */}
                <View style={{ flex: 0.3, marginLeft: 0, justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{textAlign: 'center', fontSize: 20, alignSelf: 'center', alignItems: 'center'}}>
                        Do you have an Email address?
                    </Text>
                </View>
                <View style={{flex: 0.7,  flexDirection: 'column', justifyContent: 'flex-start', 
                    alignItems: 'center', borderWidth: 0 }}>

                    <CustomTextInput 
                        style={{backgroundColor: 'white', borderBottomWidth: 1, 
                        fontSize: 26, color: 'red',
                        height: 50, width: metrics.DEVICE_WIDTH * 0.9}}
                        name={'email'}
                        selectionColor={'blue'}
                        placeholderTextColor={'rgba(0,0,0,0.4)'}
                        ref={(ref) => this.emailInputRef = ref}
                        placeholder={'Email'}
                        editable={true}
                        returnKeyType={'done'}
                        secureTextEntry={false}
                        withRef={true}
                        onChangeText={(value) => props.setEmail(value)}
                        isEnabled={true}
                    />
                    <View style={{flex: 0, flexDirection: 'row', 
                                justifyContent: 'space-between', alignItems: 'center'}}>
                        <CustomButton
                            onPress={props.sendAction}
                            buttonStyle={styles.createAccountButton}
                            textStyle={styles.createAccountButtonText}
                            text={'Save'}
                        />
                        <CustomButton
                            onPress={props.skipAction}
                            buttonStyle={styles.createAccountButton}
                            textStyle={styles.createAccountButtonText}
                            text={'Skip'}
                        />
                  </View>
                </View>
                
            </View>
        </Modal>
        )
}

const styles = StyleSheet.create({
  image: {
    marginTop: 20,
    marginLeft: 90,
    height: 200,
    width: 200
  },
  text: {
    fontSize: 20,
    marginLeft: 150
  },
  createAccountButton: {
    backgroundColor: 'green',
    margin: 30,
    borderRadius: 8,
    width: 90
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22
  }
})

export default CheckEmail;
