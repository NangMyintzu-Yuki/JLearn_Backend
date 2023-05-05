const express = require('express')
const { create, update, findAll, findById, deleteById, validate } = require('../controllers/kanji.controller')

const router = express.Router();

router.post("/kanjis/list", validate, findAll);
router.post("/kanjis/create", validate, create);
router.put("/kanjis/update", validate, update);
router.post("/kanjis/detail", validate, findById);
router.delete("/kanjis/delete", validate, deleteById);

module.exports = router;