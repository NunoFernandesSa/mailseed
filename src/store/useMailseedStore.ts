import { db } from "@/db";
import {
  type Email,
  emails,
  type EmailWithPlatforms,
  type NewEmail,
  type NewPlatform,
  type Platform,
  platforms,
  type PlatformWithEmail,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { create } from "zustand";

const q = db.query as any;

/* ========================================================================
 *  STATE INTERFACE
 * ====================================================================== */
interface MailseedState {
  /* ---------- Data ---------- */
  emails: Email[];
  platforms: PlatformWithEmail[];

  /* ---------- Loading / Error ---------- */
  isLoading: boolean;
  error: string | null;

  /* ---------- Initializer ---------- */
  fetchInitialData: () => Promise<void>;

  /* ---------- Emails CRUD ---------- */
  addEmail: (data: NewEmail) => Promise<Email | undefined>;
  deleteEmail: (id: number) => Promise<void>;

  /* ---------- Platforms CRUD ---------- */
  addPlatform: (data: NewPlatform) => Promise<Platform | undefined>;
  deletePlatform: (id: number) => Promise<void>;
}

const useMailseedStore = create<MailseedState>((set, get) => ({
  /* ---------- Initial state ---------- */
  emails: [],
  platforms: [],
  isLoading: false,
  error: null,

  /* ====================================================================
   *  FETCH ALL
   * ================================================================== */
  fetchInitialData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [fetchedEmails, fetchedPlatforms] = await Promise.all([
        db.select().from(emails),
        q.platforms.findMany({
          with: { email: true },
        }) as unknown as Promise<PlatformWithEmail[]>,
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

  /* ====================================================================
   *  EMAILS
   * ================================================================== */
  addEmail: async (data) => {
    try {
      const inserted = await db.insert(emails).values(data).returning().get();

      await get().fetchInitialData();
      return inserted;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] addEmail failed:", msg);
      set({ error: msg });
      return undefined;
    }
  },

  deleteEmail: async (id) => {
    try {
      await db.delete(emails).where(eq(emails.id, id));
      await get().fetchInitialData();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] deleteEmail failed:", msg);
      set({ error: msg });
    }
  },

  /* ====================================================================
   *  PLATFORMS
   * ================================================================== */
  addPlatform: async (data) => {
    try {
      const inserted = await db
        .insert(platforms)
        .values(data)
        .returning()
        .get();

      await get().fetchInitialData();
      return inserted;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] addPlatform failed:", msg);
      set({ error: msg });
      return undefined;
    }
  },

  deletePlatform: async (id) => {
    try {
      await db.delete(platforms).where(eq(platforms.id, id));
      await get().fetchInitialData();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error("[MailseedStore] deletePlatform failed:", msg);
      set({ error: msg });
    }
  },
}));

export default useMailseedStore;

/* ========================================================================
 *  TYPES UTILES POUR L'APP (ré-exporte depuis le store pour centraliser)
 * ================================================================== */
export type {
  Email,
  EmailWithPlatforms,
  NewEmail,
  NewPlatform,
  Platform,
  PlatformWithEmail,
};
