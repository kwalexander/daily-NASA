const Favorites = require('./Favorites');
const User = require('./User');

Favorites.belongsTo(User, {
    // key that connects the tables
    foreignKey: 'user_id'
});

User.hasMany(Favorites, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

module.exports = { Favorites, User };