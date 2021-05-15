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
  nature: { type: String, required: true },
  gender: { type: String, default: 'male', required: true },
  image: { type: String, default: 'Route to some default image' }, //If there is a specified default image for all characters, place it here
  weight: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  description: { type: String, default: '' },
  spellsId: [{ type: String, default: '' }],
});

export default mongoose.model('Character', characterSchema);
