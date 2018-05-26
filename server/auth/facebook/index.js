'use strict';

import express from 'express';
import passport from 'passport';
import {setTokenCookie} from '../auth.service';

var router = express.Router();

//RH NOTE scope was this. see https://developers.facebook.com/docs/facebook-login/permissions/v3.0
// scope: ['email', 'user_about_me'],  try scope: ['email', 'user_gender'],

router
  .get('/', passport.authenticate('facebook', {
    scope: ['email'],
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie);

export default router;
