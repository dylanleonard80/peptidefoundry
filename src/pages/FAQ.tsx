import React, { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle } from "lucide-react";
import {
  faqCategories,
  faqItems,
  searchFAQs,
  generateFAQSchema,
  type FAQCategory,
} from "@/data/faqData";
import { cn } from "@/lib/utils";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("all");

  const filteredFAQs = useMemo(() => {
    return searchFAQs(searchQuery, activeCategory);
  }, [searchQuery, activeCategory]);

  const faqSchema = useMemo(() => {
    return generateFAQSchema(faqItems);
  }, []);

  // Set document title and inject JSON-LD schema
  useEffect(() => {
    document.title = "FAQ | Peptide Foundry";

    // Inject JSON-LD structured data for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "faq-schema";
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById("faq-schema");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [faqSchema]);

  // Reset to "all" category when searching
  useEffect(() => {
    if (searchQuery && activeCategory !== "all") {
      setActiveCategory("all");
    }
  }, [searchQuery]);

  const getCategoryCount = (category: FAQCategory): number => {
    if (category === "all") return faqItems.length;
    return faqItems.filter((item) => item.category === category).length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <HelpCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Find answers to common questions about our research peptides,
                  ordering process, shipping, and more.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto mb-10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base bg-card border-border/50 focus-visible:ring-primary/20"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Tabs */}
              <div className="flex flex-wrap justify-center gap-2 mb-10">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery("");
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      activeCategory === category.id
                        ? "bg-primary text-white shadow-md"
                        : "bg-card hover:bg-secondary/50 text-muted-foreground hover:text-foreground border border-border/50"
                    )}
                  >
                    {category.label}
                    <span className="ml-1.5 text-xs opacity-70">
                      ({getCategoryCount(category.id)})
                    </span>
                  </button>
                ))}
              </div>

              {/* Results Count */}
              {searchQuery && (
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {filteredFAQs.length} result{filteredFAQs.length !== 1 ? "s" : ""} found
                  for "{searchQuery}"
                </p>
              )}

              {/* FAQ Accordion */}
              <div className="bg-card rounded-2xl border shadow-sm p-6 sm:p-8">
                {filteredFAQs.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-3">
                    {filteredFAQs.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg px-4 bg-background/50 data-[state=open]:bg-background data-[state=open]:shadow-sm transition-all"
                      >
                        <AccordionTrigger className="hover:no-underline py-5 text-left">
                          <span className="font-medium text-foreground pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 pb-5 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-12">
                    <HelpCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No questions found matching your search.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setActiveCategory("all");
                      }}
                      className="mt-4 text-primary hover:underline text-sm"
                    >
                      View all questions
                    </button>
                  </div>
                )}
              </div>

              {/* Contact CTA */}
              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Can't find what you're looking for?
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-md hover:shadow-lg"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
