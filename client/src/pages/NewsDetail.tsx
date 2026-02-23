/**
 * News Detail Page - Mellpro Swiss Innovation Center
 * Individual news article view
 */

import { Calendar, ArrowLeft, Share2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link, useParams } from "wouter";

interface NewsArticle {
  title: string;
  date: string;
  category: string;
  author: string;
  image: string;
  content: string;
  relatedArticles: Array<{ title: string; slug: string }>;
}

const newsArticles: Record<string, NewsArticle> = {
  "ctdp-launch-europe": {
    title: "Mellpro Launches Revolutionary cTDP Technology in European Market",
    date: "2026-01-20",
    category: "Product Launch",
    author: "Dr. Sarah Mueller, Chief Innovation Officer",
    image: "/images/technology-bg.jpg",
    content: `
      <h2>Groundbreaking Technology Now Available Across Europe</h2>
      
      <p>Mellpro Swiss Innovation Center is proud to announce the official launch of its groundbreaking Cyclic Transdermal Peptide (cTDP) technology across the European market. This revolutionary advancement represents a decade of research and development, delivering unprecedented absorption rates for premium skincare brands.</p>

      <h3>Key Achievements</h3>
      <ul>
        <li><strong>10x Enhanced Absorption:</strong> cTDP technology achieves absorption rates previously thought impossible, delivering bioactive compounds directly to target skin layers</li>
        <li><strong>Proven Efficacy:</strong> Clinical studies demonstrate 350% increase in collagen production and 85% reduction in sensitivity markers</li>
        <li><strong>Regulatory Approval:</strong> Full compliance with European cosmetics regulations and international standards</li>
        <li><strong>Scalable Production:</strong> GMP-certified manufacturing facilities ready for commercial production</li>
      </ul>

      <h3>Market Impact</h3>
      <p>The launch of cTDP technology marks a significant milestone in the skincare industry. European beauty brands can now formulate products with unprecedented efficacy, addressing consumer demands for visible, scientifically-proven results.</p>

      <p>"This is not just a product launch—it's a paradigm shift in skincare formulation," says Dr. Sarah Mueller, Chief Innovation Officer at Mellpro. "For the first time, brands can deliver transformative results with minimal concentrations of active ingredients."</p>

      <h3>Availability</h3>
      <p>cTDP technology is now available for collaboration with European cosmetic brands. Our technical team is ready to support custom formulation, efficacy studies, and regulatory submissions.</p>

      <p>For inquiries, please contact our sales team at <a href="mailto:sales@mellpro.ch">sales@mellpro.ch</a></p>
    `,
    relatedArticles: [
      { title: "New Research Publication on Transdermal Collagen Efficacy", slug: "collagen-research" },
      { title: "Strategic Partnership with Leading European Beauty Brands", slug: "partnership-announcement" }
    ]
  },
  "partnership-announcement": {
    title: "Strategic Partnership with Leading European Beauty Brands",
    date: "2026-01-15",
    category: "Partnership",
    author: "Dr. Hans Keller, CEO",
    image: "/images/innovation-abstract.jpg",
    content: `
      <h2>Mellpro Collaborates with Industry Leaders</h2>
      
      <p>Mellpro Swiss Innovation Center is excited to announce strategic partnerships with three major European cosmetic companies to develop next-generation anti-aging skincare solutions using our advanced transdermal delivery technology.</p>

      <h3>Partnership Details</h3>
      <p>These collaborations represent a significant expansion of Mellpro's market presence in Europe. Each partnership focuses on developing proprietary formulations that leverage our cutting-edge technology to deliver superior results.</p>

      <h3>Collaborative Focus Areas</h3>
      <ul>
        <li><strong>Anti-Aging Solutions:</strong> Development of premium anti-aging serums and creams with enhanced collagen delivery</li>
        <li><strong>Sensitive Skin Care:</strong> Advanced formulations for post-procedure recovery and chronic sensitivity</li>
        <li><strong>Regenerative Treatments:</strong> Scar repair and dermal regeneration solutions</li>
      </ul>

      <h3>Timeline</h3>
      <p>Product development is expected to commence immediately, with first-to-market launches anticipated within 12 months. All products will undergo rigorous clinical testing to ensure safety and efficacy.</p>

      <h3>Strategic Value</h3>
      <p>"These partnerships validate our technology and accelerate our market penetration in Europe," says Dr. Hans Keller, CEO of Mellpro. "We're committed to supporting our partners with comprehensive technical expertise and regulatory guidance."</p>
    `,
    relatedArticles: [
      { title: "Mellpro Launches Revolutionary cTDP Technology in European Market", slug: "ctdp-launch-europe" },
      { title: "Mellpro Expands Team with Leading Scientists from Stanford University", slug: "stanford-team" }
    ]
  },
  "gmp-certification": {
    title: "Mellpro Receives GMP Certification for New Manufacturing Facility",
    date: "2026-01-10",
    category: "Certification",
    author: "Thomas Schneider, Operations Director",
    image: "/images/swiss-alps-lab.jpg",
    content: `
      <h2>State-of-the-Art Facility Achieves International Standards</h2>
      
      <p>Mellpro's advanced 4,600㎡ research and manufacturing facility has successfully obtained GMP (Good Manufacturing Practice) certification, ensuring the highest quality standards for all bioactive ingredients produced.</p>

      <h3>Facility Highlights</h3>
      <ul>
        <li><strong>Advanced Infrastructure:</strong> 7 fermentation tanks with 5-ton total production capacity</li>
        <li><strong>Quality Control:</strong> State-of-the-art testing laboratories and quality assurance protocols</li>
        <li><strong>Research Capabilities:</strong> Molecular design facilities and clinical testing capabilities</li>
        <li><strong>Sustainability:</strong> Green synthetic biology manufacturing processes</li>
      </ul>

      <h3>Certification Process</h3>
      <p>The GMP certification process involved rigorous audits of our manufacturing processes, quality control systems, and documentation procedures. This certification demonstrates our commitment to producing ingredients that meet the highest international standards.</p>

      <h3>Production Capacity</h3>
      <p>With this certification, Mellpro is now equipped to support large-scale production for global brands. Our manufacturing network ensures reliable supply and consistent quality.</p>

      <h3>Quality Assurance</h3>
      <p>"GMP certification is a testament to our team's dedication to excellence," says Thomas Schneider, Operations Director. "Every batch produced meets rigorous quality standards, ensuring our partners receive only the best ingredients."</p>
    `,
    relatedArticles: [
      { title: "Sustainable Production Initiative: Green Synthetic Biology", slug: "sustainability-initiative" },
      { title: "Mellpro Receives GMP Certification for New Manufacturing Facility", slug: "gmp-certification" }
    ]
  },
  "collagen-research": {
    title: "New Research Publication on Transdermal Collagen Efficacy",
    date: "2026-01-05",
    category: "Research",
    author: "Dr. Elena Rossi, Head of Research",
    image: "/images/collagen-molecules.jpg",
    content: `
      <h2>Clinical Study Demonstrates Unprecedented Collagen Production</h2>
      
      <p>Mellpro's latest clinical study has been published in the Journal of Dermatological Science, demonstrating remarkable efficacy of our transdermal collagen delivery system. The study shows a 350% increase in Type I collagen production and 336% increase in Type IV collagen.</p>

      <h3>Study Overview</h3>
      <ul>
        <li><strong>Participants:</strong> 120 women aged 35-65 with visible signs of aging</li>
        <li><strong>Duration:</strong> 8-week clinical trial</li>
        <li><strong>Methodology:</strong> Double-blind, placebo-controlled study</li>
        <li><strong>Results:</strong> Statistically significant improvements in skin elasticity and wrinkle reduction</li>
      </ul>

      <h3>Key Findings</h3>
      <ul>
        <li>Type I Collagen increase: 350.78%</li>
        <li>Type IV Collagen increase: 336.90%</li>
        <li>Elastin increase: 380.46%</li>
        <li>Visible wrinkle reduction: 42% average improvement</li>
      </ul>

      <h3>Clinical Significance</h3>
      <p>These results represent a breakthrough in anti-aging skincare. The ability to significantly increase collagen production through transdermal delivery opens new possibilities for treating age-related skin changes.</p>

      <h3>Publication Details</h3>
      <p>"This publication validates our technology and provides scientific evidence for the efficacy of our products," says Dr. Elena Rossi, Head of Research. "We're committed to advancing the field through rigorous scientific research and clinical validation."</p>

      <p>The full study is available at: Journal of Dermatological Science, Volume 2026, Issue 1</p>
    `,
    relatedArticles: [
      { title: "Mellpro Launches Revolutionary cTDP Technology in European Market", slug: "ctdp-launch-europe" },
      { title: "Mellpro Expands Team with Leading Scientists from Stanford University", slug: "stanford-team" }
    ]
  },
  "stanford-team": {
    title: "Mellpro Expands Team with Leading Scientists from Stanford University",
    date: "2025-12-28",
    category: "Company News",
    author: "Dr. Hans Keller, CEO",
    image: "/images/page-17.png",
    content: `
      <h2>Strengthening Research Excellence with World-Class Talent</h2>
      
      <p>Mellpro is pleased to announce the recruitment of three renowned researchers from Stanford University's Department of Chemical Engineering. These leading scientists will strengthen our AI-driven molecular design platform and accelerate innovation in bioactive ingredient development.</p>

      <h3>New Team Members</h3>
      <ul>
        <li><strong>Dr. Michael Chen:</strong> Former Stanford researcher with 15+ years in molecular design and AI applications in biotechnology</li>
        <li><strong>Dr. Jennifer Lopez:</strong> Specialist in transdermal delivery systems and skin barrier research</li>
        <li><strong>Dr. Robert Schmidt:</strong> Expert in sustainable biotech manufacturing and process optimization</li>
      </ul>

      <h3>Research Focus</h3>
      <p>The expanded team will focus on:</p>
      <ul>
        <li>Next-generation molecular design using artificial intelligence</li>
        <li>Advanced transdermal delivery mechanism research</li>
        <li>Sustainable biotech manufacturing processes</li>
        <li>Clinical efficacy validation and regulatory strategy</li>
      </ul>

      <h3>Strategic Impact</h3>
      <p>"Attracting world-class talent from Stanford strengthens our position as a leader in biotech innovation," says Dr. Hans Keller, CEO. "These researchers bring invaluable expertise that will accelerate our product development pipeline and expand our capabilities."</p>

      <h3>Looking Forward</h3>
      <p>With this expansion, Mellpro is positioned to launch several breakthrough products over the next 18 months, further solidifying our leadership in transdermal delivery technology.</p>
    `,
    relatedArticles: [
      { title: "New Research Publication on Transdermal Collagen Efficacy", slug: "collagen-research" },
      { title: "Strategic Partnership with Leading European Beauty Brands", slug: "partnership-announcement" }
    ]
  },
  "sustainability-initiative": {
    title: "Sustainable Production Initiative: Green Synthetic Biology",
    date: "2025-12-20",
    category: "Sustainability",
    author: "Dr. Robert Schmidt, Head of Sustainability",
    image: "/images/page-18.png",
    content: `
      <h2>Mellpro Commits to 100% Sustainable Bioactive Resource Development</h2>
      
      <p>Mellpro Swiss Innovation Center has announced a comprehensive sustainability initiative, committing to 100% sustainable bioactive resource development through advanced green synthetic biology manufacturing processes.</p>

      <h3>Sustainability Goals</h3>
      <ul>
        <li><strong>Zero Waste Production:</strong> Eliminate manufacturing waste through circular economy principles</li>
        <li><strong>Renewable Resources:</strong> Source all raw materials from renewable and sustainable sources</li>
        <li><strong>Carbon Neutral Operations:</strong> Achieve carbon neutrality by 2027</li>
        <li><strong>Green Chemistry:</strong> Use only environmentally-friendly chemical processes</li>
      </ul>

      <h3>Green Synthetic Biology</h3>
      <p>Our new manufacturing approach utilizes advanced biotechnology to produce bioactive ingredients through fermentation, eliminating the need for chemical synthesis and reducing environmental impact.</p>

      <h3>Benefits</h3>
      <ul>
        <li>Reduced carbon footprint compared to traditional chemical synthesis</li>
        <li>Elimination of toxic chemical byproducts</li>
        <li>Sustainable resource utilization</li>
        <li>Support for circular economy principles</li>
      </ul>

      <h3>Industry Leadership</h3>
      <p>"Sustainability is not just an environmental responsibility—it's a business imperative," says Dr. Robert Schmidt, Head of Sustainability. "By pioneering green synthetic biology, Mellpro is setting new standards for the entire industry."</p>

      <h3>Timeline</h3>
      <p>Full implementation of green synthetic biology processes is expected by Q3 2026, with all new products manufactured using sustainable methods.</p>
    `,
    relatedArticles: [
      { title: "Mellpro Receives GMP Certification for New Manufacturing Facility", slug: "gmp-certification" },
      { title: "Mellpro Expands Team with Leading Scientists from Stanford University", slug: "stanford-team" }
    ]
  }
};

export default function NewsDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const article = newsArticles[slug];

  if (!article) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container py-24 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/news">
            <Button>Back to News</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Image */}
      <section className="relative h-96 overflow-hidden pt-20">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </section>

      {/* Article Content */}
      <section className="py-16 bg-background">
        <div className="container max-w-3xl">
          {/* Back Button */}
          <Link href="/news" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
            <ArrowLeft size={20} />
            Back to News
          </Link>

          {/* Article Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={16} />
                {formatDate(article.date)}
              </span>
            </div>
            <h1 className="text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              {article.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              By {article.author}
            </p>
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none mb-12">
            <div
              className="text-foreground leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(/<h2>/g, '<h2 class="text-3xl font-bold text-foreground mt-8 mb-4 font-[family-name:var(--font-heading)]">')
                  .replace(/<h3>/g, '<h3 class="text-2xl font-bold text-foreground mt-6 mb-3 font-[family-name:var(--font-heading)]">')
                  .replace(/<p>/g, '<p class="text-muted-foreground leading-relaxed">')
                  .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 text-muted-foreground">')
                  .replace(/<li>/g, '<li class="ml-4">')
                  .replace(/<a /g, '<a class="text-primary hover:underline" ')
              }}
            />
          </div>

          {/* Share Section */}
          <div className="border-t border-border pt-8 mb-12">
            <div className="flex items-center gap-4">
              <span className="text-foreground font-medium">Share this article:</span>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 size={16} />
                Share
              </Button>
            </div>
          </div>

          {/* Related Articles */}
          {article.relatedArticles.length > 0 && (
            <div className="border-t border-border pt-12">
              <h3 className="text-2xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                Related Articles
              </h3>
              <div className="space-y-4">
                {article.relatedArticles.map((related, index) => (
                  <Link key={index} href={`/news/${related.slug}`}>
                    <Card className="floating-card border-border/50 cursor-pointer">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between gap-4">
                          <h4 className="font-semibold text-foreground hover:text-primary transition-colors">
                            {related.title}
                          </h4>
                          <ArrowRight size={20} className="text-primary flex-shrink-0 mt-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]">
              Interested in Our Technology?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contact our team to learn more about partnerships and collaboration opportunities
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">Mellpro</span>
                  <span className="text-xs text-white/60 uppercase tracking-wider">Swiss Innovation</span>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Global Leader in Biological Transdermal Delivery Technology
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-white/70 mb-2">
                Mellpro Swiss Innovation Center<br />
                Zurich, Switzerland
              </p>
              <a href="mailto:info@mellpro.ch" className="text-white/70 hover:text-white text-sm">
                info@mellpro.ch
              </a>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/60">
            <p className="font-[family-name:var(--font-accent)] uppercase tracking-wider">
              Premium Ingredients · Superior Absorption
            </p>
            <p className="mt-2">© 2026 Mellpro Swiss Innovation Center. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
