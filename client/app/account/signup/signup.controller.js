'use strict';

import angular from 'angular';

export default class SignupController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;


  /*@ngInject*/
  constructor(Auth, $location) {
    this.Auth = Auth;
    this.$location = $location;
  }

  changeField(form, fieldName){
    if (this.errors[fieldName]){
      form[fieldName].$valid = true;
      form[fieldName].$invalid = false;
      this.errors[fieldName] = null; // no delete function found
      form.$valid = form.email.$valid && form.name.$valid;
      this.submitted = !form.$valid;
    }
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      
      return this.Auth.createUser({
          name: this.user.name,
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Account created, redirect to home
          this.$location.path('/');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }
}
