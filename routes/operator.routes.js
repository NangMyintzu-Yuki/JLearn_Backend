const express = require('express')
const { create, update, findAll, findById, deleteById, validate } = require('../controllers/operator.controller')

const router = express.Router();

router.post("/operators/list", validate, findAll);
router.post("/operators/create", validate, create);
router.put("/operators/update", validate, update);
router.post("/operators/detail", validate, findById);
router.delete("/operators/delete", validate, deleteById);

module.exports = router;