import {
  type Email,
  type EmailWithPlatforms,
  type NewEmail,
  type NewPlatform,
  type Platform,
  type PlatformWithEmail,
} from "@/db/schema";
import { emailService, platformService } from "@/services";
import { MailseedState } from "@/types/store/mailseed-state.types";
import { create } from "zustand";

/**
 * Mailseed Store
 * @description Manages the state of the Mailseed application.
 */
const useMailseedStore = create<MailseedState>((set, get) => ({
  /* ---------- Initial state ---------- */
  emails: [],
  platforms: [],
  isLoading: false,
  error: null,

  /**
   * @description Fetches the initial data for the store.
   * @returns A promise that resolves when the data is fetched.
   */
  fetchInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [fetchedEmails, fetchedPlatforms] = await Promise.all([
        emailService.getAll(),
        platformService.getAllWithEmail(),
      ]);

      set({
        emails: fetchedEmails,
        platforms: fetchedPlatforms,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] fetchInitialData failed:", msg);
      set({ error: msg });
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * @description Adds a new email to the store.
   * @param data - The email data to add.
   * @returns A promise that resolves to the created email object.
   */
  addEmail: async (data: NewEmail) => {
    try {
      const inserted = await emailService.create(data);
      await get().fetchInitialData();
      return inserted;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] addEmail failed:", msg);
      set({ error: msg });
      return undefined;
    }
  },

  /**
   * @description Deletes an email by ID.
   * @param id - The ID of the email to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  deleteEmail: async (id: number) => {
    try {
      await emailService.delete(id);
      await get().fetchInitialData();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] deleteEmail failed:", msg);
      set({ error: msg });
    }
  },

  /**
   * @description Adds a new platform to the store.
   * @param data - The platform data to add.
   * @returns A promise that resolves to the created platform object.
   */
  addPlatform: async (data: NewPlatform) => {
    try {
      const inserted = await platformService.create(data);
      await get().fetchInitialData();
      return inserted;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] addPlatform failed:", msg);
      set({ error: msg });
      return undefined;
    }
  },

  /**
   * @description Deletes a platform by ID.
   * @param id - The ID of the platform to delete.
   * @returns A promise that resolves when the operation is complete.
   */
  deletePlatform: async (id: number) => {
    try {
      await platformService.delete(id);
      await get().fetchInitialData();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] deletePlatform failed:", msg);
      set({ error: msg });
    }
  },

  /**
   * @description Gets the count of platforms associated with each email.
   * @returns An object mapping email IDs to platform counts.
   */
  getPlatformCountByEmail: () => {
    const map = new Map<number, number>();
    get().platforms.forEach((platform) => {
      map.set(platform.emailId, (map.get(platform.emailId) || 0) + 1);
    });
    return map;
  },
}));

export default useMailseedStore;

// ----- re-export Types from the store -----
export type {
  Email,
  EmailWithPlatforms,
  NewEmail,
  NewPlatform,
  Platform,
  PlatformWithEmail,
};
