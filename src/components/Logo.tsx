/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  lightMode?: boolean;
}

export default function Logo({ className = "", iconOnly = false, lightMode = false }: LogoProps) {
  const primaryColor = lightMode ? "text-white" : "text-matte-black";
  const accentColor = "text-walnut-500";
  const subtitleColor = lightMode ? "text-stone-300" : "text-stone-500";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Monogram M SVG Symbol */}
      <div className="relative group flex-shrink-0">
        <svg
          width="42"
          height="42"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:rotate-6 drop-shadow-sm"
        >
          {/* Base Layer: Wood panel block (Left pillar) */}
          <rect
            x="14"
            y="20"
            width="18"
            height="60"
            rx="4"
            fill="#ac7e50" // Walnut brown
            className="transition-all duration-300 group-hover:fill-[#97673f]"
          />
          {/* Hinge plate decorative circular points */}
          <circle cx="23" cy="28" r="3" fill="#2f1d13" />
          <circle cx="23" cy="50" r="3" fill="#2f1d13" />
          <circle cx="23" cy="72" r="3" fill="#2f1d13" />

          {/* Connected Wood panel layer (Right pillar) */}
          <rect
            x="68"
            y="20"
            width="18"
            height="60"
            rx="4"
            fill="#121212" // Matte black
            className="transition-all duration-300 group-hover:fill-[#2d2d2d]"
          />
          <circle cx="77" cy="28" r="3" fill="#fcfbfa" />
          <circle cx="77" cy="50" r="3" fill="#fcfbfa" />
          <circle cx="77" cy="72" r="3" fill="#fcfbfa" />

          {/* Central Layer: Hinge and plywood laminations in M-form */}
          <path
            d="M 28 25 L 50 64 L 72 25"
            stroke="#ac7e50"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          <path
            d="M 32 30 L 50 68 L 68 30"
            stroke="#121212"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Center hinge pin/screw connector (The heart of the hardware) */}
          <circle cx="50" cy="66" r="5" fill="#e8dcc4" stroke="#ac7e50" strokeWidth="2" />
          <line x1="47" y1="66" x2="53" y2="66" stroke="#222" strokeWidth="1.5" />
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex flex-col select-none">
          <div className="flex items-center gap-1.5">
            <span className={`text-xl font-extrabold tracking-wider uppercase font-sans ${primaryColor}`}>
              Maruti
            </span>
          </div>
          <span className={`text-[9.5px] font-bold uppercase tracking-[0.25em] font-sans -mt-1 ${subtitleColor}`}>
            Hardware & Plywood
          </span>
        </div>
      )}
    </div>
  );
}
