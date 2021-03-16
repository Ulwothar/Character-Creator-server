import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  name: { type: String, required: true },
  race: { type: String, required: true },
  _class: { type: String, required: true },
  characterCode: { type: String, required: true },
  level: { type: Number, required: true },
  stats: { type: Array, required: true },
  skills: { type: Array, required: true },
  character: { type: String, required: true },
});

export default mongoose.model('Character', characterSchema);
