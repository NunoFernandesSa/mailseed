CREATE TABLE `platforms` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`url` text,
	`notes` text,
	`tags` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`starred` integer DEFAULT false NOT NULL
);
