const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('track', {
    id_track: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_track: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    year_track: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    author_name_track: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    duration_track: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'type',
        key: 'id_type'
      }
    }
  }, {
    sequelize,
    tableName: 'track',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_track" },
        ]
      },
      {
        name: "id_type",
        using: "BTREE",
        fields: [
          { name: "id_type" },
        ]
      },
    ]
  });
};
