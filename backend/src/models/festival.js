const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Festival = sequelize.define('festival', {
    id_fest: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name_fest: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    date_start_fest: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_end_fest: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    id_person: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'person',
        key: 'id_person'
      }
    },
    id_place: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'place',
        key: 'id_place'
      }
    }
  }, {
    sequelize,
    tableName: 'festival',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_fest" },
        ]
      },
      {
        name: "fk_fest_place",
        using: "BTREE",
        fields: [
          { name: "id_place" },
        ]
      },
      {
        name: "person_create_fest",
        using: "BTREE",
        fields: [
          { name: "id_person" },
        ]
      },
    ]
  });

  Festival.associate = function(models) {
    Festival.belongsTo(models.person, { as: "id_person_person", foreignKey: "id_person" });
    Festival.belongsTo(models.place, { as: "id_place_place", foreignKey: "id_place" });
    Festival.hasMany(models.performance, { as: "performances", foreignKey: "id_fest" });
  };

  return Festival;
};