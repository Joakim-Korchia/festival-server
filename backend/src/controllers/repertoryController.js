const { Repertory } = require('../models');

exports.getAllRepertories = async (req, res) => {
  try {
    const repertories = await Repertory.findAll();
    res.json(repertories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des répertoires.' });
  }
};

exports.getRepertoryById = async (req, res) => {
  try {
    const repertory = await Repertory.findByPk(req.params.id);
    if (repertory) {
      res.json(repertory);
    } else {
      res.status(404).json({ message: 'Répertoire non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du répertoire.' });
  }
};

exports.createRepertory = async (req, res) => {
  try {
    const repertory = await Repertory.create(req.body);
    res.status(201).json(repertory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du répertoire.' });
  }
};

exports.updateRepertory = async (req, res) => {
  try {
    const [updated] = await Repertory.update(req.body, {
      where: { id_rep: req.params.id },
    });
    if (updated) {
      const updatedRepertory = await Repertory.findByPk(req.params.id);
      res.json(updatedRepertory);
    } else {
      res.status(404).json({ message: 'Répertoire non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du répertoire.' });
  }
};

exports.deleteRepertory = async (req, res) => {
  try {
    const deleted = await Repertory.destroy({
      where: { id_rep: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Répertoire supprimé.' });
    } else {
      res.status(404).json({ message: 'Répertoire non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du répertoire.' });
  }
};