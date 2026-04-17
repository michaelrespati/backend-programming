const gachaRepository = require('./gacha-repository');
const usersRepository = require('../users/users-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function playGacha(userId) {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const totalToday = await gachaRepository.countattemptsToday(
    userId,
    startOfDay,
    endOfDay
  );

  if (totalToday >= 5) {
    throw errorResponder(
      errorTypes.UNPROCESSABLE_ENTITY,
      'Anda Sudah Mencoba 5 Kali Hari Ini. Coba Lagi Besok!'
    );
  }

  const prizes = await gachaRepository.getPrizes();
  const availablePrizes = prizes.filter((prize) => prize.claimed < prize.quota);

  let selectedPrize = null;

  const isWin = Math.random() < 0.5;

  if (isWin && availablePrizes.length > 0) {
    selectedPrize =
      availablePrizes[Math.floor(Math.random() * availablePrizes.length)];

    await gachaRepository.incrementPrizeClaimed(selectedPrize._id);
  }

  await gachaRepository.saveGachaResult(userId, selectedPrize);

  if (selectedPrize) {
    return {
      message: `Selamat! Anda mendapatkan hadiah: ${selectedPrize.name}`,
      prize: selectedPrize.name,
    };
  }
  return {
    message: 'Maaf, Anda belum beruntung. Coba lagi!',
    prize: 'Tidak ada hadiah',
  };
}

async function getGachaHistory(userId) {
  return gachaRepository.getGachaHistory(userId);
}

async function getPrizes() {
  const prizes = await gachaRepository.getPrizes();

  return prizes.map((prize) => ({
    name: prize.name,
    remainingQuota: prize.quota - prize.claimed,
  }));
}

function maskName(name) {
  return name
    .split(' ')
    .map((word) =>
      word
        .split('')
        .map((char) => (Math.random() > 0.5 ? '*' : char))
        .join('')
    )
    .join(' ');
}

async function getWinners() {
  const winners = await gachaRepository.getWinners();
  const result = await Promise.all(
    winners.map(async (winner) => {
      const user = await usersRepository.getUser(winner.userId);
      return {
        name: maskName(user.fullName),
        reward: winner.reward,
      };
    })
  );

  return result;
}

module.exports = {
  playGacha,
  getGachaHistory,
  getPrizes,
  getWinners,
};
