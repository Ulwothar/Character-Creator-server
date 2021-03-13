import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const characterSchema = new Schema({
  characterName: { type: String, required: true },
  characterRace: { type: String, required: true },
  characterClass: { type: String, required: true },
  characterCode: { type: String, required: true },
  characterLevel: { type: Number, required: true },
});

export default mongoose.model('Character', characterSchema);
