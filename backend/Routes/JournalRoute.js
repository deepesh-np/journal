/** @format */

const { attachUser, getJournal, setJournal } = require('../middleware/journals');
const router = require('express').Router();

router.get('/', attachUser, getJournal);
router.post('/', attachUser, setJournal);
module.exports = router;