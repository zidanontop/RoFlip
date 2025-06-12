import axios from 'axios';
import { Users } from '../modules/users.js';
import { Histories } from '../modules/histories.js';

export const sendwebhook = async (webhookUrl, title, description, fields = [], thumbnail = null) => {
  try {
    const embed = {
      title,
      description,
      color: 0x00ff00,
      fields,
      timestamp: new Date().toISOString()
    };

    if (thumbnail) {
      embed.thumbnail = { url: thumbnail };
    }

    await axios.post(webhookUrl, {
      embeds: [embed]
    });
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};

export const sendnoneembed = async (webhookUrl, description) => {
  try {
    await axios.post(webhookUrl, {
      content: description
    });
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
};

export const addHistory = async (userId, type, amount) => {
  try {
    await Histories.create({
      userid: userId,
      type,
      amount,
      date: new Date()
    });
  } catch (error) {
    console.error('Error adding history:', error);
  }
};

export const updateuser = async (userId, io) => {
  try {
    const user = await Users.findOne({ userid: userId });
    if (user && io) {
      io.emit('userUpdate', {
        userid: userId,
        balance: user.balance,
        inventory: user.inventory
      });
    }
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const updatestats = async (io) => {
  try {
    const stats = await Users.aggregate([
      {
        $group: {
          _id: null,
          totalWager: { $sum: '$wager' },
          totalWon: { $sum: '$won' },
          totalLost: { $sum: '$lost' }
        }
      }
    ]);

    if (stats.length > 0 && io) {
      io.emit('statsUpdate', {
        wager: stats[0].totalWager,
        won: stats[0].totalWon,
        lost: stats[0].totalLost
      });
    }
  } catch (error) {
    console.error('Error updating stats:', error);
  }
};

export const level = async (userId, amount) => {
  try {
    const user = await Users.findOne({ userid: userId });
    if (!user) return;

    const xpGain = Math.floor(amount * 0.005); // 0.5% of amount as XP
    let newXP = user.xp + xpGain;
    let newLevel = user.level;

    // Calculate if user should level up
    // Using a simple formula: next level requires current_level * 1000 XP
    while (newXP >= newLevel * 1000) {
      newXP -= newLevel * 1000;
      newLevel++;
    }

    await Users.updateOne(
      { userid: userId },
      { 
        $set: { 
          xp: newXP,
          level: newLevel
        }
      }
    );
  } catch (error) {
    console.error('Error updating level:', error);
  }
}; 