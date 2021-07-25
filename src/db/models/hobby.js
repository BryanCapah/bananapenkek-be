'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hobby extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  hobby.init({
    hobbyname: DataTypes.STRING,
    hobbyid: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'hobby',
    underscored: true,
  });
  return hobby;
};