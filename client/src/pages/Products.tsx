import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Products() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const selectedSeries = searchParams.get("series");

  const productsQuery = trpc.products.listPublished.useQuery();
  const products = productsQuery.data || [];

  const seriesQuery = trpc.productSeries.listAll.useQuery();
  const seriesList = seriesQuery.data || [];

  const getSeriesProducts = (seriesName: string) => {
    return products.filter(p => p.series === seriesName);
  };

  const getSeriesImage = (seriesName: string, fallback: string) => {
    // Normalize string for comparison (trim and lowercase)
    const normalize = (s: string) => s.trim().toLowerCase();
    const targetedName = normalize(seriesName);

    // Debug log to help troubleshoot
    console.log("Looking for series:", targetedName);
    console.log("Available series:", seriesList.map(s => s.name));

    const series = seriesList.find(s => normalize(s.name) === targetedName || normalize(s.name).includes(targetedName) || targetedName.includes(normalize(s.name)));
    return series?.imageUrl || fallback;
  };

  const shouldShowSeries = (seriesName: string) => {
    return !selectedSeries || selectedSeries === seriesName;
  };

  const series1 = getSeriesProducts("Transdermal Cyclic Peptide Series");
  const series2 = getSeriesProducts("Recombinant Human Proteins");
  const series3 = getSeriesProducts("Marine & Biomimetic Peptides");
  const series4 = getSeriesProducts("Specialty Bio-Ingredients");

  // Fallbacks for display if no data (though seed guaranteed data)
  const renderProductList = (items: any[]) => {
    if (items.length === 0) return <p className="text-muted-foreground">No products available in this series.</p>;
    return (
      <ul className="space-y-2 text-muted-foreground">
        {items.map((item, idx) => (
          <li key={idx}>
            <Link href={`/products/${item.slug}`} className="hover:text-primary transition-colors cursor-pointer">
              • {item.name}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  if (productsQuery.isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-heading)]">
            Product Portfolio
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Four major product series covering core bioactive directions, balancing innovation with scalability
          </p>
        </div>
      </section>

      {/* Product Series 1 */}
      {shouldShowSeries("Transdermal Cyclic Peptide Series") && (
        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                  Transdermal Cyclic Peptide Series
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our flagship product line leveraging proprietary cTDP technology for enhanced skin penetration and cellular-level efficacy.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-3">Products</h3>
                    {renderProductList(series1)}
                  </div>

                  <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                    <h3 className="font-semibold text-foreground mb-3">Key Benefits</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 10x enhanced absorption</li>
                      <li>• Cellular-level anti-aging</li>
                      <li>• Reversible transdermal delivery</li>
                      <li>• Clinically validated efficacy</li>
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <Button>Request Technical Data</Button>
                </Link>
              </div>

              <div className="relative">
                <img
                  src={getSeriesImage("Transdermal Cyclic Peptide Series", "/images/collagen-molecules.jpg")}
                  alt="Cyclic Peptide"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Series 2 */}
      {shouldShowSeries("Recombinant Human Proteins") && (
        <section className="py-24 bg-muted/30 diagonal-divider">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative order-2 lg:order-1">
                <img
                  src={series2[0]?.imageUrl || "/images/innovation-abstract.jpg"}
                  alt="Recombinant Proteins"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                  Recombinant Human Proteins
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  High-purity recombinant proteins produced through advanced synthetic biology, providing stable and consistent formulations for premium skincare.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-3">Products</h3>
                    {renderProductList(series2)}
                  </div>

                  <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                    <h3 className="font-semibold text-foreground mb-3">Applications</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Anti-aging and wrinkle reduction</li>
                      <li>• Skin firmness and elasticity</li>
                      <li>• Post-procedure recovery</li>
                      <li>• Dermal regeneration</li>
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <Button>Request Technical Data</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Series 3 */}
      {shouldShowSeries("Marine & Biomimetic Peptides") && (
        <section className="py-24 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                  Marine & Biomimetic Peptides
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Ocean-derived and bio-inspired active compounds offering unique functional properties for specialized skincare applications.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-3">Products</h3>
                    {renderProductList(series3)}
                  </div>

                  <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                    <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Natural bioactive compounds</li>
                      <li>• Sustainable sourcing</li>
                      <li>• Unique functional properties</li>
                      <li>• Eco-friendly formulations</li>
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <Button>Request Technical Data</Button>
                </Link>
              </div>

              <div className="relative">
                <img
                  src={series3[0]?.imageUrl || "/images/page-17.png"}
                  alt="Marine Peptides"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Series 4 */}
      {shouldShowSeries("Specialty Bio-Ingredients") && (
        <section className="py-24 bg-muted/30 diagonal-divider">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative order-2 lg:order-1">
                <img
                  src={series4[0]?.imageUrl || "/images/page-18.png"}
                  alt="Bio-Ingredients"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                  Specialty Bio-Ingredients
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Specialized botanical and microbial extracts providing unique functional properties and sustainable skincare solutions.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <h3 className="font-semibold text-foreground mb-3">Products</h3>
                    {renderProductList(series4)}
                  </div>

                  <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                    <h3 className="font-semibold text-foreground mb-3">Applications</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Hydration and moisture retention</li>
                      <li>• Antioxidant protection</li>
                      <li>• Skin brightening</li>
                      <li>• Nutritional support</li>
                    </ul>
                  </div>
                </div>

                <Link href="/contact">
                  <Button>Request Technical Data</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Product Comparison */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Product Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Product Series</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Absorption</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Efficacy</th>
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Applications</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    series: "Cyclic Peptides",
                    absorption: "10x Enhanced",
                    efficacy: "Cellular-level",
                    applications: "Anti-aging, Regeneration"
                  },
                  {
                    series: "Recombinant Proteins",
                    absorption: "High",
                    efficacy: "Structural support",
                    applications: "Collagen synthesis, Elasticity"
                  },
                  {
                    series: "Marine Peptides",
                    absorption: "Moderate-High",
                    efficacy: "Bioactive compounds",
                    applications: "Hydration, Repair"
                  },
                  {
                    series: "Bio-Ingredients",
                    absorption: "Moderate",
                    efficacy: "Nutritional",
                    applications: "Brightening, Protection"
                  }
                ].map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 text-foreground font-medium">{row.series}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.absorption}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.efficacy}</td>
                    <td className="py-4 px-4 text-muted-foreground">{row.applications}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Quality & Compliance
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "GMP Certified",
                description: "All products manufactured in GMP-certified facilities with strict quality control"
              },
              {
                title: "Regulatory Compliant",
                description: "Full compliance with INCI nomenclature and international cosmetic regulations"
              },
              {
                title: "Scientifically Validated",
                description: "Backed by 50+ global academic research studies and clinical trials"
              }
            ].map((item, index) => (
              <Card key={index} className="floating-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
              Find the Perfect Ingredient for Your Brand
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our technical team is ready to help you select and customize products for your specific skincare needs.
            </p>
            <Link href="/contact">
              <Button size="lg">Request Product Information</Button>
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
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/technology" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link href="/applications" className="hover:text-white transition-colors">Applications</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-white/70 mb-2">
                For product information and collaboration inquiries
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
