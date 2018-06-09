'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User, dialogs) {
    // Use the User $resource to fetch all users
    this.dialogs = dialogs;
    this.users = User.query();
  }

  update(user) {
    console.log('save user');
    console.debug(user);
    user.$save(function(data){
      console.log(user._id) // => 4e7819d26f29f407b0...
      console.log('saved');
      console.log(data);

  });
  }

  delete(user) {
    console.log("del user " + JSON.stringify(user)); 
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
  
  confirm(user) {
    var ctrl = this;
    this.dialogs.confirm("Deletion Confirmation",'Do you really want to delete the user?')
      .result
      .then( function(btn){ 
        ctrl.delete(user);
      }, function(btn){ 
        console.log("No to deletion confirmation"); 
      } );
  }
}
