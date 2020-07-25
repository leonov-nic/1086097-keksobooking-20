'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var filterContainer = map.querySelector('.map__filters-container');
  var reset = document.querySelector('.ad-form__reset');

  mapPinMain.addEventListener('mouseup', onLeftMouseButtonPress);

  var LEFT_MOUSE_BUTTON = 0;

  function onLeftMouseButtonPress(e) {
    if (e.button === LEFT_MOUSE_BUTTON) {
      toggle(false);
    }
  }

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      toggle(false);
    }
  });

  var onAddPin = function (pins) {
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
      openCard(mapPinsItems[i], pins[i]);
    }
  };

  var onDeactivationMap = function () {
    window.form.deactivationForm();
    deactivationPin(reset);
    removeMapCard();
    window.move.deactivationMainPinMove();
  };

  var removeMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removeMapPin = function () {
    var mapPinsItems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  var deactivationPin = function (evt, newset) {
    var mapPinsItems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');

    mapPinMain.addEventListener('mouseup', onLeftMouseButtonPress);
    mapPinMain.remove();
    map.appendChild(mapPinMain, filterContainer);
    mapPinMain.style.top = window.data.DEFAULT_MAIN_PIN_Y + 'px';
    mapPinMain.style.left = window.data.DEFAULT_MAIN_PIN_X + 'px';
    window.form.addressArrival.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

    if (evt.target === newset) {
      for (var j = 0; mapPinsItems.length > j; j++) {
        mapPinsItems[j].remove();
      }
    }
  };

  var toggle = function (disabled) {
    window.data.renderPins(window.data.PINS);
    window.form.fullFieldPAdress(mapPinMain);
    window.move.activationMainPinMove();
    window.form.activationForm(disabled);
    onAddPin(window.data.PINS);

    window.data.activateFilter();
    reset.removeEventListener('click', onDeactivationMap);
    reset.addEventListener('click', onDeactivationMap);
  };

  window.backend.load(window.data.onLoad, window.modal.addErrorModal);

  window.map = {
    onLeftMouseButtonPress: onLeftMouseButtonPress,
    removeMapPin: removeMapPin,
    removeMapCard: removeMapCard,
    onAddPin: onAddPin
  };

})();
