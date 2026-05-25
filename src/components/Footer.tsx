/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Phone, MessageSquare, MapPin, Map, ExternalLink, Clock } from "lucide-react";
import Logo from "./Logo";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const phonePrimary = "+91 77789 25526";
  const phoneSecondary = "+91 97143 38379";

  const footerNavs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Brand" },
    { id: "products", label: "Store Materials" },
    { id: "brands", label: "Official Brands" },
    { id: "gallery", label: "Showroom Projects" },
    { id: "contact", label: "Location & Inquiry" }
  ];

  const handleNav = (id: string) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-matte-black text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Focus Block */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <Logo lightMode={true} />
          <p className="text-stone-400 text-xs leading-relaxed mt-2.5">
            Surat's premier wholesaler and retailer or hardware fittings, branded structural plywood panel sheets, acrylic laminates, fluted louvers, and bespoke modular kitchen assemblies. Est. 2012 in Kamrej, Gujarat.
          </p>
          
          {/* Active Local coordinates */}
          <div className="flex items-center gap-2 mt-2 text-stone-500 text-[10px] font-mono tracking-widest uppercase">
            <span>GST REGISTERED SUPPLY PORT</span>
          </div>
        </div>

        {/* Quick Navigate Links */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-walnut-400 font-mono">Navigate</h4>
          <ul className="flex flex-col gap-2.5 text-xs">
            {footerNavs.map((nav) => (
              <li key={nav.id}>
                <button
                  onClick={() => handleNav(nav.id)}
                  className="hover:text-white transition duration-200 hover:translate-x-1 inline-block"
                >
                  {nav.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Address and Contact details panel */}
        <div className="md:col-span-4 flex flex-col gap-4.5">
          <h4 className="text-xs font-bold uppercase tracking-widest text-walnut-400 font-mono">Location & Enquiries</h4>
          
          <div className="flex items-start gap-2.5 text-xs leading-relaxed">
            <MapPin className="w-4 h-4 text-walnut-500 flex-shrink-0 mt-0.5" />
            <p>
              182, Golden Plaza, B/h. Police Station,<br />
              Kamrej Char Rasta, Surat, Gujarat 394185
            </p>
          </div>

          <div className="flex flex-col gap-2.5 pt-1.5 text-xs font-mono">
            <a href={`tel:${phonePrimary.replace(/\s+/g, "")}`} className="flex items-center gap-2 hover:text-white transition">
              <Phone className="w-3.5 h-3.5 text-walnut-500" />
              <span>Manish (Sales)</span>
            </a>
            <a 
              href={`https://wa.me/${phoneSecondary.replace(/\s+/g, "").replace("+", "")}`} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 hover:text-white transition text-emerald-400"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
              <span>Keyur (WhatsApp)</span>
            </a>
          </div>

          <div className="pt-2 text-[10px] text-stone-500 flex items-center gap-1.5 font-mono">
            <Clock className="w-3 h-3 text-stone-500" />
            <span>Open: Mon-Sat 9:00 AM - 8:00 PM | Sun 9:00 AM - 1:30 PM</span>
          </div>
        </div>

      </div>

      {/* SEO keywords tag cloud - Clean elegant presentation */}
      <div className="max-w-7xl mx-auto px-6 mt-14 pt-8 border-t border-stone-850 text-center">
        <div className="flex flex-wrap justify-center gap-3.5 text-[10px] text-stone-500 font-medium select-none">
          <span className="hover:text-stone-300 transition cursor-pointer">Plywood Shop in Kamrej</span>
          <span>•</span>
          <span className="hover:text-stone-300 transition cursor-pointer">Hardware Store in Surat</span>
          <span>•</span>
          <span className="hover:text-stone-300 transition cursor-pointer">Laminates Dealer Kamrej Surat</span>
          <span>•</span>
          <span className="hover:text-stone-300 transition cursor-pointer">Modular Kitchen Hardware Supplier Surat</span>
          <span>•</span>
          <span className="hover:text-stone-300 transition cursor-pointer">Interior Material Store Gujarat</span>
        </div>

        {/* Copyright */}
        <div className="text-[10.5px] text-stone-600 mt-8 font-mono flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-stone-850/60 pt-6">
          <p>
            &copy; {new Date().getFullYear()} Maruti Hardware & Plywood. All rights reserved. Crafted for Elegant Architectures and Custom Furnitures in Surat.
          </p>
          <div className="flex items-center justify-center sm:justify-end gap-1 text-[9.5px] text-stone-500/90 tracking-wider uppercase font-mono">
            <span>Designed & Built with passion by</span>
            <span className="font-bold text-stone-300 hover:text-walnut-400 transition-colors duration-200 whitespace-nowrap">DHAVAL PANCHAL</span>
            <span className="text-purple-500 animate-pulse select-none">💜</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
