'use strict';

(function () {

  var filter = document.querySelector('.map__filters-container');
  var filterElements = filter.querySelectorAll('select, input');
  var typeSelect = document.querySelector('#housing-type');
  var priceSelect = filter.querySelector('#housing-price');
  var roomsSelect = filter.querySelector('#housing-rooms');
  var guestsSelect = filter.querySelector('#housing-guests');
  var featuresFieldset = filter.querySelector('#housing-features');

  var PINS_MAX = 5;

  var PriceField = {
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

  var RoomsField = {
    1: 1,
    2: 2,
    3: 3,
    ANY: Infinity
  };

  var GuestsField = {
    0: 0,
    1: 1,
    2: 2,
    ANY: Infinity
  };

  var activateFilter = function () {
    filterElements.forEach(function (it) {
      it.disabled = false;
    });

    filter.addEventListener('change', applyFilters);
  };

  var deactivateFilter = function () {
    filterElements.forEach(function (it) {
      it.disabled = true;
    });

    filter.removeEventListener('change', applyFilters);
  };

 var applyFilters = function () {

  window.data.PINS.slice().filter(function (offer) {
      return (
        filterByHouseType(offer)
        && filterByPrice(offer)
        && filterByRoomsQuantity(offer)
        && filterByNumberOfGuests(offer)
        && filterByFeatures(offer)
      );
  });

    var filtrationByPins = filterByHouseType.concat(filterByPrice).concat(filterByRoomsQuantity).concat(filterByNumberOfGuests).concat(filterByFeatures);
    filtrationByPins = filtrationByPins.slice(0, PINS_MAX);

    window.map.removeMapPin();
    window.map.removeMapCard();
    window.data.renderPins(filtrationByPins);
    window.map.onAddPin(filtrationByPins);
  };

  var filterByHouseType = function (it) {
    return it.offer.type === typeSelect.value;
  };

  var filterByPrice = function (it) {
    var price = PriceField[priceSelect.value.toUpperCase()];
    return it.offer.price >= price.MIN && it.offer.price <= price.MAX;
  };

  var filterByRoomsQuantity = function (it) {
    var room = RoomsField[roomsSelect.value.toUpperCase()];
    return it.offer.rooms === room;
  };

  var filterByNumberOfGuests = function (it) {
    var guest = GuestsField[guestsSelect.value.toUpperCase()];
    return it.offer.guests === guest;
  };

  var filterByFeatures = function (it) {
    var checkedFeatures = featuresFieldset.querySelectorAll('input:checked');
    return Array.from(checkedFeatures).every(function (item) {
      return it.offer.features.includes(item.value);
    });
  };

    // var uniquePins = filteredWizards.filter(function (it, i) {
    //   return filteredWizards.indexOf(it) === i;
    // });

  window.filter = {
    activateFilter: activateFilter,
    deactivateFilter: deactivateFilter
  };

})();
