const express = require('express')
const { create, update, findAll, findById, deleteById, validate } = require("../controllers/vocab.controller")
const router = express.Router();

router.post("/vocabs/list", validate, findAll);
router.post("/vocabs/create", validate, create);
router.put("/vocabs/update", validate, update);
router.post("/vocabs/detail", validate, findById);
router.delete("/vocabs/delete", validate, deleteById);

module.exports = router;