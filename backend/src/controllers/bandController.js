const { Band } = require('../models');

exports.getAllBands = async (req, res) => {
  try {
    const bands = await Band.findAll();
    res.json(bands);
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getBandById = async (req, res) => {
  try {
    const band = await Band.findByPk(req.params.id);
    if (band) {
      res.json(band);
    } else {
      res.status(404).json({ message: 'Groupe non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du groupe avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createBand = async (req, res) => {
  try {
    // Validation des données ici
    const band = await Band.create(req.body);
    res.status(201).json(band);
  } catch (error) {
    console.error('Erreur lors de la création du groupe:', error);
    res.status(400).json({ message: 'Erreur lors de la création du groupe.' });
  }
};

exports.updateBand = async (req, res) => {
  try {
    // Validation des données ici
    const [updated] = await Band.update(req.body, {
      where: { id_band: req.params.id },
    });
    if (updated) {
      constupdatedBand = await Band.findByPk(req.params.id);
      res.json(updatedBand);
    } else {
      res.status(404).json({ message: 'Groupe non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du groupe avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteBand = async (req, res) => {
  try {
    const deleted = await Band.destroy({
      where: { id_band: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Groupe non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression du groupe avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};