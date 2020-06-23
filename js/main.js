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

var getFilledPin = function () {

  for (var i = 0; i < getPinsMap().length; i++) {

    var newPinElement = mapPinTemplate.cloneNode(true);

    newPinElement.style = 'left: ' + getPinsMap()[i].location.x + 'px' + '; ' + 'top: ' + getPinsMap()[i].location.x + 'px' + ';';
    newPinElement.querySelector('img').src = getPinsMap()[i].author.avatar;
    newPinElement.querySelector('img').alt = getPinsMap()[i].offer.title;
  }
  return newPinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  fragment.appendChild(getFilledPin());
  pinsList.appendChild(fragment);
}
