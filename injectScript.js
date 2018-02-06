export const INJECT_SCRIPT = `
  (function () {
    if (WebViewBridge) {
      var bridge = document.getElementById("native-bridge");
      var initMsg = JSON.stringify({"method": "initialized", "value": true});
      var initEvent = new CustomEvent('message', { 'detail': initMsg });
      WebViewBridge.send('{"method": "initialized"}');
      bridge.addEventListener('sendMessage', function (e) {
        WebViewBridge.send(e.detail);
      }, false);
      WebViewBridge.onMessage = function (message) {
        var event = new CustomEvent('message', { 'detail': message });
        bridge.dispatchEvent(event);
      };
      bridge.dispatchEvent(initEvent);
    }
  }());
`;