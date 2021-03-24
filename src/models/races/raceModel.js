import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const raceSchema = new Schema({
  name: { type: String, required: true },
  modifiers: { type: Array },
});

export default mongoose.model('Race', raceSchema);