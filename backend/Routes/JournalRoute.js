/** @format */

const {
  attachUser,
  getJournal,
  getoneJournal,
  setJournal,
  updateJournal,
  deleteJournal,
} = require('../middleware/journals');
const router = require('express').Router();

const { getStats } = require('../Controllers/JournalController');

router.get('/stats', getStats);


router.get('/', attachUser, getJournal);
router.get('/:id', attachUser, getoneJournal);
router.post('/', attachUser, setJournal);
router.put('/:id', attachUser, updateJournal);
router.delete('/:id', attachUser, deleteJournal);
module.exports = router;
