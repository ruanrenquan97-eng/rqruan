import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = sqliteTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: integer("id").primaryKey({ autoIncrement: true }),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: text("openId").notNull().unique(),
  name: text("name"),
  email: text("email"),
  loginMethod: text("loginMethod"),
  // SQLite doesn't have enums, so we use text with check constraint if needed, or just text.
  // We can enforce logic in app code.
  role: text("role", { enum: ["user", "admin"] }).default("user").notNull(),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
  lastSignedIn: integer("lastSignedIn", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * News articles table for managing company announcements and updates
 */
export const news = sqliteTable("news", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(),
  category: text("category").notNull(),
  imageUrl: text("imageUrl"),
  published: integer("published").default(0).notNull(),
  publishedAt: integer("publishedAt", { mode: 'timestamp' }),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type News = typeof news.$inferSelect;
export type InsertNews = typeof news.$inferInsert;

/**
 * Products table for managing product catalog
 */
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  series: text("series").notNull(),
  description: text("description"),
  content: text("content"),
  inci: text("inci"),
  specifications: text("specifications"),
  imageUrl: text("imageUrl"),
  published: integer("published").default(0).notNull(),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

/**
 * Product Series table for managing product categories
 */
export const productSeries = sqliteTable("product_series", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  order: integer("order").default(0),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type ProductSeries = typeof productSeries.$inferSelect;
export type InsertProductSeries = typeof productSeries.$inferInsert;


/**
 * Applications table for managing skincare solutions
 */
export const applications = sqliteTable("applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content"),
  icon: text("icon"),
  imageUrl: text("imageUrl"),
  published: integer("published").default(0).notNull(),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

/**
 * Contact submissions table for managing inquiries
 */
export const contactSubmissions = sqliteTable("contactSubmissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  country: text("country"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status", { enum: ["new", "read", "replied", "archived"] }).default("new").notNull(),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * About page content management table
 */
export const aboutContent = sqliteTable("about_content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  section: text("section").notNull().unique(),
  title: text("title"),
  content: text("content").notNull(),
  imageUrl: text("imageUrl"),
  order: integer("order").default(0),
  published: integer("published").default(1),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type AboutContent = typeof aboutContent.$inferSelect;
export type InsertAboutContent = typeof aboutContent.$inferInsert;

/**
 * Homepage Settings (Key-Value store for Hero, etc.)
 */
export const homepageSettings = sqliteTable("homepage_settings", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(), // e.g., 'hero', 'network_intro', 'cta_text'
  value: text("value", { mode: 'json' }).notNull(), // Stores JSON configuration
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type HomepageSettings = typeof homepageSettings.$inferSelect;
export type InsertHomepageSettings = typeof homepageSettings.$inferInsert;

/**
 * Homepage Stats
 */
export const homepageStats = sqliteTable("homepage_stats", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  number: text("number").notNull(),
  label: text("label").notNull(),
  description: text("description"),
  order: integer("order").default(0),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type HomepageStats = typeof homepageStats.$inferSelect;
export type InsertHomepageStats = typeof homepageStats.$inferInsert;

/**
 * Homepage Competencies
 */
export const homepageCompetencies = sqliteTable("homepage_competencies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  number: text("number"), // "01", "02"
  title: text("title").notNull(),
  description: text("description"),
  link: text("link"),
  order: integer("order").default(0),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type HomepageCompetency = typeof homepageCompetencies.$inferSelect;
export type InsertHomepageCompetency = typeof homepageCompetencies.$inferInsert;

/**
 * Homepage Product Series Preview
 */
export const homepageProductSeries = sqliteTable("homepage_product_series", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  countLabel: text("count_label"), // "3 Products"
  description: text("description"),
  color: text("color"), // "primary", "secondary", "accent"
  order: integer("order").default(0),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type HomepageProductSeries = typeof homepageProductSeries.$inferSelect;
export type InsertHomepageProductSeries = typeof homepageProductSeries.$inferInsert;

/**
 * Homepage Research Team
 */
export const homepageTeam = sqliteTable("homepage_team", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  title: text("title").notNull(),
  bio: text("bio").notNull(),
  image: text("image"),
  initials: text("initials").notNull(),
  order: integer("order").default(0),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type HomepageTeam = typeof homepageTeam.$inferSelect;
export type InsertHomepageTeam = typeof homepageTeam.$inferInsert;


/**
 * Technologies table for managing technical articles/competencies
 */
export const technologies = sqliteTable("technologies", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  content: text("content").notNull(), // Rich text content
  imageUrl: text("imageUrl"),
  published: integer("published").default(0).notNull(),
  createdAt: integer("createdAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).notNull(),
  updatedAt: integer("updatedAt", { mode: 'timestamp' }).$defaultFn(() => new Date()).$onUpdateFn(() => new Date()).notNull(),
});

export type Technology = typeof technologies.$inferSelect;
export type InsertTechnology = typeof technologies.$inferInsert;