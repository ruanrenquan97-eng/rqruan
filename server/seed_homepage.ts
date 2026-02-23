import "dotenv/config";
import {
    upsertHomepageSetting,
    createHomepageStat,
    createHomepageCompetency,
    createHomepageProductSeries,
    getHomepageStats,
    getHomepageCompetencies,
    getHomepageProductSeries
} from "./db";

async function seedHomepage() {
    console.log("Seeding homepage content...");

    // 1. Hero Section
    console.log("Seeding Hero Section...");
    await upsertHomepageSetting("hero_heading", JSON.stringify("Transdermal Delivery & Efficacy Activity Platform"));
    await upsertHomepageSetting("hero_subheading", JSON.stringify("Advanced biotechnology research and development based in Switzerland, delivering cutting-edge bioactive ingredients to the global market."));

    // 2. Stats
    console.log("Seeding Stats...");
    const existingStats = await getHomepageStats();
    if (existingStats.length === 0) {
        await createHomepageStat({ number: "50+", label: "Patents", description: "Proprietary technologies and innovations", order: 1 });
        await createHomepageStat({ number: "10x", label: "Enhanced Absorption", description: "Advanced transdermal delivery capability", order: 2 });
        await createHomepageStat({ number: "4,600", label: "㎡ R&D Facility", description: "State-of-the-art Swiss research center", order: 3 });
    }

    // 3. Competencies
    console.log("Seeding Competencies...");
    const existingCompetencies = await getHomepageCompetencies();
    if (existingCompetencies.length === 0) {
        await createHomepageCompetency({ title: "AlphaDrug™ AI Platform", description: "Advanced molecular design using artificial intelligence", order: 1 });
        await createHomepageCompetency({ title: "Transdermal Delivery", description: "Revolutionary cTDP technology for enhanced absorption", order: 2 });
        await createHomepageCompetency({ title: "Synthetic Biology", description: "Large-scale production with GMP certification", order: 3 });
    }

    // 4. Product Series
    console.log("Seeding Product Series...");
    const existingSeries = await getHomepageProductSeries();
    if (existingSeries.length === 0) {
        await createHomepageProductSeries({ title: "Transdermal Cyclic Peptide Series", countLabel: "3 Products", description: "Advanced peptide technology for enhanced skin penetration", order: 1 });
        await createHomepageProductSeries({ title: "Recombinant Human Proteins", countLabel: "6 Products", description: "High-purity collagen and protein formulations", order: 2 });
        await createHomepageProductSeries({ title: "Marine/Biomimetic Peptides", countLabel: "5 Products", description: "Ocean-derived and bio-inspired active compounds", order: 3 });
        await createHomepageProductSeries({ title: "Specialty Bio-Ingredients", countLabel: "4 Products", description: "Specialized botanical and extracts", order: 4 });
    }

    console.log("Homepage seeding completed!");
}

seedHomepage().catch(console.error);
