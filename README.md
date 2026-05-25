# Maruti Hardware & Plywood — Kamrej, Surat

Premium, responsive, and performance-optimized storefront platform built with **React**, **TypeScript**, and **Tailwind CSS**. Designed for architects, interior designers, commercial contractors, and retail customers seeking elite building materials, designer plywood sheets, laminates, and bespoke kitchen hardware in Surat, Gujarat.

---

## 📖 Table of Contents
1. [Brand Overview](#-brand-overview)
2. [Core Features](#-core-features)
3. [Tech Stack](#-tech-stack)
4. [Project Structure](#-project-structure)
5. [Development & Build Commands](#-development--build-commands)
6. [Design & UI/UX Principles](#-design--uiux-principles)
7. [Contact & Integration Info](#-contact--integration-info)

---

## 🏢 Brand Overview

Established in 2012 in Kamrej, Surat, **Maruti Hardware & Plywood** has grown into South Gujarat's premier wholesaler and retailer. The brand represents uncompromising quality across all structural wood elements and architectural hardware:
- **Calibrated Plywood Core bases** (Maruti Gold BWP, Century Club Prime)
- **High-End Decorative Surface Films** (1.0mm PVC laminates, glossy acrylic decors, charcoal sheets, and louvers)
- **Architectural Silent Fittings** (Hettich drawer runners, Ebco slides, and concealed hinges)
- **Innovative Assemblies** (Stainless steel modular kitchen configurations and heavy-duty entrance accessories)

---

## ⚡ Core Features

- **Interactive Dynamic Catalog**: Customers can search and filter through hundreds of items across diverse categories like plywood, premium laminates, door handles, wardrobe fittings, secure entry locks, adhesive compounds, and modular kitchen products.
- **Detailed Specifications Lightbox**: Selecting any product displays a rich dashboard containing technical criteria (waterproof standards, core wood species, toxicity emission ratings, dimensional choices, and application scenarios).
- **Direct Dispatch WhatsApp Integration**: Every product modal and the custom inquiry interface computes structured message strings, redirecting prospects into Maruti's official backup communication line (`+91 9714338379`) with item details formatted on the fly.
- **Responsive Showroom Map & Visual Wayfinder**: Contains an interactive nested schematics view mapping Maruti's flagship showroom location relative to crucial arteries, specifically focusing on the National Highway 48 (N.H.48) corridor routing towards Ahmedabad or Mumbai.
- **Showcase Portfolio Lightbox**: Filterable view displays architectural and residential projects completed using materials supplied by Maruti Hardware. Supports full micro-interactivity including swipe transitions, lightbox zooming, and interactive detail panes.

---

## 🛠️ Tech Stack

- **Runtime & Compilation**: Node.js, Vite, TypeScript (v5+)
- **Frontend Framework**: React 18+
- **Styling Architecture**: Tailwind CSS (Utility-first approach, modern typography styling)
- **Animation System**: Framer Motion (`motion/react`) for smooth scrolling transitions and modal zoom entrances.
- **Icon Library**: Branded glyphs exclusively sourced from `lucide-react` for semantic uniformity and vector scaling.

---

## 🗄️ Project Structure

The project has a highly modular footprint to uphold clean separation of concerns and meet low-latency rendering metrics:

```bash
├── package.json               # Package coordinates, dependency references, and action scripts
├── tsconfig.json              # TypeScript compilation specifications and type constraints
├── vite.config.ts             # Vite server bindings (port 3000 mapping, asset compression)
├── metadata.json              # Sandbox application details, capabilities, and permissions
├── .env.example               # Clean, key-empty configuration template
│
└── src
    ├── main.tsx               # Virtual DOM initialization and entry loader
    ├── App.tsx                # Central routing dashboard, main responsive views, and layout structures
    ├── index.css              # Style declarations, Tailwind directive imports, and global resets
    ├── types.ts               # Rigid strict-type boundaries for items, projects, and products
    ├── data.ts                # Structured product indices, catalog assets, brand specifications, and gallery items
    │
    └── components
        ├── Header.tsx         # Modern blurred navigation bar with reactive tab active states
        ├── Footer.tsx         # Structured footer containing core catalog taxonomy, coordinates, and hours
        ├── Logo.tsx           # Scalable typographic vector brand identity markup
        ├── ProductSection.tsx # Searchable, categorized item grid containing responsive details modal
        ├── GalleryView.tsx    # Swipeable portfolio lightbox and interactive client review carousel
        └── ContactInquiry.tsx # Interactive form with direct WhatsApp API triggers and schematic physical map
```

---

## 🚀 Development & Build Commands

Before building or initiating local testing, verify that node packages are installed. 

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Local Development Server (Port: 3000)
```bash
npm run dev
```

### 3. Run Strict Type & Syntax Validation
```bash
npm run lint
```

### 4. Compile Production-Ready Assets
```bash
npm run build
```

The compiled, minified, and lightweight static footprint is emitted to the `/dist` directory, optimized for high performance and compatibility with CDN distribution.

---

## 🎨 Design & UI/UX Principles

The application has been styled with deep emphasis on **Architectural Elegance** and **Industrial Precision**:
- **Color Palette**: Deep basalt carbon/stone hues paired beautifully with rich, tactile walnut wood ambers (`#b45309`) and off-white sands to simulate an authentic designer carpentry ecosystem.
- **Reflective Accents**: Fine border rules, glassmorphism overlays, and gradient dividers structure rhythm across sections without noisy clutter.
- **Accessibility**: High-contrast ratios preserved for all informational typography. Focus and hover feedbacks are highly pronounced to improve mechanical usability on mouse cursors and mobile touchpoints alike.
- **Zero AI-Slop Philosophy**: Humanized, literal labeling applied everywhere. Completely free from placeholder telemetry logs, system port displays, or noisy terminal artifacts, presenting a clean and corporate showroom presentation.

---

## 🤝 Contact & Integration Info

To coordinate stock inspections, arrange shipping variables, or request customized GST invoicing, customers are directed to interact with:

- **Flagship Location**: National Highway 48 (N.H.48), Near Navjivan Hotel, Opp. Kamrej Toll Plaza, Kamrej, Surat, Gujarat - 394185
- **Official Dispatch Line**: +91 9714338379 / +91 9904355557
- **Primary Email**: info@marutihardware.com

---

*Handcrafted with absolute care for Maruti Hardware & Plywood Kamrej, Surat.*
