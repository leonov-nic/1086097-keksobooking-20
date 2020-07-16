'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var filterContainer = map.querySelector('.map__filters-container');

  mapPinMain.addEventListener('mouseup', leftMouseButtonPress);

  var LEFT_MOUSE_BUTTON = 0;

  function leftMouseButtonPress(e) {
    if (e.button === LEFT_MOUSE_BUTTON) {
      toggle(false);
    }
  }

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      toggle(false);
    }
  });

  var addPinHandlers = function () {
    var mapPinsItems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');

    var openCard = function (item, pin) {

      item.addEventListener('click', function () {

        for (var j = 0; mapPinsItems.length > j; j++) {
          mapPinsItems[j].classList.remove('map__pin--active');
        }
        item.classList.add('map__pin--active');
        map.appendChild(window.data.getNewCard(pin), filterContainer);
        var mapCards = document.querySelectorAll('.popup');

        if (mapCards.length > 1) {
          mapCards[0].remove();
        }

      });
    };

    for (var i = 0; i < mapPinsItems.length; i++) {
      openCard(mapPinsItems[i], window.data.PINS[i]);
    }
  };

  var reset = document.querySelector('.ad-form__reset');

  var deactivationMap = function () {
    reset.addEventListener('click', function () {
      window.form.deactivationForm();
      deactivationPin(reset);
    });
  };

  var deactivationPin = function (evt, newset) {
    var mapPinsItems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    var mapCard = document.querySelector('.map__card');

    mapPinMain.removeEventListener('mousedown', window.move.mouseMove);

    mapPinMain.addEventListener('mouseup', leftMouseButtonPress);
    mapPinMain.remove();
    map.appendChild(mapPinMain, filterContainer);
    mapPinMain.style = 'pointer-events: auto; left: 570px; top: 375px;';
    window.form.addressArrival.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

    if (evt.target === newset) {
      for (var j = 0; mapPinsItems.length > j; j++) {
        mapPinsItems[j].remove();
      }
    } else if (mapCard) {
      mapCard.remove();
    }
  };

  var toggle = function (disabled) {
    window.form.activationForm(disabled);
    window.data.renderPins(window.data.PINS);
    addPinHandlers();
    window.form.fullFieldPAdress(mapPinMain);
    window.move.pinMainMove();

    deactivationMap();
  };

  window.map = {
    leftMouseButtonPress: leftMouseButtonPress
  };

})();
