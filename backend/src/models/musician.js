const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Musician = sequelize.define('musician', {
    id_musician: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_instrument: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'instrument',
        key: 'id_instrument'
      }
    },
    id_person: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'id_person'
      }
    },
    id_band: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'band',
        key: 'id_band'
      }
    }
  }, {
    sequelize,
    tableName: 'musician',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_musician" },
        ]
      },
      {
        name: "id_person",
        using: "BTREE",
        fields: [
          { name: "id_person" },
        ]
      },
      {
        name: "id_band",
        using: "BTREE",
        fields: [
          { name: "id_band" },
        ]
      },
      {
        name: "id_instrument",
        using: "BTREE",
        fields: [
          { name: "id_instrument" },
        ]
      },
    ]
  });

  Musician.associate = function(models) {
    Musician.belongsTo(models.band, { as: "id_band_band", foreignKey: "id_band" });
    Musician.belongsTo(models.person, { as: "id_person_person", foreignKey: "id_person" });
    Musician.belongsTo(models.instrument, { as: "id_instrument_instrument", foreignKey: "id_instrument" });
    Musician.belongsToMany(models.performance, { as: "id_perf_performances", through: models.perform, foreignKey: "id_musician", otherKey: "id_perf" });
  };

  return Musician;
};