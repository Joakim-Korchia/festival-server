const { Region } = require('../models');

exports.getAllRegions = async (req, res) => {
  try {
    const regions = await Region.findAll();
    res.json(regions);
  } catch (error) {
    console.error('Erreur lors de la récupération des régions:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getRegionById = async (req, res) => {
  try {
    const region = await Region.findByPk(req.params.id);
    if (region) {
      res.json(region);
    } else {
      res.status(404).json({ message: 'Région non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération de la région avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createRegion = async (req, res) => {
  try {
    // Validation des données ici
    const region = await Region.create(req.body);
    res.status(201).json(region);
  } catch (error) {
    console.error('Erreur lors de la création de la région:', error);
    res.status(400).json({ message: 'Erreur lors de la création de la région.' });
  }
};

exports.updateRegion = async (req, res) => {
  try {
    // Validation des données ici
    const [updated] = await Region.update(req.body, {
      where: { id_region: req.params.id },
    });
    if (updated) {
      const updatedRegion = await Region.findByPk(req.params.id);
      res.json(updatedRegion);
    } else {
      res.status(404).json({ message: 'Région non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la région avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteRegion = async (req, res) => {
  try {
    const deleted = await Region.destroy({
      where: { id_region: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Région non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression de la région avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};