const { Musician } = require('../models');

exports.getAllMusicians = async (req, res) => {
  try {
    const musicians = await Musician.findAll();
    res.json(musicians);
  } catch (error) {
    console.error('Erreur lors de la récupération des musiciens:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
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
    console.error(`Erreur lors de la récupération du musicien avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createMusician = async (req, res) => {
  try {
    // Validation des données ici
    const musician = await Musician.create(req.body);
    res.status(201).json(musician);
  } catch (error) {
    console.error('Erreur lors de la création du musicien:', error);
    res.status(400).json({ message: 'Erreur lors de la création du musicien.' });
  }
};

exports.updateMusician = async (req, res) => {
  try {
    // Validation des données ici
    const [updated] = await Musician.update(req.body, {
      where: { id_musician: req.params.id },
    });
    if (updated) {
      const updatedMusician = await Musician.findByPk(req.params.id);
      res.json(updatedMusician);
    } else {
      res.status(404).json({ message: 'Musicien non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du musicien avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteMusician = async (req, res) => {
  try {
    const deleted = await Musician.destroy({
      where: { id_musician: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Musicien non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression du musicien avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};