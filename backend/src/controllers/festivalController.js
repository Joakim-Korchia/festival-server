const { Festival } = require('../models');

exports.getAllFestivals = async (req, res) => {
  try {
    const festivals = await Festival.findAll();
    res.json(festivals);
  } catch (error) {
    console.error('Erreur lors de la récupération des festivals:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getFestivalById = async (req, res) => {
  try {
    const festival = await Festival.findByPk(req.params.id);
    if (festival) {
      res.json(festival);
    } else {
      res.status(404).json({ message: 'Festival non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du festival avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createFestival = async (req, res) => {
  try {
    // Validation des données ici
    const festival = await Festival.create(req.body);
    res.status(201).json(festival);
  } catch (error) {
    console.error('Erreur lors de la création du festival:', error);
    res.status(400).json({ message: 'Erreur lors de la création du festival.' });
  }
};

exports.updateFestival = async (req, res) => {
  try {
    // Validation des données ici
    const [updated] = await Festival.update(req.body, {
      where: { id_fest: req.params.id },
    });
    if (updated) {
      const updatedFestival = await Festival.findByPk(req.params.id);
      res.json(updatedFestival);
    } else {
      res.status(404).json({ message: 'Festival non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du festival avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteFestival = async (req, res) => {
  try {
    const deleted = await Festival.destroy({
      where: { id_fest: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Festival non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression du festival avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};