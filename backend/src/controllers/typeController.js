const { Type } = require('../models');

exports.getAllTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    res.json(types);
  } catch (error) {
    console.error('Erreur lors de la récupération des types:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getTypeById = async (req, res) => {
  try {
    const type = await Type.findByPk(req.params.id);
    if (type) {
      res.json(type);
    } else {
      res.status(404).json({ message: 'Type non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération du type avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createType = async (req, res) => {
  try {
    const type = await Type.create(req.body);
    res.status(201).json(type);
  } catch (error) {
    console.error('Erreur lors de la création du type:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.updateType = async (req, res) => {
  try {
    const [updated] = await Type.update(req.body, {
      where: { id_type: req.params.id },
    });
    if (updated) {
      const updatedType = await Type.findByPk(req.params.id);
      res.json(updatedType);
    } else {
      res.status(404).json({ message: 'Type non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du type avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteType = async (req, res) => {
  try {
    const deleted = await Type.destroy({
      where: { id_type: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Type non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression du type avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};