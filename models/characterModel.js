import mongoose from 'mongoose';

const Schema = mongoose.Schema({
  race: { type: String, required: true },
  class: { type: String, required: true },
  characterCode: { type: String, required: true },
  level: { type: Number, required: true },
});

export default mongoose.model('Character', characterSchema);
