const { User, Room } = require('../models');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Participate', {
  UserId: {
    type: DataTypes.INTEGER,
    reference: {
      model: User,
      key: 'id',
    }
  },
  RoomId: {
    type: DataTypes.INTEGER,
    reference: {
      model: Room,
      key: 'id',
    }
  },
}, { // 모듈 옵션 더해줌
    freezeTableName: true,
  }) // 모듈 만들어줌
}