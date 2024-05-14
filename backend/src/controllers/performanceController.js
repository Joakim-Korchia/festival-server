const { Performance } = require('../models');

exports.getAllPerformances = async (req, res) => {
  try {
    const performances = await Performance.findAll();
    res.json(performances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des performances.' });
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
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la performance.' });
  }
};

exports.createPerformance = async (req, res) => {
  try {
    const performance = await Performance.create(req.body);
    res.status(201).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la performance.' });
  }
};

exports.updatePerformance = async (req, res) => {
  try {
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
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la performance.' });
  }
};

exports.deletePerformance = async (req, res) => {
  try {
    const deleted = await Performance.destroy({
      where: { id_perf: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Performance supprimée.' });
    } else {
      res.status(404).json({ message: 'Performance non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la performance.' });
  }
};