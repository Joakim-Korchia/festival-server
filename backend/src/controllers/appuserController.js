const { Appuser } = require('../models');

exports.getAllAppusers = async (req, res) => {
  try {
    const appusers = await Appuser.findAll();
    res.json(appusers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs.' });
  }
};

exports.getAppuserById = async (req, res) => {
  try {
    const appuser = await Appuser.findByPk(req.params.id);
    if (appuser) {
      res.json(appuser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
};

exports.createAppuser = async (req, res) => {
  try {
    const appuser = await Appuser.create(req.body);
    res.status(201).json(appuser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
  }
};

exports.updateAppuser = async (req, res) => {
  try {
    const [updated] = await Appuser.update(req.body, {
      where: { id_appuser: req.params.id },
    });
    if (updated) {
      const updatedAppuser = await Appuser.findByPk(req.params.id);
      res.json(updatedAppuser);
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
};

exports.deleteAppuser = async (req, res) => {
  try {
    const deleted = await Appuser.destroy({
      where: { id_appuser: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Utilisateur supprimé.' });
    } else {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
};