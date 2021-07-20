import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const alignmentSchema = new Schema({
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
    default: 'Some default description',
  },
});

export default mongoose.model('Alignment', alignmentSchema);
