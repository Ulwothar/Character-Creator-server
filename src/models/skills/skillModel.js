import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const skillsSchema = new Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
    default: 'Some default description',
  },
});

export default mongoose.model('Skill', skillsSchema);
