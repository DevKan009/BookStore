const books = require('../models/xzy');

exports.getAllBooks = function(req,res){
    res.json(books);
};

exports.getBookById = function(req,res){
    const id= req.params.id;
    if(isNaN(id)){
        res.status(400).json("Type a valid number");
    };
    const book = books.find((e)=> e.id == id );
    if(!book){
        return res.status(404).json("not found");
    }
    res.json(book);
};

exports.createBook = function(req,res){
    const {title, author} = req.body;
    if(!title || title===''){
        return res.status(400).send("Title is required!");
    }
    if(!author || author===''){
        return res.status(400).send("Author is required!");
    }
    const len= books.length;
    books.push({"id": len+1,
        "title": title,
        "author": author
    })
    console.log(title,author);
    res.status(201).json({ "book created sucessfully": books.at(len)});

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