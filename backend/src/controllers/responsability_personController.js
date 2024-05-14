const { ResponsabilityPerson } = require('../models');

exports.getAllResponsabilityPersons = async (req, res) => {
  try {
    const responsabilityPersons = await ResponsabilityPerson.findAll();
    res.json(responsabilityPersons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des responsabilités des personnes.' });
  }
};

exports.getResponsabilityPersonById = async (req, res) => {
  try {
    const responsabilityPerson = await ResponsabilityPerson.findByPk(req.params.id);
    if (responsabilityPerson) {
      res.json(responsabilityPerson);
    } else {
      res.status(404).json({ message: 'Responsabilité de la personne non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la responsabilité de la personne.' });
  }
};

exports.createResponsabilityPerson = async (req, res) => {
  try {
    const responsabilityPerson = await ResponsabilityPerson.create(req.body);
    res.status(201).json(responsabilityPerson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la responsabilité de la personne.' });
  }
};

exports.updateResponsabilityPerson = async (req, res) => {
  try {
    const [updated] = await ResponsabilityPerson.update(req.body, {
      where: { id_resp_pers: req.params.id },
    });
    if (updated) {
      const updatedResponsabilityPerson = await ResponsabilityPerson.findByPk(req.params.id);
      res.json(updatedResponsabilityPerson);
    } else {
      res.status(404).json({ message: 'Responsabilité de la personne non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la responsabilité de la personne.' });
  }
};

exports.deleteResponsabilityPerson = async (req, res) => {
  try {
    const deleted = await ResponsabilityPerson.destroy({
      where: { id_resp_pers: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Responsabilité de la personne supprimée.' });
    } else {
      res.status(404).json({ message: 'Responsabilité de la personne non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la responsabilité de la personne.' });
  }
};