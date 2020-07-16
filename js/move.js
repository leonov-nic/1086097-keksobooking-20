'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');

  var pinMainMove = function () {
    mapPinMain.removeEventListener('mouseup', window.map.leftMouseButtonPress);

    var SMALL_PIN_SIZE = {
      width: 40,
      height: 65
    };

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMove = function (evtMove) {
        evtMove.preventDefault();

        var shift = {
          x: startCoords.x - evtMove.clientX,
          y: startCoords.y - evtMove.clientY
        };

        startCoords = {
          x: evtMove.clientX,
          y: evtMove.clientY
        };

        var mapPinMainPosition = {
          x: mapPinMain.offsetLeft - shift.x,
          y: mapPinMain.offsetTop - shift.y
        };

        // console.log(mapPinMain.offsetHeight);

        var Border = {
          TOP: window.map.LOCATIONMINMAX.Y.MIN,
          BOTTOM: window.map.LOCATIONMINMAX.Y.MAX - mapPinMain.offsetHeight,
          LEFT: window.map.LOCATIONMINMAX.X.MIN,
          RIGHT: window.map.LOCATIONMINMAX.X.MAX - mapPinMain.offsetWidth
        };

        if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
          mapPinMain.style.left = mapPinMainPosition.x + 'px';
        }
        if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
          mapPinMain.style.top = mapPinMainPosition.y + 'px';
        }
        var mapPinMainCeilCoords = {
          x: Math.ceil(mapPinMainPosition.x + (SMALL_PIN_SIZE.width / 2)),
          y: mapPinMainPosition.y + SMALL_PIN_SIZE.height
        };

        window.form.fullCurrentFieldAdress(mapPinMainCeilCoords);
      };

      var onMouseUp = function (evtUp) {
        evtUp.preventDefault();
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseup', onMouseUp);

    });
  };

  window.move = {


    pinMainMove: pinMainMove
  };

})();
