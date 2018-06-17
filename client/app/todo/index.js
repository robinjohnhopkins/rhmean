'use strict';

import angular from 'angular';
import routes from './todo.routes';
import TodoController from './todo.controller';

export default angular.module('mean1App.todo', ['mean1App.auth', 'ngRoute'])
  .config(routes)
  .controller('TodoController', TodoController)
  .name;
