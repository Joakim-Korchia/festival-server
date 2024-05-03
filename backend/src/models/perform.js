const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Perform = sequelize.define('perform', {
    id_musician: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'musician',
        key: 'id_musician'
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
    tableName: 'perform',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_musician" },
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

  Perform.associate = function(models) {
    Perform.belongsTo(models.performance, { as: "id_perf_performance", foreignKey: "id_perf" });
    Perform.belongsTo(models.musician, { as: "id_musician_musician", foreignKey: "id_musician" });
  };

  return Perform;
};