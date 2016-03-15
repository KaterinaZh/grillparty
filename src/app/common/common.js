(function () {
  'use strict';

  angular.module('grillParty')
    .controller('CommonController', CommonController);

  /** @ngInject */
  function CommonController($state, $scope) {
    console.log(this);
    var vm = this;
    vm.activeLink = activeLink();
    vm.home = goToHomePage;
    vm.register = goToRegisterPage;
    vm.github = goToGithubPage;

    $scope.$on('goHome', function () {
      goToHomePage();
    });

    function goToHomePage() {
      $state.go('home');
      vm.activeLink = 'home';
    }

    function goToRegisterPage() {
      $state.go('reg');
      vm.activeLink = 'reg';
    }

    function goToGithubPage() {
      $state.go('github');
      vm.activeLink = 'github';
    }

    function activeLink() {
      return $state.current.name;
    }
  }
})();
