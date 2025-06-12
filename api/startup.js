import * as jackpotController from './controllers/jackpot/index.js';
import * as giveawayController from './controllers/giveaway/index.js';

export const startup = (io) => {
    console.log("starting");
    jackpotController.startup(io);
    giveawayController.startup(io);
};