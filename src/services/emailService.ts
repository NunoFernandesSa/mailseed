import { db } from "@/db";
import { Email, emails, NewEmail } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Email Service
 * @description Provides CRUD operations for emails.
 */
const emailService = {
  /**
   * @description Retrieves all emails.
   * @returns A promise that resolves to an array of email objects.
   */
  getAll: async (): Promise<Email[]> => {
    return db.select().from(emails);
  },

  /**
   * @description Creates a new email.
   * @param data - The email data to create.
   * @returns A promise that resolves to the created email object.
   */
  create: async (data: NewEmail): Promise<Email> => {
    const inserted = await db.insert(emails).values(data).returning().get();
    return inserted as Email;
  },

  /**
   * @description Deletes an email by ID.
   * @param id - The ID of the email to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delete: async (id: number): Promise<void> => {
    await db.delete(emails).where(eq(emails.id, id));
  },
};

export { emailService };
