import { eq, desc, asc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { InsertUser, users, news, products, productSeries, applications, contactSubmissions, aboutContent, technologies, News, Product, ProductSeries, InsertProductSeries, Application, ContactSubmission, AboutContent, InsertAboutContent, Technology, InsertTechnology, homepageSettings, homepageStats, homepageCompetencies, homepageProductSeries, homepageTeam, InsertHomepageSettings, InsertHomepageStats, InsertHomepageCompetency, InsertHomepageProductSeries, HomepageSettings, HomepageStats, HomepageCompetency, HomepageProductSeries, HomepageTeam } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      const client = createClient({
        url: process.env.DATABASE_URL,
      });
      _db = drizzle(client);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Partial<InsertUser> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized as any;
      updateSet[field] = normalized as any;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // SQLite style upsert with onConflictDoUpdate
    await db.insert(users).values(values).onConflictDoUpdate({
      target: users.openId,
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// News queries
export async function getPublishedNews(): Promise<News[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(news).where(eq(news.published, 1)).orderBy(desc(news.publishedAt)).limit(100);
}

export async function getNewsBySlug(slug: string): Promise<News | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(news).where(eq(news.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllNews(): Promise<News[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(news).orderBy(desc(news.createdAt));
}

export async function createNews(data: any): Promise<News> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(news).values(data).returning();
  return result[0];
}

export async function updateNews(id: number, data: any): Promise<News> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(news).set(data).where(eq(news.id, id)).returning();
  return result[0];
}

export async function deleteNews(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(news).where(eq(news.id, id));
}

// Products queries
export async function getPublishedProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(eq(products.published, 1)).orderBy(desc(products.createdAt));
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductById(id: number): Promise<Product | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllProducts(): Promise<Product[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).orderBy(desc(products.createdAt));
}

export async function createProduct(data: any): Promise<Product> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(products).values(data).returning();
  return result[0];
}

export async function updateProduct(id: number, data: any): Promise<Product> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(products).set(data).where(eq(products.id, id)).returning();
  return result[0];
}



// ... (existing imports)

// ...

export async function deleteProduct(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(products).where(eq(products.id, id));
}

// Product Series queries
export async function getAllProductSeries(): Promise<ProductSeries[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(productSeries).orderBy(asc(productSeries.order));
}

export async function createProductSeries(data: InsertProductSeries): Promise<ProductSeries> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(productSeries).values(data).returning();
  return result[0];
}

export async function updateProductSeries(id: number, data: Partial<InsertProductSeries>): Promise<ProductSeries> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(productSeries).set({ ...data, updatedAt: new Date() }).where(eq(productSeries.id, id)).returning();
  return result[0];
}

export async function deleteProductSeries(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(productSeries).where(eq(productSeries.id, id));
}


// Applications queries
export async function getPublishedApplications(): Promise<Application[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(applications).where(eq(applications.published, 1)).orderBy(desc(applications.createdAt));
}

export async function getApplicationBySlug(slug: string): Promise<Application | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(applications).where(eq(applications.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getAllApplications(): Promise<Application[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(applications).orderBy(desc(applications.createdAt));
}

export async function createApplication(data: any): Promise<Application> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(applications).values(data).returning();
  return result[0];
}

export async function updateApplication(id: number, data: any): Promise<Application> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(applications).set(data).where(eq(applications.id, id)).returning();
  return result[0];
}

export async function deleteApplication(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(applications).where(eq(applications.id, id));
}

// Contact submissions queries
export async function createContactSubmission(data: any): Promise<ContactSubmission> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contactSubmissions).values(data).returning();
  return result[0];
}

export async function getAllContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactSubmission(id: number, data: any): Promise<ContactSubmission> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(contactSubmissions).set(data).where(eq(contactSubmissions.id, id)).returning();
  return result[0];
}

export async function deleteContactSubmission(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
}

// About content queries
export async function getAboutContent(section: string): Promise<AboutContent | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(aboutContent)
    .where(eq(aboutContent.section, section))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllAboutContent(): Promise<AboutContent[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(aboutContent)
    .where(eq(aboutContent.published, 1))
    .orderBy(asc(aboutContent.order));
}

export async function getAllAboutContentAdmin(): Promise<AboutContent[]> {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(aboutContent)
    .orderBy(asc(aboutContent.order));
}

export async function createAboutContent(data: InsertAboutContent): Promise<AboutContent> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(aboutContent).values(data).returning();
  return result[0];
}

export async function updateAboutContent(id: number, data: Partial<InsertAboutContent>): Promise<AboutContent> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db
    .update(aboutContent)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(aboutContent.id, id))
    .returning();

  return result[0];
}

export async function deleteAboutContent(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(aboutContent).where(eq(aboutContent.id, id));
}

// Homepage Settings
export async function getHomepageSetting(key: string): Promise<HomepageSettings | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(homepageSettings).where(eq(homepageSettings.key, key)).limit(1);
  return result[0];
}

export async function upsertHomepageSetting(key: string, value: any): Promise<HomepageSettings> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await getHomepageSetting(key);
  if (existing) {
    const result = await db.update(homepageSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(homepageSettings.key, key))
      .returning();
    return result[0];
  } else {
    const result = await db.insert(homepageSettings)
      .values({ key, value })
      .returning();
    return result[0];
  }
}

// Homepage Stats
export async function getHomepageStats(): Promise<HomepageStats[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(homepageStats).orderBy(asc(homepageStats.order));
}

export async function createHomepageStat(data: InsertHomepageStats): Promise<HomepageStats> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(homepageStats).values(data).returning();
  return result[0];
}

export async function updateHomepageStat(id: number, data: Partial<InsertHomepageStats>): Promise<HomepageStats> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(homepageStats).set({ ...data, updatedAt: new Date() }).where(eq(homepageStats.id, id)).returning();
  return result[0];
}

export async function deleteHomepageStat(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(homepageStats).where(eq(homepageStats.id, id));
}

// Homepage Competencies
export async function getHomepageCompetencies(): Promise<HomepageCompetency[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(homepageCompetencies).orderBy(asc(homepageCompetencies.order));
}

export async function createHomepageCompetency(data: InsertHomepageCompetency): Promise<HomepageCompetency> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(homepageCompetencies).values(data).returning();
  return result[0];
}

export async function updateHomepageCompetency(id: number, data: Partial<InsertHomepageCompetency>): Promise<HomepageCompetency> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(homepageCompetencies).set({ ...data, updatedAt: new Date() }).where(eq(homepageCompetencies.id, id)).returning();
  return result[0];
}

export async function deleteHomepageCompetency(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(homepageCompetencies).where(eq(homepageCompetencies.id, id));
}

// Homepage Product Series
export async function getHomepageProductSeries(): Promise<HomepageProductSeries[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(homepageProductSeries).orderBy(asc(homepageProductSeries.order));
}

export async function createHomepageProductSeries(data: InsertHomepageProductSeries): Promise<HomepageProductSeries> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(homepageProductSeries).values(data).returning();
  return result[0];
}

export async function updateHomepageProductSeries(id: number, data: Partial<InsertHomepageProductSeries>): Promise<HomepageProductSeries> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(homepageProductSeries).set({ ...data, updatedAt: new Date() }).where(eq(homepageProductSeries.id, id)).returning();
  return result[0];
}

export async function deleteHomepageProductSeries(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(homepageProductSeries).where(eq(homepageProductSeries.id, id));
}


// Homepage Team helpers
export async function getHomepageTeam(): Promise<HomepageTeam[]> {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(homepageTeam).orderBy(asc(homepageTeam.order));
}

export async function insertHomepageTeam(data: typeof homepageTeam.$inferInsert): Promise<HomepageTeam> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(homepageTeam).values(data).returning();
  return result[0];
}

export async function updateHomepageTeam(id: number, data: Partial<typeof homepageTeam.$inferInsert>): Promise<HomepageTeam | undefined> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(homepageTeam).set({ ...data, updatedAt: new Date() }).where(eq(homepageTeam.id, id)).returning();
  return result[0];
}

export async function deleteHomepageTeam(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(homepageTeam).where(eq(homepageTeam.id, id));
}

// Technologies queries
export async function getAllTechnologies(): Promise<Technology[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(technologies).orderBy(desc(technologies.createdAt));
}

export async function getPublishedTechnologies(): Promise<Technology[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(technologies).where(eq(technologies.published, 1)).orderBy(desc(technologies.createdAt));
}

export async function getTechnologyById(id: number): Promise<Technology | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(technologies).where(eq(technologies.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getTechnologyBySlug(slug: string): Promise<Technology | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(technologies).where(eq(technologies.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createTechnology(data: InsertTechnology): Promise<Technology> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(technologies).values(data).returning();
  return result[0];
}

export async function updateTechnology(id: number, data: Partial<InsertTechnology>): Promise<Technology> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.update(technologies).set({ ...data, updatedAt: new Date() }).where(eq(technologies.id, id)).returning();
  return result[0];
}

export async function deleteTechnology(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(technologies).where(eq(technologies.id, id));
}
