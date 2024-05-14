const { Person } = require('../models');

exports.getAllPersons = async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des personnes.' });
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
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la personne.' });
  }
};

exports.createPerson = async (req, res) => {
  try {
    const person = await Person.create(req.body);
    res.status(201).json(person);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de la personne.' });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const [updated] = await Person.update(req.body, {
      where: { id_pers: req.params.id },
    });
    if (updated) {
      const updatedPerson = await Person.findByPk(req.params.id);
      res.json(updatedPerson);
    } else {
      res.status(404).json({ message: 'Personne non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la personne.' });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const deleted = await Person.destroy({
      where: { id_pers: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Personne supprimée.' });
    } else {
      res.status(404).json({ message: 'Personne non trouvée.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la personne.' });
  }
};