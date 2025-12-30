const express = require('express');
const controllers = require('../controllers/books.controller');
const router = express.Router();

router.get('/',controllers.getAllBooks);

router.get('/:id' , controllers.getBookById);


router.post('/', controllers.createBook)

router.delete('/:id', controllers.DeletebookById)


module.exports = router;