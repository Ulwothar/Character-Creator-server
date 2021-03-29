import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const spellSchema = new Schema({
  name: { type: String, required: true, default: '' },
  cost: { type: Number, required: true, default: 1 },
  powerLevel: { type: Number, required: true, default: 1 },
  schoolId: { type: String, required: true, default: '' },
  schoolLevel: { type: Number, required: true, default: 1 },
  description: { type: String, required: true, default: '' },
  summary: { type: String, required: true, default: '' },
});

export default mongoose.model('Spell', spellSchema);
