'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinsList = document.querySelector('.map__pins');

var mapPinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var OffersOptions = {

  AUTHOR: {
    AVATAR: 'img/avatars/user0'NUMBERFOTO'.png'
  },

  OFFER: {
    TITLE: [
      'Крутая хата',
      'Так себе уголок',
      'Уютное гнездышко',
      'Шикарное местечко',
      'Зачахлый домик',
      'Дешево и сердито',
      'Атасный вид',
      'Это не серьезно'
    ],
    ADDRESS: {
      LOCATION.X: "",
      LOCATION.Y: ""
    },
    PRICE: {
      MIN: 1000,
      MAX: 10000
    },
    TYPE: [
      'palace',
      'flat',
      'house',
      'bungalo'
    ],
    ROOMS: {
    MIN: 1,
    MAX: 4
    },
    GUESTS: {
      MIN: 1,
      MAX: 8
    },
    CHECKIN: [
      '12:00',
      '13:00',
      '14:00'
    ],
    CHECKOUT: [
      '12:00',
      '13:00',
      '14:00'
    ],
    FEATURES: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],
    DESCRIPTION: [
      'офигенный',
      'охрененный',
      'просто улёт'
    ],
    PHOTOS: [
      'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
    ]
  },

  LOCATION: {
    X: {
      MIN: 100,
      MAX: 800
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  },

  NUMBERFOTO: {
    MIN: 1,
    MAX: 8
  }
};

var PIN_SIZE = {
  WIDTH: 50,
  HEIGHT: 70
};

var getRandomFromInterval = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
