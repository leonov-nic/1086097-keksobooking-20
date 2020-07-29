'use strict';

(function () {

  var PINS_MAX = 5;

  var filter = document.querySelector('.map__filters-container');
  var filterElements = filter.querySelectorAll('select, input');
  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');

  var PRICE_FIELD = {
    ANY: {
      MIN: 0,
      MAX: Infinity
    },
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  var updateMapPins = function () {

    var filteringPins = applyFilters(window.data.PINS);
    var filteredPins = filteringPins.slice(0, PINS_MAX);

    window.map.removeMapPin();
    window.map.removeMapCard();
    window.data.renderPins(filteredPins);
    window.map.onAddPin(filteredPins);
  };

  var activateFilter = function () {
    filterElements.forEach(function (it) {
      it.disabled = false;
    });

    filter.addEventListener('change', updateMapPins);
  };

  var deactivateFilter = function () {
    filterElements.forEach(function (it) {
      it.disabled = true;
    });

    filter.removeEventListener('change', updateMapPins);
  };

  var resetFilter = function () {
    filterElements.forEach(function (it) {
      it.value = 'any';
    });

    var features = featuresFieldset.querySelectorAll('input');
    features.forEach(function (feature) {
      feature.checked = false;
    });
  };

  var applyFilters = function (pins) {

    return pins
      .filter(filterByHouseType)
      .filter(filterByPrice)
      .filter(filterByRoomsQuantity)
      .filter(filterByNumberOfGuests)
      .filter(filterByFeatures);
  };

  var filterByHouseType = function (it) {
    return it.offer.type === typeSelect.value || typeSelect.value === 'any';
  };

  var filterByPrice = function (it) {
    var price = PRICE_FIELD[priceSelect.value.toUpperCase()];
    return it.offer.price >= price.MIN && it.offer.price <= price.MAX;
  };

  var filterByRoomsQuantity = function (it) {
    return String(it.offer.rooms) === String(roomsSelect.value) || roomsSelect.value === 'any';
  };

  var filterByNumberOfGuests = function (it) {
    return String(it.offer.guests) === String(guestsSelect.value) || guestsSelect.value === 'any';
  };

  var filterByFeatures = function (it) {
    var checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (item) {
      return it.offer.features.includes(item.value);
    });
  };

  window.filter = {
    activateFilter: activateFilter,
    deactivateFilter: deactivateFilter,
    resetFilter: resetFilter
  };

})();
