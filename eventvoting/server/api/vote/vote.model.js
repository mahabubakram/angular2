'use strict';

import mongoose from 'mongoose';

var VoteSchema = new mongoose.Schema({
  name: String,
  department: String,
  votesOnEvent: Array,
  creationDate: Date

});

export default mongoose.model('Vote', VoteSchema);
