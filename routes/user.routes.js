const express = require('express')
const { create, update, findAll, findById, deleteById, validate } = require('../controllers/user.controller')

const router = express.Router();

router.post("/users/list", validate, findAll);
router.post("/users/create", validate, create);
router.put("/users/update", validate, update);
router.post("/users/detail", validate, findById);
router.delete("/users/delete", validate, deleteById);

module.exports = router;