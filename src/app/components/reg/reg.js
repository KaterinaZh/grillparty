'use strict';

angular.module('regModule', [])
  .directive('reg', reg);

function reg($state, epamersStorage) {
  return {
    templateUrl: 'app/components/reg/reg.html',
    link: function (scope, element, attrs) {
      scope.regData = defaultReg();
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

      scope.statuses = getStatuses();

      function getStatuses() {
        return [{id: 'Yes', name: 'Yes'}, {id: 'No', name: 'No'}, {id: 'Maybe', name: 'Maybe'}];
      }

      scope.home = function () {
        $state.go('home');
      };

      scope.changeFirstName = function () {
        findEpamer(scope.regData.firstName, "firstName");
      };

      scope.changeLastName = function () {
        findEpamer(scope.regData.lastName, "lastName");
      };

      scope.changeEmail = function () {
        findEpamer(scope.regData.email, "email");
      };

      function findEpamer(regParam, foundParam) {
        scope.regError = '';
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
          scope.regError = 'EPAM employee not found with these credentials';
        } else if (foundCount == 1) {
          scope.regData.firstName = found.firstName;
          scope.regData.lastName = found.lastName;
          scope.regData.email = found.email;
        }
      }

      scope.regEpamer = function () {
        if (scope.regData.$invalid) {
          return;
        }
        var epamer = validateRegData();
        if (epamer == null) return;
        epamer.status = scope.regData.status;
        epamersStorage.saveEpamer(epamer);
        if (scope.regData.bringGuest) {
          epamersStorage.saveGuest(scope.regData.guestName);
        }
        $state.go('home');
      };

      function validateRegData() {
        scope.regError = '';
        var found = null;
        var epamers = epamersStorage.list;
        epamers.forEach(function (epamer) {
          if (scope.regData.firstName === epamer.firstName &&
            scope.regData.lastName === epamer.lastName &&
            scope.regData.email === epamer.email) {
            found = epamer;
          }
        });
        if (found == null) {
          scope.regError = 'EPAM employee not found with these credentials';
        }
        return found;
      }
    }
  };
}
