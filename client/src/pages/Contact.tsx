/**
 * Contact Page - Mellpro Swiss Innovation Center
 * Contact information and inquiry form
 */

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    country: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send to a backend
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry. We will contact you shortly.");
    setFormData({ name: "", email: "", company: "", country: "", subject: "", message: "" });
  };

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
            Get In Touch
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            We're here to help with product inquiries, technical support, and collaboration opportunities
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="floating-card border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">For product inquiries and technical support</p>
                <a href="mailto:info@mellpro.ch" className="text-primary font-medium hover:underline">
                  info@mellpro.ch
                </a>
              </CardContent>
            </Card>

            <Card className="floating-card border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Phone className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Business hours: Mon-Fri 9:00-17:00 CET</p>
                <a href="tel:+41443334455" className="text-primary font-medium hover:underline">
                  +41 44 333 4455
                </a>
              </CardContent>
            </Card>

            <Card className="floating-card border-border/50">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="text-primary" size={24} />
                </div>
                <CardTitle className="text-xl font-[family-name:var(--font-heading)]">
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Mellpro Swiss Innovation Center<br />
                  Zurich, Switzerland
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 bg-muted/30 diagonal-divider">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
                Send Us a Message
              </h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you as soon as possible
              </p>
            </div>

            <Card className="border-border/50">
              <CardContent className="pt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Your country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select a subject</option>
                      <option value="product">Product Inquiry</option>
                      <option value="technical">Technical Support</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="sample">Sample Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Tell us about your inquiry..."
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="privacy"
                      required
                      className="w-4 h-4 rounded border-border"
                    />
                    <label htmlFor="privacy" className="text-sm text-muted-foreground">
                      I agree to the privacy policy and terms of service
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2">
                    Send Message
                    <Send size={20} />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-4xl font-bold text-foreground mb-16 text-center font-[family-name:var(--font-heading)]">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "What is the minimum order quantity?",
                answer: "Our minimum order quantity varies depending on the product. Please contact our sales team for specific information about your desired product."
              },
              {
                question: "Do you offer custom formulations?",
                answer: "Yes, we provide comprehensive custom formulation services tailored to your specific brand requirements and target market."
              },
              {
                question: "What are your delivery timeframes?",
                answer: "Standard delivery is typically 4-6 weeks from order confirmation. Expedited delivery options are available upon request."
              },
              {
                question: "Do you provide technical documentation?",
                answer: "Yes, we provide complete technical data sheets, INCI nomenclature, safety documentation, and regulatory compliance information for all products."
              },
              {
                question: "Can you support clinical studies?",
                answer: "Absolutely. We can provide efficacy data, conduct custom clinical studies, and support your regulatory submissions."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-[family-name:var(--font-heading)]">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
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
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="/technology" className="hover:text-white transition-colors">Technology</a></li>
                <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
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
