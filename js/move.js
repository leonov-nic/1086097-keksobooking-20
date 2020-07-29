'use strict';

(function () {

  var smallPinSize = {
    width: 65,
    height: 65,
    pointer: 22
  };

  var mapPinMain = document.querySelector('.map__pin--main');

  var activationMainPinMove = function () {
    mapPinMain.removeEventListener('mouseup', window.map.onLeftMouseButtonPress);
    mapPinMain.addEventListener('mousedown', onMouseMoveUp);
  };

  var deactivationMainPinMove = function () {
    mapPinMain.removeEventListener('mousedown', onMouseMoveUp);
    mapPinMain.addEventListener('mouseup', window.map.onLeftMouseButtonPress);
  };

  var onMouseMoveUp = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (evtMove) {
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

      var Border = {
        TOP: window.data.LOCATIONMINMAX.y.min - mapPinMain.offsetHeight - smallPinSize.pointer,
        BOTTOM: window.data.LOCATIONMINMAX.y.max - mapPinMain.offsetHeight - smallPinSize.pointer,
        LEFT: window.data.LOCATIONMINMAX.x.min,
        RIGHT: window.data.LOCATIONMINMAX.x.max - mapPinMain.offsetWidth
      };

      if (mapPinMainPosition.x >= Border.LEFT && mapPinMainPosition.x <= Border.RIGHT) {
        mapPinMain.style.left = mapPinMainPosition.x + 'px';
      }
      if (mapPinMainPosition.y >= Border.TOP && mapPinMainPosition.y <= Border.BOTTOM) {
        mapPinMain.style.top = mapPinMainPosition.y + 'px';
      }
      var mapPinMainCeilCoords = {
        x: Math.ceil(mapPinMainPosition.x + (smallPinSize.width / 2)),
        y: mapPinMainPosition.y + smallPinSize.height + smallPinSize.pointer
      };

      window.form.fullCurrentFieldAdress(mapPinMainCeilCoords);
    };

    var onMouseUp = function (evtUp) {
      evtUp.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var getMainPinDefaultCoords = function () {
    return {
      x: window.data.DEFAULT_MAIN_PIN_X,
      y: window.data.DEFAULT_MAIN_PIN_Y
    };
  };

  window.move = {
    activationMainPinMove: activationMainPinMove,
    deactivationMainPinMove: deactivationMainPinMove,
    getMainPinDefaultCoords: getMainPinDefaultCoords
  };

})();
