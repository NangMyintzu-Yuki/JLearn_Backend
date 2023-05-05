const express = require("express")
const { create, update, findAll, findById, deleteById, validate } = require('../controllers/level.controller')

const router = express.Router();
router.post('/levels/list', validate, findAll);

router.post('/levels/create', validate, create);
router.put('/levels/update', validate, update)
router.post('/levels/detail', validate, findById)
router.delete("/levels/delete", validate, deleteById);

module.exports = router;
