import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const skillsSchema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model('Skill', skillsSchema);
