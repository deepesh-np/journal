/** @format */

const { attachUser, getJournal, setJournal, updateJournal } = require('../middleware/journals');
const router = require('express').Router();

router.get('/', attachUser, getJournal);
router.post('/', attachUser, setJournal);
router.put('/:id', attachUser, updateJournal)
module.exports = router;