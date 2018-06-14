/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if (config.seedDB) {
    Thing.find({}).remove()
      .then(() => {
        let thing = Thing.create({
          name: 'Admin',
          info: 'Finish this app',
          complete: false,
          dateRequiredBy: Date.now(),
          dateComplete: null
        }, {
          name: 'Test User',
          info: 'Go to client site and install a driver ' +
            'report back.',
          complete: false,
          dateRequiredBy: Date.now(),
          dateComplete: null
        }, {
          name: 'Smart Build System',
          info: 'Build system ignores `spec` files, allowing you to keep ' +
            'tests alongside code. Automatic injection of scripts and ' +
            'styles into your app.html',
          complete: false,
          dateRequiredBy: Date.now(),
          dateComplete: null
        }, {
          name: 'Modular Structure',
          info: 'Best practice client and server structures allow for more ' +
            'code reusability and maximum scalability',
          complete: false,
          dateRequiredBy: Date.now(),
          dateComplete: null
        }, {
          name: 'Optimized Build',
          info: 'Build process packs up your templates as a single JavaScript ' +
            'payload, minifies your scripts/css/images, and rewrites asset ' +
            'names for caching.',
          complete: false,
          dateRequiredBy: Date.now(),
          dateComplete: null
        }, {
          name: 'Deployment Ready',
          info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
            'and openshift subgenerators',
          complete: false,
          dateRequiredBy: Date.now(),
          dateComplete: null
        });
        return thing;
      })
      .then(() => console.log('finished populating things'))
      .catch(err => console.log('error populating things', err));

    User.find({}).remove()
      .then(() => {
        User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
          }, {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
          })
          .then(() => console.log('finished populating users'))
          .catch(err => console.log('error populating users', err));
      });
  }
}
