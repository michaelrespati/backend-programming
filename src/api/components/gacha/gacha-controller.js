const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function playGacha(request, response, next) {
  try {
    const { userId } = request.body;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    const result = await gachaService.playGacha(userId);
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}

async function getGachaHistory(request, response, next) {
  try {
    const { userId } = request.params;

    if (!userId) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'User ID is required');
    }

    const history = await gachaService.getGachaHistory(userId);
    return response.status(200).json(history);
  } catch (error) {
    return next(error);
  }
}

async function getPrizes(request, response, next) {
  try {
    const prizes = await gachaService.getPrizes();
    return response.status(200).json(prizes);
  } catch (error) {
    return next(error);
  }
}

async function getWinners(request, response, next) {
  try {
    const winners = await gachaService.getWinners();
    return response.status(200).json(winners);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  playGacha,
  getGachaHistory,
  getPrizes,
  getWinners,
};
