'use strict';

angular.module('eventvotingApp')
  .config(error);

//success.$inject = ['$stateProvider'];

function error($stateProvider) {

  var routes = $stateProvider
    .state('error', success());

  return routes;

  function success() {
    return {
      url         : '/error',
      templateUrl : 'app/error/error.html',
      controller  : 'ErrorCtrl',
      controllerAs: 'vm'
    }
  }
}
