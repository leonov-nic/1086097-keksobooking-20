'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsList = document.querySelector('.map__pins');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomElement = function (array) {
  var item = array[Math.floor(Math.random() * array.length)];
  return item;
};

var getRandomArray = function (array) {
  var copyArray = array.slice(0, getRandomFromInterval(1, array.length));
  return copyArray;
};

var getAvatar = function (min, max) {
  return 'img/avatars/user0' + getRandomFromInterval(min, max) + '.png';
};

var getTitle = function (array) {
  return getRandomElement(array);
};

var PIN_SIZE = {
  width: 50,
  height: 70
};

var QUANTITY_OF_PINS = 8;

var getLocation = function (min, max, ymin, ymax) {
  return getRandomFromInterval(min, max) - (PIN_SIZE.width / 2) + ', ' + (getRandomFromInterval(ymin, ymax) - PIN_SIZE.height);
};

var LOCATIONMINMAX = {
  X: {
    MIN: 300,
    MAX: 900
  },
  Y: {
    MIN: 130,
    MAX: 630
  }
};

var TITLES = [
  'Крутая хата',
  'Так себе уголок',
  'Уютное гнездышко',
  'Шикарное местечко',
  'Зачахлый домик',
  'Дешево и сердито',
  'Атасный вид',
  'Это не серьезно'
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var DESCRIPTIONS = [
  'офигенный',
  'охрененный',
  'просто улёт'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getOffersOptions = function () {

  return {

    author: {
      avatar: getAvatar(1, 8)
    },

    offer: {
      title: getTitle(TITLES),
      address: getLocation(LOCATIONMINMAX.X.MIN, LOCATIONMINMAX.X.MAX, LOCATIONMINMAX.Y.MIN, LOCATIONMINMAX.Y.MIN),
      price: getRandomFromInterval(1000, 10000),
      type: getRandomArray(TYPES),
      rooms: getRandomFromInterval(1, 4),
      guests: getRandomFromInterval(1, 8),
      checkin: getRandomElement(CHECKIN),
      checkout: getRandomElement(CHECKOUT),
      feature: getRandomArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photo: getRandomArray(PHOTOS)
    },

    location: {
      x: getRandomFromInterval(300, 900),
      y: getRandomFromInterval(130, 630)
    }
  };
};

var getPinsMap = function () {
  var pins = [];

  for (var i = 0; i < QUANTITY_OF_PINS; i++) {
    pins.push(getOffersOptions());
  }
  return pins;
};

var getFilledPin = function (pin) {
  var newPinElement = mapPinTemplate.cloneNode(true);
  newPinElement.style = 'left: ' + pin.location.x + 'px' + '; ' + 'top: ' + pin.location.x + 'px' + ';';
  newPinElement.querySelector('img').src = pin.author.avatar;
  newPinElement.querySelector('img').alt = pin.offer.title;
  return newPinElement;
};

var PINS = [];
PINS = getPinsMap();

var renderPins = function (pins) {

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(getFilledPin(pins[i]));
    pinsList.appendChild(fragment);
  }
  return fragment;
};

renderPins(PINS);

// var getSelectTypeAppartamet = function (types) {

//   var newTypes = [];

//   for (var i = 0; i < types.length; i++) {
//     if (types[i] === 'palace') {
//       types[i] = 'Дворец';
//     } else if (types[i] === 'flat') {
//       types[i] = 'Комната';
//     } else if (types[i] === 'house') {
//       types[i] = 'Дом';
//     } else if (types[i] === 'bungalo') {
//       types[i] = 'Бунгало';
//     }
//     newTypes.push(' ' + types[i]);
//   }
//   return newTypes;
// };

var getSelectTypeAppartamet = function (types) {

  var newTypes = [];

  for (var i = 0; i < types.length; i++) {

    switch (types[i]) {
      case 'palace':
        types[i] = 'Дворец';
        break;
      case 'flat':
        types[i] = 'Комната';
        break;
      case 'house':
        types[i] = 'Дом';
        break;
      case 'bungalo':
        types[i] = 'Бунгало';
        break;
    }

    newTypes.push(' ' + types[i]);
  }
  return newTypes;
};

var filterContainer = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var addFoto = function (fotos) {

  var newArray = [];
  newArray = fotos;
  cardTemplate.querySelector('.popup__photos').querySelector('img').src = fotos[0];

  for (var j = 1; j < newArray.length; j++) {
    var oldFotos = cardTemplate.querySelector('.popup__photos');
    var newFoto = cardTemplate.querySelector('.popup__photos').querySelector('img').cloneNode(true);
    oldFotos.appendChild(newFoto);
    newFoto.src = newArray[j];
  }
// return console.log(oldFotos);
};

addFoto(getPinsMap()[0].offer.photo);

var getNewCard = function (offer) {

  var newCardTemplate = cardTemplate.cloneNode(true);

  newCardTemplate.querySelector('.popup__title').textContent = offer.offer.title;
  newCardTemplate.querySelector('.popup__text--address').textContent = offer.offer.address;
  newCardTemplate.querySelector('.popup__text--price').innerHTML = offer.offer.price + ' &#8381;/ночь';
  newCardTemplate.querySelector('.popup__type').textContent = getSelectTypeAppartamet(offer.offer.type);

  newCardTemplate.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  newCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ' выезд до ' + offer.offer.checkout;
  newCardTemplate.querySelector('.popup__features').textContent = offer.offer.feature;
  newCardTemplate.querySelector('.popup__description').textContent = offer.offer.description;
  // var fotos = offer.offer.photo;
  // newCardTemplate.querySelector('.popup__photos').querySelector('img').src = fotos[0];

  // console.log(fotos[0]);
  // console.log(fotos.length);

  // if (fotos.length > 1) {
  //   for (var j = 0; j < fotos.length - 1; j++) {
  //     var newImg = '<img src="' + fotos[j + 1] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

  //     newCardTemplate.querySelector('.popup__photos').insertAdjacentHTML('beforeend', newImg);
  //   }
  // }
  // newCardTemplate.querySelector('.popup__avatar').src = offer.author.avatar;
  return newCardTemplate;
};


map.appendChild(getNewCard(getPinsMap()[0]), filterContainer);

// console.log(getNewCard(getPinsMap()[0]));
