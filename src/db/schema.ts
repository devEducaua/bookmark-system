import { pgTable, serial, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: serial().primaryKey(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    password: varchar().notNull(),
})

export const bookmarksTable = pgTable("bookmarks", {
    id: serial().primaryKey(),
    url: varchar().notNull(),
    title: varchar().notNull().unique(),
    description: varchar(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
    userId: integer("user_id").references(() => usersTable.id).notNull()
})
