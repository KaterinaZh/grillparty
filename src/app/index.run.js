(function() {
  'use strict';

  angular
    .module('grillParty')
    .run(runBlock);

  /** @ngInject */
  function runBlock(epamersStorage) {
      epamersStorage.getList();
      if (!epamersStorage.list.length) {
        epamersStorage.list = [{
          "id": 1,
          "firstName": "Dart",
          "lastName": "Vader",
          "email": "Dart_Vader@epam.com",
          "url": "data:image/jpeg;base64,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",
          "status": "Yes"
        }, {
          "id": 2,
          "firstName": "Harry",
          "lastName": "Potter",
          "email": "Harry_Potter@epam.com",
          "url": "http://cdn.shopify.com/s/files/1/0193/6253/products/harry.png?v=1428269553",
          "status": "Maybe"
        }, {
          "id": 3,
          "firstName": "Frodo",
          "lastName": "Baggins",
          "email": "Frodo_Baggins@epam.com",
          "url": "https://upload.wikimedia.org/wikipedia/en/4/4e/Elijah_Wood_as_Frodo_Baggins.png",
          "status": "Maybe"
        }, {
          "id": 4,
          "firstName": "Kung fu",
          "lastName": "panda",
          "email": "Kungfu_Panda@epam.com",
          "url": "https://danceswithfat.files.wordpress.com/2011/11/kung-fu-panda.jpg",
          "status": "Yes"
        }, {
          "id": 5,
          "firstName": "Nyan",
          "lastName": "Cat",
          "email": "Nyan_Cat@epam.com",
          "url": "https://pbs.twimg.com/profile_images/2370446440/6e2jwf7ztbr5t1yjq4c5.jpeg",
          "status": "Yes"
        }, {
          "id": 6,
          "firstName": "Pinkie",
          "lastName": "Pie",
          "email": "Pinkie_Pie@epam.com",
          "url": "http://img01.deviantart.net/036f/i/2013/295/7/e/happy_pinkie_pie_by_thatguy1945-d6rctaq.png",
          "status": "Yes"
        }, {
          "id": 11,
          "firstName": "Twilight Sparkle",
          "status": "Yes"
        }, {
          "id": 7,
          "firstName": "Vitaliy",
          "lastName": "Dassayev",
          "email": "Vitaliy_Dassayev@epam.com",
          "url": "http://lorempixel.com/200/200/cats/5/"
        }, {
          "id": 8,
          "firstName": "Yekaterina",
          "lastName": "Zhunusbayeva",
          "email": "Yekaterina_Zhunusbayeva@epam.com",
          "url": "http://lorempixel.com/200/200/cats/1/"
        }, {
          "id": 9,
          "firstName": "Yelena",
          "lastName": "Zakharevich",
          "email": "Yelena_Zakharevich@epam.com",
          "url": "http://lorempixel.com/200/200/cats/4/"
        }, {
          "id": 10,
          "firstName": "Mikhail",
          "lastName": "Kantserov",
          "email": "Mikhail_Kantserov@epam.com",
          "url": "http://lorempixel.com/200/200/cats/3/"
        }];
      }
  }
})();
