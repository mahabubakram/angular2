'use strict';

angular.module('eventvotingApp')
  .config(function($stateProvider) {
    $stateProvider.state('/eventvoting/', {
      url: '/',
      template: '<main></main>'
    });
  });
