'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 1000;

  window.utils = {

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    },

    getRandomFromInterval: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getRandomElement: function (array) {
      var item = array[Math.floor(Math.random() * array.length)];
      return item;
    },

    getRandomArray: function (array) {
      var copyArray = array.slice(0, window.utils.getRandomFromInterval(1, array.length));
      return copyArray;
    },

    getRandomElementArray: function (array) {
      var rand = Math.floor(Math.random() * array.length);
      return array[rand];
    },

    isEscPress: function (evt, action) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        action();
      }
    },

    isEnterPress: function (evt, action) {
      if (evt.key === 'Enter') {
        action();
      }
    }

  };

})();
