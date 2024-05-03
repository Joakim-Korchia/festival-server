const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('town', {
    id_town: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    postal_code_town: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    id_region: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'region',
        key: 'id_region'
      }
    },
    name_town: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'town',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_town" },
        ]
      },
      {
        name: "id_region",
        using: "BTREE",
        fields: [
          { name: "id_region" },
        ]
      },
    ]
  });
};
