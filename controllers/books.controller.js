const books = require('../models/xzy');
const {booksTable, authorTable} = require('../models/index.js');
const db = require('../db/index.js');
const { drizzle } = require('drizzle-orm/node-postgres');
const {eq } = require("drizzle-orm");
 
exports.getAllBooks = async function(req,res){
    // res.json(books);
    const search = req.query.search;
    console.log({search});
    const bookies = await db.select().from(booksTable);
    console.log('Getting all users from the database: ', bookies)
    return res.json(bookies);
};

exports.getBookById = async function(req,res){
    const id= req.params.id;
    const [book] = await db.select().from(booksTable)
    .where(
        eq(booksTable.id,id)
    )
    .limit(1);
    if(!book){
        return res
        .status("404")
        .json("book not found!");
    }

    return res.json(book);
};

exports.createBook = async function(req,res){
    const {title, authorId} = req.body;
    if(!title || title===''){
        return res.status(400).send("Title is required!");
    }
    const [result] = await db.insert(booksTable).values({
        title:title,
        authorId : authorId,
    }).returning();
    return res
        .status(201)
        .json({message:"book created sucessfully ", id: result.id})
};

exports.DeletebookById = async function(req,res){
    const id = req.params.id;
    console.log(typeof(id))
    await db.delete(booksTable)
    .where(
        eq(booksTable.id, id)
    );
    

    return res.status(200).json("Book sucessfully deleted");
};