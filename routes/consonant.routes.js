const express = require('express')
const { create, update, findAll, findById, deleteById, validate } = require('../controllers/consonant.controller')

const router = express.Router();

router.post("/consonants/list", validate, findAll);
router.post("/consonants/create", validate, create);
router.put("/consonants/update", validate, update);
router.post("/consonants/detail", validate, findById);
router.delete("/consonants/delete", validate, deleteById);

module.exports = router;