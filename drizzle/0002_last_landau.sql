CREATE TABLE `homepage_team` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`title` text NOT NULL,
	`bio` text NOT NULL,
	`image` text,
	`initials` text NOT NULL,
	`order` integer DEFAULT 0,
	`updatedAt` integer NOT NULL
);
