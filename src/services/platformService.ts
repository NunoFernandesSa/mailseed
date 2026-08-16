import { db } from "@/db";
import {
  type NewPlatform,
  Platform,
  type PlatformWithEmail,
  platforms,
} from "@/db/schema";
import { eq } from "drizzle-orm";

// --- Query Builder ---
const q = db.query as any;

/**
 * Platform Service
 * @description Provides CRUD operations for platforms.
 */
const platformService = {
  /**
   * @description Retrieves all platforms with their associated emails.
   * @returns A promise that resolves to an array of platform objects.
   */
  getAllWithEmail: async (): Promise<PlatformWithEmail[]> => {
    return q.platforms.findMany({
      with: { email: true },
    }) as Promise<PlatformWithEmail[]>;
  },

  /**
   * @description Creates a new platform.
   * @param data - The platform data to create.
   * @returns A promise that resolves to the created platform object.
   */
  create: async (data: NewPlatform): Promise<Platform> => {
    const inserted = await db.insert(platforms).values(data).returning().get();
    return inserted as Platform;
  },

  /**
   * @description Deletes a platform by ID.
   * @param id - The ID of the platform to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  delete: async (id: number): Promise<void> => {
    await db.delete(platforms).where(eq(platforms.id, id));
  },
};

export { platformService };
