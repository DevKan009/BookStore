const books = require('../models/xzy');
const {booksTable, authorTable} = require('../models/index.js');
const db = require('../db/index.js');
const { drizzle } = require('drizzle-orm/node-postgres');
const {eq } = require("drizzle-orm");
 
exports.getAllBooks = async function(req,res){
    // res.json(books);
    
    const bookies = await db.select().from(booksTable);
    console.log('Getting all users from the database: ', bookies)
    return res.json(bookies);
};

exports.getBookById = async function(req,res){
    const id= req.params.id;
    
    try{
    const book = await db.select().from(booksTable)
    .where(
        eq( booksTable.id , id)
    );
    return res.json(book);
    }catch{
        return res.status(404).json("no such book exist!")
    }
};

exports.createBook = async function(req,res){
    const {title, author} = req.body;
    if(!title || title===''){
        return res.status(400).send("Title is required!");
    }
    if(!author || author===''){
        return res.status(400).send("Author is required!");
    }
    const len= books.length;
    
    // books.push({"id": len+1,
    //     "title": title,
    //     "author": author
    // })
    
    // console.log(title,author);
    // res.status(201).json({ "book created sucessfully": books.at(len)});
    

};

exports.DeletebookById = function(req,res){
    const id = parseInt(req.params.id);
    console.log(typeof(id))
    if(isNaN(id)){
        return res.status(400).json("Type a valid number");
    };
    const bookIndex = books.findIndex( (book) => book.id == id)
    if(bookIndex <0){
        return res.status(404).json("book not found");
    }
    books.splice( bookIndex, 1);


    return res.status(200).json("Book sucessfully deleted");
};