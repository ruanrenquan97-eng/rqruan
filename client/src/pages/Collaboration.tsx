/**
 * Collaboration Page - Mellpro Swiss Innovation Center
 * Global research and manufacturing network
 */

import { Building2, Users, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";

export default function Collaboration() {
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
            Global Research & Manufacturing Network
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Combining Swiss research excellence with global manufacturing capabilities
          </p>
        </div>
      </section>

      {/* Network Overview */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 font-[family-name:var(--font-heading)]">
                Mellpro Swiss Innovation Center
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Mellpro combines Swiss research excellence with global manufacturing capabilities to deliver premium bioactive ingredients to the international market.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our integrated approach ensures that every innovation moves seamlessly from laboratory discovery to commercial production, maintaining the highest standards of quality and efficacy throughout.
              </p>
              
              <div className="space-y-4">
                {[
                  "Swiss-led research and development",
                  "Global manufacturing network",
                  "Integrated quality assurance",
                  "International regulatory compliance"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/images/swiss-alps-lab.jpg" 
                alt="Global Network" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Swiss Research Center */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Swiss Research Center
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="floating-card border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="text-primary" size={24} />
                </div>
                <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                  Research Facilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• 4,600㎡ advanced research center</li>
                  <li>• State-of-the-art laboratories</li>
                  <li>• Molecular design facilities</li>
                  <li>• Clinical testing capabilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="floating-card border-primary/20 bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="text-primary" size={24} />
                </div>
                <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                  Expert Team
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Leading Swiss scientists</li>
                  <li>• International researchers</li>
                  <li>• PhD-level expertise</li>
                  <li>• 50+ years combined experience</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              Research Responsibilities
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ European innovation and R&D leadership</li>
              <li>✓ Mechanism verification and validation</li>
              <li>✓ Human efficacy study design</li>
              <li>✓ Clinical trial coordination</li>
              <li>✓ Regulatory strategy development</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Global Manufacturing */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Global Manufacturing Network
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="floating-card border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Globe className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                  Production Capacity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• GMP-certified manufacturing</li>
                  <li>• 7 fermentation tanks</li>
                  <li>• 5-ton total capacity</li>
                  <li>• Advanced purification systems</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="floating-card border-secondary/20 bg-gradient-to-br from-card to-secondary/5">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Award className="text-secondary" size={24} />
                </div>
                <CardTitle className="text-2xl font-[family-name:var(--font-heading)]">
                  Quality Standards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• GMP compliance</li>
                  <li>• ISO certification</li>
                  <li>• Regulatory approval</li>
                  <li>• Quality control protocols</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-2xl p-8 border border-secondary/20">
            <h3 className="text-2xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
              Manufacturing Responsibilities
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>✓ Industrial-scale production</li>
              <li>✓ Process optimization and scale-up</li>
              <li>✓ Quality assurance and testing</li>
              <li>✓ Supply chain management</li>
              <li>✓ Delivery and logistics</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Research Partners */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Global Research Excellence
          </h2>

          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Our research team comprises leading scientists and experts from prestigious institutions worldwide, bringing together diverse perspectives and cutting-edge knowledge in biotechnology, dermatology, and pharmaceutical sciences.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "University of Zurich (Switzerland)",
              "Stanford University (USA)",
              "University of Science and Technology of China",
              "Imperial College London (UK)",
              "French Engineering Schools",
              "Leading International Research Institutes"
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
      </section>

      {/* Integrated Process */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Integrated Innovation Process
          </h2>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Discovery & Research",
                  description: "Swiss research center leads molecular design and mechanism research using AI and advanced biotechnology"
                },
                {
                  step: "2",
                  title: "Validation & Testing",
                  description: "Comprehensive efficacy studies and clinical trials to validate safety and performance"
                },
                {
                  step: "3",
                  title: "Process Development",
                  description: "Optimization of production methods for scalability and consistency"
                },
                {
                  step: "4",
                  title: "Manufacturing Scale-Up",
                  description: "Global manufacturing network produces ingredients at commercial scale with GMP standards"
                },
                {
                  step: "5",
                  title: "Quality Assurance",
                  description: "Rigorous testing and quality control ensures every batch meets international standards"
                },
                {
                  step: "6",
                  title: "Market Delivery",
                  description: "Reliable supply to brands worldwide with comprehensive technical support"
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-foreground mb-2 font-[family-name:var(--font-heading)]">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
              Partner With Our Global Network
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Benefit from Swiss research excellence combined with global manufacturing capabilities
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Start Collaboration
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
                <li><Link href="/technology" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-white/70 mb-2">
                For collaboration inquiries
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
