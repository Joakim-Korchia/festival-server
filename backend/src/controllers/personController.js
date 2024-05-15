const { Person } = require('../models');

exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (error) {
    console.error('Erreur lors de la récupération des personnes:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getPersonById = async (req, res) => {
  try {
    const person = await Person.findByPk(req.params.id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: 'Personne non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors dela récupération de la personne avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createPerson = async (req, res) => {
  try {
    // Validation des données ici
    const person = await Person.create(req.body);
    res.status(201).json(person);
  } catch (error) {
    console.error('Erreur lors de la création de la personne:', error);
    res.status(400).json({ message: 'Erreur lors de la création de la personne.' });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    // Validation des données ici
    const [updated] = await Person.update(req.body, {
      where: { id_person: req.params.id },
    });
    if (updated) {
      const updatedPerson = await Person.findByPk(req.params.id);
      res.json(updatedPerson);
    } else {
      res.status(404).json({ message: 'Personne non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de la personne avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const deleted = await Person.destroy({
      where: { id_person: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Personne non trouvée.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression de la personne avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};