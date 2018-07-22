'use strict';

import angular from 'angular';
import routes from './map.routes';
import MapController from './map.controller';
import Geo from '../../components/geo/geo.module';

export default angular.module('mean1App.map', ['mean1App.auth', 'ngRoute', 'ngMap', Geo])
  .config(routes)
  .controller('MapController', MapController)
  .name;
