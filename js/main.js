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

var getRandElement = function (array) {
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
  return getRandElement(array);
};

var PIN_SIZE = {
  width: 50,
  height: 70
};

var getLocation = function (min, max, ymin, ymax) {
  return getRandomFromInterval(min, max) - (PIN_SIZE.width / 2) + ', ' + (getRandomFromInterval(ymin, ymax) - (PIN_SIZE.height / 2));
};

var lOCATIONMINMAX = {
  x: {
    min: 300,
    max: 900
  },
  y: {
    min: 130,
    max: 630
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
      address: getLocation(lOCATIONMINMAX.x.min, lOCATIONMINMAX.x.max, lOCATIONMINMAX.y.min, lOCATIONMINMAX.y.min),
      price: getRandomFromInterval(1000, 10000),
      type: getRandomArray(TYPES),
      rooms: getRandomFromInterval(1, 4),
      guests: getRandomFromInterval(1, 8),
      checkin: getRandElement(CHECKIN),
      checkout: getRandElement(CHECKOUT),
      feature: getRandomArray(FEATURES),
      description: getRandElement(DESCRIPTIONS),
      photo: getRandomArray(PHOTOS)
    },

    location: {
      x: getRandomFromInterval(300, 900),
      y: getRandomFromInterval(130, 630)
    }
  };
};

var getPinMap = function () {
  var pin = {
    pinStyle: 'left: ' + getOffersOptions().location.x + 'px' + '; ' + 'top: ' + getOffersOptions().location.x + 'px' + ';',
    srcAvatar: getOffersOptions().author.avatar,
    altTitle: getOffersOptions().offer.title
  };
  return pin;
};

//         <button class="map__pin map__pin--main" style="left: 570px; top: 375px;">
//           <img src="img/muffin-red.svg" width="40" height="44" draggable="false" alt="Метка объявления">
//           <svg viewBox="0 0 70 70" width="156" height="156" aria-label="Метка для поиска жилья">
//             <defs>
//               <path d="M35,35m-23,0a23,23 0 1,1 46,0a23,23 0 1,1 -46,0" id="tophalf" />
//             </defs>
//             <ellipse cx="35" cy="35" rx="35" ry="35" fill="rgba(255, 86, 53, 0.7)" />
//             <text><textPath xlink:href="#tophalf" startOffset="0">Поставь меня куда-нибудь</textPath></text>
//           </svg>
//         </button>
//             <button type="button" class="map__pin" style="left: 200px; top: 400px;">
//             <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления">
//             </button>

var renderPinMap = function () {
  var newPinElement = mapPinTemplate.cloneNode(true);

  newPinElement.style = getPinMap().pinStyle;
  newPinElement.querySelector('img').src = getPinMap().srcAvatar;
  newPinElement.querySelector('img').alt = getPinMap().altTitle;

  // mapPinTemplate.querySelector('.setup-similar-label').textContent = wizard.wizardName;
  // mapPinTemplate.querySelector('.wizard-coat').style.fill = wizard.wizardCoatColor;
  // mapPinTemplate.querySelector('.wizard-eyes').style.fill = wizard.wizardEyasColor;

  return newPinElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderPinMap());
  pinsList.appendChild(fragment);
}
