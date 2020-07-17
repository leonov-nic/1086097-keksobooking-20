'use strict';

(function () {

  var main = document.querySelector('main');

  var successTemplate = document.querySelector('#success')
    .content
    .querySelector('.success');

  // var errorTemplate = document.querySelector('#error')
  //   .content
  //   .querySelector('.error');

  var addSuccessModal = function () {
    main.appendChild(successTemplate);
    var popup = document.querySelector('.success');

    var onPopupEscPress = function (evt) {
      window.utils.isEscPress(evt, closePopup);
    };

    document.addEventListener('keydown', onPopupEscPress);
    popup.addEventListener('click', onPopupEscPress);

    var closePopup = function () {
      popup.remove();
      document.removeEventListener('keydown', onPopupEscPress);
    };
  };

  window.modal = {
    addSuccessModal: addSuccessModal

  };

  // main.appendChild(errorTemplate);

})();
