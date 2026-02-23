/**
 * About Page - Mellpro Swiss Innovation Center
 * Detailed company information, mission, and facilities
 */

import { Building2, Users, Award, Microscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

export default function About() {
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
            About Mellpro
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            A leading Swiss biotechnology enterprise specializing in advanced biological transdermal technology and green synthetic biological manufacturing.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                Who We Are
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Mellpro Swiss Innovation Center is a leading biotechnology enterprise specializing in advanced biological transdermal technology and green synthetic biological manufacturing. We focus on the development, manufacturing, and comprehensive solution delivery of novel bioactive functional materials for the cosmetics and skincare industry.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Based in Switzerland, we combine Swiss precision and innovation excellence with global manufacturing capabilities to deliver scientifically validated ingredients that transform skincare efficacy.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-4xl font-bold text-primary font-[family-name:var(--font-accent)] mb-2">50+</div>
                  <div className="text-sm text-muted-foreground">Patents & Innovations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary font-[family-name:var(--font-accent)] mb-2">10x</div>
                  <div className="text-sm text-muted-foreground">Enhanced Absorption</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/swiss-alps-lab.jpg"
                alt="Mellpro Innovation Center"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
              <div className="absolute -top-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To develop and deliver cutting-edge bioactive ingredients that revolutionize skincare efficacy through advanced transdermal technology and sustainable biological manufacturing practices.
                </p>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
              <CardHeader>
                <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To be the global leader in biological transdermal delivery technology, enabling brands worldwide to create premium skincare products with superior efficacy and safety.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-24 bg-background diagonal-divider">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            What We Do
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Microscope,
                title: "Research Focus",
                description: "We specialize in skin anti-aging molecules, marine bioactive compounds, and characteristic plant resources to create innovative skincare solutions."
              },
              {
                icon: Award,
                title: "Unique Technology",
                description: "We have developed globally pioneering third-generation biological transdermal technology for enhanced ingredient absorption."
              },
              {
                icon: Users,
                title: "AI-Driven Innovation",
                description: "Leveraging artificial intelligence for molecular design, synthetic biology, and genetic engineering as core technical capabilities."
              },
              {
                icon: Building2,
                title: "Sustainable Development",
                description: "We achieve green development and industrialization of bioactive resources including proteins, peptides, and plant extracts."
              }
            ].map((item, index) => (
              <Card key={index} className="floating-card border-border/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="text-primary" size={24} />
                  </div>
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

      {/* Facilities */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            State-of-the-Art Facilities
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                number: "4,600",
                unit: "㎡",
                title: "Research Facility",
                description: "Advanced biotechnology research and development center"
              },
              {
                number: "7",
                unit: "Tanks",
                title: "GMP Cell Factory",
                description: "Fermentation capacity with 5-ton total volume"
              },
              {
                number: "2,000",
                unit: "㎡",
                title: "Formulation Platform",
                description: "Freeze-drying and emulsification production lines"
              }
            ].map((facility, index) => (
              <Card key={index} className="floating-card text-center border-border/50">
                <CardHeader>
                  <div className="text-5xl font-bold text-primary font-[family-name:var(--font-accent)] mb-2">
                    {facility.number}<span className="text-2xl">{facility.unit}</span>
                  </div>
                  <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                    {facility.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{facility.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <p className="text-lg text-foreground leading-relaxed">
              Our integrated facility enables us to execute the complete industrial chain from "molecular design → process development → efficacy verification → raw material production → finished product" with precision and quality control at every stage.
            </p>
          </div>
        </div>
      </section>

      {/* Research Team */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Global Research Excellence
          </h2>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-12 text-center leading-relaxed">
              Our research team comprises leading scientists and experts from prestigious institutions worldwide, bringing together diverse perspectives and cutting-edge knowledge in biotechnology, dermatology, and pharmaceutical sciences.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                "University of Zurich (Switzerland)",
                "Stanford University (USA)",
                "University of Science and Technology of China",
                "Imperial College London (UK)",
                "French Engineering Schools",
                "Leading Research Institutes"
              ].map((institution, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3">
                      <Award className="text-primary" size={24} />
                      <span className="text-foreground font-medium">{institution}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & Recognition */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Certifications & Recognition
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                  Quality Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Award className="text-primary" size={20} />
                    <span>GMP Certified Manufacturing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="text-primary" size={20} />
                    <span>ISO Quality Management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="text-primary" size={20} />
                    <span>Regulatory Compliance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                  Scientific Achievement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Award className="text-primary" size={20} />
                    <span>50+ Granted Patents</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="text-primary" size={20} />
                    <span>10+ International Publications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="text-primary" size={20} />
                    <span>6+ Research Grants</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
              Ready to Collaborate?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Discover how Mellpro can support your brand with cutting-edge bioactive ingredients and comprehensive technical expertise.
            </p>
            <Link href="/contact">
              <Button size="lg">Get In Touch</Button>
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
                <li><Link href="/technology" className="hover:text-white transition-colors">Technology</Link></li>
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
