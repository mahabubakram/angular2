(function () {
  'use strict';
  angular.module('eventvotingApp')
    .controller('EventVotingCtrl', eventVotingCtrl);

  eventVotingCtrl.$inject = ['$http', '$state', '$stateParams'];

  function eventVotingCtrl($http, $state, $stateParams) {

    console.log($stateParams);

    const vm = this;

    vm.votedEvents = [];
    vm.dataFound = false;

    $http.get('/api/talk/' + $stateParams.uuid).then((response) => {
      console.log(response);
      if (!response.data || !response.data.length) {
        return $state.go('error');
      }

      vm.eventsList = response.data[0].talks;
      vm.eventName = response.data[0].event;
      if (vm.eventsList) {
        vm.dataFound = true;
      }

      console.log(vm);

    });


    vm.postResponse = function (isValidName, isValidDepartment) {
      console.log(isValidName, isValidDepartment);
      console.log(vm);

      const votes = {};
      votes.name = vm.name;
      votes.department = vm.department;
      votes.votesOnEvent = _.map(vm.eventsList, _.partialRight(_.pick, ['voted', 'interest', 'talkNumber']));
      

      //default values if nothing chosen
      _.forEach(votes.votesOnEvent, event => {
        _.defaults(event, {voted:false, interest: 0});
      });

      votes.creationDate = new Date();

      console.log(votes);

      $http.post('/api/vote', votes)
        .then(() => $state.go('success'))
        .catch(() => $state.go('error'));


    }


  }
})();
