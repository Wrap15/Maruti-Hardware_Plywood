/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, MessageSquare, ZoomIn, Eye, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { GALLERY_ITEMS } from "../data";
import { GalleryItem } from "../types";

export default function GalleryView() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Trigger loading effect when category changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 550);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  const phoneWhatsApp = "919714338379"; // backup contact

  // Pick unique categories dynamically
  const categoriesList = useMemo(() => {
    const list = new Set<string>();
    GALLERY_ITEMS.forEach(item => list.add(item.category));
    return ["All", ...Array.from(list)];
  }, []);

  // Filter gallery items
  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Handle slide switching
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1;
    setLightboxIndex(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1;
    setLightboxIndex(nextIndex);
  };

  // Precomposed WhatsApp link for specified design
  const getWhatsAppLink = (item: GalleryItem) => {
    const text = encodeURIComponent(
      `Hello Maruti Hardware,\n\nI saw this gorgeous interior installation in your site gallery:\n- *Title:* ${item.title}\n- *Type:* ${item.category}\n- *Enquiry:* Can you supply the specific plywood, laminates, or custom drawer hardware used to build this look?\n\nThank you!`
    );
    return `https://wa.me/${phoneWhatsApp}?text=${text}`;
  };

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto wood-grain-overlay">
      
      {/* Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">FINISHED WORKSPACES</span>
        <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Our Material Showcase Gallery</h2>
        <p className="text-stone-500 text-xs mt-2.5 leading-relaxed">
          See how our laminates, PVC fluted panels, luxury brass locks, and calibrated moisture-proof plywood perform in real luxury duplexes, corporate offices, and modern kitchens across Surat.
        </p>
      </div>

      {/* Categories tag navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categoriesList.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
              activeCategory === cat
                ? "bg-walnut-700 text-white shadow-md font-extraboldScale"
                : "bg-stone-100 hover:bg-stone-200 text-stone-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={`gallery-skeleton-${idx}`}
              className="relative bg-stone-50 rounded-xl overflow-hidden aspect-[4/3] border border-stone-200/60 flex flex-col justify-between p-5 animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-stone-200 rounded" />
                <div className="h-3 w-10 bg-stone-100 rounded" />
              </div>
              <div className="space-y-2.5">
                <div className="h-3.5 w-3/4 bg-stone-200 rounded" />
                <div className="h-2.5 w-1/2 bg-stone-150 rounded" />
              </div>
            </div>
          ))
        ) : (
          filteredItems.map((item, index) => {
            return (
              <motion.div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-stone-100 rounded-xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl"
                whileHover={{
                  scale: 1.025,
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                whileTap={{
                  scale: 0.985,
                  y: 0,
                  transition: { type: "spring", stiffness: 450, damping: 20 }
                }}
              >
                {/* Product Layout Image */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Glass details overlay */}
                <div className="absolute inset-0 bg-stone-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] px-2 py-0.5 bg-walnut-600 text-white rounded font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                    
                    {item.isProject && (
                      <span className="flex items-center gap-1 text-[9px] text-walnut-300 font-bold uppercase tracking-wider">
                        <Briefcase className="w-3 h-3" /> Project
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold tracking-wide mb-1 leading-snug">{item.title}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-stone-300 font-mono mt-2 pt-2 border-t border-white/10">
                      <Eye className="w-3.5 h-3.5 text-walnut-400" />
                      <span>Click to Zoom</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* DYNAMIC LIGHTBOX OVERLAY */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex flex-col items-center justify-center p-4 select-none animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Top control bar */}
          <div className="absolute top-4 inset-x-4 flex justify-between items-center text-white p-2">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-walnut-400 font-mono">
                {filteredItems[lightboxIndex].category}
              </span>
              <h4 className="text-sm font-bold font-serif">{filteredItems[lightboxIndex].title}</h4>
            </div>

            <button 
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Slider Core Container */}
          <div className="relative w-full max-w-4xl max-h-[70vh] flex items-center justify-center">
            
            {/* Left selector */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-white transition z-10"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Picture box */}
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].title}
              loading="lazy"
              className="max-w-full max-h-[60vh] object-contain rounded-lg border border-stone-800"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />

            {/* Right selector */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-full bg-stone-800/80 hover:bg-stone-700/80 text-white transition z-10"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
          </div>

          {/* Bottom Action / Inquiry Panel */}
          <div 
            className="mt-6 p-4 bg-stone-900 border border-stone-800 rounded-xl max-w-md w-full text-center flex flex-col items-center gap-3.5"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-stone-300 text-xs leading-relaxed">
              Want a similar configuration or bespoke look? Reach out directly with this sample card.
            </p>

            <div className="flex gap-3 w-full">
              <a
                href={getWhatsAppLink(filteredItems[lightboxIndex])}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded transition inline-flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                WhatsApp Inquiry
              </a>
              <button
                onClick={() => setLightboxIndex(null)}
                className="flex-1 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-widest rounded transition"
              >
                Close Slide
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
