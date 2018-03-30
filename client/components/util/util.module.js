'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('mean1App.util', [])
  .factory('Util', UtilService)
  .name;
