'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class giver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      giver.belongsTo(models.grade, {
        foreignKey: 'grade_id'
      })
    }
  }
  giver.init({
    user_type: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    mobile: DataTypes.STRING,
    img: DataTypes.STRING,
    verification: DataTypes.STRING,
    verify_hash: DataTypes.STRING,
    black_point: DataTypes.INTEGER,
    grade_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'giver',
  });
  return giver;
};