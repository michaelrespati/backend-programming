const express = require('express');
const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);
  route.post('/play', gachaController.playGacha);
  route.get('/history/:userId', gachaController.getGachaHistory);
  route.get('/prizes', gachaController.getPrizes);
  route.get('/winners', gachaController.getWinners);
};
