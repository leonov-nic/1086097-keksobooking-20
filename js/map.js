'use strict';

(function () {

  var LEFT_MOUSE_BUTTON = 0;
  var QUANTITY_OF_CARDS = 1;
  var KEY_ENTER = 'Enter';

  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var filterContainer = map.querySelector('.map__filters-container');
  var reset = document.querySelector('.ad-form__reset');

  mapPinMain.addEventListener('mouseup', onLeftMouseButtonPress);

  function onLeftMouseButtonPress(e) {
    if (e.button === LEFT_MOUSE_BUTTON) {
      window.backend.load(function (data) {
        window.data.onLoad(data);
        toggle(false);
      }, window.modal.addErrorModal);
    }
  }

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === KEY_ENTER) {
      window.backend.load(function (data) {
        window.data.onLoad(data);
        toggle(false);
      }, window.modal.addErrorModal);
    }
  });

  var onAddPin = function (pins) {
    var mapPinsItems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');

    var openCard = function (item, pin) {

      item.addEventListener('click', function () {
        for (var i = 0; mapPinsItems.length > i; i++) {
          mapPinsItems[i].classList.remove('map__pin--active');
        }
        item.classList.add('map__pin--active');
        map.appendChild(window.data.getNewCard(pin), filterContainer);
        var mapCards = document.querySelectorAll('.popup');
        if (mapCards.length > QUANTITY_OF_CARDS) {
          mapCards[0].remove();
        }
      });
    };

    for (var i = 0; i < mapPinsItems.length; i++) {
      openCard(mapPinsItems[i], pins[i]);
    }
  };

  var onDeactivationMap = function () {
    window.form.deactivation();
    deactivationPin(reset);
    removeMapCard();
    window.move.deactivationMainPinMove();
    window.filter.resetFilter();
  };

  var removeMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removeMapPin = function () {
    var mapPinsitems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');
    mapPinsitems.forEach(function (it) {
      it.remove();
    });
  };

  var deactivationPin = function (evt, newset) {
    var mapPinsitems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');

    mapPinMain.addEventListener('mouseup', onLeftMouseButtonPress);
    mapPinMain.remove();
    map.appendChild(mapPinMain, filterContainer);
    mapPinMain.style.top = window.data.DEFAULT_MAIN_PIN_Y + 'px';
    mapPinMain.style.left = window.data.DEFAULT_MAIN_PIN_X + 'px';
    window.form.addressArrival.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

    if (evt.target === newset) {
      for (var i = 0; mapPinsitems.length > i; i++) {
        mapPinsitems[i].remove();
      }
    }
  };

  var toggle = function (disabled) {
    window.data.renderPins(window.data.PINS);
    window.form.fullFieldPAdress(mapPinMain);
    window.move.activationMainPinMove();
    window.form.activation(disabled);
    onAddPin(window.data.PINS);

    window.filter.activateFilter();

    reset.removeEventListener('click', onDeactivationMap);
    reset.addEventListener('click', onDeactivationMap);
  };

  window.filter.deactivateFilter();

  window.map = {
    onLeftMouseButtonPress: onLeftMouseButtonPress,
    removeMapPin: removeMapPin,
    removeMapCard: removeMapCard,
    onAddPin: onAddPin,
    onDeactivationMap: onDeactivationMap
  };

})();
