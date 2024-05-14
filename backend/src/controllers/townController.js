const { Town } = require('../models');

exports.getAllTowns = async (req, res) => {
  try {
    const towns = await Town.findAll();
    res.json(towns);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des villes.' });
  }
};

exports.getTownById = async (req, res) => {
  try {
    const town = await Town.findByPk(req.params.id);
    if (town) {
      res.json(town);
    } else {
      res.status(404).json({ message: 'Ville non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la ville.' });
  }
};

exports.createTown = async (req, res) => {
  try {
    const town = await Town.create(req.body);
    res.status(201).json(town);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la ville.' });
  }
};

exports.updateTown = async (req, res) => {
  try {
    const [updated] = await Town.update(req.body, {
      where: { id_town: req.params.id },
    });
    if (updated) {
      const updatedTown = await Town.findByPk(req.params.id);
      res.json(updatedTown);
    } else {
      res.status(404).json({ message: 'Ville non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la ville.' });
  }
};

exports.deleteTown = async (req, res) => {
  try {
    const deleted = await Town.destroy({
      where: { id_town: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Ville supprimée.' });
    } else {
      res.status(404).json({ message: 'Ville non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la ville.' });
  }
};