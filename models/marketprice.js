'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarketPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MarketPrice.init({
    itemName: DataTypes.STRING,
    category: DataTypes.STRING,
    marketPrice: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'MarketPrice',
  });
  return MarketPrice;
};