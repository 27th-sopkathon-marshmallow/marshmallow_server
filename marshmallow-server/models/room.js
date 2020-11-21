module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Room', {
  //모델의 Attributes (Column)을 정의하는곳
  title: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  limitTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  startTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
}, {
    //model의 옵션을 지정하는 곳
    freezeTableName: true,
    timestamps: false,
  });
};