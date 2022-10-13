const sequelize = require('../config/connection');
const { User, Thought } = require('../models');

const userData = require('./userData.json');
const thoughtsData = require('./thoughtsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const thought of thoughtsData) {
    await Thought.create({
      ...thought,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
