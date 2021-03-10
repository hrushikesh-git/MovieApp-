const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
mongoose.connection.on('connected',()=>{
    console.log("Database Connected");
})
mongoose.connection.on("error",(err)=>{
    console.log('connecting error',err);
})

app.use(express.json());

// Schema
require('./models/user');
require('./models/movies');
require('./models/bookedmovies');

// Routes
app.get("/",(req,res)=>{
    res.send("ApI created")
})

app.use("/auth",require('./routes/auth')); 
app.use("/movie",require('./routes/movie')); 
app.use("/user",require('./routes/user')); 
app.use("/bookmovie",require('./routes/bookmovie')); 



const PORT = 5500

app.listen(PORT,()=>{
    console.log(`server Started at Port ${PORT}`)
})