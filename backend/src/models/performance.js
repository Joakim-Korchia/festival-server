const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Performance = sequelize.define('performance', {
    id_perf: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    date_perf: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_time_perf: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time_perf: {
      type: DataTypes.TIME,
      allowNull: false
    },
    id_fest: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'festival',
        key: 'id_fest'
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
    tableName: 'performance',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_perf" },
        ]
      },
      {
        name: "id_fest",
        using: "BTREE",
        fields: [
          { name: "id_fest" },
        ]
      },
      {
        name: "id_band",
        using: "BTREE",
        fields: [
          { name: "id_band" },
        ]
      },
    ]
  });

  Performance.associate = function(models) {
    Performance.belongsTo(models.band, { as: "id_band_band", foreignKey: "id_band" });
    Performance.belongsTo(models.festival, { as: "id_fest_festival", foreignKey: "id_fest" });
    Performance.belongsToMany(models.musician, { as: 'id_musician_musicians', through: models.perform, foreignKey: "id_perf", otherKey: "id_musician" });
    Performance.belongsToMany(models.specialisation, { as: 'id_specialisation_specialisations', through: models.participate, foreignKey: "id_perf", otherKey: "id_specialisation" });
    Performance.belongsToMany(models.track, { as: 'id_track_track_setlists', through: models.setlist, foreignKey: "id_perf", otherKey: "id_track" });
  };

  return Performance;
};