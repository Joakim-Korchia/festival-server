const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Participate = sequelize.define('participate', {
    id_specialisation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'specialisation',
        key: 'id_specialisation'
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
    tableName: 'participate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_specialisation" },
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

  Participate.associate = function(models) {
    Participate.belongsTo(models.performance, { as: "id_perf_performance", foreignKey: "id_perf" });
    Participate.belongsTo(models.specialisation, { as: "id_specialisation_specialisation", foreignKey: "id_specialisation" });
  };

  return Participate;
};