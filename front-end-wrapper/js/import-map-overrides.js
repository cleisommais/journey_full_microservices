(function () {
  'use strict';

  var localStoragePrefix = 'import-map-override:';
  window.importMapOverrides = {
    addOverride: function addOverride(moduleName, url) {
      var key = localStoragePrefix + moduleName;
      localStorage.setItem(key, url);
      return window.importMapOverrides.getOverrideMap();
    },
    getOverrideMap: function getOverrideMap() {
      var overrides = {
        imports: {}
      };

      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);

        if (key.startsWith(localStoragePrefix)) {
          overrides.imports[key.slice(localStoragePrefix.length)] = localStorage.getItem(key);
        }
      }

      return overrides;
    },
    removeOverride: function removeOverride(moduleName) {
      var key = localStoragePrefix + moduleName;
      var hasItem = localStorage.getItem(key) !== null;
      localStorage.removeItem(key);
      return hasItem;
    },
    resetOverrides: function resetOverrides() {
      Object.keys(window.importMapOverrides.getOverrideMap().imports).map(function (moduleName) {
        window.importMapOverrides.removeOverride(moduleName);
      });
      return window.importMapOverrides.getOverrideMap();
    }
  };
  var overrideMap = window.importMapOverrides.getOverrideMap();

  if (Object.keys(overrideMap.imports).length > 0) {
    var importMapMetaElement = document.querySelector('meta[name="importmap-type"]');
    var scriptType = importMapMetaElement ? importMapMetaElement.getAttribute('content') : 'import-map';
    var overrideMapElement = document.createElement('script');
    overrideMapElement.type = scriptType;
    overrideMapElement.id = 'import-map-overrides'; // just for debugging -- easier to find in html with an ID

    overrideMapElement.innerHTML = JSON.stringify(overrideMap);
    var importMaps = document.querySelectorAll("script[type=\"".concat(scriptType, "\"]"));

    if (importMaps.length > 0) {
      importMaps[importMaps.length - 1].insertAdjacentElement('afterend', overrideMapElement);
    } else {
      document.head.appendChild(overrideMapElement);
    }
  }

}());
