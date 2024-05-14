const { State } = require('../models');

exports.getAllStates = async (req, res) => {
  try {
    const states = await State.findAll();
    res.json(states);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du pays.' });
  }
};

exports.getStateById = async (req, res) => {
  try {
    const state = await State.findByPk(req.params.id);
    if (state) {
      res.json(state);
    } else {
      res.status(404).json({ message: 'Pays non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du pays.' });
  }
};

exports.createState = async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du pays.' });
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
      res.status(404).json({ message: 'Pays non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du pays.' });
  }
};

exports.deleteState = async (req, res) => {
  try {
    const deleted = await State.destroy({
      where: { id_state: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Pays supprimé.' });
    } else {
      res.status(404).json({ message: 'Pays non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du pays.' });
  }
};