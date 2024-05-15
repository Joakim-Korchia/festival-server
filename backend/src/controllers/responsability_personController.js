const { ResponsabilityPerson } = require('../models');

exports.getAllResponsabilityPersons = async (req, res) => {
  try {
    const responsabilityPersons = await ResponsabilityPerson.findAll();
    res.json(responsabilityPersons);
  } catch (error) {
    console.error('Erreur lors de la récupération des responsabilités des personnes:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
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
    console.error(`Erreur lors de la récupération de la responsabilité de la personne avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createResponsabilityPerson = async (req, res) => {
  try {
    const responsabilityPerson = await ResponsabilityPerson.create(req.body);
    res.status(201).json(responsabilityPerson);
  } catch (error) {
    console.error('Erreur lors de la création de la responsabilité de la personne:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
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
    console.error(`Erreur lors de la mise à jour de la responsabilité de la personne avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteResponsabilityPerson = async (req, res) => {
  try {
    const deleted = await ResponsabilityPerson.destroy({
      where: { id_resp_pers: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Responsabilité de la personne non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression de la responsabilité de la personne avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};