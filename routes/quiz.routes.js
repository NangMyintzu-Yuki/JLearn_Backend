const express = require('express')
const { create, update, findAll, findById, deleteById, validate } = require('../controllers/quiz.controller')

const router = express.Router();

router.post("/quizzes/list", validate, findAll);
router.post("/quizzes/create", validate, create);
router.put("/quizzes/update", validate, update);
router.post("/quizzes/detail", validate, findById);
router.delete("/quizzes/delete", validate, deleteById);

module.exports = router;