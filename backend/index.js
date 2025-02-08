require('dotenv').config();
const config = require('./config.json');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors({origin: '*'}))

const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes.js");
const notesRoutes = require("./routes/notes.routes.js");

app.use(authRoutes);
app.use(userRoutes);
app.use(notesRoutes);

mongoose.connect(config.connectionString ).then(()=>{console.log('Connected to MongoDB')})

app.listen(8000,()=>{
    console.log('Server is running on port 8000')
})