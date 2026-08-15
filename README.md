# 📬 Mailseed

> **Local-first mobile app** to track all platforms where you use your email. Keep your digital footprint organized, searchable, and under your control.

Built with **Expo SDK 57**, **React Native**, **TypeScript**, **Expo Router**, **Zustand**, and **SQLite + Drizzle ORM** — 100% offline, no cloud lock-in.

---

## ✨ Features

| Feature                     | Description                                                                                        |
| :-------------------------- | :------------------------------------------------------------------------------------------------- |
| 🗂️ **Platforms CRUD**       | Create, read, update, and delete any platform entry (name, email, URL, tags, notes, creation date) |
| 🔍 **Smart Search**         | Instant full-text search across all fields (name, email, URL, tags, notes)                         |
| 🎛️ **Filters**              | Filter by tags, date added, custom categories, or email address                                    |
| 📦 **Export / Import JSON** | Backup your data to JSON or migrate from another device with a single tap                          |
| 📊 **Statistics**           | Dashboard with key metrics: total platforms, top tags, email distribution, timeline                |
| 🔒 **Local-first**          | SQLite offline storage — your data never leaves your device unless you decide to export it         |

---

## 🧱 Tech Stack

- **Expo SDK 57** — Universal React Native framework
- **React Native 0.78** — Cross-platform mobile runtime
- **TypeScript 6** — Strict type safety
- **Expo Router 57** — File-based routing (`src/app/`)
- **Zustand** — Lightweight global state management
- **SQLite (expo-sqlite)** — Embedded relational database
- **Drizzle ORM** — Type-safe SQL query builder + migrations
- **React Native Reanimated / Gesture Handler** — Smooth animations & gestures

---

## 🚀 Getting Started

### Prerequisites

- **Node.js ≥ 20** (LTS recommended)
- **npm ≥ 10** (or `yarn` / `pnpm`)
- **Expo Go** (for mobile preview) or a simulator/emulator
- (Optional) **Android Studio** — Android emulator
- (Optional) **Xcode** (macOS only) — iOS simulator

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the App

```bash
# Default: opens the Metro bundler with QR code (Expo Go)
npm start

# Or use the shorthand aliases:
npm run android   # Android emulator / connected device
npm run ios       # iOS simulator (macOS only)
npm run web       # Browser preview via react-native-web
```

> Once Metro starts:
>
> - Press `w` for web, `a` for Android, `i` for iOS
> - Scan the QR code with **Expo Go** on your physical device

### 3. First Launch

On first run, Mailseed auto-creates its SQLite database and tables via Drizzle. You are greeted with an empty dashboard — add your first platform to get started!

---

## 📁 Project Structure

```
mailseed/
├── assets/                  # Static assets: icons, images, splash
│   └── images/
│       └── tabIcons/
├── src/
│   ├── app/                 # 🧭 Expo Router file-based routing
│   │   ├── _layout.tsx      # Root layout (Stack / Tabs)
│   │   ├── index.tsx        # Home / dashboard screen
│   │   └── +not-found.tsx   # 404 fallback
│   ├── components/          # Reusable UI components
│   │   ├── shared/          # Generic: Button, Card, EmptyState…
│   │   └── ui/              # Domain: PlatformCard, TagChips, StatsGrid…
│   ├── db/                  # 💾 Database layer
│   │   ├── index.ts         # SQLite client init + Drizzle instance
│   │   └── schema.ts        # Drizzle schema definitions
│   ├── hooks/               # Custom React hooks (useSearch, useFilters…)
│   ├── services/            # Business logic services
│   │   └── platformService.ts  # Platform CRUD + export/import logic
│   ├── store/               # 🐻 Zustand global state stores
│   │   └── platformStore.ts     # Platforms, filters, search
│   ├── utils/               # Pure helpers: formatters, validators, date
│   └── constants/           # Colors, spacing, typography, theme tokens
├── app.json                 # Expo configuration
├── tsconfig.json            # TypeScript config (@/ path aliases)
└── package.json             # Dependencies & scripts
```

### Key Path Aliases

Defined in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/assets/*": ["./assets/*"]
  }
}
```

Usage:

```ts
import { Platform } from "@/db/schema";
import { usePlatformStore } from "@/store/platformStore";
import { Card } from "@/components/shared";
import logo from "@/assets/images/logo.png";
```

---

## 🗄️ Database Schema (SQLite + Drizzle)

Below is the reference schema that lives in `src/db/schema.ts`.

```ts
// src/db/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/* ---------- Platforms: the main table ---------- */
export const platforms = sqliteTable("platforms", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(), // e.g. "GitHub"
  email: text("email").notNull(), // user@domain.tld
  url: text("url"), // https://...
  notes: text("notes"), // free text
  tags: text("tags", { mode: "json" }).$type<string[]>(), // JSON array
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
```

### Queries (Cheat Sheet)

```ts
import { db } from "@/db";
import { platforms, eq, like, asc, desc } from "@/db/schema";

// CREATE
const [newId] = await db
  .insert(platforms)
  .values({ name: "X", email: "a@b.co" });

// READ  (all, A-Z)
const all = await db.select().from(platforms).orderBy(asc(platforms.name));

// UPDATE
await db
  .update(platforms)
  .set({ notes: "Updated!", updatedAt: new Date() })
  .where(eq(platforms.id, 42));

// DELETE
await db.delete(platforms).where(eq(platforms.id, 42));

// SEARCH  (LIKE across 3 columns)
const hits = await db
  .select()
  .from(platforms)
  .where(like(platforms.name, `%${query}%`));
```

### Migrations

Drizzle is configured via `drizzle.config.ts` at the project root.

```bash
# 1. Generate a migration from changes in schema.ts
npx drizzle-kit generate

# 2. Apply it on-device (driven by src/db/index.ts at boot)
#    → handled automatically when the app boots.
```

---

## 🧰 Available Scripts

| Script                  | Action                                 |
| :---------------------- | :------------------------------------- |
| `npm start`             | Start Metro bundler (Expo dev)         |
| `npm run android`       | Launch on Android emulator / device    |
| `npm run ios`           | Launch on iOS simulator (macOS)        |
| `npm run web`           | Launch in browser via react-native-web |
| `npm run lint`          | Run `expo lint` (ESLint)               |
| `npm run reset-project` | Reset starter boilerplate              |

---

## 🧪 Zustand Store Example

Global platform state in `src/store/platformStore.ts`:

```ts
// src/store/platformStore.ts
import { create } from "zustand";
import type { Platform } from "@/db/schema";

interface PlatformState {
  items: Platform[];
  searchQuery: string;
  selectedTag: string | null;
  isLoading: boolean;

  setItems: (list: Platform[]) => void;
  setSearch: (q: string) => void;
  setTag: (tag: string | null) => void;
  addItem: (p: Platform) => void;
  updateItem: (p: Platform) => void;
  removeItem: (id: number) => void;
  toggleStar: (id: number) => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  items: [],
  searchQuery: "",
  selectedTag: null,
  isLoading: true,
  setItems: (items) => set({ items, isLoading: false }),
  setSearch: (searchQuery) => set({ searchQuery }),
  setTag: (selectedTag) => set({ selectedTag }),
  addItem: (p) => set((s) => ({ items: [p, ...s.items] })),
  updateItem: (p) =>
    set((s) => ({
      items: s.items.map((x) => (x.id === p.id ? p : x)),
    })),
  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((x) => x.id !== id),
    })),
  toggleStar: (id) =>
    set((s) => ({
      items: s.items.map((x) =>
        x.id === id ? { ...x, starred: !x.starred, updatedAt: new Date() } : x,
      ),
    })),
}));
```

---

## 🔌 Service Layer

`src/services/platformService.ts` orchestrates DB ↔ Store communication so your screens stay dumb:

```ts
// screens → service → db + store (never the reverse!)

export const platformService = {
  async loadAll() {
    const rows = await db.select().from(platforms);
    usePlatformStore.getState().setItems(rows);
  },

  async create(draft: NewPlatform) {
    const [id] = await db.insert(platforms).values(draft);
    const [created] = await db
      .select()
      .from(platforms)
      .where(eq(platforms.id, Number(id)));
    usePlatformStore.getState().addItem(created);
    return created;
  },

  async exportJSON() {
    const { items } = usePlatformStore.getState();
    return JSON.stringify(
      { version: 1, exportedAt: new Date(), items },
      null,
      2,
    );
  },

  async importJSON(raw: string) {
    const payload = JSON.parse(raw) as { items: Platform[] };
    for (const p of payload.items) {
      const { id, ...rest } = p;
      await db.insert(platforms).values(rest).onConflictDoNothing();
    }
    await platformService.loadAll();
  },
};
```

---

## 🤝 Contributing

Contributions are **very welcome** — whether it's a feature, bug fix, typo, or idea.

### Workflow

1. **Fork** the repository.
2. **Create a feature branch**:
   ```bash
   git checkout -b feat/amazing-thing
   ```
3. **Commit** small, atomic changes:
   ```bash
   git commit -m "feat(platforms): add bulk tag edit"
   ```
4. **Push** and open a **Pull Request**.

### Conventions

- **Commit style**: [Conventional Commits](https://www.conventionalcommits.org/) — `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`, `test:`
- **Code style**: Strict TypeScript + ESLint via `npm run lint`
- **UI components**: Live in `src/components/shared` (generic) or `src/components/ui` (domain)
- **No business logic in screens** — use `src/services/` and `src/store/`
- **File naming**: `camelCase.ts` for modules, `PascalCase.tsx` for components

### Before You PR

```bash
npm run lint            # ESLint — green before opening PR
npx tsc --noEmit        # TypeScript type-check
```

---

## 📝 License

MIT © Mailseed — see `LICENSE` file for the full text.

---

## 🙏 Thanks

- **Expo Team** for the great SDK 57 and docs
- **Drizzle Team** for the most ergonomic TypeScript ORM
- **Zustand** for the tiny-but-mighty state library

Made with 💙 for the local-first movement.
