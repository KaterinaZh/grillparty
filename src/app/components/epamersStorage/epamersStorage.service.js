'use strict';

angular.module('epamersStorageModule', [])
  .service('epamersStorage', epamersStorage);

function epamersStorage(localStorageService) {
  var storage = this;

  storage.list = [];

  storage.getEpamer = function (id) {
    for (var i = 0; i < storage.list.length; i++) {
      if (storage.list[i].id === id) {
        return storage.list[i];
      }
    }
    return null;
  };

  storage.getList = function () {
    storage.list = angular.fromJson(localStorageService.get('epamers')) || [];
    return storage.list;
  };

  storage.saveEpamer = function (epamer) {
    storage.list[epamer.id] = epamer;
    storage.saveList();
  };

  storage.saveGuest = function (guestName) {
    storage.list.push({
      "id": storage.list.length + 1,
      "firstName": guestName,
      "status": "Yes"
    });
    storage.saveList();
  };


  storage.saveList = function () {
    localStorageService.set('epamers', angular.toJson(storage.list));
  };
  }
