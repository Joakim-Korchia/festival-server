const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('region', {
    id_region: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_state: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'state',
        key: 'id_state'
      }
    },
    name_region: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'region',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_region" },
        ]
      },
      {
        name: "id_state",
        using: "BTREE",
        fields: [
          { name: "id_state" },
        ]
      },
    ]
  });
};
