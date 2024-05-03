var DataTypes = require("sequelize").DataTypes;
var _appuser = require("./appuser");
var _band = require("./band");
var _festival = require("./festival");
var _instrument = require("./instrument");
var _musician = require("./musician");
var _participate = require("./participate");
var _perform = require("./perform");
var _performance = require("./performance");
var _person = require("./person");
var _region = require("./region");
var _repertory = require("./repertory");
var _responsability_person = require("./responsability_person");
var _setlist = require("./setlist");
var _specialisation = require("./specialisation");
var _specialty = require("./specialty");
var _state = require("./state");
var _town = require("./town");
var _track = require("./track");
var _type = require("./type");

function initModels(sequelize) {
  var appuser = _appuser(sequelize, DataTypes);
  var band = _band(sequelize, DataTypes);
  var festival = _festival(sequelize, DataTypes);
  var instrument = _instrument(sequelize, DataTypes);
  var musician = _musician(sequelize, DataTypes);
  var participate = _participate(sequelize, DataTypes);
  var perform = _perform(sequelize, DataTypes);
  var performance = _performance(sequelize, DataTypes);
  var person = _person(sequelize, DataTypes);
  var region = _region(sequelize, DataTypes);
  var repertory = _repertory(sequelize, DataTypes);
  var responsability_person = _responsability_person(sequelize, DataTypes);
  var setlist = _setlist(sequelize, DataTypes);
  var specialisation = _specialisation(sequelize, DataTypes);
  var specialty = _specialty(sequelize, DataTypes);
  var state = _state(sequelize, DataTypes);
  var town = _town(sequelize, DataTypes);
  var track = _track(sequelize, DataTypes);
  var type = _type(sequelize, DataTypes);

  band.belongsToMany(track, { as: 'id_track_tracks', through: repertory, foreignKey: "id_band", otherKey: "id_track" });
  musician.belongsToMany(performance, { as: 'id_perf_performance_performs', through: perform, foreignKey: "id_musician", otherKey: "id_perf" });
  performance.belongsToMany(musician, { as: 'id_musician_musicians', through: perform, foreignKey: "id_perf", otherKey: "id_musician" });
  performance.belongsToMany(specialisation, { as: 'id_specialisation_specialisations', through: participate, foreignKey: "id_perf", otherKey: "id_specialisation" });
  performance.belongsToMany(track, { as: 'id_track_track_setlists', through: setlist, foreignKey: "id_perf", otherKey: "id_track" });
  specialisation.belongsToMany(performance, { as: 'id_perf_performances', through: participate, foreignKey: "id_specialisation", otherKey: "id_perf" });
  track.belongsToMany(band, { as: 'id_band_bands', through: repertory, foreignKey: "id_track", otherKey: "id_band" });
  track.belongsToMany(performance, { as: 'id_perf_performance_setlists', through: setlist, foreignKey: "id_track", otherKey: "id_perf" });
  person.belongsTo(appuser, { as: "id_appuser_appuser", foreignKey: "id_appuser"});
  appuser.hasOne(person, { as: "person", foreignKey: "id_appuser"});
  performance.belongsTo(band, { as: "id_band_band", foreignKey: "id_band"});
  band.hasMany(performance, { as: "performances", foreignKey: "id_band"});
  person.belongsTo(band, { as: "id_band_band", foreignKey: "id_band"});
  band.hasMany(person, { as: "people", foreignKey: "id_band"});
  repertory.belongsTo(band, { as: "id_band_band", foreignKey: "id_band"});
  band.hasMany(repertory, { as: "repertories", foreignKey: "id_band"});
  performance.belongsTo(festival, { as: "id_fest_festival", foreignKey: "id_fest"});
  festival.hasMany(performance, { as: "performances", foreignKey: "id_fest"});
  musician.belongsTo(instrument, { as: "id_inst_instrument", foreignKey: "id_inst"});
  instrument.hasMany(musician, { as: "musicians", foreignKey: "id_inst"});
  perform.belongsTo(musician, { as: "id_musician_musician", foreignKey: "id_musician"});
  musician.hasMany(perform, { as: "performs", foreignKey: "id_musician"});
  participate.belongsTo(performance, { as: "id_perf_performance", foreignKey: "id_perf"});
  performance.hasMany(participate, { as: "participates", foreignKey: "id_perf"});
  perform.belongsTo(performance, { as: "id_perf_performance", foreignKey: "id_perf"});
  performance.hasMany(perform, { as: "performs", foreignKey: "id_perf"});
  setlist.belongsTo(performance, { as: "id_perf_performance", foreignKey: "id_perf"});
  performance.hasMany(setlist, { as: "setlists", foreignKey: "id_perf"});
  band.belongsTo(person, { as: "id_person_person", foreignKey: "id_person"});
  person.hasMany(band, { as: "bands", foreignKey: "id_person"});
  festival.belongsTo(person, { as: "id_person_person", foreignKey: "id_person"});
  person.hasMany(festival, { as: "festivals", foreignKey: "id_person"});
  musician.belongsTo(person, { as: "id_person_person", foreignKey: "id_person"});
  person.hasMany(musician, { as: "musicians", foreignKey: "id_person"});
  specialisation.belongsTo(person, { as: "id_person_person", foreignKey: "id_person"});
  person.hasMany(specialisation, { as: "specialisations", foreignKey: "id_person"});
  town.belongsTo(region, { as: "id_region_region", foreignKey: "id_region"});
  region.hasMany(town, { as: "towns", foreignKey: "id_region"});
  person.belongsTo(responsability_person, { as: "id_responsability_person_responsability_person", foreignKey: "id_responsability_person"});
  responsability_person.hasMany(person, { as: "people", foreignKey: "id_responsability_person"});
  participate.belongsTo(specialisation, { as: "id_specialisation_specialisation", foreignKey: "id_specialisation"});
  specialisation.hasMany(participate, { as: "participates", foreignKey: "id_specialisation"});
  specialisation.belongsTo(specialty, { as: "id_spec_specialty", foreignKey: "id_spec"});
  specialty.hasMany(specialisation, { as: "specialisations", foreignKey: "id_spec"});
  region.belongsTo(state, { as: "id_state_state", foreignKey: "id_state"});
  state.hasMany(region, { as: "regions", foreignKey: "id_state"});
  festival.belongsTo(town, { as: "id_town_town", foreignKey: "id_town"});
  town.hasMany(festival, { as: "festivals", foreignKey: "id_town"});
  person.belongsTo(town, { as: "id_town_town", foreignKey: "id_town"});
  town.hasMany(person, { as: "people", foreignKey: "id_town"});
  repertory.belongsTo(track, { as: "id_track_track", foreignKey: "id_track"});
  track.hasMany(repertory, { as: "repertories", foreignKey: "id_track"});
  setlist.belongsTo(track, { as: "id_track_track", foreignKey: "id_track"});
  track.hasMany(setlist, { as: "setlists", foreignKey: "id_track"});
  track.belongsTo(type, { as: "id_type_type", foreignKey: "id_type"});
  type.hasMany(track, { as: "tracks", foreignKey: "id_type"});

  return {
    appuser,
    band,
    festival,
    instrument,
    musician,
    participate,
    perform,
    performance,
    person,
    region,
    repertory,
    responsability_person,
    setlist,
    specialisation,
    specialty,
    state,
    town,
    track,
    type,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
