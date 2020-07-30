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
      window.form.clean();
      document.removeEventListener('keydown', onPopupEscPress);
      popup.removeEventListener('click', closePopup);
      window.map.onDeactivationMap();
    };

    popup.addEventListener('click', closePopup);
  };

  var addErrorModal = function (message) {

    var newErrorTemplate = errorTemplate.cloneNode(true);
    newErrorTemplate.querySelector('.error__message').textContent = message;
    main.appendChild(newErrorTemplate);
    var popup = document.querySelector('.error');
    var buttonError = document.querySelector('.error__button');

    var onPopupEscPress = function (evt) {
      window.utils.isEscPress(evt, closePopup);
    };

    var closePopup = function () {
      popup.remove();

      document.removeEventListener('keydown', onPopupEscPress);
      popup.removeEventListener('click', closePopup);
      buttonError.removeEventListener('click', closePopup);
    };

    popup.addEventListener('click', closePopup);
    buttonError.addEventListener('click', closePopup);
    buttonError.addEventListener('click', window.map.onDeactivationMap());
    document.addEventListener('keydown', onPopupEscPress);
  };

  window.modal = {
    addSuccessModal: addSuccessModal,
    addErrorModal: addErrorModal
  };

})();
