const { Instrument } = require('../models');

exports.getAllInstruments = async (req, res) => {
  try {
    const instruments = await Instrument.findAll();
    res.json(instruments);
  } catch (error) {
    console.error('Erreur lors de la récupération des instruments:', error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.getInstrumentById = async (req, res) => {
  try {
    const instrument = await Instrument.findByPk(req.params.id);
    if (instrument) {
      res.json(instrument);
    } else {
      res.status(404).json({ message: 'Instrument non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'instrument avecl'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.createInstrument = async (req, res) => {
  try {
    // Validation des données ici
    const instrument = await Instrument.create(req.body);
    res.status(201).json(instrument);
  } catch (error) {
    console.error('Erreur lors de la création de l\'instrument:', error);
    res.status(400).json({ message: 'Erreur lors de la création de l\'instrument.' });
  }
};

exports.updateInstrument = async (req, res) => {
  try {
    // Validation des données ici
    const [updated] = await Instrument.update(req.body, {
      where: { id_instrument: req.params.id },
    });
    if (updated) {
      const updatedInstrument = await Instrument.findByPk(req.params.id);
      res.json(updatedInstrument);
    } else {
      res.status(404).json({ message: 'Instrument non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la mise à jour de l'instrument avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
};

exports.deleteInstrument = async (req, res) => {
  try {
    const deleted = await Instrument.destroy({
      where: { id_instrument: req.params.id },
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Instrument non trouvé.' });
    }
  } catch (error) {
    console.error(`Erreur lors de la suppression de l'instrument avec l'ID ${req.params.id}:`, error);
    res.status(500).json({ message: 'Erreur interne du serveur.' });
  }
}; 