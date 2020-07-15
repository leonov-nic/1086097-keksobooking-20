'use strict';

(function () {

  var map = document.querySelector('.map');
  var pinsList = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var PIN_SIZE = {
    width: 50,
    height: 70
  };

  var QUANTITY_OF_PINS = 8;

  var getAvatar = function (min, max) {
    return 'img/avatars/user0' + window.utils.getRandomFromInterval(min, max) + '.png';
  };

  var getTitle = function (array) {
    return window.utils.getRandomElement(array);
  };

  var getLocation = function (min, max, ymin, ymax) {
    return window.utils.getRandomFromInterval(min, max) - (PIN_SIZE.width / 2) + ', ' + (window.utils.getRandomFromInterval(ymin, ymax) - PIN_SIZE.height);
  };

  var LOCATIONMINMAX = {
    X: {
      MIN: 0,
      MAX: 1200
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
        price: window.utils.getRandomFromInterval(1000, 10000),
        type: window.utils.getRandomElement(TYPES),
        rooms: window.utils.getRandomFromInterval(1, 4),
        guests: window.utils.getRandomFromInterval(1, 8),
        checkin: window.utils.getRandomElement(CHECKIN),
        checkout: window.utils.getRandomElement(CHECKOUT),
        feature: window.utils.getRandomArray(FEATURES),
        description: window.utils.getRandomElement(DESCRIPTIONS),
        photo: window.utils.getRandomArray(PHOTOS)
      },

      location: {
        x: window.utils.getRandomFromInterval(300, 900),
        y: window.utils.getRandomFromInterval(130, 630)
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

  var mapPinMain = document.querySelector('.map__pin--main');
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
    mapPinMain.style = 'pointer-events: auto; left: 570px; top: 375px;';
    mapPinMain.style.left = getOffersOptions().location.x - (PIN_SIZE.width / 2) + 'px';
    mapPinMain.style.top = getOffersOptions().location.y - PIN_SIZE.height + 'px';
  };

  var toggle = function (disabled) {
    window.form.activationForm(disabled);
    getPinMainLocation();
    renderPins(PINS);
    addPinHandlers();
    window.form.fullFieldPAdress(mapPinMain);
    window.move.pinMainMove();
  };

  window.map = {
    LOCATIONMINMAX: LOCATIONMINMAX,
    leftMouseButtonPress: leftMouseButtonPress
  };

})();
