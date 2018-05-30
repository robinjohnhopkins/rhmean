'use strict';

import angular from 'angular';
import routes from './map.routes';
import MapController from './map.controller';

export default angular.module('mean1App.map', ['mean1App.auth', 'ngRoute', 'ngMap'])
  .config(routes)
  .controller('MapController', MapController)
  .name;
