'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormHeaderFieldset = document.querySelector('.ad-form-header');
  var adFormFieldset = document.querySelectorAll('.ad-form__element');
  var mapForm = document.querySelector('.map__filters');
  var addressArrival = document.querySelector('#address');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var typeOfAccommodation = document.querySelector('#type');
  var priceOfAccommodation = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var numberOfRooms = document.querySelector('#room_number');
  var numberOfGuests = document.querySelector('#capacity');
  var advertisementTitle = document.querySelector('#title');
  var objectDescription = document.querySelector('#description');

  var fullCurrentFieldAdress = function (coords) {
    addressArrival.value = coords.x + ', ' + coords.y;
  };

  var deactivationForm = function () {
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = true;
    }
    adFormHeaderFieldset.disabled = true;
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('ad-form--disabled');

    numberOfRooms.value = '1';
    numberOfGuests.value = '3';
    typeOfAccommodation.value = 'flat';
    timeIn.value = '12:00';
    advertisementTitle.value = '';
    objectDescription.value = '';

    window.loadImage.deactivationImages();
    var defaultCoords = window.move.getMainPinDefaultCoords();
    fullCurrentFieldAdress(defaultCoords);
  };

  deactivationForm();

  var activationForm = function (disabled) {
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = disabled;
    }
    adFormHeaderFieldset.removeAttribute('disabled', 'disabled');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('ad-form--disabled');
  };

  var GuestsRooms = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var validateField = function (target) {
    numberOfRooms.setCustomValidity('');
    numberOfGuests.setCustomValidity('');
    if (!GuestsRooms[numberOfRooms.value].includes(numberOfGuests.value)) {
      target.setCustomValidity('Количество не соотвествует');
    } else {
      target.setCustomValidity('');
    }
  };

  var setField = function (evt) {
    if (evt.target === numberOfRooms || evt.target === numberOfGuests) {
      validateField(evt.target);
    }
  };

  adForm.addEventListener('change', setField);

  typeOfAccommodation.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        priceOfAccommodation.min = 0;
        priceOfAccommodation.placeholder = '0';
        break;
      case 'flat':
        priceOfAccommodation.min = 1000;
        priceOfAccommodation.placeholder = '1000';
        break;
      case 'house':
        priceOfAccommodation.min = 5000;
        priceOfAccommodation.placeholder = '5000';
        break;
      case 'palace':
        priceOfAccommodation.min = 10000;
        priceOfAccommodation.placeholder = '10000';
        break;
    }
  });

  addressArrival.placeholder = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

  var fullFieldPAdress = function () {
    addressArrival.placeholder = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
  };

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  window.form = {
    activationForm: activationForm,
    deactivationForm: deactivationForm,
    fullFieldPAdress: fullFieldPAdress,
    fullCurrentFieldAdress: fullCurrentFieldAdress,
    addressArrival: addressArrival
  };

})();
