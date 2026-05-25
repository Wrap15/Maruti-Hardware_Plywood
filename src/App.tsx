/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, MapPin, ArrowRight, ShieldCheck, Award, PiggyBank, Truck, Star, Check, Sliders, ExternalLink, ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductSection from "./components/ProductSection";
import GalleryView from "./components/GalleryView";
import ContactInquiry from "./components/ContactInquiry";
import Logo from "./components/Logo";
import { CATEGORIES, PRODUCTS, BRANDS, TESTIMONIALS } from "./data";

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [activeBrandTab, setActiveBrandTab] = useState<{ [brandName: string]: string }>({ "Europa Locks": "Main Door & Rim Locks" });
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Monitor scroll position to update reading progress at the top of the viewport
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const totalScroll = docHeight - windowHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Set timeout to ensure post-mount content calculation is exact
    const timer = setTimeout(handleScroll, 120);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearTimeout(timer);
    };
  }, [currentPage]);

  // Keep a global window pointer so sub-components can trigger visual routing
  useEffect(() => {
    (window as any).setCurrentPageGlobal = (page: string) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }, []);

  const phonePrimary = "+917778925526";
  const phoneSecondary = "+919714338379";

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-stone-900 flex flex-col justify-between selection:bg-walnut-100 selection:text-walnut-950">
      
      {/* Dynamic Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 w-full h-[3px] bg-stone-200/20 z-[9999] pointer-events-none"
        id="scroll-progress-container"
      >
        <div 
          className="h-full bg-walnut-600 transition-all duration-75 ease-out shadow-[0_1px_6px_rgba(151,103,63,0.3)] origin-left"
          style={{ width: `${scrollProgress}%` }}
          id="scroll-progress-bar"
        />
      </div>

      {/* Dynamic Header */}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* RENDER PAGES DYNAMICALLY USING SMOOTH TRANSITIONS */}
      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="w-full flex-1"
          >

        {/* ========================================================= */}
        {/* TAB 1: HOME PAGE */}
        {/* ========================================================= */}
        {currentPage === "home" && (
          <div className="animate-in fade-in duration-300">
            
            {/* 1. HERO SECTION (Luxurious CSS Grain & Interactive Cost Estimator) */}
            <section className="relative min-h-[85vh] flex items-center bg-stone-950 text-white overflow-hidden">
              {/* Premium abstract background layout displaying a modern glowing spatial mesh */}
              <div className="absolute inset-0 z-0">
                {/* Clean technical grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1c1917_1px,transparent_1px),linear-gradient(to_bottom,#1c1917_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-20" />
                
                {/* Rich CSS Golden Ambient Radial Blurs */}
                <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-walnut-900/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-walnut-500/10 rounded-full blur-[130px] pointer-events-none animate-pulse" style={{ animationDuration: "8s" }} />
                
                {/* Ultra-luxury dark vignette background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0c0a09] via-[#141211] to-[#0c0a09]" />
              </div>
              
              <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Text details (Col span 6) */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="inline-flex items-center gap-2 bg-walnut-500/15 border border-walnut-500/30 px-3 py-1 rounded-full text-xs text-walnut-400 font-bold tracking-widest uppercase self-start">
                    <Star className="w-3 h-3 text-walnut-400 fill-walnut-400" />
                    Surat's Finest Materials Partner
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-serif leading-tight tracking-tight text-white">
                    Premium Hardware & Plywood Solutions <br />
                    <span className="text-walnut-400">in Kamrej, Surat</span>
                  </h1>

                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                    Whether you are an architect designing bespoke luxury offices, a contractor looking for E0 emissions-certified calibrated plywood boards, or a homeowner picking matte black locks—we supply India's top brands (Greenply, CenturyPly, Hettich, Ebco) at uncompromising pre-negotiated wholesale rates.
                  </p>

                  <div className="flex flex-wrap gap-4.5 pt-4">
                    <button
                      onClick={() => {
                        setCurrentPage("contact");
                        setTimeout(() => {
                           const contactEl = document.getElementById("contact-section");
                           if (contactEl) {
                             contactEl.scrollIntoView({ behavior: "smooth" });
                           } else {
                             window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                           }
                        }, 100);
                      }}
                      className="px-6 py-3 bg-walnut-600 hover:bg-walnut-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition duration-200 shadow-lg hover:shadow-walnut-500/20 inline-flex items-center gap-2"
                    >
                      Get Quote
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href={`https://wa.me/${phoneSecondary}?text=Hello Maruti Hardware Surat, I would like to enquire about premium plywood and laminates seen on your website.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-widest rounded-lg border border-white/25 transition inline-flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      WhatsApp Enquiry
                    </a>

                    <a
                      href={`tel:${phonePrimary}`}
                      className="px-6 py-3 bg-stone-900/60 hover:bg-stone-900/90 text-stone-200 text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center gap-2 font-mono"
                    >
                      📞 Call Now
                    </a>
                  </div>

                  {/* Trust markers */}
                  <div className="grid grid-cols-3 gap-4 pt-10 border-t border-stone-800/80 max-w-md">
                    <div>
                      <span className="text-2xl font-bold text-walnut-400 block font-serif">14+ Years</span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Surat Presence</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-walnut-400 block font-serif">8+ Categories</span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Bespoke supply</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-walnut-400 block font-serif">100% Genuine</span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">Authorized dealer</span>
                    </div>
                  </div>
                </div>

                {/* Right Premium Component (Col span 6): Beautiful Neha & Mohit Architectural Kitchen Spotlight */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative rounded-2xl border border-stone-800/80 bg-[#161413]/70 overflow-hidden shadow-2xl group backdrop-blur-md"
                  >
                    {/* Top glassmorphic header overlay */}
                    <div className="absolute top-0 inset-x-0 z-20 bg-gradient-to-b from-stone-950/90 via-stone-950/40 to-transparent p-5 pb-10 flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono tracking-widest text-walnut-400 font-extrabold uppercase">SPOTLIGHT DESIGN</span>
                        <h3 className="text-white font-serif text-sm font-bold tracking-wide">Neha & Mohit Kitchen</h3>
                      </div>
                      <span className="text-[9px] bg-walnut-500/20 text-walnut-300 border border-walnut-500/40 font-mono px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        BY SIMPLYFYSPACES
                      </span>
                    </div>

                    {/* Main Image Stage */}
                    <div className="relative h-[380px] sm:h-[450px] w-full overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1601760561441-16420502c7e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzF8fGtpdGNoZW58ZW58MHx8MHx8fDA%3D"
                        alt="Kitchen Design"
                        className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out scale-102 group-hover:scale-106 brightness-[0.88]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Vignette effect */}
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30 opacity-90 z-10" />
                    </div>

                    {/* Bottom content overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-6 z-20 bg-gradient-to-t from-stone-950 via-stone-950/80 to-transparent pt-12">
                      <p className="text-stone-300 text-xs leading-relaxed mb-4 font-sans">
                        A breathtaking modern layout combining sleek, dark blue contemporary cabinetry, premium calibrated hardware, and warm wooden accents. Built with durable structural boards and heavy-duty synchronized silent slides.
                      </p>

                      <div className="flex items-center gap-2 border-t border-stone-850 pt-4 text-stone-400 font-mono text-[10px] uppercase tracking-wider">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Live Gallery Design Spotlight</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

              </div>
            </section>

            {/* 2. CORE VALUES / WHY CHOOSE US (Sleek modular grid column) */}
            <section className="py-20 bg-stone-50 border-b border-stone-200/40">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">A DEEPER STANDARD</span>
                  <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Why Architects and Contractors Choose Us</h2>
                  <p className="text-stone-500 text-xs mt-2.5">What turns random shoppers into life-long wholesale project partners in Gujarat.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Quality Products */}
                  <div className="bg-white p-6 rounded-xl border border-stone-150 shadow-sm flex flex-col gap-4 text-left hover:border-walnut-300 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-walnut-50 flex items-center justify-center text-walnut-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">Calibrated Quality</h4>
                      <p className="text-stone-500 text-[11px] leading-relaxed mt-2">100% gurjan wood boiled water resistant core plywood certified for lifetime custom cabinets.</p>
                    </div>
                  </div>

                  {/* Trusted Brands */}
                  <div className="bg-white p-6 rounded-xl border border-stone-150 shadow-sm flex flex-col gap-4 text-left hover:border-walnut-300 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-walnut-50 flex items-center justify-center text-walnut-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">Elite Brands</h4>
                      <p className="text-stone-500 text-[11px] leading-relaxed mt-2">Certified dealer of CenturyPly, Greenply, Fevicol, Hettich, Ebco, and premium architectural hardware.</p>
                    </div>
                  </div>

                  {/* Best Pricing */}
                  <div className="bg-white p-6 rounded-xl border border-stone-150 shadow-sm flex flex-col gap-4 text-left hover:border-walnut-300 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-walnut-50 flex items-center justify-center text-walnut-600">
                      <PiggyBank className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">Wholesale Costing</h4>
                      <p className="text-stone-500 text-[11px] leading-relaxed mt-2">Direct distributor margins with zero retail inflation pricing for carpenters and interior contractors.</p>
                    </div>
                  </div>

                  {/* Expert Guidance */}
                  <div className="bg-white p-6 rounded-xl border border-stone-150 shadow-sm flex flex-col gap-4 text-left hover:border-walnut-300 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-walnut-50 flex items-center justify-center text-walnut-600">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">Expert Guidance</h4>
                      <p className="text-stone-500 text-[11px] leading-relaxed mt-2">From fitting calculations to pairing laminates, our experienced staff solves custom installation blocks.</p>
                    </div>
                  </div>

                  {/* Fast Delivery */}
                  <div className="bg-white p-6 rounded-xl border border-stone-150 shadow-sm flex flex-col gap-4 text-left hover:border-walnut-300 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-walnut-50 flex items-center justify-center text-walnut-600">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">Immediate Dispatch</h4>
                      <p className="text-stone-500 text-[11px] leading-relaxed mt-2">Large warehouse holdings at Kamrej ensure bulk plywood orders hit your construction site within 24 hours.</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 3. MATERIAL CATEGORIES DISCOVER (Bento-like columns) */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                  <div>
                    <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">COMPREHENSIVE INDEX</span>
                    <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Our Core Interior Supply Portfolio</h2>
                    <p className="text-stone-500 text-xs mt-1">Select a category below to browse premium showroom items</p>
                  </div>

                  <button
                    onClick={() => setCurrentPage("products")}
                    className="text-xs font-bold uppercase tracking-widest text-walnut-700 hover:text-walnut-900 inline-flex items-center gap-1.5 border-b border-walnut-500 pb-0.5"
                  >
                    View All Products
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bento categories block */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {CATEGORIES.slice(0, 4).map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setCurrentPage("products");
                        // Scroll to top or trigger state change in section
                      }}
                      className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-walnut-400 transition-all duration-300 cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative h-48 bg-stone-50 overflow-hidden">
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[13.5px] font-bold text-stone-900 block group-hover:text-walnut-700 transition">
                            {cat.name}
                          </h3>
                          <p className="text-stone-500 text-[10.5px] leading-relaxed line-clamp-2 mt-1">
                            {cat.description}
                          </p>
                        </div>
                        {/* Features chips */}
                        <div className="mt-3.5 pt-3.5 border-t border-stone-100 flex flex-wrap gap-1.5">
                          {cat.features.slice(0, 2).map((feat, idx) => (
                            <span key={idx} className="bg-stone-100 text-[9px] font-bold uppercase px-2 py-0.5 rounded text-stone-500 font-mono">
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* 4. BRAND ASSOCIATION LABELS */}
            <section className="py-16 bg-stone-900 text-white select-none overflow-hidden">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-10">
                  <span className="text-[9.5px] font-bold tracking-widest text-walnut-400 font-mono uppercase">OFFICIALLY DISTRIBUTED LOGOS</span>
                  <p className="text-stone-400 text-xs mt-1.5">Uncompromising certified quality standard</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-16">
                  {BRANDS.map((b) => (
                    <div 
                      key={b.name} 
                      onClick={() => setCurrentPage("brands")}
                      className="cursor-pointer group flex flex-col items-center gap-1.5 transition-all"
                    >
                      <div className="text-stone-500 group-hover:text-walnut-400 transition-colors text-xl font-black uppercase tracking-widest font-serif block">
                        {b.logoText}
                      </div>
                      <span className="text-[8px] text-stone-600 font-mono font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all">
                        {b.name} Products
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. LOCALLY FEATURED SPECIFICATION SPECIMENS */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">FEATURED SPECIMENS</span>
                  <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Best-Seller Architecture Favorites</h2>
                  <p className="text-stone-500 text-xs mt-2">Currently trending in local premium home renovations in Surat</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {PRODUCTS.filter(p => p.isFeatured).slice(0, 3).map((prod) => {
                    const catName = CATEGORIES.find(c => c.id === prod.categoryId)?.name || "Premium";
                    return (
                      <motion.div 
                        key={prod.id} 
                        onClick={() => {
                          setCurrentPage("products");
                        }}
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
                        <div className="relative h-56 bg-stone-50 overflow-hidden">
                          <motion.img
                            src={prod.imageUrl}
                            alt={prod.name}
                            variants={{
                              rest: { scale: 1 },
                              hover: { scale: 1.05 }
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-3 left-3 bg-stone-900 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded shadow">
                            {catName}
                          </span>
                        </div>

                        <div className="p-5">
                          <h3 className="text-sm font-bold text-stone-900 block group-hover:text-walnut-700 transition line-clamp-1">{prod.name}</h3>
                          <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-2 mt-1.5">{prod.description}</p>
                          
                          {prod.specifications && (
                            <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-400">
                              <span>Spec: {prod.specifications[0]}</span>
                              <span className="text-walnut-600 font-bold uppercase tracking-wider hover:underline flex items-center gap-0.5">Explore Specs &rarr;</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

              </div>
            </section>

            {/* 6. REAL LOCAL CLIENT REVIEWS */}
            <section className="py-20 bg-[#f4eee2]/40 border-t border-b border-stone-200/20">
              <div className="max-w-7xl mx-auto px-6">
                
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">LOCAL SURVEY TESTIMONIALS</span>
                  <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Approved by Surat's Finest Architects & Carpenters</h2>
                  <p className="text-stone-500 text-xs mt-2.5">Listen to the builders and contractors who shape Surat's skyline</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {TESTIMONIALS.map((t) => (
                    <div 
                      key={t.id} 
                      className="bg-white rounded-xl p-6 md:p-8 border border-stone-150 shadow-sm flex flex-col justify-between relative group hover:border-walnut-300 hover:shadow-md transition-all duration-300"
                    >
                      {/* Quote quotation graphic */}
                      <span className="absolute right-6 top-6 text-5xl font-serif text-walnut-100 font-extrabold group-hover:text-walnut-200 transition pointer-events-none select-none">“</span>

                      <div>
                        {/* Rating stars */}
                        <div className="flex gap-1 mb-5 text-amber-500">
                          {Array.from({ length: t.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-500" />
                          ))}
                        </div>

                        <p className="text-stone-600 text-[12.5px] leading-relaxed italic z-10 relative">
                          "{t.content}"
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-stone-100">
                        <span className="font-bold text-stone-900 block font-sans text-xs">{t.name}</span>
                        <span className="text-[10px] text-walnut-600 block font-semibold uppercase font-mono tracking-wider mt-0.5">{t.role}</span>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* 7. QUICK INQUIRY & MAP ANCHOR COUPLING */}
            <section className="py-6">
              <ContactInquiry />
            </section>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ABOUT US */}
        {/* ========================================================= */}
        {currentPage === "about" && (
          <div className="animate-in fade-in duration-300 py-16 px-6 max-w-7xl mx-auto">
            
            {/* Split row setup */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
              
              {/* Text Left (Col span 7) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1.5 font-mono">OUR HISTORICAL LEGACY</span>
                  <h2 className="text-4xl font-bold font-serif text-stone-950 tracking-tight leading-snug">
                    Fourteen Years of Exceptional Woodwork Alliances in Gujarat
                  </h2>
                </div>

                <p className="text-stone-650 text-xs sm:text-sm leading-relaxed">
                  Established in 2012 in the fast-growing industrial hub of Kamrej, Maruti Hardware & Plywood started with a humble purpose: supplying top-tier, calibrated, termite-resistant structural wood sheets to local carpenters. Over the next decade, as Surat transformed into an architect’s playground, we evolved into a comprehensive interior material supplier box.
                </p>

                <p className="text-stone-650 text-xs sm:text-sm leading-relaxed">
                  Today, we are the authorized distributor of top plywood developers (Greenply, CenturyPly) and German kitchen drawer organizers (Hettich, Ebco, Hafele). In our sprawling Kamrej Char Rasta showroom, builders, carpenters, and homeowners meet to choose bespoke textures that redefine residential duplexes and commercial hotels.
                </p>

                {/* Core commitment pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 mt-4">
                  <div className="flex gap-3">
                    <div className="p-1 h-5 w-5 bg-walnut-100 text-walnut-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-stone-900 block">Form-Compliance Guarantee</span>
                      <span className="text-stone-400 block mt-0.5">Every sheet supplied is guarantee calibrated to millimeter parameters.</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="p-1 h-5 w-5 bg-walnut-100 text-walnut-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div className="text-xs">
                      <span className="font-bold text-stone-900 block">Borer & Termite Immunity</span>
                      <span className="text-stone-400 block mt-0.5">Chemically treated core blocks protected against organic decay.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphical right panel (Col span 5) */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-96 bg-stone-100 border border-stone-200 group">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80"
                  alt="Maruti Surat Showroom Display Wood panels"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating graphic overlay with credentials */}
                <div className="absolute top-4 left-4 bg-stone-950/90 text-white p-4.5 rounded-xl border border-stone-800 backdrop-blur-xs select-none">
                  <span className="text-[10px] font-mono uppercase text-walnut-400 tracking-wider">MARUTI SURAT</span>
                  <h3 className="text-sm font-bold mt-1">Visit our Showroom</h3>
                  <p className="text-[10.5px] text-stone-400 mt-1">182, Golden Plaza, Kamrej</p>
                </div>
              </div>

            </div>

            {/* Local Team Values & Core Strengths Block */}
            <div className="bg-[#f4eee2]/40 rounded-2xl p-6 sm:p-10 border border-stone-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-walnut-800 font-mono mb-2">Sustainable Carbon Standards</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    We proactively distribute zero formaldehyde-emission plywood compliant with E0 emission standards. Safe for modular bedrooms and young nurseries.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-walnut-800 font-mono mb-2">Prelocked Wholesale Pipeline</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    By importing direct from ply mills, we help contractors save 15-20% on overall material costs compared to traditional neighborhood hardware shops.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-walnut-800 font-mono mb-2">The Carpenter Network</h4>
                  <p className="text-stone-500 text-xs leading-relaxed">
                    We are deeply embedded in the Surat carpenter guild. Ask our staff for recommendations to hire verified carpenters in Kamrej.
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PRODUCTS PAGE */}
        {/* ========================================================= */}
        {currentPage === "products" && (
          <div className="animate-in fade-in duration-300">
            <ProductSection />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: OFFICIAL BRANDS */}
        {/* ========================================================= */}
        {currentPage === "brands" && (
          <div className="animate-in fade-in duration-300 py-16 px-6 max-w-7xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">BRAND CERTIFICATION</span>
              <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Our Authorized Brands Network</h2>
              <p className="text-stone-500 text-xs mt-2">Zero-emissions timber planks and world-renown silent hardware drawer runners</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BRANDS.map((item) => {
                return (
                  <div 
                    key={item.name}
                    className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between group hover:border-walnut-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div>
                      {/* Logo placeholder visual */}
                      <div className="h-28 bg-[#fbfcfb] border border-stone-100 rounded-lg flex items-center justify-center mb-6 overflow-hidden">
                        <span className="text-stonre-700 font-sans font-black uppercase text-2xl tracking-widest select-none group-hover:scale-105 transition-all">
                          {item.logoText}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-sm font-bold text-stone-900">{item.name}</h3>
                        <span className="bg-walnut-50 text-[9px] px-2 py-0.5 rounded text-walnut-600 font-bold uppercase font-mono">AUTHORIZED COPNENT</span>
                      </div>

                      <p className="text-stone-500 text-[11px] leading-relaxed">
                        {item.description}
                      </p>

                      {item.categories && item.categories.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-stone-100 space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-bold text-stone-700 uppercase tracking-wider font-mono">
                              Product Lines
                            </h4>
                            {item.websiteUrl && (
                              <a 
                                href={item.websiteUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-[10px] text-walnut-600 hover:text-walnut-700 font-bold uppercase tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
                              >
                                Official Site <ExternalLink className="w-3 h-3 text-walnut-500" />
                              </a>
                            )}
                          </div>

                          {/* Small category selector pills */}
                          <div className="flex flex-wrap gap-1">
                            {item.categories.map((cat) => {
                              const currentActive = activeBrandTab[item.name] || (item.categories && item.categories[0]?.name);
                              const isActive = currentActive === cat.name;
                              return (
                                <button
                                  key={cat.name}
                                  type="button"
                                  onClick={() => setActiveBrandTab(prev => ({ ...prev, [item.name]: cat.name }))}
                                  className={`text-[9px] px-2 py-0.5 rounded font-medium transition-all duration-200 border cursor-pointer ${
                                    isActive 
                                      ? "bg-walnut-600 border-walnut-600 text-white font-bold" 
                                      : "bg-stone-50 border-stone-200 hover:border-stone-300 text-stone-600"
                                  }`}
                                >
                                  {cat.name}
                                </button>
                              );
                            })}
                          </div>

                          {/* Display active category subcategories */}
                          <div className="bg-stone-50/70 border border-stone-200/60 rounded-lg p-3">
                            {item.categories.map((cat) => {
                              const currentActive = activeBrandTab[item.name] || (item.categories && item.categories[0]?.name);
                              if (currentActive !== cat.name) return null;
                              return (
                                <div key={cat.name} className="animate-in fade-in slide-in-from-top-1 duration-200">
                                  <h5 className="text-[9px] uppercase tracking-wider font-bold text-stone-400 font-mono mb-1.5">
                                    Sub-categories & Models:
                                  </h5>
                                  <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
                                    {cat.subcategories.map((sub) => (
                                      <li key={sub} className="text-[10px] text-stone-600 flex items-center gap-1 leading-snug">
                                        <span className="w-1 h-1 rounded-full bg-walnut-400 flex-shrink-0" />
                                        <span className="truncate" title={sub}>{sub}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-[10px] text-stone-400 font-mono font-medium">Original Manufacturer Supply</span>
                      
                      <div className="flex items-center gap-3">
                        {item.websiteUrl && (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] text-stone-500 hover:text-stone-700 font-bold uppercase hover:underline transition-colors flex items-center gap-1"
                          >
                            Website <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            setCurrentPage("products");
                          }}
                          className="text-[10px] text-walnut-600 font-bold uppercase hover:underline"
                        >
                          Browse Range &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: GALLERY */}
        {/* ========================================================= */}
        {currentPage === "gallery" && (
          <div className="animate-in fade-in duration-300">
            <GalleryView />
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: CONTACT */}
        {/* ========================================================= */}
        {currentPage === "contact" && (
          <div className="animate-in fade-in duration-300">
            <ContactInquiry />
          </div>
        )}
          </motion.div>
        </AnimatePresence>

      </main>

      {/* Floating Sticky Quick Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Quick dial phone */}
        <a
          href={`tel:${phonePrimary}`}
          className="p-3.5 bg-stone-900 text-white rounded-full shadow-lg hover:bg-stone-800 transition duration-300 transform hover:scale-105 flex items-center justify-center border border-stone-800"
          title="Call Sales Now"
        >
          <Phone className="w-5 h-5 text-walnut-300" />
        </a>

        {/* Fast Floating WhatsApp Trigger with Ring Pulse */}
        <a
          href={`https://wa.me/${phoneSecondary}?text=Hello Maruti Hardware Kamrej, Surat. I saw your website and would like to get quick catalogue parameters.`}
          target="_blank"
          rel="noreferrer"
          className="relative p-3.5 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 transition duration-300 transform hover:scale-105 flex items-center justify-center"
          title="WhatsApp Quick chat"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 bg-emerald-500 rounded-full animate-ping opacity-25" />
          <MessageSquare className="w-5 h-5" />
        </a>
      </div>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />

    </div>
  );
}
