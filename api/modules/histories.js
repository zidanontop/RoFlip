import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export const Histories = mongoose.model('History', historySchema);
export default Histories; 