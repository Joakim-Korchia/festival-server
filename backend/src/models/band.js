const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Band = sequelize.define('band', {
    id_band: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_band: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    id_person: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'id_person'
      }
    }
  }, {
    sequelize,
    tableName: 'band',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_band" },
        ]
      },
      {
        name: "person_represent_band",
        using: "BTREE",
        fields: [
          { name: "id_person" },
        ]
      },
    ]
  });

  Band.associate = function(models) {
    Band.belongsTo(models.person, { as: "id_person_person", foreignKey: "id_person" });
    Band.hasMany(models.performance, { as: "performances", foreignKey: "id_band" });
    Band.hasMany(models.person, { as: "people", foreignKey: "id_band" });
    Band.hasMany(models.repertory, { as: "repertories", foreignKey: "id_band" });
    Band.belongsToMany(models.track, { as: 'id_track_tracks', through: models.repertory, foreignKey: "id_band", otherKey: "id_track" });
  };

  return Band;
};