
import { z } from "zod";
import { router, publicProcedure } from "../_core/trpc";
import {
    getHomepageSetting,
    upsertHomepageSetting,
    getHomepageStats,
    createHomepageStat,
    updateHomepageStat,
    deleteHomepageStat,
    getHomepageCompetencies,
    createHomepageCompetency,
    updateHomepageCompetency,
    deleteHomepageCompetency,
    getHomepageProductSeries,
    createHomepageProductSeries,
    updateHomepageProductSeries,
    deleteHomepageProductSeries,
    getHomepageTeam,
    insertHomepageTeam,
    updateHomepageTeam,
    deleteHomepageTeam,
} from "../db";

export const homepageRouter = router({
    // Settings
    getSetting: publicProcedure
        .input(z.string())
        .query(async ({ input }) => {
            const setting = await getHomepageSetting(input);
            return setting ? JSON.parse(setting.value) : null;
        }),

    updateSetting: publicProcedure
        .input(z.object({
            key: z.string(),
            value: z.any()
        }))
        .mutation(async ({ input }) => {
            return await upsertHomepageSetting(input.key, JSON.stringify(input.value));
        }),

    // Stats
    getStats: publicProcedure
        .query(async () => {
            return await getHomepageStats();
        }),

    createStat: publicProcedure
        .input(z.object({
            number: z.string(),
            label: z.string(),
            description: z.string().optional(),
            order: z.number().default(0)
        }))
        .mutation(async ({ input }) => {
            return await createHomepageStat(input);
        }),

    updateStat: publicProcedure
        .input(z.object({
            id: z.number(),
            data: z.object({
                number: z.string().optional(),
                label: z.string().optional(),
                description: z.string().optional(),
                order: z.number().optional()
            })
        }))
        .mutation(async ({ input }) => {
            return await updateHomepageStat(input.id, input.data);
        }),

    deleteStat: publicProcedure
        .input(z.number())
        .mutation(async ({ input }) => {
            await deleteHomepageStat(input);
            return { success: true };
        }),

    // Competencies
    getCompetencies: publicProcedure
        .query(async () => {
            return await getHomepageCompetencies();
        }),

    createCompetency: publicProcedure
        .input(z.object({
            title: z.string(),
            description: z.string().optional(),
            link: z.string().optional(),
            number: z.string().optional(),
            order: z.number().default(0)
        }))
        .mutation(async ({ input }) => {
            return await createHomepageCompetency(input);
        }),

    updateCompetency: publicProcedure
        .input(z.object({
            id: z.number(),
            data: z.object({
                title: z.string().optional(),
                description: z.string().optional(),
                link: z.string().optional(),
                number: z.string().optional(),
                order: z.number().optional()
            })
        }))
        .mutation(async ({ input }) => {
            return await updateHomepageCompetency(input.id, input.data);
        }),

    deleteCompetency: publicProcedure
        .input(z.number())
        .mutation(async ({ input }) => {
            await deleteHomepageCompetency(input);
            return { success: true };
        }),

    // Product Series
    getProductSeries: publicProcedure
        .query(async () => {
            return await getHomepageProductSeries();
        }),

    createProductSeries: publicProcedure
        .input(z.object({
            title: z.string(),
            countLabel: z.string().optional(),
            description: z.string().optional(),
            color: z.string().optional(),
            order: z.number().default(0)
        }))
        .mutation(async ({ input }) => {
            return await createHomepageProductSeries(input);
        }),

    updateProductSeries: publicProcedure
        .input(z.object({
            id: z.number(),
            data: z.object({
                title: z.string().optional(),
                countLabel: z.string().optional(),
                description: z.string().optional(),
                color: z.string().optional(),
                order: z.number().optional()
            })
        }))
        .mutation(async ({ input }) => {
            return await updateHomepageProductSeries(input.id, input.data);
        }),

    deleteProductSeries: publicProcedure
        .input(z.number())
        .mutation(async ({ input }) => {
            await deleteHomepageProductSeries(input);
            return { success: true };
        }),

    // Team
    getTeam: publicProcedure.query(async () => {
        return await getHomepageTeam();
    }),

    addTeamMember: publicProcedure
        .input(z.object({
            name: z.string(),
            title: z.string(),
            bio: z.string(),
            initials: z.string(),
            image: z.string().optional(),
            order: z.number().default(0)
        }))
        .mutation(async ({ input }) => {
            return await insertHomepageTeam(input);
        }),

    updateTeamMember: publicProcedure
        .input(z.object({
            id: z.number(),
            data: z.object({
                name: z.string().optional(),
                title: z.string().optional(),
                bio: z.string().optional(),
                initials: z.string().optional(),
                image: z.string().optional(),
                order: z.number().optional()
            })
        }))
        .mutation(async ({ input }) => {
            const { id, data } = input;
            return await updateHomepageTeam(id, data);
        }),

    deleteTeamMember: publicProcedure
        .input(z.number())
        .mutation(async ({ input }) => {
            await deleteHomepageTeam(input);
            return { success: true };
        }),
});
