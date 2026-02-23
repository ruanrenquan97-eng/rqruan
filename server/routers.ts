import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { homepageRouter } from "./routers/homepage";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import {
  getPublishedNews,
  getNewsBySlug,
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  getPublishedProducts,
  getProductBySlug,
  getProductById,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProductSeries,
  createProductSeries,
  updateProductSeries,
  deleteProductSeries,
  getPublishedApplications,
  getApplicationBySlug,
  getAllApplications,
  createApplication,
  updateApplication,
  deleteApplication,
  createContactSubmission,
  getAllContactSubmissions,
  updateContactSubmission,
  deleteContactSubmission,
  getAboutContent,
  getAllAboutContent,
  getAllAboutContentAdmin,
  createAboutContent,
  updateAboutContent,
  deleteAboutContent,
  getAllTechnologies,
  getPublishedTechnologies,
  getTechnologyById,
  getTechnologyBySlug,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  homepage: homepageRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // News management
  news: router({
    // Public procedures
    listPublished: publicProcedure.query(() => getPublishedNews()),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => getNewsBySlug(input.slug)),

    // Admin procedures
    listAll: adminProcedure.query(() => getAllNews()),
    create: adminProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.string(),
          description: z.string().optional(),
          content: z.string(),
          category: z.string(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
          publishedAt: z.date().optional(),
        })
      )
      .mutation(({ input }) => createNews(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          slug: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          content: z.string().optional(),
          category: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
          publishedAt: z.date().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateNews(id, data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteNews(input.id)),
  }),

  // Products management
  products: router({
    // Public procedures
    listPublished: publicProcedure.query(() => getPublishedProducts()),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => getProductBySlug(input.slug)),
    getById: adminProcedure.input(z.object({ id: z.number() })).query(({ input }) => getProductById(input.id)),

    // Admin procedures
    listAll: adminProcedure.query(() => getAllProducts()),
    create: adminProcedure
      .input(
        z.object({
          slug: z.string(),
          name: z.string(),
          series: z.string(),
          description: z.string().optional(),
          content: z.string().optional(),
          inci: z.string().optional(),
          specifications: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => createProduct(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          slug: z.string().optional(),
          name: z.string().optional(),
          series: z.string().optional(),
          description: z.string().optional(),
          content: z.string().optional(),
          inci: z.string().optional(),
          specifications: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateProduct(id, data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteProduct(input.id)),
  }),

  // Product Series management
  productSeries: router({
    listAll: publicProcedure.query(() => getAllProductSeries()),
    create: adminProcedure
      .input(
        z.object({
          name: z.string(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          order: z.number().optional(),
        })
      )
      .mutation(({ input }) => createProductSeries(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          description: z.string().optional(),
          imageUrl: z.string().optional(),
          order: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateProductSeries(id, data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteProductSeries(input.id)),
  }),

  // Applications management
  applications: router({
    // Public procedures
    listPublished: publicProcedure.query(() => getPublishedApplications()),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => getApplicationBySlug(input.slug)),

    // Admin procedures
    listAll: adminProcedure.query(() => getAllApplications()),
    create: adminProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.string(),
          description: z.string().optional(),
          content: z.string().optional(),
          icon: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => createApplication(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          slug: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          content: z.string().optional(),
          icon: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateApplication(id, data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteApplication(input.id)),
  }),

  // Contact submissions
  contacts: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          company: z.string().optional(),
          country: z.string().optional(),
          subject: z.string(),
          message: z.string(),
        })
      )
      .mutation(({ input }) => createContactSubmission(input)),

    // Admin procedures
    listAll: adminProcedure.query(() => getAllContactSubmissions()),
    updateStatus: adminProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["new", "read", "replied", "archived"]),
        })
      )
      .mutation(({ input }) => updateContactSubmission(input.id, { status: input.status })),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteContactSubmission(input.id)),
  }),

  about: router({
    listPublished: publicProcedure.query(() => getAllAboutContent()),
    getSection: publicProcedure.input(z.object({ section: z.string() })).query(({ input }) => getAboutContent(input.section)),
    listAll: adminProcedure.query(() => getAllAboutContentAdmin()),
    create: adminProcedure
      .input(z.object({
        section: z.string(),
        title: z.string().optional(),
        content: z.string(),
        imageUrl: z.string().optional(),
        order: z.number().optional(),
        published: z.number().optional(),
      }))
      .mutation(({ input }) => createAboutContent(input)),
    update: adminProcedure
      .input(z.object({
        id: z.number(),
        section: z.string().optional(),
        title: z.string().optional(),
        content: z.string().optional(),
        imageUrl: z.string().optional(),
        order: z.number().optional(),
        published: z.number().optional(),
      }))
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateAboutContent(id, data);
      }),
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(({ input }) => deleteAboutContent(input.id)),
  }),

  // Technologies management
  technologies: router({
    // Public procedures
    listPublished: publicProcedure.query(() => getPublishedTechnologies()),
    getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(({ input }) => getTechnologyBySlug(input.slug)),

    // Admin procedures
    listAll: adminProcedure.query(() => getAllTechnologies()),
    getById: adminProcedure.input(z.object({ id: z.number() })).query(({ input }) => getTechnologyById(input.id)),
    create: adminProcedure
      .input(
        z.object({
          slug: z.string(),
          title: z.string(),
          description: z.string().optional(),
          content: z.string(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => createTechnology(input)),
    update: adminProcedure
      .input(
        z.object({
          id: z.number(),
          slug: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          content: z.string().optional(),
          imageUrl: z.string().optional(),
          published: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        const { id, ...data } = input;
        return updateTechnology(id, data);
      }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => deleteTechnology(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
