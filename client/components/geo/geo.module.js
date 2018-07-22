'use strict';

import angular from 'angular';
import {
  GeoService
} from './geo.service';

export default angular.module('mean1App.geo', [])
  .factory('Geo', GeoService)
  .name;
