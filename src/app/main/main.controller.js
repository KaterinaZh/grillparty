(function () {
  'use strict';

  angular
    .module('grillParty')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(anchorSmoothScroll, epamersStorage, $state, $window) {
    var vm = this;
    vm.epamers = epamersStorage.list;
    vm.statusIncludes = ['0'];
    vm.sortIncludes = ['name', 'desc'];
    vm.sortOptions = [
      {id: 'firstName', name: 'Name ↓'},
      {id: '-firstName', name: 'Name ↑'},
      {id: 'status', name: 'Attending ↓'},
      {id: '-status', name: 'Attending ↑'}
    ];
    vm.sortEpamers = vm.sortOptions[0];

    vm.gotoElement = scrollToElement;
    vm.agreedCount = getAgreedCount;
    vm.includeParamToFilter = includeParamToFilter;
    vm.statusFilter = getStatusFilter;
    vm.statusClass = getStatusClass;
    vm.clearStorage = clearStorage;
    vm.buttonSelected = isButtonSelected;

    function scrollToElement(eID) {
      anchorSmoothScroll.scrollTo(eID);
    }

    function getAgreedCount() {
      var count = 0;
      vm.epamers.forEach(function (epamer) {
        if (epamer.status != null && epamer.status === '0') {
          count++;
        }
      });
      return count;
    }

    function includeParamToFilter(status) {
      var i = vm.statusIncludes.indexOf(status);
      if (i > -1) {
        vm.statusIncludes.splice(i, 1);
      } else {
        vm.statusIncludes.push(status);
      }
    }

    function getStatusFilter(epamer) {
      if (vm.statusIncludes.length > 0) {
        if (vm.statusIncludes.indexOf(epamer.status) < 0)
          return;
        if (!vm.searchText || (epamer.firstName.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1) ||
          (epamer.lastName != undefined && epamer.lastName.toLowerCase().indexOf(vm.searchText.toLowerCase()) != -1)) {
          return epamer;
        }
      }
    }

    function isButtonSelected(button) {
      return vm.statusIncludes.indexOf(button) > -1;
    }

    function getStatusClass(epamer) {
      if (epamer.status == '0') {
        return 'fa-check text-success';
      } else if (epamer.status == '1') {
        return 'fa-question text-warning';
      } else if (epamer.status == '2') {
        return 'fa-minus text-danger';
      }
    }

    function clearStorage() {
      $window.localStorage.removeItem("ls.epamers");
      $window.location.reload();
    }
  }
})();
