'use strict';

(function () {

  var URL_LOAD = 'https://javascript.pages.academy/keksobooking/data';
  var URL_SAVE = 'https://javascript.pages.academy/keksobooking';

  var StatusCode = {
    OK: 200
  };

  var TIMEOUT_IN_MS = 10000;

     var onLoad = function (data) {
  console.log(data[0].author.avatar);

  }

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


  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
        // console.log(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

// load(onLoad, onError);

  // load(window.modal.addSuccessModal, window.modal.addErrorModal)

  // console.log(xhr.status);
  // console.log(xhr.readyState);
  // console.log(xhr.response);
  // console.log(xhr.responseText);

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();

