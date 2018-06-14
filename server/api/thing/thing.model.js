'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './thing.events';

var ThingSchema = new mongoose.Schema({
  name: String,
  info: String,
  complete: Boolean,
  dateRequiredBy: { type: Date, default: Date.now },
  dateComplete: { type: Date, default: null }
});

registerEvents(ThingSchema);
export default mongoose.model('Thing', ThingSchema);
