import "dotenv/config";
import { createNews, getAllNews } from "./db";

const newsData: any[] = [
    {
        title: "Mellpro Launches Revolutionary cTDP Technology in European Market",
        description: "Mellpro Swiss Innovation Center announces the official launch of its groundbreaking Cyclic Transdermal Peptide (cTDP) technology across Europe, offering 10x enhanced absorption for premium skincare brands.",
        content: "Mellpro Swiss Innovation Center announces the official launch of its groundbreaking Cyclic Transdermal Peptide (cTDP) technology across Europe, offering 10x enhanced absorption for premium skincare brands.",
        publishedAt: new Date("2026-01-20"),
        category: "Product Launch",
        imageUrl: "/images/technology-bg.jpg",
        slug: "ctdp-launch-europe",
        published: 1
    },
    {
        title: "Strategic Partnership with Leading European Beauty Brands",
        description: "Mellpro announces collaboration with three major European cosmetic companies to develop next-generation anti-aging skincare solutions using our advanced transdermal delivery technology.",
        content: "Mellpro announces collaboration with three major European cosmetic companies to develop next-generation anti-aging skincare solutions using our advanced transdermal delivery technology.",
        publishedAt: new Date("2026-01-15"),
        category: "Partnership",
        imageUrl: "/images/innovation-abstract.jpg",
        slug: "partnership-announcement",
        published: 1
    },
    {
        title: "Mellpro Receives GMP Certification for New Manufacturing Facility",
        description: "Our state-of-the-art 4,600㎡ research and manufacturing facility has successfully obtained GMP certification, ensuring the highest quality standards for all bioactive ingredients.",
        content: "Our state-of-the-art 4,600㎡ research and manufacturing facility has successfully obtained GMP certification, ensuring the highest quality standards for all bioactive ingredients.",
        publishedAt: new Date("2026-01-10"),
        category: "Certification",
        imageUrl: "/images/swiss-alps-lab.jpg",
        slug: "gmp-certification",
        published: 1
    },
    {
        title: "New Research Publication on Transdermal Collagen Efficacy",
        description: "Mellpro's latest clinical study demonstrates 350% increase in Type I collagen production, published in leading international dermatology journal.",
        content: "Mellpro's latest clinical study demonstrates 350% increase in Type I collagen production, published in leading international dermatology journal.",
        publishedAt: new Date("2026-01-05"),
        category: "Research",
        imageUrl: "/images/collagen-molecules.jpg",
        slug: "collagen-research",
        published: 1
    },
    {
        title: "Mellpro Expands Team with Leading Scientists from Stanford University",
        description: "Mellpro welcomes three renowned researchers from Stanford University to strengthen our AI-driven molecular design platform and accelerate innovation.",
        content: "Mellpro welcomes three renowned researchers from Stanford University to strengthen our AI-driven molecular design platform and accelerate innovation.",
        publishedAt: new Date("2025-12-28"),
        category: "Company News",
        imageUrl: "/images/page-17.png",
        slug: "stanford-team",
        published: 1
    },
    {
        title: "Sustainable Production Initiative: Green Synthetic Biology",
        description: "Mellpro commits to 100% sustainable bioactive resource development through advanced green synthetic biology manufacturing processes.",
        content: "Mellpro commits to 100% sustainable bioactive resource development through advanced green synthetic biology manufacturing processes.",
        publishedAt: new Date("2025-12-20"),
        category: "Sustainability",
        imageUrl: "/images/page-18.png",
        slug: "sustainability-initiative",
        published: 1
    }
];

async function seedNews() {
    console.log("Seeding news content...");

    const existingNews = await getAllNews();
    if (existingNews.length === 0) {
        for (const item of newsData) {
            await createNews(item);
            console.log(`Created news: ${item.title}`);
        }
    } else {
        console.log("News already exists, skipping seed.");
    }

    console.log("News seeding completed!");
}

seedNews().catch(console.error);
