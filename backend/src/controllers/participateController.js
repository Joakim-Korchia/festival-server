const { Participate } = require('../models');

exports.getAllParticipations = async (req, res) => {
  try {
    const participations = await Participate.findAll();
    res.json(participations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des participations.' });
  }
};

exports.getParticipationById = async (req, res) => {
  try {
    const participation = await Participate.findByPk(req.params.id);
    if (participation) {
      res.json(participation);
    } else {
      res.status(404).json({ message: 'Participation non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la participation.' });
  }
};

exports.createParticipation = async (req, res) => {
  try {
    const participation = await Participate.create(req.body);
    res.status(201).json(participation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la participation.' });
  }
};

exports.updateParticipation = async (req, res) => {
  try {
    const [updated] = await Participate.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedParticipation = await Participate.findByPk(req.params.id);
      res.json(updatedParticipation);
    } else {
      res.status(404).json({ message: 'Participation non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la participation.' });
  }
};

exports.deleteParticipation = async (req, res) => {
  try {
    const deleted = await Participate.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Participation supprimée.' });
    } else {
      res.status(404).json({ message: 'Participation non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la participation.' });
  }
};