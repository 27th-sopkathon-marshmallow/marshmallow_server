const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);
db.Participate = require('./participate')(sequelize, Sequelize);

/** user: room => participate */
db.User.belongsToMany(db.Room, { through: 'Participate', as: 'Participated' });
db.Room.belongsToMany(db.User, { through: 'Participate', as: 'Participant' });

module.exports = db;