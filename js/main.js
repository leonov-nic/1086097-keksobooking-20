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
  ' flat',
  ' house',
  ' bungalo'
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
  ' dishwasher',
  ' parking',
  ' washer',
  ' elevator',
  ' conditioner'
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

var getSelectType = function (element) {
  if (element.querySelector('.popup__type').textContent === 'palace') {
    element.querySelector('.popup__type').textContent = 'Дворец';
  } else if (element.querySelector('.popup__type').textContent === 'palace, flat') {
    element.querySelector('.popup__type').textContent = 'Дворец, ' + 'Комната';
  } else if (element.querySelector('.popup__type').textContent === 'palace, flat, house') {
    element.querySelector('.popup__type').textContent = 'Дворец, ' + 'Комната, ' + 'Дом';
  } else if (element.querySelector('.popup__type').textContent === 'palace, flat, house, bungalo') {
    element.querySelector('.popup__type').textContent = 'Дворец, ' + 'Комната, ' + 'Дом, ' + 'Бунгало';
  }
};

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var newCardTemplate = cardTemplate.cloneNode(true);

newCardTemplate.querySelector('.popup__title').textContent = getPinsMap()[0].offer.title;
newCardTemplate.querySelector('.popup__text--address').textContent = getPinsMap()[0].offer.address;
newCardTemplate.querySelector('.popup__text--price').innerHTML = getPinsMap()[0].offer.price + ' &#8381;/ночь';
newCardTemplate.querySelector('.popup__type').textContent = getPinsMap()[0].offer.type;
getSelectType(newCardTemplate);
newCardTemplate.querySelector('.popup__text--capacity').textContent = getPinsMap()[0].offer.rooms + ' комнаты для ' + getPinsMap()[0].offer.guests + ' гостей';
newCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + getPinsMap()[0].offer.checkin + ' выезд до ' + getPinsMap()[0].offer.checkout;
newCardTemplate.querySelector('.popup__features').textContent = getPinsMap()[0].offer.feature;
newCardTemplate.querySelector('.popup__description').textContent = getPinsMap()[0].offer.description;

var arrayFotos = getPinsMap()[0].offer.photo;
newCardTemplate.querySelector('.popup__photos').querySelector('img').src = arrayFotos[0];
// console.log(arrayFotos[0]);
// console.log(arrayFotos.length);
if (arrayFotos.length > 1) {
  for (var j = 0; j < arrayFotos.length - 1; j++) {
    var newImg = '<img src="' + arrayFotos[j + 1] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';

    newCardTemplate.querySelector('.popup__photos').insertAdjacentHTML('beforeend', newImg);
  }
}
newCardTemplate.querySelector('.popup__avatar').src = getPinsMap()[0].author.avatar;


var filterContainer = map.querySelector('.map__filters-container');

map.appendChild(newCardTemplate, filterContainer);

// console.log(newCardTemplate);
