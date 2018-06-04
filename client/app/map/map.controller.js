'use strict';

export default class MapController {
  /*@ngInject*/
  constructor(User, NgMap, $interval) {
    // Use the User $resource to fetch all users
    var vm = this;
    console.log('smart');
    console.log(this);
    this.movecount = 0;
    this.pluslatitude = 0.001;
    this.pluslongitude = 0.001;
    this.enableMovement = false;

    this.a_people = [{
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
        vm.users = users;
        if (users.length) {
          users.forEach(user => {
            idx = idx + 1
            vm.a_people.push({
              id: idx,
              name: user.name,
              pos: [user.lastlatitude, user.lastlongitude]
            })
          });
          console.log(vm._people);
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
      this.a_people[0].pos[0] += this.pluslatitude;
      this.a_people[0].pos[1] += this.pluslongitude;
      if (this.movecount++ > 20) {
        this.movecount = 0;
        this.pluslatitude = -this.pluslatitude;
        this.pluslongitude = -this.pluslongitude;
      }
    }
  }

  getPeopleArrayInstanceFromCurrentUser() {
    var returnUser = null;
    if (this.currentUser) {
      this.a_people.forEach(user => {
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
    var vm = this;
    var handleLocationError = function (browserHasGeolocation, failure) {
      if (failure) {
        console.log(failure.message);
      }
      console.log('thought so - no location!!!!!' + browserHasGeolocation);
    }

    // Try HTML5 geolocation.Starting with Chrome 50, Chrome no longer 
    // supports obtaining the user's location using the HTML5 
    // Geolocation API from pages delivered by non-secure connections.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        console.log('got location!!!!!' + JSON.stringify(pos));
        var person = vm.getPeopleArrayInstanceFromCurrentUser();
        if (person) {
          person.pos = pos;
        } else {
          console.log('cannot find me');
        }

      }, function (failure) {
        handleLocationError(true, failure);
      }, {
        maximumAge: 60000,
        timeout: 5000,
        enableHighAccuracy: true
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, null);
    }
  }

  statusUpdate(){
    console.log('statusUpdate ' + this.currentUser.status);
    this.currentUser.$save();
  }

}
