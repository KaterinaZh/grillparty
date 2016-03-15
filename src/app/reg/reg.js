(function () {
  'use strict';

  angular.module('grillParty')
    .controller('RegController', RegController);

  /** @ngInject */
  function RegController(anchorSmoothScroll, epamersStorage, $state, $window, $scope) {
    var vm = this;
    vm.regData = defaultReg();
    vm.statuses = getStatuses();
    vm.changeFirstName = changeFirstName;
    vm.changeLastName = changeLastName;
    vm.changeEmail = changeEmail;
    vm.regEpamer = registerEpamer;

    function defaultReg() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        status: '',
        bringGuest: false,
        guestName: ''
      };
    }

    function getStatuses() {
      return [{id: '0', name: 'Yes'}, {id: '1', name: 'Maybe'}, {id: '2', name: 'No'}];
    }

    function changeFirstName() {
      findEpamer(vm.regData.firstName, "firstName")
    }

    function changeLastName() {
      findEpamer(vm.regData.lastName, "lastName")
    }

    function changeEmail() {
      findEpamer(vm.regData.email, "email")
    }

    function findEpamer(regParam, foundParam) {
      vm.regError = '';
      var found = null;
      var foundCount = 0;

      var epamers = epamersStorage.list;
      epamers.forEach(function (epamer) {
        var epamerParam;
        if (foundParam == 'firstName') {
          epamerParam = epamer.firstName;
        } else if (foundParam == 'lastName') {
          epamerParam = epamer.lastName;
        } else if (foundParam == 'email') {
          epamerParam = epamer.email;
        }
        if (regParam != null && regParam === epamerParam) {
          found = epamer;
          foundCount++;
        }
      });
      if (foundCount == 0) {
        vm.regError = 'EPAM employee not found with these credentials';
      } else if (foundCount == 1) {
        vm.regData.firstName = found.firstName;
        vm.regData.lastName = found.lastName;
        vm.regData.email = found.email;
      }
    }

    function registerEpamer() {
      if (vm.regData.$invalid) {
        return;
      }
      var epamer = validateRegData();
      if (epamer == null) return;
      epamer.status = vm.regData.status;
      epamersStorage.saveEpamer(epamer);
      if (vm.regData.bringGuest) {
        epamersStorage.saveGuest(vm.regData.guestName);
      }
      $scope.$emit('goHome');
    }

    function validateRegData() {
      vm.regError = '';
      var found = null;
      var epamers = epamersStorage.list;
      epamers.forEach(function (epamer) {
        if (vm.regData.firstName === epamer.firstName &&
          vm.regData.lastName === epamer.lastName &&
          vm.regData.email === epamer.email) {
          found = epamer;
        }
      });
      if (found == null) {
        vm.regError = 'EPAM employee not found with these credentials';
      }
      return found;
    }
  }
})();
