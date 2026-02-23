/**
 * Home Page - Mellpro Swiss Innovation Center
 * Design: Swiss Precision Biotech - Simplified homepage with Swiss focus
 * Navigation to detail pages for comprehensive information
 */

import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import ResearchTeam from "@/components/ResearchTeam";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  // Fetch Homepage Data
  const heroHeading = trpc.homepage.getSetting.useQuery("hero_heading");
  const heroSubheading = trpc.homepage.getSetting.useQuery("hero_subheading");
  const statsQuery = trpc.homepage.getStats.useQuery();
  const competenciesQuery = trpc.homepage.getCompetencies.useQuery();
  const productSeriesQuery = trpc.homepage.getProductSeries.useQuery();
  const productsQuery = trpc.products.listPublished.useQuery();

  const flagshipProduct = productsQuery.data?.find(p => p.name.includes("cTDP") || p.slug === "transdermal-cyclic-peptide");

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(/images/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-secondary/60" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 border border-white/20">
              🇨🇭 Swiss Innovation Center
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-[family-name:var(--font-heading)]">
              {(heroHeading.data as string) || "Transdermal Delivery & Efficacy Activity Platform"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl">
              {(heroSubheading.data as string) || "Advanced biotechnology research and development based in Switzerland, delivering cutting-edge bioactive ingredients to the global market."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/technology">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8">
                  Explore Technology
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8">
                  View Products
                </Button>
              </Link>
            </div>
            <div className="mt-12 text-white/80 text-sm font-[family-name:var(--font-accent)] uppercase tracking-wider">
              Global Leader in Biological Transdermal Delivery Technology
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Quick Overview Section */}
      <section className="py-24 bg-background molecular-pattern">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              Mellpro Swiss Innovation Center
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leading biotechnology research and development for advanced skincare and cosmetic ingredients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {(statsQuery.data && statsQuery.data.length > 0 ? statsQuery.data : [
              { number: "50+", label: "Patents", description: "Proprietary technologies and innovations" },
              { number: "10x", label: "Enhanced Absorption", description: "Advanced transdermal delivery capability" },
              { number: "4,600", label: "㎡ R&D Facility", description: "State-of-the-art Swiss research center" }
            ]).map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-primary font-[family-name:var(--font-accent)] mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description || ""}</div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              Mellpro Swiss Innovation Center is a leading biotechnology enterprise specializing in advanced biological transdermal technology and green synthetic biological manufacturing. We focus on the development, manufacturing, and comprehensive solution delivery of novel bioactive functional materials for the cosmetics and skincare industry.
            </p>
            <Link href="/about">
              <Button variant="outline" className="gap-2">
                Learn More About Us
                <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Research Team Section */}
      <ResearchTeam />

      {/* Core Competencies Preview */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              Core Competencies
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Three integrated platforms driving innovation in bioactive ingredients
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {(competenciesQuery.data && competenciesQuery.data.length > 0 ? competenciesQuery.data : [
              { title: "AlphaDrug™ AI Platform", description: "Advanced molecular design using artificial intelligence" },
              { title: "Transdermal Delivery", description: "Revolutionary cTDP technology for enhanced absorption" },
              { title: "Synthetic Biology", description: "Large-scale production with GMP certification" }
            ]).map((platform, index) => (
              <Link key={index} href="/technology">
                <Card className="floating-card border-primary/20 bg-gradient-to-br from-card to-primary/5 cursor-pointer h-full">
                  <CardHeader>
                    <div className="text-5xl font-bold text-primary/20 font-[family-name:var(--font-accent)] mb-2">
                      0{index + 1}
                    </div>
                    <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                      {platform.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{platform.description}</p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      Explore <ChevronRight size={16} />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              Innovation Ingredients
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Four major product series covering core bioactive directions
            </p>
            <Link href="/products">
              <Button size="lg" className="gap-2">
                View Full Product Portfolio
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Flagship Product Highlight */}
            {flagshipProduct && (
              <Card className="md:col-span-2 border-primary/30 bg-primary/5 overflow-hidden group">
                <div className="grid md:grid-cols-3 gap-0">
                  <div className="md:col-span-1 h-64 md:h-auto overflow-hidden">
                    <img
                      src={flagshipProduct.imageUrl || "/images/collagen-molecules.jpg"}
                      alt={flagshipProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <div className="inline-block w-fit px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full mb-4 uppercase tracking-widest">
                      Flagship Innovation
                    </div>
                    <CardTitle className="text-3xl md:text-4xl font-bold mb-4 font-[family-name:var(--font-heading)]">
                      {flagshipProduct.name}
                    </CardTitle>
                    <p className="text-muted-foreground text-lg mb-8 max-w-2xl leading-relaxed">
                      {flagshipProduct.description}
                    </p>
                    <div className="flex gap-4">
                      <Link href={`/products/${flagshipProduct.slug}`}>
                        <Button className="gap-2 px-8">
                          Explore cTDP Technology
                          <ArrowRight size={18} />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {(productSeriesQuery.data && productSeriesQuery.data.length > 0 ? productSeriesQuery.data : [
              { title: "Transdermal Cyclic Peptide Series", countLabel: "3 Products", description: "Advanced peptide technology for enhanced skin penetration" },
              { title: "Recombinant Human Proteins", countLabel: "6 Products", description: "High-purity collagen and protein formulations" },
              { title: "Marine/Biomimetic Peptides", countLabel: "5 Products", description: "Ocean-derived and bio-inspired active compounds" },
              { title: "Specialty Bio-Ingredients", countLabel: "4 Products", description: "Specialized botanical and microbial extracts" }
            ]).map((series: any, index: number) => (
              <Card key={series.id || index} className="floating-card border-border/50 overflow-hidden">
                {series.imageUrl && (
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={series.imageUrl}
                      alt={series.name || series.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                        {series.name || series.title}
                      </CardTitle>
                      <p className="text-sm text-primary font-medium mt-1">{series.countLabel}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{series.description}</p>
                  <Link href={`/products?series=${encodeURIComponent(series.name || series.title)}`}>
                    <Button variant="ghost" className="gap-2 group">
                      View Series
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Applications Preview */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              Skincare Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive, scientifically-validated applications for diverse skincare needs
            </p>
            <Link href="/applications">
              <Button size="lg" variant="outline" className="gap-2">
                Explore Applications
                <ChevronRight size={20} />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Sensitive Skin Repair",
                icon: "🛡️",
                description: "Post-procedure care and chronic sensitivity solutions"
              },
              {
                title: "Anti-Aging Solutions",
                icon: "✨",
                description: "Dermal collagen reconstruction and fibroblast activation"
              },
              {
                title: "Regeneration & Repair",
                icon: "🔬",
                description: "Advanced treatment for scarring and skin texture"
              },
              {
                title: "Photoaging Protection",
                icon: "🌞",
                description: "Blue light defense and urban environment protection"
              }
            ].map((app, index) => (
              <Card key={index} className="floating-card border-border/50">
                <CardHeader>
                  <div className="text-4xl mb-3">{app.icon}</div>
                  <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                    {app.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{app.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              Global Research & Manufacturing Network
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Mellpro combines Swiss research excellence with global manufacturing capabilities to deliver premium bioactive ingredients to the international market.
            </p>
            <Link href="/collaboration">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2">
                Learn About Our Network
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
              Partner With Mellpro
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              We provide comprehensive support for brands looking to incorporate cutting-edge bioactive ingredients. From raw material supply to efficacy data and regulatory compliance.
            </p>
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Get In Touch
                <ArrowRight size={20} />
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
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/technology" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="/applications" className="hover:text-white transition-colors">Applications</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-white/70 mb-2">
                For detailed product information and collaboration inquiries
              </p>
              <Link href="/contact">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 mt-4">
                  Contact Us
                </Button>
              </Link>
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
