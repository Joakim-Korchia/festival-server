const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('specialisation', {
    id_specialisation: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_spec: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'specialty',
        key: 'id_spec'
      }
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
    tableName: 'specialisation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_specialisation" },
        ]
      },
      {
        name: "id_spec",
        using: "BTREE",
        fields: [
          { name: "id_spec" },
        ]
      },
      {
        name: "id_person",
        using: "BTREE",
        fields: [
          { name: "id_person" },
        ]
      },
    ]
  });
};
