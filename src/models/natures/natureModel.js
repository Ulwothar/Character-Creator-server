import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const natureSchema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model('Nature', natureSchema);
