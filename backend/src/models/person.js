const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Person = sequelize.define('person', {
    id_person: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    firstname_person: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    lastname_person: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    address_person: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    id_appuser: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'appuser',
        key: 'id_appuser'
      }
    },
    id_responsability_person: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'responsability_person',
        key: 'id_responsability_person'
      }
    },
    id_town: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'town',
        key: 'id_town'
      }
    }
  }, {
    sequelize,
    tableName: 'person',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_person" },
        ]
      },
      {
        name: "id_responsability_person",
        using: "BTREE",
        fields: [
          { name: "id_responsability_person" },
        ]
      },
      {
        name: "id_appuser",
        using: "BTREE",
        fields: [
          { name: "id_appuser" },
        ]
      },
      {
        name: "id_town",
        using: "BTREE",
        fields: [
          { name: "id_town" },
        ]
      },
    ]
  });

  Person.associate = function(models) {
    Person.belongsTo(models.appuser, { as: "id_appuser_appuser", foreignKey: "id_appuser" });
    Person.belongsTo(models.band, { as: "id_band_band", foreignKey: "id_band" });
    Person.hasMany(models.band, { as: "bands", foreignKey: "id_person" });
    Person.hasMany(models.festival, { as: "festivals", foreignKey: "id_person" });
    Person.hasMany(models.musician, { as: "musicians", foreignKey: "id_person" });
    Person.hasMany(models.specialisation, { as: "specialisations", foreignKey: "id_person" });
    Person.belongsTo(models.responsability_person, { as: "id_responsability_person_responsability_person", foreignKey: "id_responsability_person" });
    Person.belongsTo(models.town, { as: "id_town_town", foreignKey: "id_town" });
  };

  return Person;
};