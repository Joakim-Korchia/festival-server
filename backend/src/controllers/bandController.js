const { Band } = require('../models');

exports.getAllBands = async (req, res) => {
  try {
    const bands = await Band.findAll();
    res.json(bands);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des groupes.' });
  }
};

exports.getBandById = async (req, res) => {
  try {
    const band = await Band.findByPk(req.params.id);
    if (band) {
      res.json(band);
    } else {
      res.status(404).json({ message: 'Groupe non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération du groupe.' });
  }
};

exports.createBand = async (req, res) => {
  try {
    const band = await Band.create(req.body);
    res.status(201).json(band);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création du groupe.' });
  }
};

exports.updateBand = async (req, res) => {
  try {
    const [updated] = await Band.update(req.body, {
      where: { id_band: req.params.id },
    });
    if (updated) {
      const updatedBand = await Band.findByPk(req.params.id);
      res.json(updatedBand);
    } else {
      res.status(404).json({ message: 'Groupe non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du groupe.' });
  }
};

exports.deleteBand = async (req, res) => {
  try {
    const deleted = await Band.destroy({
      where: { id_band: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Groupe supprimé.' });
    } else {
      res.status(404).json({ message: 'Groupe non trouvé.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la suppression du groupe.' });
  }
};