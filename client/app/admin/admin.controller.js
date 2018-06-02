'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    console.log('ctr users');
    console.log(this.users);
  }

  update(user) {
    console.log('save user');
    console.debug(user);
    user.$save();
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
