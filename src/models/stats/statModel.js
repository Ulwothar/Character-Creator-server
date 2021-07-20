import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const statsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model('Stats', statsSchema);
