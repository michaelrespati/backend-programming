const { Gacha, Rewards } = require('../../../models');

async function countattemptsToday(userId, startOfDay, endOfDay) {
  return Gacha.countDocuments({
    userId,
    createdAt: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
}

async function getPrizes() {
  return Rewards.find({});
}

async function incrementPrizeClaimed(id) {
  return Rewards.updateOne({ _id: id }, { $inc: { claimed: 1 } });
}

async function saveGachaResult(userId, prize) {
  return Gacha.create({
    userId,
    reward: prize ? prize.name : null,
    createdAt: new Date(),
  });
}

async function getGachaHistory(userId) {
  return Gacha.find({
    userId,
  });
}

async function getWinners() {
  return Gacha.find({
    reward: { $ne: null },
  });
}

module.exports = {
  countattemptsToday,
  getPrizes,
  incrementPrizeClaimed,
  saveGachaResult,
  getGachaHistory,
  getWinners,
};
