(function () {
  'use strict';

  angular
    .module('grillParty')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope, anchorSmoothScroll, epamersStorage, $state) {
    $scope.register = function () {
      $state.go('reg');
    };

    var vm = this;
    vm.gotoElement = function (eID) {
      anchorSmoothScroll.scrollTo(eID);
    };
    vm.epamers = epamersStorage.list;
    vm.agreedCount = function () {
      var count = 0;
      vm.epamers.forEach(function (epamer) {
        if (epamer.status != null && epamer.status === 'Yes') {
          count++;
        }
      });
      return count;
    };

    vm.filterOptions = [
      {id: 'Yes', name: 'These people will be there for sure'},
      {id: 'No', name: 'These people won\'t be there'},
      {id: 'Maybe', name: 'These people might be there'},
      {id: 'allReg', name: 'All registered people'},
      {id: 'notReg', name: 'Not registered yet'}
    ];
    vm.filterEpamers = vm.filterOptions[0];
    vm.statusClass = function (epamer) {
      if (epamer.status == 'Yes') {
        return 'fa-check text-success';
      } else if (epamer.status == 'No') {
        return 'fa-minus text-danger';
      } else if (epamer.status == 'Maybe') {
        return 'fa-question text-warning';
      }
    };
    vm.clearStorage = function (){
      window.localStorage.removeItem("ls.epamers");
      window.location.reload();
    };
  }
})();
