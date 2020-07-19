'use strict';

(function () {

  var main = document.querySelector('main');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
    .content
    .querySelector('.error');

  var addSuccessModal = function () {
    main.appendChild(successTemplate);
    var popup = document.querySelector('.success');

    var onPopupEscPress = function (evt) {
      window.utils.isEscPress(evt, closePopup);
    };

    document.addEventListener('keydown', onPopupEscPress);

    var closePopup = function () {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
      popup.removeEventListener('click', closePopup);
    };

    popup.addEventListener('click', closePopup);
  };

  var addErrorModal = function () {
    main.appendChild(errorTemplate);
    var popup = document.querySelector('.error');
    var buttonError = document.querySelector('.error__button');

    var onPopupEscPress = function (evt) {
      window.utils.isEscPress(evt, closePopup);
    };

    document.addEventListener('keydown', onPopupEscPress);

    var closePopup = function () {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
      popup.removeEventListener('click', closePopup);
      buttonError.removeEventListener('click', closePopup);
    };

    popup.addEventListener('click', closePopup);
    buttonError.addEventListener('click', closePopup);
  };

  window.modal = {
    addSuccessModal: addSuccessModal,
    addErrorModal: addErrorModal
  };

})();
