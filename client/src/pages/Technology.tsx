/**
 * Technology Page - Mellpro Swiss Innovation Center
 * Detailed information about three core technology platforms
 */

import { ChevronRight, Zap, Microscope, Beaker } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

export default function Technology() {
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
            Technology Platform
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Three integrated platforms transforming complex scientific research into stable, replicable, and verifiable application solutions.
          </p>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              Three Core Technology Platforms
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Built around active ingredient design, biological transdermal delivery, and industrial manufacturing
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                number: "01",
                icon: Microscope,
                title: "AlphaDrug™ AI Platform",
                description: "AI-driven deep learning for efficient screening and optimization of active molecules and functional ingredients",
                features: [
                  "Molecular design and mechanism research",
                  "Molecular/cellular level design",
                  "High-throughput screening",
                  "Supports core transdermal technology iteration"
                ]
              },
              {
                number: "02",
                icon: Zap,
                title: "Transdermal Delivery",
                description: "Revolutionary cTDP (Cyclic Transdermal Peptide) technology representing a breakthrough in skincare delivery",
                features: [
                  "10x enhanced absorption for large molecules",
                  "5-minute channel opening, 30-minute closure",
                  "Reversible and non-damaging process",
                  "Cellular-level anti-aging effects"
                ]
              },
              {
                number: "03",
                icon: Beaker,
                title: "Synthetic Biology",
                description: "Large-scale production from strain construction to purification and preparation with complete closed-loop capability",
                features: [
                  "GMP cell factory with 7 fermentation tanks",
                  "5-ton total capacity",
                  "Complete closed-loop from design to delivery",
                  "Industrial-scale production"
                ]
              }
            ].map((platform, index) => (
              <Card key={index} className="floating-card border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <platform.icon className="text-primary" size={24} />
                    </div>
                    <div className="text-4xl font-bold text-primary/20 font-[family-name:var(--font-accent)]">
                      {platform.number}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-[family-name:var(--font-heading)] mb-2">
                    {platform.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AlphaDrug™ Detailed */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                AlphaDrug™ AI Molecular Design Platform
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our proprietary AI platform leverages deep learning algorithms to accelerate the discovery and optimization of bioactive molecules. By combining computational intelligence with biological knowledge, we achieve unprecedented efficiency in identifying promising compounds.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "AI deep learning for high-throughput screening",
                  "Molecular design at cellular level",
                  "Mechanism research and validation",
                  "Integration with transdermal technology"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact">
                <Button>Learn More</Button>
              </Link>
            </div>
            <div className="relative">
              <img
                src="/images/innovation-abstract.jpg"
                alt="AI Molecular Design"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* cTDP Technology Detailed */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <img
                src="/images/collagen-molecules.jpg"
                alt="Transdermal Delivery"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                cTDP: Revolutionary Transdermal Delivery
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Our proprietary Cyclic Transdermal Peptide (cTDP) technology represents a breakthrough in bioactive ingredient delivery. Unlike traditional methods, cTDP opens reversible channels in the skin, allowing large molecules to penetrate effectively without damage.
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <h3 className="font-semibold text-foreground mb-2">Key Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 10x enhanced absorption for molecules up to 150kDa</li>
                    <li>• Opens skin channels in 5 minutes, closes in 30 minutes</li>
                    <li>• Reversible and non-damaging process</li>
                    <li>• "Key-lock" mechanism for targeted delivery</li>
                  </ul>
                </div>

                <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                  <h3 className="font-semibold text-foreground mb-2">Cellular Effects</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Promotes Type I collagen (↑350.78%)</li>
                    <li>• Promotes Type IV collagen (↑336.90%)</li>
                    <li>• Promotes elastin (↑380.46%)</li>
                    <li>• Validated by 50+ global academic studies</li>
                  </ul>
                </div>
              </div>

              <Link href="/contact">
                <Button>Explore cTDP Applications</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Synthetic Biology */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-12 text-center font-[family-name:var(--font-heading)]">
            Synthetic Biology Manufacturing
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "Strain Construction",
                description: "Advanced genetic engineering to develop optimized production strains",
                icon: "🧬"
              },
              {
                title: "Fermentation Scale-Up",
                description: "GMP-certified fermentation with 7 tanks and 5-ton total capacity",
                icon: "⚗️"
              },
              {
                title: "Purification & Preparation",
                description: "Complete closed-loop from laboratory to industrial production",
                icon: "🔬"
              }
            ].map((step, index) => (
              <Card key={index} className="floating-card border-border/50">
                <CardHeader>
                  <div className="text-5xl mb-4">{step.icon}</div>
                  <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden">
            <img
              src="/images/technology-bg.jpg"
              alt="Manufacturing Facility"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex items-center">
              <div className="container">
                <div className="max-w-xl text-white">
                  <h3 className="text-3xl font-bold mb-4 font-[family-name:var(--font-heading)]">
                    State-of-the-Art Facility
                  </h3>
                  <p className="text-lg mb-6 text-white/90">
                    4,600㎡ research facility with GMP cell factory and 2,000㎡ formulation platform
                  </p>
                  <Link href="/about">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10">
                      View Facilities
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Advantages */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Why Our Technology Matters
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                title: "Superior Efficacy",
                description: "cTDP technology enables large bioactive molecules to reach deeper skin layers, delivering 10x enhanced absorption compared to conventional methods."
              },
              {
                title: "Safety & Reversibility",
                description: "Our transdermal channels are reversible and non-damaging, closing within 30 minutes without compromising skin barrier integrity."
              },
              {
                title: "Scientific Validation",
                description: "All technologies are supported by 50+ global academic research studies and multiple international patents."
              },
              {
                title: "Scalable Production",
                description: "From laboratory discovery to industrial-scale manufacturing, our synthetic biology platform ensures consistent quality and reliability."
              }
            ].map((advantage, index) => (
              <Card key={index} className="floating-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                    {advantage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-heading)]">
              Ready to Integrate Our Technology?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Discover how our advanced platforms can enhance your skincare products with superior efficacy and safety.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get In Touch
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
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
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
