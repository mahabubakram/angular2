(function(angular, undefined) {
'use strict';

angular.module('eventvotingApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin'],logging:{colorize:true}})

;
})(angular);