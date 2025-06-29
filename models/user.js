'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    role: DataTypes.STRING,
    county: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    language: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};