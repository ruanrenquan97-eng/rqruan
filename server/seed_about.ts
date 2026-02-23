
import { getDb } from "./db";
import { aboutContent } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";

dotenv.config();

const aboutData = [
    {
        section: "hero",
        title: "About Mellpro",
        content: "A leading Swiss biotechnology enterprise specializing in advanced biological transdermal technology and green synthetic biological manufacturing.",
        order: 1,
    },
    {
        section: "who_we_are",
        title: "Who We Are",
        content: "Mellpro Swiss Innovation Center is a leading biotechnology enterprise specializing in advanced biological transdermal technology and green synthetic biological manufacturing. We focus on the development, manufacturing, and comprehensive solution delivery of novel bioactive functional materials for the cosmetics and skincare industry.\n\nBased in Switzerland, we combine Swiss precision and innovation excellence with global manufacturing capabilities to deliver scientifically validated ingredients that transform skincare efficacy.",
        imageUrl: "/images/swiss-alps-lab.jpg",
        order: 2,
    },
    {
        section: "mission",
        title: "Our Mission",
        content: "To develop and deliver cutting-edge bioactive ingredients that revolutionize skincare efficacy through advanced transdermal technology and sustainable biological manufacturing practices.",
        order: 3,
    },
    {
        section: "vision",
        title: "Our Vision",
        content: "To be the global leader in biological transdermal delivery technology, enabling brands worldwide to create premium skincare products with superior efficacy and safety.",
        order: 4,
    },
    {
        section: "research_focus",
        title: "Research Focus",
        content: "We specialize in skin anti-aging molecules, marine bioactive compounds, and characteristic plant resources to create innovative skincare solutions.",
        order: 5,
    },
    {
        section: "unique_technology",
        title: "Unique Technology",
        content: "We have developed globally pioneering third-generation biological transdermal technology for enhanced ingredient absorption.",
        order: 6,
    },
    {
        section: "ai_driven_innovation",
        title: "AI-Driven Innovation",
        content: "Leveraging artificial intelligence for molecular design, synthetic biology, and genetic engineering as core technical capabilities.",
        order: 7,
    },
    {
        section: "sustainable_development",
        title: "Sustainable Development",
        content: "We achieve green development and industrialization of bioactive resources including proteins, peptides, and plant extracts.",
        order: 8,
    },
    {
        section: "facilities_research",
        title: "Research Facility",
        content: "Advanced biotechnology research and development center (4,600 ㎡)",
        order: 9,
    },
    {
        section: "facilities_gmp",
        title: "GMP Cell Factory",
        content: "Fermentation capacity with 5-ton total volume (7 Tanks)",
        order: 10,
    },
    {
        section: "facilities_formulation",
        title: "Formulation Platform",
        content: "Freeze-drying and emulsification production lines (2,000 ㎡)",
        order: 11,
    },
    {
        section: "facilities_summary",
        title: "Integrated Facility",
        content: "Our integrated facility enables us to execute the complete industrial chain from \"molecular design → process development → efficacy verification → raw material production → finished product\" with precision and quality control at every stage.",
        order: 12,
    },
    {
        section: "research_team_intro",
        title: "Global Research Excellence",
        content: "Our research team comprises leading scientists and experts from prestigious institutions worldwide, bringing together diverse perspectives and cutting-edge knowledge in biotechnology, dermatology, and pharmaceutical sciences.",
        order: 13,
    },
    {
        section: "collaboration_cta",
        title: "Ready to Collaborate?",
        content: "Discover how Mellpro can support your brand with cutting-edge bioactive ingredients and comprehensive technical expertise.",
        order: 14,
    }
];

async function seedAbout() {
    console.log("Seeding About Us content...");
    const db = await getDb();
    if (!db) {
        console.error("Database connection failed. Check DATABASE_URL.");
        process.exit(1);
    }

    for (const item of aboutData) {
        const existing = await db.select().from(aboutContent).where(eq(aboutContent.section, item.section));
        if (existing.length === 0) {
            await db.insert(aboutContent).values(item);
            console.log(`Inserted: ${item.section}`);
        } else {
            await db.update(aboutContent).set(item).where(eq(aboutContent.section, item.section));
            console.log(`Updated: ${item.section}`);
        }
    }

    console.log("About Us seeding complete.");
}

seedAbout().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
