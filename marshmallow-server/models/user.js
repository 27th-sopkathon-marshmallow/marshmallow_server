module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
  //모델의 Attributes (Column)을 정의하는곳
  nickname: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  percent: {
    type: DataTypes.INTEGER(30),
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING(200),
    allowNull: false,
  }
}, {
    //model의 옵션을 지정하는 곳
    freezeTableName: true,
    timestamps: false,
  });
};