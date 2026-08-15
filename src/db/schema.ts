import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const platforms = sqliteTable("platforms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  url: text("url"),
  notes: text("notes"),
  tags: text("tags", { mode: "json" }).$type<string[]>(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  starred: integer("starred", { mode: "boolean" }).notNull().default(false),
});

export type Platform = typeof platforms.$inferSelect;
export type NewPlatform = typeof platforms.$inferInsert;
