const { Rewards } = require('../src/models');

async function seedRewards() {
  try {
    console.log('Seeding reward data...');

    await Rewards.deleteMany({});

    await Rewards.insertMany([
      { name: 'Emas 10 gram', quota: 1, claimed: 0 },
      { name: 'Smartphone X', quota: 5, claimed: 0 },
      { name: 'Smartwatch Y', quota: 10, claimed: 0 },
      { name: 'Voucher Rp100.000', quota: 100, claimed: 0 },
      { name: 'Pulsa Rp50.000', quota: 500, claimed: 0 },
    ]);

    console.log('Seed reward data inserted!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedRewards();
