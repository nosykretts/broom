/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  WebView
} from 'react-native';
// import { RNCamera, FaceDetector } from 'react-native-camera';
// import WebViewBridge from 'react-native-webview-bridge'
import Camera from 'react-native-camera';

import { INJECT_SCRIPT } from './injectScript'
// import { KEY_FOV } from '../constants'
const KEY_FOV = 'fov'
const FOVManager = NativeModules.FOVComponent || NativeModules.FOVModule

export default class App extends Component {

  render() {
    console.log(Camera)
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <WebView
            ref={webview => { this.webview = webview }}
            javaScriptEnabled={true}
            onBridgeMessage={this._onMessage}
            injectedJavaScript={INJECT_SCRIPT}
            source={{uri: 'https://samples.argonjs.io/geopose/index.html'}} //Change to local file or your url
            style={styles.webview}
          />
          
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  }
  onBarCodeRead(e) {
    console.log(
      "Barcode Found!",
      "Type: " + e.type + "\nData: " + e.data
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});