const { Speciality } = require('../models');

exports.getAllSpecialities = async (req, res) => {
  try {
    const specialities = await Speciality.findAll();
    res.json(specialities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des spécialités.' });
  }
};

exports.getSpecialityById = async (req, res) => {
  try {
    const speciality = await Speciality.findByPk(req.params.id);
    if (speciality) {
      res.json(speciality);
    } else {
      res.status(404).json({ message: 'Spécialité non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la spécialité.' });
  }
};

exports.createSpeciality = async (req, res) => {
  try {
    const speciality = await Speciality.create(req.body);
    res.status(201).json(speciality);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la spécialité.' });
  }
};

exports.updateSpeciality = async (req, res) => {
  try {
    const [updated] = await Speciality.update(req.body, {
      where: { id_speciality: req.params.id },
    });
    if (updated) {
      const updatedSpeciality = await Speciality.findByPk(req.params.id);
      res.json(updatedSpeciality);
    } else {
      res.status(404).json({ message: 'Spécialité non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la spécialité.' });
  }
};

exports.deleteSpeciality = async (req, res) => {
  try {
    const deleted = await Speciality.destroy({
      where: { id_speciality: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Spécialité supprimée.' });
    } else {
      res.status(404).json({ message: 'Spécialité non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la spécialité.' });
  }
};