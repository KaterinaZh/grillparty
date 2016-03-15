(function() {
  'use strict';

  angular
    .module('grillParty')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('common', {
        templateUrl: 'app/common/common.html',
        controller: 'CommonController',
        controllerAs: 'cc',
        abstract: true
      })
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        parent: 'common',
        controller: 'MainController',
        controllerAs: 'vm'
      })
      .state('reg', {
        url: '/register',
        templateUrl: 'app/reg/reg.html',
        parent: 'common',
        controller: 'RegController',
        controllerAs: 'rc'
      })
      .state('github', {
        url: '/github',
        templateUrl: 'app/github/github.html',
        parent: 'common',
        controller: 'GithubController',
        controllerAs: 'gc'
      });
    $urlRouterProvider.otherwise('/');
  }
})();
