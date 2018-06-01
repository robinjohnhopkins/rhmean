'use strict';

//const ngRoute = require('angular-route');

export default class MapController {
  /*@ngInject*/
  constructor(User, NgMap, $scope) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    var vm = this;
    vm.positions1 =[
      {pos:[40.11, -75.21],name:1}, {pos:[40.22, -75.10],name:2},
      {pos:[40.33, -74.99],name:3}, {pos:[40.44, -74.88],name:4}, 
      {pos:[40.55, -74.77],name:5}, {pos:[40.66, -74.66],name:6}];
      
    vm.positions2 =[
      {pos:[40.71, -73.21],name:1}, {pos:[40.72, -73.20],name:2},
      {pos:[40.73, -73.19],name:3}, {pos:[40.74, -73.18],name:4},
      {pos:[40.75, -73.17],name:5}, {pos:[40.76, -73.16],name:6}];
    vm.setPositions = function(pos) {
      vm.positions = angular.copy(pos);
    };

    NgMap.getMap().then(function (map) {
      console.log('=====================================getMap boom');
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
      vm.map = map;
      $scope.map = map;
    });
    $scope.a_people = [
      {id: 1,name: 'Fred', pos:[51.8413663338609, -2.0978219003906133]},
      {id: 2,name: 'Bert',pos:[51.8513663338609, -2.0978219003906133]},
      {id: 3,name: 'Kylie',pos:[51.8313663338609, -2.0978219003906133]},
      {id: 4,name: 'Sam',pos:[51.8213663338609, -2.0578219003906133]},
      {id: 5,name: 'Ian',pos:[51.8113663338609, -2.0778219003906133]}
    ];
    $scope.showPerson = function(event, person) {
      console.log('person ' + person.name);
      $scope.selectedPerson = person;
      $scope.map.showInfoWindow('myInfoWindow', this);
    };

  }


}
