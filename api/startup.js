import jackpotController from './controllers/jackpot/index.js';
import giveawayController from './controllers/giveaway/index.js';

export const startup = (io) => {
    console.log("starting");
    jackpotController.startup(io);
    giveawayController.startup(io);
};