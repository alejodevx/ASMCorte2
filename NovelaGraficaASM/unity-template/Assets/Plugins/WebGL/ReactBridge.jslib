// ReactBridge.jslib
// Colócalo en: Assets/Plugins/WebGL/ReactBridge.jslib
// Permite que Unity envíe eventos a la aplicación React que lo contiene.
// React escucha el evento DOM "unity-event" (ver src/config/unity.js → eventName).

mergeInto(LibraryManager.library, {
  SendToReact: function (typePtr, payloadPtr) {
    var type = UTF8ToString(typePtr);
    var payload = UTF8ToString(payloadPtr);
    window.dispatchEvent(new CustomEvent("unity-event", {
      detail: { type: type, payload: payload }
    }));
  }
});

