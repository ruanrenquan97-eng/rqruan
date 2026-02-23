import "dotenv/config";
import { createProduct, getAllProducts } from "./db";

const productsData: any[] = [
    // Series 1: Transdermal Cyclic Peptide Series
    {
        name: "Transdermal Cyclic Peptide (cTDP)",
        series: "Transdermal Cyclic Peptide Series",
        slug: "transdermal-cyclic-peptide",
        description: "Our flagship product line leveraging proprietary cTDP technology for enhanced skin penetration and cellular-level efficacy.",
        content: "Advanced peptide technology for enhanced skin penetration.",
        imageUrl: "/images/collagen-molecules.jpg",
        published: 1
    },
    {
        name: "Energized Cyclic Peptide",
        series: "Transdermal Cyclic Peptide Series",
        slug: "energized-cyclic-peptide",
        description: "Our flagship product line leveraging proprietary cTDP technology for enhanced skin penetration and cellular-level efficacy.",
        content: "Advanced peptide technology for enhanced skin penetration.",
        imageUrl: "/images/collagen-molecules.jpg",
        published: 1
    },
    {
        name: "PDRN Cyclic Peptide Rod",
        series: "Transdermal Cyclic Peptide Series",
        slug: "pdrn-cyclic-peptide-rod",
        description: "Our flagship product line leveraging proprietary cTDP technology for enhanced skin penetration and cellular-level efficacy.",
        content: "Advanced peptide technology for enhanced skin penetration.",
        imageUrl: "/images/collagen-molecules.jpg",
        published: 1
    },

    // Series 2: Recombinant Human Proteins
    {
        name: "Transdermal Fibronectin",
        series: "Recombinant Human Proteins",
        slug: "transdermal-fibronectin",
        description: "High-purity recombinant proteins produced through advanced synthetic biology.",
        content: "Providing stable and consistent formulations for premium skincare.",
        imageUrl: "/images/innovation-abstract.jpg",
        published: 1
    },
    {
        name: "Type I & III Collagen",
        series: "Recombinant Human Proteins",
        slug: "type-i-iii-collagen",
        description: "High-purity recombinant proteins produced through advanced synthetic biology.",
        content: "Providing stable and consistent formulations for premium skincare.",
        imageUrl: "/images/innovation-abstract.jpg",
        published: 1
    },
    {
        name: "5D Collagen",
        series: "Recombinant Human Proteins",
        slug: "5d-collagen",
        description: "High-purity recombinant proteins produced through advanced synthetic biology.",
        content: "Providing stable and consistent formulations for premium skincare.",
        imageUrl: "/images/innovation-abstract.jpg",
        published: 1
    },
    {
        name: "Elastin",
        series: "Recombinant Human Proteins",
        slug: "elastin",
        description: "High-purity recombinant proteins produced through advanced synthetic biology.",
        content: "Providing stable and consistent formulations for premium skincare.",
        imageUrl: "/images/innovation-abstract.jpg",
        published: 1
    },

    // Series 3: Marine & Biomimetic Peptides
    {
        name: "Biomimetic Snail Protein",
        series: "Marine & Biomimetic Peptides",
        slug: "biomimetic-snail-protein",
        description: "Ocean-derived and bio-inspired active compounds offering unique functional properties.",
        content: "Unique functional properties for specialized skincare applications.",
        imageUrl: "/images/page-17.png",
        published: 1
    },
    {
        name: "Mussel Adhesive Protein",
        series: "Marine & Biomimetic Peptides",
        slug: "mussel-adhesive-protein",
        description: "Ocean-derived and bio-inspired active compounds offering unique functional properties.",
        content: "Unique functional properties for specialized skincare applications.",
        imageUrl: "/images/page-17.png",
        published: 1
    },
    {
        name: "Jellyfish Mucin",
        series: "Marine & Biomimetic Peptides",
        slug: "jellyfish-mucin",
        description: "Ocean-derived and bio-inspired active compounds offering unique functional properties.",
        content: "Unique functional properties for specialized skincare applications.",
        imageUrl: "/images/page-17.png",
        published: 1
    },
    {
        name: "Marine Collagen",
        series: "Marine & Biomimetic Peptides",
        slug: "marine-collagen",
        description: "Ocean-derived and bio-inspired active compounds offering unique functional properties.",
        content: "Unique functional properties for specialized skincare applications.",
        imageUrl: "/images/page-17.png",
        published: 1
    },

    // Series 4: Specialty Bio-Ingredients
    {
        name: "Peach Gum Polysaccharide",
        series: "Specialty Bio-Ingredients",
        slug: "peach-gum-polysaccharide",
        description: "Specialized botanical and microbial extracts providing unique functional properties.",
        content: "Sustainable skincare solutions.",
        imageUrl: "/images/page-18.png",
        published: 1
    },
    {
        name: "Changbai Mountain Trio",
        series: "Specialty Bio-Ingredients",
        slug: "changbai-mountain-trio",
        description: "Specialized botanical and microbial extracts providing unique functional properties.",
        content: "Sustainable skincare solutions.",
        imageUrl: "/images/page-18.png",
        published: 1
    },
    {
        name: "Peptide Vitamins",
        series: "Specialty Bio-Ingredients",
        slug: "peptide-vitamins",
        description: "Specialized botanical and microbial extracts providing unique functional properties.",
        content: "Sustainable skincare solutions.",
        imageUrl: "/images/page-18.png",
        published: 1
    },
    {
        name: "Amino Acid Complex",
        series: "Specialty Bio-Ingredients",
        slug: "amino-acid-complex",
        description: "Specialized botanical and microbial extracts providing unique functional properties.",
        content: "Sustainable skincare solutions.",
        imageUrl: "/images/page-18.png",
        published: 1
    }
];

async function seedProducts() {
    console.log("Seeding products content...");

    const existingProducts = await getAllProducts();
    if (existingProducts.length === 0) {
        for (const item of productsData) {
            await createProduct(item);
            console.log(`Created product: ${item.name}`);
        }
    } else {
        console.log("Products already exists, skipping seed.");
    }

    console.log("Products seeding completed!");
}

seedProducts().catch(console.error);
