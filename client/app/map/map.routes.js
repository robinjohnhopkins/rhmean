'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/map', {
    template: require('./map.html'),
    controller: 'MapController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
}
