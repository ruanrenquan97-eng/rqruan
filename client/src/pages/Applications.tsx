/**
 * Applications Page - Mellpro Swiss Innovation Center
 * Detailed skincare applications and solutions
 */

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

export default function Applications() {
  const applicationsQuery = trpc.applications.listPublished.useQuery();
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
            Skincare Solutions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Comprehensive, scientifically-validated applications for diverse skincare needs
          </p>
        </div>
      </section>

      {/* Dynamic Applications List */}
      {applicationsQuery.isLoading ? (
        <div className="py-24 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        applicationsQuery.data?.map((app, index) => (
          <section key={app.id} className={`py-24 ${index % 2 === 1 ? 'bg-muted/30 diagonal-divider' : 'bg-background'}`}>
            <div className="container">
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                <div className={`relative ${index % 2 === 1 ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                  {index % 2 === 1 ? (
                    <>
                      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 aspect-square flex items-center justify-center">
                        <div className="text-6xl">{app.icon || "✨"}</div>
                      </div>
                      <div className="absolute -top-6 -left-6 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
                    </>
                  ) : (
                    <>
                      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 aspect-square flex items-center justify-center">
                        <div className="text-6xl">{app.icon || "🛡️"}</div>
                      </div>
                      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
                    </>
                  )}
                </div>

                <div className={`${index % 2 === 1 ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                  <div className={`inline-block px-4 py-1.5 ${index % 2 === 1 ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'} rounded-full text-sm font-medium mb-4`}>
                    Solution
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                    {app.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {app.description}
                  </p>

                  {/* Dynamic HTML Content for Lists */}
                  {app.content && (
                    <div dangerouslySetInnerHTML={{ __html: app.content }} />
                  )}

                  <Link href="/contact">
                    <Button>Learn More</Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))
      )}

      {/* Formulation Support */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Comprehensive Formulation Support
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Technical Consultation",
                description: "Expert guidance on ingredient selection, dosage optimization, and formulation compatibility"
              },
              {
                title: "Stability Testing",
                description: "Comprehensive stability studies to ensure product shelf-life and efficacy maintenance"
              },
              {
                title: "Efficacy Data",
                description: "Clinical study data and in-vitro testing results to support marketing claims"
              },
              {
                title: "Regulatory Support",
                description: "INCI nomenclature, safety documentation, and compliance with international standards"
              },
              {
                title: "Customization",
                description: "Custom formulations tailored to your specific brand requirements and target market"
              },
              {
                title: "Scale-Up Support",
                description: "Seamless transition from laboratory to commercial production with quality assurance"
              }
            ].map((service, index) => (
              <Card key={index} className="floating-card border-border/50">
                <CardHeader>
                  <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Proven Results
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Anti-Aging Serum",
                result: "350% Collagen Increase",
                timeframe: "8 weeks"
              },
              {
                title: "Repair Cream",
                result: "40% Scar Improvement",
                timeframe: "12 weeks"
              },
              {
                title: "Sensitive Care",
                result: "85% Redness Reduction",
                timeframe: "4 weeks"
              }
            ].map((study, index) => (
              <Card key={index} className="floating-card border-primary/20 bg-gradient-to-br from-card to-primary/5">
                <CardHeader>
                  <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                    {study.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-primary font-[family-name:var(--font-accent)] mb-2">
                      {study.result}
                    </div>
                    <p className="text-sm text-muted-foreground">in {study.timeframe}</p>
                  </div>
                  <Link href="/contact">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </Link>
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
              Ready to Develop Your Solution?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our technical team is ready to help you create the perfect formulation for your skincare needs.
            </p>
            <Link href="/contact">
              <Button size="lg">Request Consultation</Button>
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
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
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
