/**
 * @providesModule holaho
 * @flow
 */
'use strict';

var Nativeholaho = require('NativeModules').holaho;

/**
 * High-level docs for the holaho iOS API can be written here.
 */

var holaho = {
  test: function() {
    Nativeholaho.test();
  }
};

module.exports = holaho;
