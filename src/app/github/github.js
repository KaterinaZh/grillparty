(function () {
  'use strict';

  angular.module('grillParty')
    .controller('GithubController', GithubController);

  /** @ngInject */
  function GithubController($http) {
    var vm = this;
    var lastId = 0;
    vm.users = [];
    vm.nextPage = loadGithubUsers;
    loadGithubUsers();

    function loadGithubUsers() {
      $http({
        method: 'GET',
        url: 'https://api.github.com/users?since=' + lastId
      }).then(function successCallback(response) {
        vm.error = false;
        vm.users = vm.users.concat(response.data);
        lastId = vm.users[vm.users.length - 1].id;
      }, function errorCallback(response) {
        vm.error = true;
      });
    }
  }
})();
