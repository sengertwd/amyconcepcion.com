var concepcion = {};

concepcion = {
  init: function () {
    // this.imageCalc();

    // window.addEventListener('resize', this.imageCalc(), false);
  },
  imageCalc: function () {
    'use strict';
    var that = concepcion,
      images = document.querySelectorAll('img.pos-image'),
      i = 0;

    // console.log(images);

    for (i = 0; i < images.length; i++) {
      // console.log(images[i]);
      that.resizeImages(images[i]);
    }

  },
  resizeImages: function (img) {
    // console.log(img);
    var theParent = img.parentElement,
      parentH = theParent.offsetHeight,
      parentW = theParent.offsetWidth;
    // console.log(parentW);

    img.removeAttribute('height');
    img.removeAttribute('width');
    img.removeAttribute('style');

    if (parentH > parentW) {
      // the parent is taller than wide
      console.log(img.offsetWidth);
      img.height = parentH;
      console.log(img.offsetWidth);
      window.setTimeout(function () {
        if (img.offsetWidth < parentW) {
          img.style.width = '100%';
        }
      }, 100);
    } else if (parentW > parentH) {
      // the parent is wider than tall
      img.width = parentW;
      window.setTimeout(function () {
        if (img.offsetHeight < parentH) {
          img.style.height = '100%';
        }
      }, 100);
    } else {
      // the parent is a perfect square
      img.height = parentH;
    }
  }
};

window.addEventListener('load', concepcion.init(), false);