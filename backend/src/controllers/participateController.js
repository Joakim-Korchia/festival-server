const { Participate } = require('../models');

exports.createParticipate = async (req, res) => {
  try {
    const { ArtistIdArtist, ShowIdShow } = req.body;
    const participate = await Participate.create({ ArtistIdArtist, ShowIdShow });
    res.status(201).json(participate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'association participate.' });
  }
};

exports.deleteParticipate = async (req, res) => {
  try {
    const { artistId, showId } = req.params;
    const deleted = await Participate.destroy({
      where: { ArtistIdArtist: artistId, ShowIdShow: showId },
    });
    if (deleted) {
      res.status(204).json({ message: 'Association participate supprimée.' });
    } else {
      res.status(404).json({ message: 'Association participate non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'association participate.' });
  }
};