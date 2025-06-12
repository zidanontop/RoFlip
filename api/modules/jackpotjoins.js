import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const jackpotEntrySchema = new Schema({
  joinerid: { type: Number, required: true },
  value: { type: Number, required: true },
  items: { type: Array, required: true },
  jackpotGame: { type: String, required: true },
  username: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

export const JackpotEntry = mongoose.model("JackpotEntry", jackpotEntrySchema);
export default JackpotEntry;