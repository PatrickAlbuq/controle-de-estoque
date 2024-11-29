'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductEntry extends Model {
    static associate(models) {
      // define association here
      ProductEntry.belongsTo(models.Product, {
        foreignKey: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  ProductEntry.init({
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
    modelName: 'ProductEntry',
    tableName: 'product_entries'
  });
  return ProductEntry;
};
