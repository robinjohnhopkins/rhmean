'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/todo', {
    template: require('./todo.html'),
    controller: 'TodoController',
    controllerAs: 'todoctl',
    authenticate: true
  });
}