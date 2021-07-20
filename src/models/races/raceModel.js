import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const raceSchema = new Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
    default: 'Some default description',
  },
  specialRules: { type: String, required: true, default: 'Some default rule' },
  psychologicalTraits: {
    type: String,
    required: true,
    default: 'Some default trait',
  },
  modifiers: { type: Array },
});

export default mongoose.model('Race', raceSchema);
