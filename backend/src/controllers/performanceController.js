const { Performance } = require('../models');

exports.getAllPerformances = async (req, res) => {
  try {
    const performances = await Performance.findAll();
    res.json(performances);
  } catch (error) {
    console.error('Erreur lors de la récupération des performances:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getPerformanceById = async (req, res) => {
  try {
    const performance = await Performance.findByPk(req.params.id);
    if (performance) {
      res.json(performance);
    } else {
      res.status(404).json({ message: 'Performance non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération de la performance avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createPerformance = async (req, res) => {
  try {
    // Validation des données ici
    const performance = await Performance.create(req.body);
    res.status(201).json(performance);
  } catch (error) {
    console.error('Erreur lors de la création de la performance:', error);
    res.status(400).json({ message: 'Erreur lors de la création de la performance.' });
  }
};

exports.updatePerformance = async (req, res) => {
  try {
    // Validation des données ici
    const [updated] = await Performance.update(req.body, {
      where: { id_perf: req.params.id },
    });
    if (updated) {
      const updatedPerformance = await Performance.findByPk(req.params.id);
      res.json(updatedPerformance);
    } else {
      res.status(404).json({ message: 'Performance non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la performance avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deletePerformance = async (req, res) => {
  try {
    const deleted = await Performance.destroy({
      where: { id_perf: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Performance non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression de la performance avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};