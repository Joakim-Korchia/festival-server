const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Instrument = sequelize.define('instrument', {
    id_instrument: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_instrument: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'instrument',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_instrument" },
        ]
      },
    ]
  });

  Instrument.associate = function(models) {
    Instrument.hasMany(models.musician, { as: "musicians", foreignKey: "id_instrument" });
  };

  return Instrument;
};