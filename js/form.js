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
  var listFeatures = document.querySelectorAll('.feature__checkbox');

  var fullCurrentFieldAdress = function (coords) {
    addressArrival.value = coords.x + ', ' + coords.y;
  };

  var deactivationFeaturesOption = function () {
    for (var i = 0; i < listFeatures.length; i++) {
      listFeatures[i].checked = false;
    }
  };

  var deactivation = function () {
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = true;
    }
    adFormHeaderFieldset.disabled = true;
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapForm.classList.add('ad-form--disabled');

    numberOfRooms.value = '1';
    numberOfGuests.value = '1';
    priceOfAccommodation.value = '';
    priceOfAccommodation.min = 5000;
    priceOfAccommodation.placeholder = '5000';
    typeOfAccommodation.value = 'flat';
    timeIn.value = '12:00';
    advertisementTitle.value = '';
    objectDescription.value = '';
    addressArrival.value = '';
    deactivationFeaturesOption();

    window.filter.deactivateFilter();

    window.loadImage.deactivationImages();
    var defaultCoords = window.move.getMainPinDefaultCoords();
    fullCurrentFieldAdress(defaultCoords);

    adForm.removeEventListener('submit', onSubmit);
  };

  deactivation();

  var activation = function (disabled) {
    for (var i = 0; i < adFormFieldset.length; i++) {
      adFormFieldset[i].disabled = disabled;
    }
    adFormHeaderFieldset.removeAttribute('disabled', 'disabled');
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapForm.classList.remove('ad-form--disabled');
  };

  var clean = function () {
    numberOfRooms.value = '1';
    numberOfGuests.value = '1';
    typeOfAccommodation.value = 'flat';
    priceOfAccommodation.value = '';
    timeIn.value = '12:00';
    advertisementTitle.value = '';
    objectDescription.value = '';
    deactivationFeaturesOption();
  };

  var GuestsRooms = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
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

  var MIN_PRICE_ZERO = 0;
  var MIN_PRICE_ZERO_PLACEHOLDER = '0';
  var MIN_PRICE_THOUSAND = 1000;
  var MIN_PRICE_THOUSAND_PLACEHOLDER = '1000';
  var MIN_PRICE_FIVE_THOUSAND = 5000;
  var MIN_PRICE_FIVE_THOUSAND_PLACEHOLDER = '5000';
  var MIN_PRICE_TEN_THOUSAND = 10000;
  var MIN_PRICE_TEN_THOUSAND_PLACEHOLDER = '10000';

  typeOfAccommodation.addEventListener('change', function (evt) {
    switch (evt.target.value) {
      case 'bungalo':
        priceOfAccommodation.min = MIN_PRICE_ZERO;
        priceOfAccommodation.placeholder = MIN_PRICE_ZERO_PLACEHOLDER;
        break;
      case 'flat':
        priceOfAccommodation.min = MIN_PRICE_THOUSAND;
        priceOfAccommodation.placeholder = MIN_PRICE_THOUSAND_PLACEHOLDER;
        break;
      case 'house':
        priceOfAccommodation.min = MIN_PRICE_FIVE_THOUSAND;
        priceOfAccommodation.placeholder = MIN_PRICE_FIVE_THOUSAND_PLACEHOLDER;
        break;
      case 'palace':
        priceOfAccommodation.min = MIN_PRICE_TEN_THOUSAND;
        priceOfAccommodation.placeholder = MIN_PRICE_TEN_THOUSAND_PLACEHOLDER;
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

  var onSubmit = function (evt) {
    window.backend.save(new FormData(adForm), window.modal.addSuccessModal, window.modal.addErrorModal);
    evt.preventDefault();
  };

  adForm.addEventListener('submit', onSubmit);

  window.form = {
    activation: activation,
    deactivation: deactivation,
    clean: clean,
    fullFieldPAdress: fullFieldPAdress,
    fullCurrentFieldAdress: fullCurrentFieldAdress,
    addressArrival: addressArrival
  };

})();

