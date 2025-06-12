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