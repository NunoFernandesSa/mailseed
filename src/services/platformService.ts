import { db } from "@/db";
import type { NewPlatform, Platform } from "@/db/schema";
import { platforms } from "@/db/schema";
import { usePlatformStore } from "@/store/platformStore";
import { and, asc, desc, eq, like, or } from "drizzle-orm";

export const platformService = {
  async loadAll(order: "asc" | "desc" = "desc") {
    const rows = await db
      .select()
      .from(platforms)
      .orderBy(
        order === "asc" ? asc(platforms.name) : desc(platforms.createdAt),
      );
    usePlatformStore.getState().setItems(rows);
    return rows;
  },

  async create(draft: NewPlatform): Promise<Platform> {
    const result = await db.insert(platforms).values(draft).returning();
    const created = result[0];
    usePlatformStore.getState().addItem(created);
    return created;
  },

  async update(
    id: number,
    patch: Partial<Omit<NewPlatform, "id" | "createdAt">>,
  ) {
    const result = await db
      .update(platforms)
      .set({ ...patch, updatedAt: new Date() })
      .where(eq(platforms.id, id))
      .returning();
    const updated = result[0];
    if (updated) usePlatformStore.getState().updateItem(updated);
    return updated;
  },

  async remove(id: number) {
    await db.delete(platforms).where(eq(platforms.id, id));
    usePlatformStore.getState().removeItem(id);
  },

  async toggleStar(id: number) {
    const current = await db
      .select({ starred: platforms.starred })
      .from(platforms)
      .where(eq(platforms.id, id))
      .limit(1);
    if (!current[0]) return;
    const next = !current[0].starred;
    const result = await db
      .update(platforms)
      .set({ starred: next, updatedAt: new Date() })
      .where(eq(platforms.id, id))
      .returning();
    if (result[0]) usePlatformStore.getState().updateItem(result[0]);
    return result[0];
  },

  async search(query: string): Promise<Platform[]> {
    const q = `%${query}%`;
    return db
      .select()
      .from(platforms)
      .where(
        or(
          like(platforms.name, q),
          like(platforms.email, q),
          like(platforms.url, q),
          like(platforms.notes, q),
        ),
      )
      .orderBy(desc(platforms.createdAt));
  },

  async exportJSON() {
    const { items } = usePlatformStore.getState();
    return JSON.stringify(
      { version: 1, exportedAt: new Date().toISOString(), items },
      null,
      2,
    );
  },

  async importJSON(raw: string) {
    const payload = JSON.parse(raw) as { items?: Platform[] };
    if (!payload.items) throw new Error("Invalid JSON payload: missing items");

    for (const p of payload.items) {
      const { id, ...rest } = p;
      await db
        .insert(platforms)
        .values({
          ...rest,
          createdAt: rest.createdAt ? new Date(rest.createdAt) : new Date(),
          updatedAt: rest.updatedAt ? new Date(rest.updatedAt) : new Date(),
        })
        .onConflictDoNothing();
    }
    return platformService.loadAll();
  },

  stats() {
    const { items } = usePlatformStore.getState();
    const tagCounts: Record<string, number> = {};
    const emailCounts: Record<string, number> = {};
    let starred = 0;

    for (const p of items) {
      if (p.starred) starred++;
      emailCounts[p.email] = (emailCounts[p.email] ?? 0) + 1;
      for (const t of p.tags ?? []) tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    }

    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    return { total: items.length, starred, topTags, emailCounts };
  },

  and,
  eq,
};
