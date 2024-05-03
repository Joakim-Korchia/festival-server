const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('appuser', {
    id_appuser: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_appuser: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    password_appuser: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    type_appuser: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'appuser',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_appuser" },
        ]
      },
    ]
  });
};
