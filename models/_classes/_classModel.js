import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const _classSchema = new Schema({
  name: { type: String, required: true },
  modifiers: { type: Array },
});

export default mongoose.model('_Class', _classSchema);
