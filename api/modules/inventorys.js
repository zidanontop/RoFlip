import mongoose from 'mongoose';
const schema = mongoose.Schema;

const inventoryschema = new schema({
  itemid: {
    type: Number,
    required: true,
  },
  owner: {
    type: Number,
    required: true,
  },
  locked: {
    type: Boolean,
    required: true,
  }
});

export const Inventorys = mongoose.model("inventorys", inventoryschema);
export default Inventorys;