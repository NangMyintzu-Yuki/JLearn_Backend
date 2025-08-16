const express = require('express');
const {create,update,findAll,findById,deleteById,validate} = require("../controllers/grammar.controller");
const router = express.Router();
router.post("/grammars/list",validate,findAll);
router.post("/grammars/create",validate,create);
router.put('/grammars/update',validate,update);
router.post('/grammars/detail',validate,findById);
router.delete('/grammars/delete',validate,deleteById);
module.exports = router;