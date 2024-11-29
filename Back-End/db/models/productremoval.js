'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductRemoval extends Model {
    static associate(models) {
      // define association here
      ProductRemoval.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  ProductRemoval.init({
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'ProductRemoval',
    tableName: 'product_removals'
  });
  return ProductRemoval;
};
