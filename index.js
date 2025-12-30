require('dotenv/config');
const express = require("express");
const app = express();
const port = 8000;
const bookrouter = require('./routes/book.routes');
const logger = require('./middlewares/logger');
const books = require('./models/xzy');
app.use(express.json());


app.get('/', (req,res)=>{
    res.send("Welcome to the BOOK Store!");
})
app.use(logger);
app.use('/books',  bookrouter);



app.listen(port, ()=>{
    console.log(`Server is up and running on port: ${port}` );
})
