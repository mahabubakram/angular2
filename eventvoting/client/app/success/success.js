'use strict';

angular.module('eventvotingApp')
  .config(success);

//success.$inject = ['$stateProvider'];

function success($stateProvider) {

  var routes = $stateProvider
    .state('success', success());

  return routes;

  function success() {
    return {
      url         : '/success',
      templateUrl : 'app/success/success.html',
      controller  : 'SuccessCtrl',
      controllerAs: 'vm'
    }
  }
}
