'use strict';

angular.module('eventvotingApp')
  .config(eventVoting);

eventVoting.$inject = ['$stateProvider'];

function eventVoting($stateProvider) {

  var routes = $stateProvider
    .state('eventvoting', eventVoting());

  return routes;

  function eventVoting() {
    return {
      url         : '/eventvoting/:uuid',
      templateUrl : 'app/voting/voting.html',
      controller  : 'EventVotingCtrl',
      controllerAs: 'vm'
    }
  }
}
