/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import Logo from "./Logo";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const phonePrimary = "+91 77789 25526";
  const phoneSecondary = "+91 97143 38379";

  const navigationItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "products", label: "Products" },
    { id: "brands", label: "Brands" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className={`sticky top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-[#fcfbfa]/90 backdrop-blur-md shadow-sm border-b border-stone-200/50" 
        : "bg-[#fcfbfa] border-b border-stone-100"
    }`}>

      {/* Main Navigation Bar */}
      <nav className={`w-full py-4 px-6 transition-all duration-300 ${
        isScrolled 
          ? "py-3" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Brand Logo */}
          <div className="cursor-pointer" onClick={() => handleNavClick("home")}>
            <Logo />
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-1.5 text-[13px] uppercase font-bold tracking-widest transition-all ${
                    isActive 
                      ? "text-walnut-700 font-extrabold" 
                      : "text-stone-600 hover:text-walnut-600 hover:tracking-[0.14em]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-walnut-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Call To Action Right Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/${phonePrimary.replace(/\s+/g, "").replace("+", "")}?text=Hello, I visited your catalog website. I would like to get a custom quotation.`}
              target="_blank"
              rel="noreferrer"
              className="px-4.5 py-2 bg-stone-900 hover:bg-stone-800 text-white text-[11px] uppercase font-bold tracking-widest rounded-md transition shadow-md hover:shadow-lg inline-flex items-center gap-1.5"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Open Trigger */}
          <button 
            className="md:hidden p-1.5 rounded-md hover:bg-stone-200 transition text-stone-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 bg-[#fcfbfa] shadow-2xl border-b border-stone-200 z-50 py-6 px-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navigationItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left py-2.5 px-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-all flex justify-between items-center ${
                    isActive
                      ? "bg-walnut-100 text-walnut-800 font-extrabold"
                      : "text-stone-700 hover:bg-stone-100/50"
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-walnut-600" />}
                </button>
              );
            })}
          </div>

          {/* Utility elements inside Mobile Drawer */}
          <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col gap-3">
            <div className="text-[11px] text-stone-400 font-mono font-bold uppercase tracking-wider">Direct Enquiries</div>
            
            <a 
              href={`tel:${phonePrimary.replace(/\s+/g, "")}`}
              className="flex items-center gap-3 py-2 px-3 bg-walnut-50 rounded-lg hover:bg-walnut-100/50 text-stone-800 transition"
            >
              <Phone className="w-4 h-4 text-walnut-600" />
              <span className="text-xs font-bold tracking-wider">Manish (Sales)</span>
            </a>

            <a 
              href={`https://wa.me/${phoneSecondary.replace(/\s+/g, "").replace("+", "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 py-2 px-3 bg-emerald-50 rounded-lg hover:bg-emerald-100/50 text-stone-800 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold tracking-wider">Keyur (WhatsApp)</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
}
