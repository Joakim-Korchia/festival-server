const { Perform } = require('../models');

exports.createPerform = async (req, res) => {
  try {
    const { ArtistIdArtist, TrackIdTrack } = req.body;
    const perform = await Perform.create({ ArtistIdArtist, TrackIdTrack });
    res.status(201).json(perform);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'association perform.' });
  }
};

exports.deletePerform = async (req, res) => {
  try {
    const { artistId, trackId } = req.params;
    const deleted = await Perform.destroy({
      where: { ArtistIdArtist: artistId, TrackIdTrack: trackId },
    });
    if (deleted) {
      res.status(204).json({ message: 'Association perform supprimée.' });
    } else {
      res.status(404).json({ message: 'Association perform non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'association perform.' });
  }
};