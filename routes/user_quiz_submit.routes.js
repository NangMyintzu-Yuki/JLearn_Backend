const express = require('express')
const { create, update, findAll, findById, deleteById, validate } = require('../controllers/user_quiz_submit.controller')

const router = express.Router();

router.post("/user_quiz_submits/list", validate, findAll);
router.post("/user_quiz_submits/create", validate, create);
router.put("/user_quiz_submits/update", validate, update);
router.post("/user_quiz_submits/detail", validate, findById);
router.delete("/user_quiz_submits/delete", validate, deleteById);

module.exports = router;