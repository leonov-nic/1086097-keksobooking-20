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
      removeMapCard();
      window.move.deactivationMainPinMove();

    });
  };

  var removeMapCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var deactivationPin = function (evt, newset) {
    var mapPinsItems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');

    mapPinMain.removeEventListener('mousedown', evt);
    document.removeEventListener('mousemove', window.move.mouseMove);
    document.removeEventListener('mouseup', window.move.onMouseUp);

    mapPinMain.addEventListener('mouseup', leftMouseButtonPress);
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
    window.form.activationForm(disabled);
    window.data.renderPins(window.data.PINS);
    addPinHandlers();
    window.form.fullFieldPAdress(mapPinMain);

    window.move.activationMainPinMove();
    deactivationMap();
    window.modal.addSuccessModal();
  };

  window.map = {
    leftMouseButtonPress: leftMouseButtonPress
  };

  //   var deactivateMap = function () {
  //   map.classList.add('map--faded');

  //   mapPinMain.style.top = DEFAULT_MAIN_PIN_Y - PinSize.HEIGHT / 2 + 'px';
  //   mapPinMain.style.left = DEFAULT_MAIN_PIN_X - PinSize.WIDTH / 2 + 'px';
  //   mapPinMain.addEventListener('mousedown', onMapPinMainMouseDown);
  // };

  //   var onMapPinMainMouseDown = function () {
  //   activateMap();
  //   window.form.activate();
  //   mapPinMain.removeEventListener('mousedown', onMapPinMainMouseDown);
  // };

})();
