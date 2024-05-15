const { State } = require('../models');

exports.getAllStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.json(states);
  } catch (error) {
    console.error('Erreur lors de la récupération des états:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getStateById = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (state) {
      res.json(state);
    } else {
      res.status(404).json({ message: 'État non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'état avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (error) {
    console.error('Erreur lors de la création de l\'état:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.updateState = async (req, res) => {
  try {
    const [updated] = await State.update(req.body, {
      where: { id_state: req.params.id },
    });
    if (updated) {
      const updatedState = await State.findByPk(req.params.id);
      res.json(updatedState);
    } else {
      res.status(404).json({ message: 'État non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'état avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const deleted = await State.destroy({
      where: { id_state: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'État non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'état avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};