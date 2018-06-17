'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './todo.events';

var TodoSchema = new mongoose.Schema({
  name: String,
  info: String,
  complete: Boolean,
  dateRequiredBy: { type: Date, default: Date.now },
  dateComplete: { type: Date, default: null }
});

registerEvents(TodoSchema);
export default mongoose.model('Todo', TodoSchema);
