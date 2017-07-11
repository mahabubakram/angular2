'use strict';

import mongoose from 'mongoose';

var individualTalkSchema = new mongoose.Schema({
  talkNumber   : Number,
  name         : String,
  title        : String,
  startDateTime: String,
  endDateTime  : String,
  optionValue  : String
})

var TalkSchema = new mongoose.Schema({
  uuid : String,
  talks: [individualTalkSchema],
  event: String
});

export default mongoose.model('Talk', TalkSchema);
