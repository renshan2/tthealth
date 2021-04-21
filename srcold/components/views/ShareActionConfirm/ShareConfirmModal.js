import React from 'react'
import { View, StyleSheet, Keyboard, Dimensions,Text, TextInput,Animated, TouchableHighlight,TouchableWithoutFeedback } from 'react-native';
import { CustomButton, CustomTextInput } from '../../widgets';
import metrics from '../../../config/metrics';
import { measures } from '../../../common/styles';
import Modal from "react-native-modal";
import { fromHsv, TriangleColorPicker } from 'react-native-color-picker';
import InputSpinner from "react-native-input-spinner";
// Without Flow type annotations

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height; 

const ShareConfirmModal = (props) => {
    console.log("TextModal props: ", props);
     
    let btnTxt = props.isTTS?'Add TTS':'Add Text';
    if(props.isEdit) {
      btnTxt = "Apply"
    }
    let showColor = props.showColor;
    let btnColor = "Get Color";
    if(showColor)
       btnColor = "Set Color";
    props.color="blue";
    console.log("TextModal props.color: ", props.color);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Modal visible={ props.display } style={{position: 'absolute', bottom:0, alignSelf: 'center', width: '98%', height: '57%', 
        justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10}}
                onRequestClose={ () => console.log('closed') }>

                <View style={{ flex:1, flexDirection:'column', justifyContent: 'center', width: '95%',
                    alignItems: 'center', borderWidth: 0 }}>

                    {!props.showColor && <TextInput 
                        style={{flex:0.6, backgroundColor: '#rgba(0,0,0,0.5)', borderWidth: 1, padding:5,borderRadius: 8,
                        fontSize: props.textSize, color: props.color, height: Math.max(20, props.height),marginBottom:20,
                        width: metrics.DEVICE_WIDTH * 0.9,textAlignVertical: 'top'}} 
                        name={'text'}
                        selectionColor={'orange'}
                        placeholderTextColor={'rgba(0,0,0,0.4)'}
                        ref={(ref) => this.emailInputRef = ref}
                        placeholder={''}
                        editable={true}
                        returnKeyType={'done'}
                        secureTextEntry={false}
                        withRef={true}
                        onChangeText={(value) => props.setText(value)}
                        isEnabled={true}
                        multiline={true}
                        value={props.text}
                        onContentSizeChange={(event) => {
                            props.setHeight(event.nativeEvent.contentSize.height-10);
                        }}
                    />}
                    {props.showColor && <TriangleColorPicker
                              onColorChange={color => props.setColor(fromHsv(color))}
                              style={{flex: 1, width:200, height: 200, marginBottom: 10}}
                    />}
                     <View style={{flex: 0.15, flexDirection: 'row',
                                justifyContent: 'space-between', alignItems: 'center'}}>
                        <CustomButton
                            onPress={props.setShowColor}
                            buttonStyle={[styles.createAccountButton,{marginLeft:0,marginBottom:23}]}
                            textStyle={styles.createAccountButtonText}
                            text={btnColor}
                        />
                        <InputSpinner
                            style={styles.spinner}
                            max={80}
                            min={5}
                            step={1}
                            colorMax={"red"}
                            colorMin={"red"}
                            color={'#rgba(200,100,100,0.4)'}
                            colorPress={"#ff4048"}
                            height={40}
                            buttonFontSize={16}
                            buttonRightText={"▲"}
                            buttonLeftText={"▼"}
                            editable={false}
                            buttonPressTextColor={"#FFF"}
                            value={Number(props.spinnumber)}
                            onChange={(num) => {
                              props.setTextSize(num);
                            }}
                            rounded={false}
                            showBorder
                        />
                    </View>
                    <View style={{flex: 0.15, flexDirection: 'row', 
                                justifyContent: 'space-between', alignItems: 'center'}}>
                        {btnTxt!="Apply" && <CustomButton
                            onPress={props.sendTextAction}
                            buttonStyle={[styles.createAccountButton,{marginBottom:10}]}
                            textStyle={styles.createAccountButtonText}
                            text={btnTxt}
                        />}
                        {btnTxt=="Apply" && <CustomButton
                            onPress={props.applyTextAction}
                            buttonStyle={[styles.createAccountButton,{marginBottom:10}]}
                            textStyle={styles.createAccountButtonText}
                            text={btnTxt}
                        />}
                         <CustomButton
                            onPress={props.cancelTextAction}
                            buttonStyle={[styles.createAccountButton,{marginBottom:10}]}
                            textStyle={styles.createAccountButtonText}
                            text={'Cancel'}
                        />
                        
                  </View>
                  
            </View>
        </Modal>
        </TouchableWithoutFeedback>
        )
}

const styles = StyleSheet.create({
  
  text: {
    fontSize: 20,
    marginLeft: 150
  },
  createAccountButton: {
    backgroundColor: '#rgba(200,100,100,0.3)',
    margin: 8,
    borderRadius: 8,
    height:35,
    width: 120
  },
  createAccountButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#edd6a4',
    alignItems: 'center',
    width: metrics.DEVICE_WIDTH,
    height: 350,
    borderRadius: 10,
    flexDirection: 'column',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: metrics.DEVICE_WIDTH,
    height: 350,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: '#edd6a4',
  },
  spinner: {
    flex: 0.2,
    flexDirection:'row',
    textAlignVertical: 'center',
    width: 110,
    height: 35,
    minWidth: 100,
    marginBottom:15,
    marginLeft:8,
    backgroundColor: '#rgba(200,100,100,0.3)',
    justifyContent:'center', 
    alignItems: 'center'
	},
})

export default TextModal;
