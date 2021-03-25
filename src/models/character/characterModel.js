import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schoolsSchema = new Schema({
  name: { type: String, required: true },
  schoolId: { type: String, required: true },
  spellId: [{ type: String }],
});

const characterSchema = new Schema({
  name: { type: String, required: true },
  race: { type: String, required: true },
  _class: { type: String, required: true },
  characterCode: { type: String, required: true },
  level: { type: Number, required: true },
  stats: { type: Array, required: true },
  skills: { type: Array, required: true },
  nature: { type: String, required: true },
  schools: [{ type: schoolsSchema, default: [] }],
});

export default mongoose.model('Character', characterSchema);
