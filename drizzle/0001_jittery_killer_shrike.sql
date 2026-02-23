CREATE TABLE `homepage_competencies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number` text,
	`title` text NOT NULL,
	`description` text,
	`link` text,
	`order` integer DEFAULT 0,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `homepage_product_series` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`count_label` text,
	`description` text,
	`color` text,
	`order` integer DEFAULT 0,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `homepage_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`key` text NOT NULL,
	`value` text NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `homepage_settings_key_unique` ON `homepage_settings` (`key`);--> statement-breakpoint
CREATE TABLE `homepage_stats` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`number` text NOT NULL,
	`label` text NOT NULL,
	`description` text,
	`order` integer DEFAULT 0,
	`updatedAt` integer NOT NULL
);
