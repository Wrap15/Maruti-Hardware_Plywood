/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, MessageSquare, ChevronRight, X, Star, Check, Info } from "lucide-react";
import { motion } from "motion/react";
import { CATEGORIES, PRODUCTS } from "../data";
import { ProductItem } from "../types";

interface ProductSectionProps {
  initialCategoryId?: string;
}

const PROPERTY_OPTIONS = [
  { id: "all", name: "Any Material Property" },
  { id: "bwp", name: "Boiling Water Proof (BWP)", keywords: ["bwp", "boiling water", "waterproof", "water proof", "water-proof", "marine"] },
  { id: "fire", name: "Fire-Retardant (FR)", keywords: ["fire", "retardant", "firewall", "flame"] },
  { id: "scratch", name: "Scratch-Resistant", keywords: ["scratch", "abrasive", "abrasion", "wear", "stain"] },
  { id: "moisture", name: "Moisture-Resistant (MR)", keywords: ["moisture", "moisture-resistant", "mr ", "borer", "termite", "humidity"] },
  { id: "softclose", name: "Soft-Close / Hydraulic", keywords: ["soft-close", "hydraulic", "damping", "damper", "fluid-silicon", "pro-motion", "buffer", "silent"] }
];

export default function ProductSection({ initialCategoryId }: ProductSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategoryId || "all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<string>("all");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Trigger loading transition when category, search, or property changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, selectedProperty]);

  const phoneWhatsApp = "919714338379"; // default backup sales coordinate

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Filtered products list
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
      // Search query match (name or description)
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Property filter match
      let matchesProperty = true;
      if (selectedProperty !== "all") {
        const option = PROPERTY_OPTIONS.find(o => o.id === selectedProperty);
        if (option) {
          const prodNameLower = product.name.toLowerCase();
          const prodDescLower = product.description.toLowerCase();
          const specsString = product.specifications ? product.specifications.join(" ").toLowerCase() : "";
          
          matchesProperty = option.keywords.some(kw => 
            prodNameLower.includes(kw) || 
            prodDescLower.includes(kw) || 
            specsString.includes(kw)
          );
        }
      }
      
      return matchesCategory && matchesSearch && matchesProperty;
    });
  }, [selectedCategory, searchQuery, selectedProperty]);

  // Construct instant WhatsApp link
  const getWhatsAppLink = (product: ProductItem) => {
    const text = encodeURIComponent(
      `Hello Maruti Hardware & Plywood (Surat),\n\nI am interested in this product I saw on your catalog:\n- *Product:* ${product.name}\n- *Category:* ${CATEGORIES.find(c => c.id === product.categoryId)?.name || "General"}\n- *Details:* Please share pricing and bulk availability details.\n\nThank you!`
    );
    return `https://wa.me/${phoneWhatsApp}?text=${text}`;
  };

  return (
    <section className="py-12 px-6 max-w-7xl mx-auto wood-grain-overlay">
      
      {/* Intro and Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 pb-6 border-b border-stone-200/60">
        <div>
          <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">DESIGNERS' SELECTION</span>
          <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Our Premium Materials Catalog</h2>
          <p className="text-stone-500 text-xs mt-1">Calibrated wood boards, luxury handles, and high-performance kitchen assemblies</p>
        </div>

        {/* Search & Material Property Filters box */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 w-full lg:w-auto">
          
          {/* Advanced Material Property Selector Dropdown */}
          <div className="relative min-w-[190px] w-full sm:w-auto">
            <select
              value={selectedProperty}
              onChange={(e) => setSelectedProperty(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-stone-100 hover:bg-stone-200/50 border border-stone-200 rounded-lg text-xs font-bold tracking-wide text-stone-700 focus:outline-none focus:ring-1 focus:ring-walnut-500 focus:bg-white transition-all appearance-none cursor-pointer"
            >
              {PROPERTY_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))}
            </select>
            <Filter className="w-3.5 h-3.5 text-walnut-600 absolute left-3 top-3 pointer-events-none" />
            <div className="absolute right-3.5 top-3.5 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-stone-500 w-0 h-0" />
          </div>

          {/* Search Bar Widget */}
          <div className="relative w-full sm:w-64 md:w-72">
            <input
              type="text"
              placeholder="Search plywood, handles, claddings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 focus:bg-white transition-all text-neutral-800"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700 font-bold"
              >
                Clear
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Active Filter Pills if any */}
      {selectedProperty !== "all" && (
        <div className="flex flex-wrap items-center gap-2 mb-8 p-2.5 bg-stone-50 rounded-lg border border-stone-200/40 animate-fade-in">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 pl-1.5">Active Material Performance:</span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-walnut-100 text-walnut-800 rounded-md text-xs font-bold shadow-xs">
            {PROPERTY_OPTIONS.find(o => o.id === selectedProperty)?.name}
            <button
              onClick={() => setSelectedProperty("all")}
              className="text-walnut-600 hover:text-walnut-900 transition-colors p-0.5 rounded-full hover:bg-walnut-200 focus:outline-none flex items-center justify-center"
              title="Clear Property Filter"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </span>
        </div>
      )}

      {/* Grid: Filters / Sidebar Column + Product Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar Category Switchers */}
        <div className="lg:col-span-1 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-100">
            <Filter className="w-3.5 h-3.5 text-walnut-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600">Categories Filter</span>
          </div>

          <button
            onClick={() => handleCategorySelect("all")}
            className={`w-full text-left py-2 px-3.5 rounded-md text-xs font-bold tracking-wider uppercase transition-all flex justify-between items-center ${
              selectedCategory === "all"
                ? "bg-stone-900 text-white font-extrabold shadow-sm"
                : "bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/50"
            }`}
          >
            <span>All Showroom items</span>
            <span className="text-[10px] font-semibold bg-stone-200 text-stone-800 px-1.5 py-0.5 rounded-full">
              {PRODUCTS.length}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.categoryId === cat.id).length;
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`w-full text-left py-2 px-3.5 rounded-md text-xs font-bold tracking-wider uppercase transition-all flex justify-between items-center ${
                  isSel
                    ? "bg-walnut-700 text-white font-extrabold shadow-md"
                    : "bg-white hover:bg-stone-50 text-stone-500 border border-stone-200/50"
                }`}
              >
                <span className="truncate pr-2">{cat.name}</span>
                {count > 0 && (
                  <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full ${
                    isSel ? "bg-walnut-900 text-walnut-200" : "bg-stone-100 text-stone-600"
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Product Grid Column */}
        <div className="lg:col-span-3">
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div 
                  key={`product-skeleton-${idx}`}
                  className="bg-white rounded-xl border border-stone-200/60 overflow-hidden flex flex-col justify-between p-4 animate-pulse cursor-default"
                >
                  {/* Image placeholder */}
                  <div className="h-44 bg-stone-100 rounded-lg w-full mb-4" />
                  
                  {/* Meta items */}
                  <div className="space-y-3 flex-1">
                    <div className="h-3.5 bg-stone-200 rounded w-2/3" />
                    <div className="space-y-1.5 pt-1">
                      <div className="h-2.5 bg-stone-150 rounded w-full" />
                      <div className="h-2.5 bg-stone-150 rounded w-5/6" />
                    </div>
                    
                    <div className="h-2.5 bg-stone-100 rounded w-1/2 pt-4" />
                  </div>
                  
                  {/* Footer tools */}
                  <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div className="h-3 bg-stone-200 rounded w-24" />
                    <div className="h-7 w-7 bg-stone-150 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-stone-100 shadow-sm flex flex-col items-center">
              <span className="text-3xl mb-3">🔍</span>
              <p className="text-stone-700 font-bold mb-1 font-sans text-sm">No materials match your query</p>
              <p className="text-stone-400 text-xs">Try searching for other keywords like "Gurjan", "Acrylic", or "Tandem".</p>
              <button 
                onClick={() => { setSelectedCategory("all"); setSearchQuery(""); setSelectedProperty("all"); }}
                className="mt-4 px-4 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg uppercase tracking-wider"
              >
                Reset Catalog Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const cat = CATEGORIES.find(c => c.id === product.categoryId);
                return (
                  <motion.div 
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={{
                      rest: {
                        y: 0,
                        borderColor: "rgba(231, 229, 228, 0.8)", // border-stone-200/80
                        boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)" // shadow-sm
                      },
                      hover: {
                        y: -4,
                        borderColor: "#ac7e50", // walnut-500
                        boxShadow: "0 12px 30px -10px rgba(172, 126, 80, 0.25), 0 4px 12px -5px rgba(172, 126, 80, 0.15)"
                      }
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="group bg-white rounded-xl border overflow-hidden flex flex-col justify-between cursor-pointer"
                  >
                    {/* Product Image Panel */}
                    <div className="relative h-48 bg-stone-50 overflow-hidden">
                      <motion.img
                        src={product.imageUrl}
                        alt={product.name}
                        loading="lazy"
                        variants={{
                          rest: { scale: 1 },
                          hover: { scale: 1.05 }
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      {/* Category Tag */}
                      <span className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">
                        {cat?.name || "Premium"}
                      </span>

                      {/* Featured Star Block */}
                      {product.isFeatured && (
                        <span className="absolute top-3 right-3 bg-walnut-500 text-white p-1 rounded-full shadow-md animate-pulse">
                          <Star className="w-3.5 h-3.5 fill-white" />
                        </span>
                      )}
                    </div>

                    {/* Meta info bottom */}
                    <div className="p-4.5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[13px] font-bold text-stone-900 line-clamp-1 group-hover:text-walnut-700 transition">
                          {product.name}
                        </h3>
                        <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 mt-1.5">
                          {product.description}
                        </p>
                      </div>

                      {/* Specification snippet */}
                      {product.specifications && product.specifications.length > 0 && (
                        <div className="mt-3.5 pt-3 border-t border-stone-100 flex items-center gap-1.5 text-[10px] text-stone-400 font-mono">
                          <Info className="w-3 h-3 text-walnut-400 flex-shrink-0" />
                          <span className="truncate">{product.specifications[0]}</span>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="mt-4 pt-3 border-t border-stone-100/60 flex items-center justify-between text-xs font-bold text-stone-600">
                        <span className="group-hover:text-walnut-600 transition inline-flex items-center gap-1 text-[11px]">
                          View Specifications
                          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                        
                        <a
                          href={getWhatsAppLink(product)}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition"
                          title="Instant WhatsApp Enquiry"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* DETAILED SPECIFICATIONS VIEW MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in transition-all">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Header with close cross */}
            <div className="relative h-64 sm:h-80 bg-stone-100">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.name}
                loading="lazy"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-2 py-0.5 bg-walnut-600 text-white text-[9px] font-bold uppercase tracking-widest rounded mb-2 inline-block">
                  {CATEGORIES.find(c => c.id === selectedProduct.categoryId)?.name || "Premium Catalog"}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif">{selectedProduct.name}</h3>
              </div>
            </div>

            {/* Core Description */}
            <div className="p-6 sm:p-8">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-walnut-600 mb-2">Architectural Highlights</h4>
              <p className="text-stone-700 text-sm leading-relaxed mb-6">
                {selectedProduct.description}
              </p>

              {/* Specifications parameters list */}
              {selectedProduct.specifications && selectedProduct.specifications.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-stone-700 mb-3.5 flex items-center gap-1.5 pb-1 border-b border-stone-100">
                    <Check className="w-4 h-4 text-walnut-600" />
                    Technical Matrix & Parameters
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProduct.specifications.map((spec, i) => (
                      <div key={i} className="flex gap-2.5 py-1.5 px-3 bg-stone-50 rounded border border-stone-100/60 font-mono text-[11px] text-stone-600">
                        <span className="text-walnut-500 font-bold">&#8226;</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiry CTA block */}
              <div className="p-4 bg-stone-50 border border-stone-150 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h5 className="text-xs font-bold text-stone-950 font-sans">Need Pricing or Customized Dimensions?</h5>
                  <p className="text-[11px] text-stone-400 mt-0.5">We handle direct wholesale procurement and custom cutting sizes.</p>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <a
                    href={getWhatsAppLink(selectedProduct)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                  
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      // Move smoothly to contact section page
                      const contactSection = document.getElementById("contact-section");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                      } else {
                        // Switch page
                        const setPage = (window as any).setCurrentPageGlobal;
                        if (setPage) setPage("contact");
                      }
                    }}
                    className="flex-1 sm:flex-initial text-center px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition"
                  >
                    Direct Inquiry
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
