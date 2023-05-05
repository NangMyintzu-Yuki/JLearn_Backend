require('dotenv').config()
const express = require('express')
const { cors } = require('./middleware/cors.middleware.js')

const app = express();
let http = require('http').Server(app)
const expressFileUpload = require("express-fileupload")


// routers
const authRoutes = require('./routes/auth.routes')
const userRoutes = require('./routes/user.routes')
const operatorRoutes = require('./routes/operator.routes')
const consonantRoutes = require('./routes/consonant.routes')
const kanjiRoutes = require('./routes/kanji.routes')
const vocabRoutes = require("./routes/vocab.routes")
const grammarRoutes = require("./routes/grammar.routes");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//allow cors
app.use(cors);

// file upload
app.use(expressFileUpload());

// api routes
app.get("/", (req, res) => {
    res.json({ message: "Server is OK!" })
})

app.use("/", authRoutes)
app.use("/", userRoutes)
app.use("/", operatorRoutes)
app.use("/", consonantRoutes)
app.use("/", kanjiRoutes)
app.use("/", vocabRoutes)
app.use("/", grammarRoutes)

const PORT = process.env.APP_PORT || 3000;

const listen = async (err) => {
    if (err) {
        console.log("Error");
    }
    console.log(`Server is Running on PORT - ${PORT} `);
}
http.listen(PORT, listen)

// const listen = async (err) => {
//     if (err) {
//         logger.error(`${err.message}`);
//     }
//     socket.start(io);
//     logger.info(`Server is Running on PORT - ${PORT}`);
// };

// http.listen(PORT, listen);