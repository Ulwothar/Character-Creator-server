import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const spellSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  schoolId: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String, required: true },
});

export default mongoose.model('Spell', spellSchema);
