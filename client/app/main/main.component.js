import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
  awesomeThings = [];
  newThing = '';
  
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
  }

  $onInit() {
    console.log('MainController onInit');
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        for(var i = 0; i < this.awesomeThings.length; i++) {
          this.awesomeThings[i].dateRequiredBy = new Date(this.awesomeThings[i].dateRequiredBy);
        }
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }
                     
  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: 'Admin',
        info: this.newThing,
        complete: false,
        dateRequiredBy: Date.now(),
        dateComplete: null
      });
      this.newThing = '';
    }
  }

  // This update function is not really necessary as we are just going to add and delete
  update(thing) {
    console.log('save thing');
    if (thing) {
      console.debug(thing);
      var url = '/api/things/' + thing._id;
      var returnedThing = this.$http.put(url, {
        name: thing.name,
        info: thing.info,
        complete: thing.complete,
        dateRequiredBy: thing.dateRequiredBy,
        dateComplete: thing.dateComplete
      });
      console.debug(returnedThing);
    }
  }
  
  deleteThing(thing) {
    this.$http.delete(`/api/things/${thing._id}`);
  }
}

export default angular.module('mean1App.main', [ngRoute, 'ngMap'])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
