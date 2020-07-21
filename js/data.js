'use strict';

(function () {

  var pinsList = document.querySelector('.map__pins');

  var mapPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // var PIN_SIZE = {
  //   width: 50,
  //   height: 70
  // };

  var DEFAULT_MAIN_PIN_X = 570;
  var DEFAULT_MAIN_PIN_Y = 375;

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

  var PINS = [];

  var onLoad = function (pins) {
    // console.log(pins);
    for (var i = 0; i < pins.length; i++) {
      PINS.push(pins[i]);
    }
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; margin: 80px; text-align: center; background-color: black; padding: 50px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var getFilledPin = function (pin) {
    var newPinElement = mapPinTemplate.cloneNode(true);
    newPinElement.style = 'left: ' + pin.location.x + 'px' + '; ' + 'top: ' + pin.location.y + 'px' + ';';
    newPinElement.querySelector('img').src = pin.author.avatar;
    newPinElement.querySelector('img').alt = pin.offer.title;
    return newPinElement;
  };

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
        return 'Дворец';
      case 'flat':
        return 'Комната';
      case 'house':
        return 'Дом';
      case 'bungalo':
        return 'Бунгало';
    }
    return '';
  };

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

  var getFeatures = function (types) {

    var cardTypeTemplate = cardTemplate.querySelector('.popup__feature');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < types.length; i++) {
      if (types.length > 0) {
        var newCardType = cardTypeTemplate.cloneNode();
        newCardType.className = 'popup__feature' + ' ' + 'popup__feature--' + types[i];
        fragment.appendChild(newCardType);
      }
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
    listNewFeatures.appendChild(getFeatures(offer.offer.features));

    newCardTemplate.querySelector('.popup__description').textContent = offer.offer.description;

    var listPhotos = newCardTemplate.querySelector('.popup__photos');
    newCardTemplate.replaceChild(listPhotos.cloneNode(), listPhotos);
    var listNewPhotos = newCardTemplate.querySelector('.popup__photos');
    listNewPhotos.appendChild(getPhotoAppartamet(offer.offer.photos));

    newCardTemplate.querySelector('.popup__avatar').src = offer.author.avatar;

    var close = newCardTemplate.querySelector('.popup__close');

    var onPopupEscPress = function (evt) {
      window.utils.isEscPress(evt, closePopup);
    };

    var closePopup = function () {
      newCardTemplate.remove();
      removePinActive(close);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    document.addEventListener('keydown', onPopupEscPress);

    close.addEventListener('keydown', function (evt) {
      window.utils.isEnterPress(evt, closePopup);
    });

    close.addEventListener('click', function () {
      closePopup();
    });

    return newCardTemplate;
  };

  window.data = {
    PINS: PINS,
    onLoad: onLoad,
    onError: onError,
    DEFAULT_MAIN_PIN_X: DEFAULT_MAIN_PIN_X,
    DEFAULT_MAIN_PIN_Y: DEFAULT_MAIN_PIN_Y,
    LOCATIONMINMAX: LOCATIONMINMAX,
    renderPins: renderPins,
    getNewCard: getNewCard
  };

})();
