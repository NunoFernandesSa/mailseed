import { relations } from "drizzle-orm/_relations";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// ----- Emails Table -----
export const emails = sqliteTable("emails", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  address: text("address").notNull().unique(),
  label: text("label"), // ex: "Personnel", "Travail", "Poubelle"
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ----- Platforms Table -----
export const platforms = sqliteTable("platforms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  url: text("url"),
  emailId: integer("email_id")
    .notNull()
    .references(() => emails.id, { onDelete: "cascade" }), // Clé étrangère
  tags: text("tags"), // Format JSON stringified ex: '["tech", "saas"]'
  notes: text("notes"),
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text("updated_at")
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
});

// ----- Relations -----
export const emailsRelations = relations(emails, ({ many }) => ({
  platforms: many(platforms),
}));

export const platformsRelations = relations(platforms, ({ one }) => ({
  email: one(emails, {
    fields: [platforms.emailId],
    references: [emails.id],
  }),
}));

// ----- Types -----
export type Email = typeof emails.$inferSelect;
export type NewEmail = typeof emails.$inferInsert;

export type Platform = typeof platforms.$inferSelect;
export type NewPlatform = typeof platforms.$inferInsert;

export type PlatformWithEmail = Platform & {
  email: Email;
};
export type EmailWithPlatforms = Email & {
  platforms: Platform[];
};
