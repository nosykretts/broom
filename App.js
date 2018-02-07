/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  NativeModules,
  Text,
  View,
  WebView
} from 'react-native';
import Camera from 'react-native-camera';
import {INJECT_SCRIPT} from "./injectScript";

const KEY_FOV = 'fov'
const FOVManager = NativeModules.FOVComponent || NativeModules.FOVModule

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fov: 0
    }
    this.webview = null
    this._onMessage = this._onMessage.bind(this)
    this._sendMessage = this._sendMessage.bind(this)
    this._getFOV = this._getFOV.bind(this)
    this._getFOV()
  }
  render() {
    console.log('rendering', this.state)
    return (
      <View style={styles.container}>
        <View style={{width:100, height:100, backgroundColor: 'yellow'}} >
          <Text>{this.state.fov}</Text>
        </View>

        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          >

          <WebView
            mixedContentMode={'compatibility'}
            ref={webview => { this.webview = webview }}
            javaScriptEnabled={true}
            onMessage={this._onMessage}
            injectedJavaScript={INJECT_SCRIPT}
            source={{uri: 'https://johankasperi.github.io/argon-three-starterkit/'}} //Change to local file or your url
            style={styles.preview}
          />
        </Camera>
      </View>
    );
  }

  _onMessage(msg) {
    console.log('onMessage', msg)
    const decodedMsg = JSON.parse(msg)
    switch (decodedMsg.method) {
      case "initialized":
        this._sendMessage(KEY_FOV, this.state.fov)
        break
    }
  }

  _sendMessage(method, value) {

    if (this.webview) {
      const msg = JSON.stringify({method: method, value: value})
      console.log(msg)
      this.webview.sendToBridge(msg)
    }
  }

  _getFOV() {

    FOVManager.getFOV().then((value) => {
      this.setState({ fov: value })
    }, (error) => {
      console.log(error)
    })
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