'use strict';

var map = document.querySelector('.map');
// map.classList.remove('map--faded');

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
      type: getRandomElement(TYPES),
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

// renderPins(PINS);

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

var getTypeAppartamet = function (type) {

  switch (type) {
    case 'palace':
      type = 'Дворец';
      break;
    case 'flat':
      type = 'Комната';
      break;
    case 'house':
      type = 'Дом';
      break;
    case 'bungalo':
      type = 'Бунгало';
      break;
  }
  return type;
};

// var getTypeAppartamet = function (types) {

//   var newTypes = [];

//   for (var i = 0; i < types.length; i++) {

//     switch (types[i]) {
//       case 'palace':
//         types[i] = 'Дворец';
//         break;
//       case 'flat':
//         types[i] = 'Комната';
//         break;
//       case 'house':
//         types[i] = 'Дом';
//         break;
//       case 'bungalo':
//         types[i] = 'Бунгало';
//         break;
//     }

//     newTypes.push(' ' + types[i]);
//   }
//   return newTypes;
// };

var filterContainer = map.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getPhotoAppartamet = function (photos) {

  var cardPhotoTemplate = cardTemplate.querySelector('.popup__photos').querySelector('img');
  var fragment = document.createDocumentFragment();

  for (var j = 0; j < photos.length; j++) {
    var newCardPhoto = cardPhotoTemplate.cloneNode(true);
    newCardPhoto.src = photos[j];
    fragment.appendChild(newCardPhoto);
  }
  return fragment;
};

var getFeatures = function (features) {
  var cardTypeTemplate = cardTemplate.querySelector('.popup__feature');

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < features.length; i++) {
    var newCardType = cardTypeTemplate.cloneNode();
    newCardType.className = 'popup__feature' + ' ' + 'popup__feature--' + features[i];
    fragment.appendChild(newCardType);
  }
  return fragment;
};

var removePinActive = function (evt, close) {
  var mapPinsItems = document.querySelectorAll('button.map__pin:not(.map__pin--main)');

  if (evt.target === close) {
    for (var j = 0; mapPinsItems.length > j; j++) {
      mapPinsItems[j].classList.remove('map__pin--active');
    }
  }
};

var getNewCard = function (offer) {

  var newCardTemplate = cardTemplate.cloneNode(true);

  newCardTemplate.querySelector('.popup__title').textContent = offer.offer.title;
  newCardTemplate.querySelector('.popup__text--address').textContent = offer.offer.address;
  newCardTemplate.querySelector('.popup__text--price').textContent = offer.offer.price + ' ₽/ночь';
  newCardTemplate.querySelector('.popup__type').textContent = getTypeAppartamet(offer.offer.type);

  newCardTemplate.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
  newCardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ' выезд до ' + offer.offer.checkout;

  var listFeatures = newCardTemplate.querySelector('.popup__features');
  newCardTemplate.replaceChild(listFeatures.cloneNode(), listFeatures);
  var listNewFeatures = newCardTemplate.querySelector('.popup__features');
  listNewFeatures.appendChild(getFeatures(offer.offer.feature));

  newCardTemplate.querySelector('.popup__description').textContent = offer.offer.description;

  var listPhotos = newCardTemplate.querySelector('.popup__photos');
  newCardTemplate.replaceChild(listPhotos.cloneNode(), listPhotos);
  var listNewPhotos = newCardTemplate.querySelector('.popup__photos');
  listNewPhotos.appendChild(getPhotoAppartamet(offer.offer.photo));

  newCardTemplate.querySelector('.popup__avatar').src = offer.author.avatar;

  // ЧЕТВЕРТОЕ ЗАДАНИЕ 4/2

  var close = newCardTemplate.querySelector('.popup__close');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    newCardTemplate.remove();
    removePinActive(close);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  document.addEventListener('keydown', onPopupEscPress);

  close.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      closePopup();
    }
  });

  close.addEventListener('click', function () {
    closePopup();
  });

  return newCardTemplate;
};

// ДОБАВЛЕНИЕ НЕСКОЛЬКИХ КАРТОЧЕК

// var renderCards = function () {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < PINS.length; i++) {
//     fragment.appendChild(getNewCard(PINS[i]));
//     // var mapCards = document.querySelector('.popup');
//   }

//   map.appendChild(fragment, filterContainer);
//   var mapCard = document.querySelectorAll('.popup');
//   mapCard.style = 'display: none;';
// };
// map.appendChild(getNewCard(PINS[0]), filterContainer);

// ЧЕТВЕРТОЕ ДЗ

var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeaderFieldset = document.querySelector('.ad-form-header');
var adFormFieldset = document.querySelectorAll('.ad-form__element');
var mapForm = document.querySelector('.map__filters');

adFormHeaderFieldset.disabled = true;
adFormFieldset.disabled = true;
adForm.classList.add('ad-form--disabled');
mapForm.classList.add('ad-form--disabled');

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
      map.appendChild(getNewCard(pin), filterContainer);
      var mapCards = document.querySelectorAll('.popup');

      if (mapCards.length > 1) {
        mapCards[0].remove();
      }

    });
  };

  for (var i = 0; i < mapPinsItems.length; i++) {
    openCard(mapPinsItems[i], PINS[i]);
  }
};

var getPinMainLocation = function () {
  mapPinMain.style = 'pointer-events: none; left: 570px; top: 375px;';
  mapPinMain.style.left = getOffersOptions().location.x - (PIN_SIZE.width / 2) + 'px';
  mapPinMain.style.top = getOffersOptions().location.y - PIN_SIZE.height + 'px';

  // console.log(mapPinMain);
};

var activationForm = function (disabled) {
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].disabled = disabled;
  }
  adFormHeaderFieldset.removeAttribute('disabled', 'disabled');
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('ad-form--disabled');
};

var toggle = function (disabled) {
  activationForm(disabled);
  getPinMainLocation();
  renderPins(PINS);
  addPinHandlers();
  fullFieldPAdress();
  dragMainPin();
};

var GuestsRooms = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

var numberOfRooms = document.querySelector('#room_number');
var numberOfGuests = document.querySelector('#capacity');

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

// ДАЛЬШЕ ВАЛИДАЦИЯ ПО ЗАДАНИЮ 4/2

var typeOfAccommodation = document.querySelector('#type');
var priceOfAccommodation = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var addressArrival = document.querySelector('#address');

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

var fullFieldPAdress = function () {
  addressArrival.placeholder = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
};


timeIn.addEventListener('change', function (evt) {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', function (evt) {
  timeIn.value = evt.target.value;
});

// var TimesInOut = {
//   '12:00': ['12:00'],
//   '13:00': ['13:00'],
//   '14:00': ['14:00']
// };

// timeIn.addEventListener('change', function (evt) {
//   if (!TimesInOut[timeIn.value].includes(timeOut.value)) {
//     timeOut.value = timeIn.value;
//   }
// });

// timeOut.addEventListener('change', function (evt) {
//   if (!TimesInOut[timeOut.value].includes(timeIn.value)) {
//     timeIn.value = timeOut.value;
//   }
// });

var dragMainPin = function () {

  mapPinMain.draggable = true;
  mapPinMain.addEventListener('mousedown', function () {

  });
};
