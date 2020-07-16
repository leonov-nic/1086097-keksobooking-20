'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';

  var ImageParams = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var imagesContainer = document.querySelector('.ad-form__photo');
  var fileChooser = document.querySelector('#images');
  var avatarChooser = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  var createPhoto = function (container, reader) {
    var image = document.createElement('img');
    image.style.width = ImageParams.WIDTH;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    image.src = reader;
    container.appendChild(image);
    (container.querySelector('img')).remove();
    container.appendChild(image);
  };

  var addImages = function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      fileChooser.setCustomValidity('');
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        createPhoto(imagesContainer, reader.result);
      });

      reader.readAsDataURL(file);
    } else {
      fileChooser.setCustomValidity('Поменяйте формат изображения');
    }
  };

  var addAvatar = function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      avatarChooser.setCustomValidity('');
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      avatarChooser.setCustomValidity('Поменяйте формат изображения');
    }
  };

  fileChooser.addEventListener('change', addImages);
  avatarChooser.addEventListener('change', addAvatar);

  var deactivationImages = function () {
    previewAvatar.src = DEFAULT_AVATAR;
    var image = document.querySelector('.ad-form__photo img');
    if (image) {
      image.remove();
    }
    fileChooser.removeEventListener('change', addImages);
    avatarChooser.removeEventListener('change', addAvatar);
    fileChooser.addEventListener('change', addImages);
    avatarChooser.addEventListener('change', addAvatar);
  };

  window.loadImage = {
    deactivationImages: deactivationImages
  };

})();
