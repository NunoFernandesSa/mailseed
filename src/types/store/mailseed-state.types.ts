import {
  Email,
  NewEmail,
  NewPlatform,
  Platform,
  PlatformWithEmail,
} from "@/db/schema";

export interface MailseedState {
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
