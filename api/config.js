import dotenv from 'dotenv';
dotenv.config();

const config = {
  jwt_secret: process.env.JWT_SECRET,
  coinflipwebh: process.env.COINFLIP_WEBHOOK || '',
  taxedItemsWebh: process.env.TAXED_ITEMS_WEBHOOK || '',
  botlogs: process.env.BOT_LOGS_WEBHOOK || '',
  giveawaywebh: process.env.GIVEAWAY_WEBHOOK || '',
  tippedlogs: process.env.TIPPED_LOGS_WEBHOOK || '',
  discordlogs: process.env.DISCORD_LOGS_WEBHOOK || '',
  jackpotwebh: process.env.JACKPOT_WEBHOOK || '',
  taxer: process.env.TAXER_USER_ID || null,
  bottoken: process.env.DISCORD_BOT_TOKEN,
  clientid: process.env.DISCORD_CLIENT_ID,
  clientsecret: process.env.DISCORD_CLIENT_SECRET,
  taxes: parseFloat(process.env.TAX_RATE || '0.12'),
  xp: parseFloat(process.env.XP_RATE || '0.00500'),
  crypto: {
    bitcoin: {
      walletid: process.env.BTC_WALLET_ID || 'btc-',
      transferkey: process.env.BTC_TRANSFER_KEY || ''
    }
  }
};

// Validate required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'DISCORD_BOT_TOKEN',
  'DISCORD_CLIENT_ID',
  'DISCORD_CLIENT_SECRET'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

export const {
  jwt_secret,
  coinflipwebh,
  taxedItemsWebh,
  botlogs,
  giveawaywebh,
  tippedlogs,
  discordlogs,
  jackpotwebh,
  taxer,
  bottoken,
  clientid,
  clientsecret,
  taxes,
  xp,
  crypto
} = config;

export default config;