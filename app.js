require('dotenv').config();
const express = require('express');
const { cors } = require('./middleware/cors.middleware.js');
const expressFileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(expressFileUpload());

// Routes
app.get("/", (req, res) => res.json({ message: "Server is OK!" }));

app.use("/", require('./routes/auth.routes'));
app.use("/", require('./routes/user.routes'));
app.use("/", require('./routes/operator.routes'));
app.use("/", require('./routes/consonant.routes'));
app.use("/", require('./routes/kanji.routes'));
app.use("/", require('./routes/vocab.routes'));
app.use("/", require('./routes/grammar.routes'));
app.use("/", require('./routes/quiz.routes'));
app.use("/", require('./routes/user_quiz_submit.routes'));

module.exports = app;   // <-- export instead of listen
