const { pgTable, uuid, varchar } = require('drizzle-orm/pg-core');
const  authorTable = require('./author.model');

const booksTable = pgTable('books',{
    id:uuid().primaryKey().defaultRandom(),
    title: varchar({ length:100}).notNull().unique(),
    authorId: uuid().references( () => {
        authorTable.id;
    }).notNull(),
});

module.exports = booksTable;