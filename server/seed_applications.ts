import "dotenv/config";
import { createApplication, getAllApplications } from "./db";

const applicationsData: any[] = [
    {
        title: "Sensitive Skin Repair",
        slug: "sensitive-skin-repair",
        description: "Triple system approach combining transdermal delivery with anti-inflammatory factors and barrier reconstruction for post-procedure care and chronic sensitivity.",
        icon: "🛡️",
        content: `
<div class="space-y-4 mb-8">
  <div class="bg-primary/5 rounded-lg p-4 border border-primary/20">
    <h3 class="font-semibold text-foreground mb-3">Solution Components</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Transdermal cyclic peptides for barrier repair</li>
      <li>• Anti-inflammatory bioactive compounds</li>
      <li>• Soothing marine extracts</li>
      <li>• Protective barrier-strengthening proteins</li>
    </ul>
  </div>
  
  <div class="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
    <h3 class="font-semibold text-foreground mb-3">Ideal For</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Post-laser and post-procedure recovery</li>
      <li>• Chronic sensitivity and redness</li>
      <li>• Compromised skin barrier</li>
      <li>• Reactive and irritated skin</li>
    </ul>
  </div>
</div>
    `,
        published: 1
    },
    {
        title: "Dermal Collagen Anti-Aging",
        slug: "dermal-collagen-anti-aging",
        description: "ECM reconstruction system combining fibroblast activation with transdermal collagen and elastin for mature skin, fine lines, and post-aesthetic maintenance.",
        icon: "✨",
        content: `
<div class="space-y-4 mb-8">
  <div class="bg-primary/5 rounded-lg p-4 border border-primary/20">
    <h3 class="font-semibold text-foreground mb-3">Active Ingredients</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Transdermal collagen (Type I & III)</li>
      <li>• Elastin for skin elasticity</li>
      <li>• Fibroblast-activating peptides</li>
      <li>• 5D collagen for structural support</li>
    </ul>
  </div>
  
  <div class="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
    <h3 class="font-semibold text-foreground mb-3">Proven Results</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Type I collagen increase: ↑350.78%</li>
      <li>• Type IV collagen increase: ↑336.90%</li>
      <li>• Elastin increase: ↑380.46%</li>
      <li>• Visible wrinkle reduction in 8 weeks</li>
    </ul>
  </div>
</div>
    `,
        published: 1
    },
    {
        title: "Dermal Regeneration & Repair",
        slug: "dermal-regeneration-repair",
        description: "Advanced repair system combining PDRN and ECM scaffold for acne marks, scarring, stretch marks, and post-surgical dermal structure restoration.",
        icon: "🔬",
        content: `
<div class="space-y-4 mb-8">
  <div class="bg-primary/5 rounded-lg p-4 border border-primary/20">
    <h3 class="font-semibold text-foreground mb-3">Repair Technology</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• PDRN (Polydeoxyribonucleotide) for tissue regeneration</li>
      <li>• ECM scaffold proteins</li>
      <li>• Fibroblast stimulation factors</li>
      <li>• Anti-scarring peptide complex</li>
    </ul>
  </div>
  
  <div class="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
    <h3 class="font-semibold text-foreground mb-3">Treatment Applications</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Acne scar treatment</li>
      <li>• Surgical scar revision</li>
      <li>• Stretch mark reduction</li>
      <li>• Atrophic scar improvement</li>
    </ul>
  </div>
</div>
    `,
        published: 1
    },
    {
        title: "Photoaging Protection",
        slug: "photoaging-protection",
        description: "Mitochondrial-level antioxidants with blue light filtering for urban environments and screen exposure protection.",
        icon: "🌞",
        content: `
<div class="space-y-4 mb-8">
  <div class="bg-primary/5 rounded-lg p-4 border border-primary/20">
    <h3 class="font-semibold text-foreground mb-3">Protection Strategy</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Mitochondrial antioxidant protection</li>
      <li>• Blue light filtering compounds</li>
      <li>• UV damage prevention</li>
      <li>• Environmental stress protection</li>
    </ul>
  </div>
  
  <div class="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
    <h3 class="font-semibold text-foreground mb-3">Ideal For</h3>
    <ul class="space-y-2 text-muted-foreground">
      <li>• Urban environment protection</li>
      <li>• Screen exposure defense</li>
      <li>• Photoaging prevention</li>
      <li>• Environmental damage protection</li>
    </ul>
  </div>
</div>
    `,
        published: 1
    }
];

async function seedApplications() {
    console.log("Seeding applications content...");

    const existing = await getAllApplications();
    if (existing.length === 0) {
        for (const item of applicationsData) {
            await createApplication(item);
            console.log(`Created application: ${item.title}`);
        }
    } else {
        console.log("Applications already exists, skipping seed.");
    }

    console.log("Applications seeding completed!");
}

seedApplications().catch(console.error);
