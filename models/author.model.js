const { pgTable, varchar, uuid } = require('drizzle-orm/pg-core');

const authortable = pgTable('authors',{
    id:uuid().primaryKey().defaultRandom(),
    firstname:varchar({length:50}).notNull(),
    lastname: varchar({ length:50}),
    email: varchar({length:100}).unique().notNull(),
});

module.exports = authortable;