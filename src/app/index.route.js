(function() {
  'use strict';

  angular
    .module('grillParty')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('reg', {
        url: '/',
        template: '<reg/>'
      });
    $urlRouterProvider.otherwise('/');
  }
})();
