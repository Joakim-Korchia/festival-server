const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repertory', {
    id_band: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'band',
        key: 'id_band'
      }
    },
    id_track: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'track',
        key: 'id_track'
      }
    }
  }, {
    sequelize,
    tableName: 'repertory',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_band" },
          { name: "id_track" },
        ]
      },
      {
        name: "id_track",
        using: "BTREE",
        fields: [
          { name: "id_track" },
        ]
      },
    ]
  });
};
