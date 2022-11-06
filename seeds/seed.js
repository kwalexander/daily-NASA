const sequelize = require('../config/connection');
const { User, Favorites } = require('../models');

const userSeedData = require('./userSeedData.json');
const favoriteSeedData = require('./favoriteSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    //   for (const { id } of users) {
    //     const newFavorite = await LibraryCard.create({
    //       reader_id: id,
    //     });
    //   }

    for (const Favorites of favoriteSeedData) {
        const newFavorite = await Favorite.create({
            ...Favorites,
            // Attach a random reader ID to each book -- DELETE?
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
