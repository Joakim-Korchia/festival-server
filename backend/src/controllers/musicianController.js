const { Musician } = require('../models');

exports.getAllMusicians = async (req, res) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des musiciens.' });
  }
};

exports.getMusicianById = async (req, res) => {
  try {
    const musician = await Musician.findByPk(req.params.id);
    if (musician) {
      res.json(musician);
    } else {
      res.status(404).json({ message: 'Musicien non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du musicien.' });
  }
};

exports.createMusician = async (req, res) => {
  try {
    const musician = await Musician.create(req.body);
    res.status(201).json(musician);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du musicien.' });
  }
};

exports.updateMusician = async (req, res) => {
  try {
    const [updated] = await Musician.update(req.body, {
      where: { id_mus: req.params.id },
    });
    if (updated) {
      const updatedMusician = await Musician.findByPk(req.params.id);
      res.json(updatedMusician);
    } else {
      res.status(404).json({ message: 'Musicien non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du musicien.' });
  }
};

exports.deleteMusician = async (req, res) => {
  try {
    const deleted = await Musician.destroy({
      where: { id_mus: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Musicien supprimé.' });
    } else {
      res.status(404).json({ message: 'Musicien non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du musicien.' });
  }
};