const { Track } = require('../models');

exports.getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.findAll();
    res.json(tracks);
  } catch (error) {
    console.error('Erreur lors de la récupération des morceaux:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getTrackById = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (track) {
      res.json(track);
    } else {
      res.status(404).json({ message: 'Morceau non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du morceau avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createTrack = async (req, res) => {
  try {
    const track = await Track.create(req.body);
    res.status(201).json(track);
  } catch (error) {
    console.error('Erreur lors de la création du morceau:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.updateTrack = async (req, res) => {
  try {
    const [updated] = await Track.update(req.body, {
      where: { id_track: req.params.id },
    });
    if (updated) {
      const updatedTrack = await Track.findByPk(req.params.id);
      res.json(updatedTrack);
    } else {
      res.status(404).json({ message: 'Morceau non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors**Erreur lors de la mise à jour du morceau avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteTrack = async (req, res) => {
  try {
    const deleted = await Track.destroy({
      where: { id_track: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Morceau non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression du morceau avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};