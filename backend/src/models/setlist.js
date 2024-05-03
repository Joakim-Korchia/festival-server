const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('setlist', {
    id_track: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'track',
        key: 'id_track'
      }
    },
    id_perf: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'performance',
        key: 'id_perf'
      }
    }
  }, {
    sequelize,
    tableName: 'setlist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_track" },
          { name: "id_perf" },
        ]
      },
      {
        name: "id_perf",
        using: "BTREE",
        fields: [
          { name: "id_perf" },
        ]
      },
    ]
  });
};
