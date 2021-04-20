import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay'; 
import { colors, measures } from 'eslint-config-populist';
import { WebView } from 'react-native-webview';
import PDFView from 'react-native-view-pdf';
import { CustomButton } from '../../../components/widgets'

export class LegalModal extends React.Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerStyle: {
          backgroundColor: '#6CB553', 
        },
        headerTintColor: 'black',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
        title: "Legal",
        headerLeft: () =><TouchableOpacity onPress={() => navigation.goBack()}><Image source={require('../../../assets/back-icon.png')} style={{width: 35, height: 20, marginLeft:10}} /></TouchableOpacity>,
       
      })

    constructor(props) {
        super(props);

        ////console.log('LegalModal constructor props: ', props);
        var resource = null;
        if(this.props.navigation.state.params){
            resource = this.props.navigation.state.params.resource;
        };
        if(__DEV__)
        console.log("LegalModal constructor resource: ", resource);
        this.state = {
            spinner: true,
            resource: resource?resource:'',

        }
        this.reloadCounter = 0;
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        this.reloadCounter = 0;
    }

    componentWillMount() {

    }
    agreeAction = () => {
        //console.log("agreeAction state: ", this.state);
        //this.setState({ spinner: false, display: false, checked: true });
        this.props.navigation.pop();
      }
    onLoad = () =>{
        //console.log("onLoad state: ", this.state);
        this.setState({ spinner: false });
        //console.log("onLoad state: ", this.state);
    }
    onError = () =>{
        if(__DEV__)
        console.log("onError state: ", this.state);
        if(this.reloadCounter == 0){
            this.reloadCounter++;
           this.forceUpdate();
        }
    }
    onPageChanged = (page: number, pageCount: number) => {
        //console.log(`page ${page + 1} out of ${pageCount}`);
      }
    render() {
        ////console.log('LegalModal render state: ', this.state);
        const isPDF = this.state.resource.toString().includes(".pdf")?true:false;
        return (
                <View style={{ flex: 1 }}>
                    {/* Some Controls to change PDF resource */}
                    <View style={{ flex: 1 }}>
                        {/* Some Controls to change PDF resource */}
                        {(isPDF && <PDFView
                            fadeInDuration={250.0}
                            style={{ flex: 1 }} 
                            resource={this.state.resource}
                            onLoad={this.onLoad}
                            onError={this.onError}
                            onPageChanged={this.onPageChanged}
                        />
                        )}
                        {
                        (!isPDF && <WebView originWhitelist={['*']}
                            source={{uri: this.state.resource}}
                            ignoreSslError={true}
                            onError={this.onError}
                            style={{marginTop: 5}}
                        />)
                        }
                        <View style={{flex:0, flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                            <CustomButton
                                onPress={this.agreeAction}
                                buttonStyle={styles.createAccountButton}
                                textStyle={styles.createAccountButtonText}
                                text={'Close'}
                            />
                        </View>
                    </View>
                      <Spinner
                        visible={this.state.spinner}
                        textContent="Loading..."
                        textStyle={styles.spinnerTextStyle}
                      />
                
                </View>
                
           
            )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.defaultBackground,
        padding: measures.defaultPadding
    },
    body: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    message: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'center',
        marginVertical: measures.defaultMargin,
        marginHorizontal: 32
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        height: 52
    },
    createAccountButton: {
        backgroundColor: 'green',
        width: 120, 
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10
      },
      createAccountButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
      
      },
     spinnerTextStyle: { color: 'black' },
});
