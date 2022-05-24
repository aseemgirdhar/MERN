const express = require("express");
const notes = require("./data/notes");
const dotenv = require('dotenv');
const {connect} = require("mongoose");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const noteRoutes = require("./routes/noteRoutes")
const {notFound, errorHandler} = require("./middlewares/errormiddleware");
var cors = require('cors')

const app = express();

dotenv.config();

connectDB();

app.use(cors())
app.use(express.json());

app.get("/" ,(req, res) => {
   res.send("Api is running");
})
// app.get("/api/notes" , (req , res) =>{
//    res.json(notes)
// })

app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound)

app.use(errorHandler)
/*app.get("/api/notes/:id" , (req , res) =>{
   const note  =  notes.find((n) => n._id === req.params.id)
   res.send(note)
})*/
const PORT = process.env.POR || 5000;

app.listen(PORT, console.log("server started"))