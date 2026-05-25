/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Phone, MessageSquare, MapPin, Mail, Send, CheckCircle, Navigation, Clock, ShieldCheck, Map, Compass, Sparkles, Wand2, Loader2, Check, RotateCcw } from "lucide-react";
import { CATEGORIES } from "../data";
import { InquiryFormData } from "../types";

export default function ContactInquiry() {
  const [mapMode, setMapMode] = useState<"schematic" | "google">("schematic");
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    phone: "",
    email: "",
    subject: "Plywood Procurement",
    message: "",
    categoryInterested: "plywood"
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Gemini AI Recommendation States
  const [activeFormTab, setActiveFormTab] = useState<"inquiry" | "ai">("inquiry");
  const [aiRoomType, setAiRoomType] = useState("Modular Kitchen");
  const [aiWidth, setAiWidth] = useState("");
  const [aiLength, setAiLength] = useState("");
  const [aiStyle, setAiStyle] = useState("Italian Matte Minimalist (Muted earth-tones)");
  const [aiInterest, setAiInterest] = useState("decorative laminates");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLoadingMessage, setAiLoadingMessage] = useState("Connecting with Maruti Consultant Core...");
  const [aiResult, setAiResult] = useState<{
    layoutConcept: string;
    recommendedMaterials: {
      itemType: string;
      specification: string;
      whyItFits: string;
    }[];
    technicalSpecTip: string;
    whatsappSummaryText: string;
  } | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Cycle loading messages to showcase technical design deliberation
  useEffect(() => {
    if (!aiLoading) return;
    const messages = [
      "Consulting with Maruti's design system & catalogue...",
      "Analyzing coastal humidity tolerances for Surat...",
      "Sourcing 100% waterproof certified Gurjan-core plywood options...",
      "Matching selected look with Ebco/Hettich drawer models...",
      "Calculating dimension metrics for structural load points...",
      "Readying the high-precision specifications..."
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % messages.length;
      setAiLoadingMessage(messages[idx]);
    }, 2500);

    return () => clearInterval(interval);
  }, [aiLoading]);

  // Request Gemini recommendations from the server-side API
  const handleAiRecommendation = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);
    setAiLoadingMessage("Initiating Gemini 3.5-flash consultation...");

    try {
      const response = await fetch("/api/gemini/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType: aiRoomType,
          width: aiWidth ? parseFloat(aiWidth) : undefined,
          length: aiLength ? parseFloat(aiLength) : undefined,
          style: aiStyle,
          interest: aiInterest,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred while communicating with the AI service.");
      }

      setAiResult(data);
    } catch (err: any) {
      console.error("AI Recommendation Error:", err);
      setAiError(err.message || "Could not generate material suggestions. Please verify your connection.");
    } finally {
      setAiLoading(false);
    }
  };

  const phonePrimary = "+91 77789 25526";
  const phoneSecondary = "+91 97143 38379";
  const whatsappCoordinate = "919714338379";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = "Full Name is required";
    
    // Simple 10-digit validation for Indian cell phones
    const phoneClean = formData.phone.replace(/[^0-9]/g, "");
    if (!formData.phone.trim()) {
      errors.phone = "Phone Number is required";
    } else if (phoneClean.length < 10) {
      errors.phone = "Please provide a valid phone number (at least 10 digits)";
    }

    if (!formData.message.trim()) {
      errors.message = "Message details are required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitted(true);
    }
  };

  // Compile form data to direct WhatsApp Message Link
  const handleWhatsAppRedirect = () => {
    const categoryName = CATEGORIES.find(c => c.id === formData.categoryInterested)?.name || formData.categoryInterested;
    const bulletMsg = `*Maruti Hardware Surat - High-End Catalog Lead*\n` +
      `--------------------------------------\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email || "Not Provided"}\n` +
      `🏷️ *Material Interest:* ${categoryName}\n` +
      `🗒️ *Subject:* ${formData.subject}\n` +
      `💬 *Message:* ${formData.message}\n` +
      `--------------------------------------\n` +
      `Sent via Maruti Web Form Portal`;

    const encodedText = encodeURIComponent(bulletMsg);
    window.open(`https://wa.me/${whatsappCoordinate}?text=${encodedText}`, "_blank");
  };

  const handleResetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      subject: "Plywood Procurement",
      message: "",
      categoryInterested: "plywood"
    });
    setIsSubmitted(false);
  };

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto wood-grain-overlay" id="contact-section">
      
      {/* Introduction */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-widest text-walnut-600 uppercase block mb-1">VISIT OR CALL US</span>
        <h2 className="text-3xl font-bold font-serif text-matte-black tracking-tight">Connect with Maruti Hardware</h2>
        <p className="text-stone-500 text-xs mt-2.5 leading-relaxed">
          Renovating your modular kitchen, choosing zero-emission calibrated plywood sheets, or installing designer brass handles in Surat? Send us your requirements for an immediate wholesale estimate!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Coordinates details (Col span 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-stone-900 to-stone-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between border border-stone-850 shadow-lg">
          
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-walnut-400 font-mono font-bold">STORE COORDINATES</span>
              <h3 className="text-xl font-bold font-serif text-white mt-1">Maruti Showroom Surat</h3>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-stone-800 rounded-lg text-walnut-400 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-xs leading-relaxed text-stone-300">
                <span className="font-bold text-white block mb-0.5">Physical Address:</span>
                182, Golden Plaza, Behind Police Station,<br />
                Kamrej Char Rasta, Surat, Gujarat 394185 India
              </div>
            </div>

            {/* Phones */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-stone-800 rounded-lg text-walnut-400 mt-1">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block mb-1">Primary Call Enquiries:</span>
                <div className="flex flex-col gap-2.5 text-stone-300">
                  <a 
                    href={`tel:${phonePrimary.replace(/\s+/g, "")}`} 
                    className="flex items-center gap-2 hover:text-walnut-300 transition text-stone-200"
                  >
                    <Phone className="w-3.5 h-3.5 text-walnut-500" />
                    <span className="font-semibold">Manish (Sales)</span>
                  </a>
                  <a 
                    href={`https://wa.me/${phoneSecondary.replace(/\s+/g, "").replace("+", "")}`} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-2 hover:text-emerald-300 transition text-emerald-400"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="font-semibold">Keyur (WhatsApp)</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-stone-800 rounded-lg text-walnut-400 mt-1">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-xs leading-relaxed text-stone-300">
                <span className="font-bold text-white block mb-0.5">Official email correspondence:</span>
                info@marutihardware.com <span className="text-[10px] text-stone-500 block">(Direct client relations)</span>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="p-2 bg-stone-800 rounded-lg text-walnut-400 mt-1">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs leading-relaxed text-stone-300">
                <span className="font-bold text-white block mb-0.5">Office & Showroom Hours:</span>
                Mon – Sat: 9:00 AM – 8:00 PM <br />
                <span className="text-walnut-400 font-bold">Sunday: 9:00 AM – 1:30 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Google Map routing helper */}
          <div className="mt-8 pt-6 border-t border-stone-800 flex items-center justify-between text-xs">
            <span className="text-stone-400">Behind police station, Kamrej</span>
            
            <a
              href="https://maps.app.goo.gl/hQNqyG5ZDuNL23eo8"
              target="_blank"
              rel="noreferrer"
              className="px-4.5 py-2 bg-walnut-600 hover:bg-walnut-700 text-white font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center gap-1.5 shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5" />
              Navigate Live
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Map + Form Combo (Col span 7) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Map Selection Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-stone-50 p-3 rounded-2xl border border-stone-200">
            <div className="flex bg-stone-200/60 p-1 rounded-xl text-[11px] font-bold tracking-wider uppercase self-start">
              <button
                type="button"
                onClick={() => setMapMode("schematic")}
                className={`px-3.5 py-1.5 rounded-lg transition duration-200 flex items-center gap-1.5 ${
                  mapMode === "schematic"
                    ? "bg-stone-950 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-950"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Schematic Guide
              </button>
              <button
                type="button"
                onClick={() => setMapMode("google")}
                className={`px-3.5 py-1.5 rounded-lg transition duration-200 flex items-center gap-1.5 ${
                  mapMode === "google"
                    ? "bg-stone-950 text-white shadow-sm"
                    : "text-stone-600 hover:text-stone-950"
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                Live Google Map
              </button>
            </div>
            <div className="text-[10px] text-stone-500 font-medium">
              📍 Landmark: Behind Police Station, Kamrej Char Rasta
            </div>
          </div>

          {/* Map View Display */}
          <div className="bg-stone-950 rounded-2xl overflow-hidden shadow-xl border border-stone-850 h-80 relative group flex flex-col justify-between">
            
            {mapMode === "schematic" ? (
              /* A CUSTOM BESPOKE LANDMARK BLUEPRINT - 100% VISIBLE & INDESTRUCTIBLE IN ALL SANBOXES */
              <div className="absolute inset-0 p-6 flex flex-col justify-between bg-gradient-to-b from-stone-900 to-stone-950 text-white overflow-hidden select-none">
                {/* Thin technical architectural grid design background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
                
                {/* Header */}
                <div className="z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-walnut-400 font-mono font-bold tracking-widest block uppercase">BESPOKE ARCHITECTURAL MAP</span>
                    <h4 className="text-sm font-bold font-serif text-white tracking-wide mt-0.5">Kamrej Char Rasta Landmark Area</h4>
                  </div>
                  <span className="bg-stone-800 text-stone-300 font-mono text-[9px] px-2 py-0.5 rounded border border-stone-700 uppercase">
                    Scale: Calibrated Surat Spec
                  </span>
                </div>

                {/* Main visual schematic diagram layout */}
                <div className="relative flex-1 my-4 flex items-center justify-center">
                  
                  {/* National Highway NH48 Vector Representer */}
                  <div className="absolute left-0 right-0 h-10 bg-stone-800/40 border-y border-stone-750 flex items-center justify-center">
                    <div className="w-full border-t border-dashed border-stone-600/40" />
                    <span className="absolute bg-stone-900 px-2.5 py-0.5 rounded text-[8.5px] font-mono font-bold text-stone-400 tracking-widest uppercase">
                      🚗 TO AHMEDABAD ◄─── National Highway 48 (N.H.48) ───► TO MUMBAI 🚗
                    </span>
                  </div>

                  {/* Kamrej Char Rasta Junction crossing bar */}
                  <div className="absolute w-12 top-0 bottom-0 bg-stone-850/30 border-x border-stone-750/30 left-1/4 flex flex-col items-center justify-between py-2 pointer-events-none">
                    <span className="text-[8px] tracking-widest text-stone-500 font-bold uppercase rotate-90 my-auto">KAMREJ ROAD</span>
                  </div>

                  {/* Police Station Landmark Node (Opposite / Adjacent) */}
                  <div className="absolute right-12 top-2 bg-stone-900/90 border border-stone-800 rounded-lg p-2 flex items-center gap-2 shadow-lg scale-90 sm:scale-100">
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                    <div>
                      <span className="font-mono text-[9px] font-bold text-white block">Kamrej Police Station</span>
                      <span className="text-[8px] text-stone-400 block -mt-0.5">Critical Store Landmark</span>
                    </div>
                  </div>

                  {/* Golden plaza (Maruti Hardware location block) */}
                  <div className="absolute right-24 bottom-2 bg-stone-900 border border-walnut-500/50 rounded-xl p-3 flex items-center gap-3 shadow-2xl transition duration-300 hover:border-walnut-500">
                    <div className="p-1.5 bg-walnut-950 text-walnut-400 rounded-lg border border-walnut-900/60 flex items-center justify-center">
                      <MapPin className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <span className="bg-walnut-500/20 text-walnut-300 font-mono text-[8px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">maruti showroom</span>
                      <span className="font-serif text-[11.5px] font-bold text-white block mt-0.5">Golden Plaza, Shop 182</span>
                      <span className="text-[9px] text-stone-400 block">Behind Police Station, Kamrej Char Rasta</span>
                    </div>
                  </div>

                  {/* Surat City Direction Pointer */}
                  <div className="absolute left-4 bottom-2 bg-stone-900/50 text-stone-400 border border-stone-850 text-[8px] px-2 py-1 rounded tracking-widest uppercase font-mono">
                    ⬅ To Surat City Centre (14 KM)
                  </div>

                </div>

                {/* Footer blueprint note */}
                <div className="z-10 flex items-center justify-between text-[10px] text-stone-400 pt-2 border-t border-stone-800/60">
                  <span>🚗 Located 2 minutes from the Kamrej Highway toll-booth plaza</span>
                  <a 
                    href="https://maps.app.goo.gl/hQNqyG5ZDuNL23eo8" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-walnut-400 font-bold hover:underline inline-flex items-center gap-1"
                  >
                    Open Google Maps App ↗
                  </a>
                </div>

              </div>
            ) : (
              /* THE INTERACTIVE GOOGLE MAP IFRAME WITH TROUBLESHOOTING DISCLAIMER */
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="flex-1 relative">
                  <iframe
                    title="Maruti Hardware & Plywood Location Kamrej Surat"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.065972780501!2d72.9565455747208!3d21.268855979489903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be0476c6ea5dcd9%3A0x370b52daea2aab8!2sMaruti%20Hardware%20%26%20plywood!5e0!3m2!1sen!2sin!4v1779630412769!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-500 w-full h-full"
                  ></iframe>
                  
                  {/* Sandbox Environment Disclaimer Badge overlay */}
                  <div className="absolute inset-x-3 top-3 bg-stone-950/95 backdrop-blur-md px-3.5 py-2.5 rounded-lg border border-amber-500/30 text-[9.5px] leading-relaxed text-stone-300 flex items-start gap-2.5 shadow-xl">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0 animate-pulse" />
                    <div>
                      <span className="font-bold text-white block uppercase tracking-wider text-[8.5px]">Browser Security Advice</span>
                      Some browser configuration levels block inside-sandboxes double-nested iframe maps. If the map box below appears gray or empty, click Maruti's <strong className="text-walnut-400">"Schematic Guide"</strong> tab above or click the navigation button on the left to launch the live app directly!
                    </div>
                  </div>
                </div>

                {/* Custom glass locator banner pinned to map corner */}
                <div className="p-2.5 bg-stone-900 border-t border-stone-800 text-center text-[10px]">
                  <span className="text-stone-400">Showroom Address: </span>
                  <strong className="text-white">Shop #182, Golden Plaza, Behind Police Station, Kamrej Char Rasta</strong>
                </div>
              </div>
            )}

          </div>

          {/* Core Inquiry Form Console */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            
            {/* Form Selection Tabs */}
            {!isSubmitted && (
              <div className="flex border-b border-stone-200 mb-6 pb-0.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveFormTab("inquiry");
                    setAiError(null);
                  }}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition duration-200 cursor-pointer ${
                    activeFormTab === "inquiry"
                      ? "border-walnut-600 text-walnut-600 font-extrabold"
                      : "border-transparent text-stone-400 hover:text-stone-700"
                  }`}
                  id="tab-inquiry"
                >
                  ✉ Inquiry Form
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveFormTab("ai");
                  }}
                  className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest border-b-2 transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
                    activeFormTab === "ai"
                      ? "border-walnut-600 text-walnut-600 font-extrabold"
                      : "border-transparent text-stone-400 hover:text-stone-700"
                  }`}
                  id="tab-ai-wizard"
                >
                  <Sparkles className="w-3.5 h-3.5 text-walnut-500" />
                  <span>AI Spec Wizard</span>
                  <span className="bg-walnut-100 text-walnut-700 text-[8px] px-1.5 py-0.5 rounded font-bold font-mono">GEMINI</span>
                </button>
              </div>
            )}

            {activeFormTab === "inquiry" ? (
              isSubmitted ? (
                <div className="text-center py-6 flex flex-col items-center" id="inquiry-success-view">
                  <div className="p-3 bg-walnut-100 text-walnut-700 rounded-full mb-4">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-lg font-bold font-serif text-stone-900 leading-tight">Inquiry Sheet Saved!</h3>
                  <p className="text-xs text-stone-500 mt-2 max-w-sm ml-auto mr-auto leading-relaxed">
                    Thank you, *{formData.name}*! Your procurement lead has been saved on your device's session memory. 
                  </p>

                  {/* Automation trigger to send right into WhatsApp */}
                  <div className="mt-8 p-5 bg-stone-50 border border-stone-150 rounded-xl max-w-md w-full">
                    <h4 className="text-xs font-bold text-stone-800 flex items-center justify-center gap-1.5 uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4 text-walnut-600" />
                      Instant Dispatch Automation
                    </h4>
                    <p className="text-[11px] text-stone-400 mt-1 lines-clamp-2">
                      Clients using AI Studio sandboxes can route this filled lead direct into Maruti’s official WhatsApp box with all details formatted instantly. 
                    </p>
                    
                    <button
                      type="button"
                      onClick={handleWhatsAppRedirect}
                      className="mt-4 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
                      id="btn-whatsapp-redirect"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Send Lead via WhatsApp
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="mt-6 text-[11px] font-bold text-stone-400 hover:text-stone-750 uppercase tracking-widest hover:underline cursor-pointer"
                    id="btn-write-another"
                  >
                    Write another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-4" id="inquiry-form">
                  <div className="border-b border-stone-100 pb-2 mb-2">
                    <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Inquiry Form</h4>
                    <p className="text-[10px] text-stone-400">Fields marked * are mandatory to compile routing logs.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5 animate-fade-in">
                      <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Rajesh Patel"
                        className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-800"
                        id="input-name"
                      />
                      {formErrors.name && (
                        <span className="text-[10px] text-red-500 font-medium">{formErrors.name}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                        Phone / Mobile * (10-digits)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g., +91 99000 12345"
                        className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-800"
                        id="input-phone"
                      />
                      {formErrors.phone && (
                        <span className="text-[10px] text-red-500 font-medium">{formErrors.phone}</span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                        Email address (Optional)
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g., architect@gmail.com"
                        className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-800"
                        id="input-email"
                      />
                    </div>

                    {/* Category interested */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                        Material of Interest *
                      </label>
                      <select
                        name="categoryInterested"
                        value={formData.categoryInterested}
                        onChange={handleInputChange}
                        className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-850"
                        id="select-category"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                      Subject Heading
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., Quotation request for 18mm Gurjan Plywood Sheets"
                      className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-800"
                      id="input-subject"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                      Requirements Detail * (Dimensions, quantities, handle types)
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Kindly supply dimensions or details. e.g., 'Need quotation for 40 sheets of BWP Plywood 18mm and tandem boxes...'"
                      className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-800 resize-none"
                      id="textarea-requirements"
                    ></textarea>
                    {formErrors.message && (
                      <span className="text-[10px] text-red-500 font-medium">{formErrors.message}</span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    className="mt-2 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition duration-200 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                    id="btn-submit-inquiry"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Inquiry details
                  </button>
                </form>
              )
            ) : (
              /* AI SPEC RECOMMENDATION WIZARD RENDERING */
              <div id="ai-spec-wizard" className="flex flex-col gap-4">
                
                {aiLoading ? (
                  /* Dynamic consultation loader */
                  <div className="text-center py-12 flex flex-col items-center justify-center animate-pulse" id="ai-loading-screen">
                    <Loader2 className="w-10 h-10 text-walnut-600 animate-spin mb-4" />
                    <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider">Consulting Gemini AI Specialist</h4>
                    <p className="text-xs text-stone-500 mt-2 font-medium max-w-xs leading-relaxed">
                      {aiLoadingMessage}
                    </p>
                  </div>
                ) : aiResult ? (
                  /* AI spec consultation summary screen */
                  <div className="flex flex-col gap-5" id="ai-recommendation-result">
                    
                    <div className="border-b border-stone-155 pb-3">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[9px] font-black tracking-widest text-walnut-600 uppercase font-mono bg-walnut-100 px-2 py-0.5 rounded">
                          MARUTI AI RECOMMENDATION SHEET
                        </span>
                        <button
                          type="button"
                          onClick={() => setAiResult(null)}
                          className="text-[10px] font-bold text-stone-400 hover:text-walnut-600 uppercase tracking-widest flex items-center gap-1 transition cursor-pointer"
                          id="btn-re-calculate"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Modify Input
                        </button>
                      </div>
                      <h4 className="text-md font-serif font-bold text-stone-900 leading-tight">
                        Perfect Material Spec for your {aiRoomType}
                      </h4>
                      <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                        {aiResult.layoutConcept}
                      </p>
                    </div>

                    {/* Recommendation items grid */}
                    <div className="flex flex-col gap-3.5">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">BEST SUITED PRODUCTS</span>
                      {aiResult.recommendedMaterials.map((mat, index) => (
                        <div 
                          key={index} 
                          className="p-4 bg-stone-50 rounded-xl border border-stone-150 flex flex-col gap-1 hover:border-walnut-200 transition group animate-fade-in"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-serif text-xs font-bold text-stone-900 group-hover:text-walnut-700 transition">
                              {mat.itemType}
                            </span>
                            <span className="bg-stone-200 text-stone-800 text-[9px] font-mono font-bold px-2 py-0.5 rounded border border-stone-300 shrink-0">
                              {mat.specification}
                            </span>
                          </div>
                          <p className="text-[10.5px] text-stone-500 leading-normal mt-1">
                            {mat.whyItFits}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Highlighted engineering spec tip block */}
                    <div className="p-4 bg-walnut-50 border border-walnut-200 rounded-xl flex items-start gap-3 animate-fade-in">
                      <div className="bg-walnut-100 p-1.5 text-walnut-700 rounded-lg shrink-0 mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-walnut-600" />
                      </div>
                      <div className="text-xs leading-relaxed text-stone-700">
                        <strong className="text-walnut-800 font-bold block mb-0.5">💡 Carpentry Spec Rule of Thumb:</strong>
                        {aiResult.technicalSpecTip}
                      </div>
                    </div>

                    {/* Integrated Lead trigger to request pricing */}
                    <div className="bg-stone-50 p-5 rounded-xl border border-stone-200 animate-fade-in">
                      <h4 className="text-xs font-bold text-stone-800 flex items-center gap-1.5 uppercase tracking-wider">
                        <MessageSquare className="w-4 h-4 text-emerald-500" />
                        Request Wholesale Quote inside Surat
                      </h4>
                      <p className="text-[10.5px] text-stone-500 mt-1.5 leading-relaxed">
                        You can send this generated material layout configuration list directly to Maruti Hardware’s WhatsApp workspace to receive physical catalog rates and sample deliveries!
                      </p>

                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (!aiResult) return;
                            const bulletMsg = `*Maruti Hardware Surat - AI Recommended Specs*\n` +
                              `--------------------------------------\n` +
                              `🏠 *Room:* ${aiRoomType}\n` +
                              `📐 *Dimensions:* ${aiWidth && aiLength ? `${aiWidth}x${aiLength} ft` : "Custom"}\n` +
                              `🎨 *Style:* ${aiStyle}\n\n` +
                              `📋 *Recommended Materials:*\n` +
                              aiResult.recommendedMaterials.map((mat, idx) => `${idx + 1}. *${mat.itemType}* (${mat.specification})`).join("\n") +
                              `\n\n💡 *Tech Tip:* ${aiResult.technicalSpecTip}\n` +
                              `--------------------------------------\n` +
                              `Inquiry generated via Maruti AI Spec Wizard`;

                            const encodedText = encodeURIComponent(bulletMsg);
                            window.open(`https://wa.me/${whatsappCoordinate}?text=${encodedText}`, "_blank");
                          }}
                          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition duration-200 inline-flex items-center justify-center gap-2 shadow-md cursor-pointer"
                          id="btn-whatsapp-ai-send"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          Send Specs via WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => setAiResult(null)}
                          className="py-3 px-5 border border-stone-350 hover:border-stone-500 text-stone-700 text-xs font-bold uppercase tracking-widest rounded-lg transition bg-white cursor-pointer"
                          id="btn-start-over"
                        >
                          Start Over
                        </button>
                      </div>
                    </div>

                  </div>
                ) : (
                  /* Spec Form layout UI details */
                  <form onSubmit={(e) => { e.preventDefault(); handleAiRecommendation(); }} className="flex flex-col gap-4 animate-fade-in" id="ai-spec-form">
                    <div className="border-b border-stone-100 pb-2 mb-2">
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-walnut-600" />
                        AI Material Specification Selector
                      </h4>
                      <p className="text-[10px] text-stone-400">Specify space metrics to receive instant expert architectural material recommendations.</p>
                    </div>

                    {aiError && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-[11px] leading-normal text-red-600 font-medium animate-fade-in">
                        ⚠️ Error Consulting Helper: {aiError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Room Selection */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                          Space / Room Type *
                        </label>
                        <select
                          value={aiRoomType}
                          onChange={(e) => setAiRoomType(e.target.value)}
                          className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-850 cursor-pointer"
                          id="select-ai-room"
                        >
                          <option value="Modular Kitchen">Modular Kitchen Installation</option>
                          <option value="Luxury Bedroom Wardrobe">Luxury Bedroom Closet / Wardrobe</option>
                          <option value="Living Room accent screen">Decorative Living Room Fluted Wall</option>
                          <option value="Main Security Door">Main Entrance Security Fitting</option>
                          <option value="Commercial Office Desks">Office Desks & Dynamic Partition</option>
                          <option value="Exterior Building Facade">Exterior Structural Facade (ACP)</option>
                        </select>
                      </div>

                      {/* Material Interest Select */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                          Focus Utility Group *
                        </label>
                        <select
                          value={aiInterest}
                          onChange={(e) => setAiInterest(e.target.value)}
                          className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-850 cursor-pointer"
                          id="select-ai-interest"
                        >
                          <option value="premium calibrated plywood">Plywood, Century Club, Gurjan Cores</option>
                          <option value="decorative laminates">Premium Acrylic, PVC Fluted Panels & Charcoal</option>
                          <option value="modular kitchen accessories">Ebco/Hettich Tandems & Soft-close baskets</option>
                          <option value="architectural handles">Mortise brass fittings & Smart Locks</option>
                          <option value="composite ACP panels">Aluminium Facades & UV Signboard layers</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Dimension: Width */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                          Room Width (feet)
                        </label>
                        <input
                          type="number"
                          value={aiWidth}
                          onChange={(e) => setAiWidth(e.target.value)}
                          placeholder="e.g. 10 (Optional)"
                          className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-850"
                          id="input-ai-width"
                        />
                      </div>

                      {/* Dimension: Length */}
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                          Room Length (feet)
                        </label>
                        <input
                          type="number"
                          value={aiLength}
                          onChange={(e) => setAiLength(e.target.value)}
                          placeholder="e.g. 12 (Optional)"
                          className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-850"
                          id="input-ai-length"
                        />
                      </div>
                    </div>

                    {/* Aesthetic look selection */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10.5px] font-bold uppercase tracking-wider text-stone-500 font-sans">
                        Styling Concept Look *
                      </label>
                      <select
                        value={aiStyle}
                        onChange={(e) => setAiStyle(e.target.value)}
                        className="border border-stone-250 rounded-md p-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-walnut-500 bg-stone-25 text-neutral-850 cursor-pointer"
                        id="select-ai-style"
                      >
                        <option value="Italian Matte Minimalist (Muted earth & anti fingerprint finish)">Italian Matte Minimalist (Muted earth & anti-fingerprint surface)</option>
                        <option value="High-Gloss Ultra Premium Metallic Panels">High-Gloss Ultra Premium Metallic Panels (Gloss acrylic facings)</option>
                        <option value="Contemporary Fluted Slabs with charcoal backlighting">Contemporary Fluted Slabs (Charcoal louvers & backlights)</option>
                        <option value="Classic Elegant Royal Walnut Wood Veneer Finish">Classic Elegant Royal Walnut (Symmetrical crown wood veneer)</option>
                        <option value="Industrial Basalt Stone Slate appearance">Industrial Basalt Slate (Textured dark veneers & powder coat metal)</option>
                      </select>
                    </div>

                    {/* Submit Spec Action */}
                    <button
                      type="submit"
                      className="mt-3 py-3.5 bg-walnut-600 hover:bg-walnut-700 text-white text-xs font-bold uppercase tracking-widest rounded-lg transition duration-200 inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer"
                      id="btn-trigger-ai"
                    >
                      <Wand2 className="w-4 h-4" />
                      Generate Calibrated Spec Recommendations
                    </button>
                  </form>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
