import React from 'react'
import { Modal, View, StyleSheet } from 'react-native';
import PDFView from 'react-native-view-pdf';
import Spinner from 'react-native-loading-spinner-overlay';
import { CustomButton } from '../../../components/widgets'
import { WebView } from 'react-native-webview';
// Without Flow type annotations
// import PDFView from 'react-native-view-pdf/lib/index';

const resourceType = 'url';
onError = (error) =>{

  //console.log("DisplayModal error: ", error);
}
const DisplayModal = (props) => {
    //console.log("DisplayModal props: ", props);
    const isPDF = props.resource.toString().endsWith(".pdf")?true:false;
    //console.log("DisplayModal isPDF: ", isPDF);
    return (

        <Modal visible={ props.display } animationType = "slide"
                onRequestClose={ () => console.log('closed') }>

            <View style={{ flex: 1 }}>
                {/* Some Controls to change PDF resource */}
                {(isPDF && <PDFView
                    fadeInDuration={250.0}
                    style={{ flex: 1 }}
                    ref={props.onRef}
                    resource={props.resource}
                    onLoad={props.onLoad}
                    onError={props.onError}
                    onPageChanged={props.onPageChanged}
                  />
                )}
                {
                   (!isPDF && <WebView originWhitelist={['*']}
                    source={{uri: props.resource}}
                    ignoreSslError={true}
                    onError={props.onError}
                    style={{marginTop: 5}}
                  />)
                }
                  <CustomButton
                    onPress={props.agreeAction}
                    buttonStyle={styles.createAccountButton}
                    textStyle={styles.createAccountButtonText}
                    text={'Close'}
                  />
            </View>
            <Spinner
              visible={props.spinner}
              textContent="Loading..."
              textStyle={styles.spinnerTextStyle}
            />
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
    backgroundColor: 'green'
  },
  createAccountButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  
  }
})

export default DisplayModal;
