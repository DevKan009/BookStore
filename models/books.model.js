const { pgTable, uuid, varchar, index } = require('drizzle-orm/pg-core');
const  authorTable = require('./author.model');
const { sql } = require('drizzle-orm');

const booksTable = pgTable('books',{
    id:uuid().primaryKey().defaultRandom(),
    title: varchar({ length:100}).notNull().unique(),
    authorId: uuid().references( () => {
        return authorTable.id;
    }).notNull(),
},( table)=>{
    return {
        searchIndexOnTitle: index("title_search_index").using(
        "gin",
        sql`to_tsvector('english', ${table.title})`
      ),
    }
});

module.exports = booksTable;