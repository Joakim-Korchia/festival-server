const { Setlist } = require('../models');

exports.getAllSetlists = async (req, res) => {
  try {
    const setlists = await Setlist.findAll();
    res.json(setlists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des setlists.' });
  }
};

exports.getSetlistById = async (req, res) => {
  try {
    const setlist = await Setlist.findByPk(req.params.id);
    if (setlist) {
      res.json(setlist);
    } else {
      res.status(404).json({ message: 'Setlist non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la setlist.' });
  }
};

exports.createSetlist = async (req, res) => {
  try {
    const setlist = await Setlist.create(req.body);
    res.status(201).json(setlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la setlist.' });
  }
};

exports.updateSetlist = async (req, res) => {
  try {
    const [updated] = await Setlist.update(req.body, {
      where: { id_setlist: req.params.id },
    });
    if (updated) {
      const updatedSetlist = await Setlist.findByPk(req.params.id);
      res.json(updatedSetlist);
    } else {
      res.status(404).json({ message: 'Setlist non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la setlist.' });
  }
};

exports.deleteSetlist = async (req, res) => {
  try {
    const deleted = await Setlist.destroy({
      where: { id_setlist: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Setlist supprimée.' });
    } else {
      res.status(404).json({ message: 'Setlist non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la setlist.' });
  }
};