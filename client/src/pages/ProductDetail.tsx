/**
 * Product Detail Page - Mellpro Swiss Innovation Center
 * Detailed product view
 */

import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { Link, useParams } from "wouter";
import { trpc } from "@/lib/trpc";

export default function ProductDetail() {
    const params = useParams();
    const slug = params.slug as string;

    const productQuery = trpc.products.getBySlug.useQuery({ slug });
    const product = productQuery.data;

    if (productQuery.isLoading) {
        return (
            <div className="min-h-screen">
                <Navigation />
                <div className="flex justify-center items-center h-screen">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen">
                <Navigation />
                <div className="container py-24 text-center">
                    <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
                    <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
                    <Link href="/products">
                        <Button>Back to Products</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navigation />

            {/* Hero Image */}
            <section className="relative h-96 overflow-hidden pt-20">
                <img
                    src={product.imageUrl || "/images/collagen-molecules.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </section>

            {/* Product Content */}
            <section className="py-16 bg-background">
                <div className="container max-w-4xl">
                    {/* Back Button */}
                    <Link href="/products" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
                        <ArrowLeft size={20} />
                        Back to Products
                    </Link>

                    {/* Product Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                {product.series}
                            </span>
                        </div>
                        <h1 className="text-5xl font-bold text-foreground mb-4 font-[family-name:var(--font-heading)]">
                            {product.name}
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    {/* Product Body */}
                    <div className="prose prose-invert max-w-none mb-12">
                        <div className="bg-muted/30 p-8 rounded-2xl mb-8 border border-muted">
                            <h3 className="text-xl font-semibold mb-4 text-foreground">Product Highlights</h3>
                            <div dangerouslySetInnerHTML={{ __html: product.content || "" }} className="text-muted-foreground space-y-2" />
                        </div>

                        {/* Optional Specifications Section if exists */}
                        {product.specifications && (
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-foreground mb-4">Specifications</h3>
                                <div dangerouslySetInnerHTML={{ __html: product.specifications }} className="text-muted-foreground" />
                            </div>
                        )}

                        {/* Optional INCI if exists */}
                        {product.inci && (
                            <div className="mb-8">
                                <h3 className="text-2xl font-bold text-foreground mb-4">INCI Name</h3>
                                <p className="text-muted-foreground">{product.inci}</p>
                            </div>
                        )}
                    </div>

                    {/* Action Area */}
                    <div className="flex gap-4 border-t border-border pt-8">
                        <Link href="/contact">
                            <Button size="lg">Request Data Sheet</Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg">Contact Sales</Button>
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
                                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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
