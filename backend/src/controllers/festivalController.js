const { Festival } = require('../models');

exports.getAllFestivals = async (req, res) => {
  try {
    const festivals = await Festival.findAll();
    res.json(festivals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des festivals.' });
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
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du festival.' });
  }
};

exports.createFestival = async (req, res) => {
  try {
    const festival = await Festival.create(req.body);
    res.status(201).json(festival);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du festival.' });
  }
};

exports.updateFestival = async (req, res) => {
  try {
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
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du festival.' });
  }
};

exports.deleteFestival = async (req, res) => {
  try {
    const deleted = await Festival.destroy({
      where: { id_fest: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Festival supprimé.' });
    } else {
      res.status(404).json({ message: 'Festival non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du festival.' });
  }
};