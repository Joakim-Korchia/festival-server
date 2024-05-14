const { Specialisation } = require('../models');

exports.getAllSpecialisations = async (req, res) => {
  try {
    const specialisations = await Specialisation.findAll();
    res.json(specialisations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des spécialisations.' });
  }
};

exports.getSpecialisationById = async (req, res) => {
  try {
    const specialisation = await Specialisation.findByPk(req.params.id);
    if (specialisation) {
      res.json(specialisation);
    } else {
      res.status(404).json({ message: 'Spécialisation non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la spécialisation.' });
  }
};

exports.createSpecialisation = async (req, res) => {
  try {
    const specialisation = await Specialisation.create(req.body);
    res.status(201).json(specialisation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la spécialisation.' });
  }
};

exports.updateSpecialisation = async (req, res) => {
  try {
    const [updated] = await Specialisation.update(req.body, {
      where: { id_spe: req.params.id },
    });
    if (updated) {
      const updatedSpecialisation = await Specialisation.findByPk(req.params.id);
      res.json(updatedSpecialisation);
    } else {
      res.status(404).json({ message: 'Spécialisation non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la spécialisation.' });
  }
};

exports.deleteSpecialisation = async (req, res) => {
  try {
    const deleted = await Specialisation.destroy({
      where: { id_spe: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Spécialisation supprimée.' });
    } else {
      res.status(404).json({ message: 'Spécialisation non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la spécialisation.' });
  }
};