'use strict';

export default class MapController {
  /*@ngInject*/
  constructor(User, NgMap, $interval, Geo) {
    // Use the User $resource to fetch all users
    var vm = this;
    console.log('smart');
    console.log(this);
    this.movecount = 0;
    this.pluslatitude = 0.001;
    this.pluslongitude = 0.001;
    this.enableMovement = false;
    this.Geo = Geo;
    this.geoCurrentPosition = Geo.getCurrentPositionSync();

    this.people = [{
        id: 1,
        name: 'Fred',
        pos: [51.8413663338609, -2.0978219003906133]
      },
      {
        id: 2,
        name: 'Ian',
        pos: [51.8113663338609, -2.0778219003906133]
      }
    ];

    User.query().$promise.then(function (users) {
        var idx = 2;
        var people = vm.people;
        vm.users = users;
        if (users.length) {
          users.forEach(user => {
            idx = idx + 1
            people.push({
              id: idx,
              name: user.name,
              pos: [user.lastlatitude, user.lastlongitude]
            })
          });
          console.log(JSON.stringify(vm.people));
        }
      },
      // on failure...
      function (errorMsg) {
        console.log('Error get all users: ' + errorMsg);
      });
    User.get().$promise.then(function (currentUser) {
        console.log('currentUser');
        console.log(currentUser);
        vm.currentUser = currentUser;
      },
      // on failure...
      function (errorMsg) {
        console.log('Error get currentUser: ' + errorMsg);
      });

    vm.setPositions = function (pos) {
      vm.positions = angular.copy(pos);
    };

    NgMap.getMap().then(function (map) {
      console.log('=====================================getMap boom');
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
      console.log('users', vm.users);
      vm.map = map;
    });

    vm.showPerson = function (event, person) {
      vm.selectedPerson = person;
      console.log('person ' + JSON.stringify(vm.selectedPerson));
      vm.map.showInfoWindow('myInfoWindow', this);
    };

    $interval(function () {
      vm.callAtInterval();
    }, 1000);

  } // end constructor

  callAtInterval() {
    if (this.enableMovement) {
      console.log("callAtInterval - Interval occurred");
      this.people[0].pos[0] += this.pluslatitude;
      this.people[0].pos[1] += this.pluslongitude;
    }
    if (this.movecount-- <= 0) {
      this.movecount = 120;
      this.pluslatitude = -this.pluslatitude;
      this.pluslongitude = -this.pluslongitude;
      this.geolocateCurrentUser();
    }
  }

  getPeopleArrayInstanceFromCurrentUser() {
    var returnUser = null;
    if (this.currentUser) {
      this.people.forEach(user => {
        if (user.name === this.currentUser.name) {
          // match
          returnUser = user;
        }
      });
    }
    return returnUser;
  };

  moveDemo() {
    console.log('move demo');
    this.enableMovement = !this.enableMovement;
    this.geolocateCurrentUser();
  }

  geolocateCurrentUser() {
    var vm = this;
    vm.Geo.getCurrentPosition(function (pos) {
      vm.geoCurrentPosition = pos;
      if (vm.geoCurrentPosition) {
        if (vm.currentUser) {
          vm.currentUser.lastlatitude = vm.geoCurrentPosition.lat;
          vm.currentUser.lastlongitude = vm.geoCurrentPosition.lon;
          var person = vm.getPeopleArrayInstanceFromCurrentUser();
          if (person) {
            var pos = {
              lat: vm.geoCurrentPosition.lat,
              lng: vm.geoCurrentPosition.lon
            };
            person.pos = pos;
            console.log('found me, set pos' + JSON.stringify(person.pos));
          } else {
            console.log('cannot find me');
          }
        } else {
          console.log('no current user to pin pos');
        }
      } else {
        console.log('no geoCurrentPosition');
      }
    });
  }

  statusUpdate() {
    console.log('statusUpdate ' + this.currentUser.status);
    this.currentUser.$save();
  }

}
