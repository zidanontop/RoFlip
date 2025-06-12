import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const giveawayjoins = new Schema({
    userid: {
        type: Number,
        required: true,
    },
    giveawayid: {
        type: String,
        required: true,
    }
});

export const GiveawayJoins = mongoose.model("giveawaysjoins", giveawayjoins);
export default GiveawayJoins;
