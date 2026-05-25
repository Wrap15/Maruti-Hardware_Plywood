import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gracefully initialize Gemini client only when key is present, preventing crash on initial launch
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }

  // API recommendation route
  app.post("/api/gemini/recommend", async (req, res) => {
    try {
      // Lazy initialization fallback to support updates after runtime starts
      if (!ai) {
        const currentKey = process.env.GEMINI_API_KEY;
        if (currentKey) {
          ai = new GoogleGenAI({
            apiKey: currentKey,
            httpOptions: {
              headers: {
                "User-Agent": "aistudio-build",
              }
            }
          });
        }
      }

      if (!ai) {
        return res.status(400).json({
          error: "GEMINI_API_KEY environment variable is missing. Please configure it in Settings > Secrets."
        });
      }

      const { roomType, width, length, style, interest } = req.body;

      if (!roomType || !style) {
        return res.status(400).json({ error: "Room type and style preference are required parameters." });
      }

      const area = (width && length) ? `${width}x${length} (${width * length} sq. ft)` : "Not specified";

      const prompt = `Provide 3-4 professional material selection recommendations from Maruti Hardware & Plywood (Kamrej, Surat, India) based on these details:
      - Room Type: ${roomType}
      - Space Dimensions: ${area}
      - Preferred Aesthetic: ${style}
      - Primary Focus Category: ${interest || "All categories"}

      You must recommend actual premium woodwork, laminates, and hardware products matching Maruti's high-end portfolio (e.g., Calibrated Gurjan-Core BWP Plywood sheets, 1.0mm anti-fingerprint Matte/Glossy PVC Laminates, decorative fluted charcoal paneling louvers, high-weight-capacity Ebco drawer or Hettich tandem systems, soft-close silent hydraulic fittings, and smart digital handle locks). Inform the user on factors related to Surat's hot coastal high-humidity environment (e.g. recommending BWP Marine grade woods). Provide realistic specifications. Send valid JSON matching the specified schema.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are the Head Materials and Architecture Consultant at Maruti Hardware & Plywood in Kamrej, Surat. Speak as a premium, supportive, highly experienced structural materials advisor. Do not write generic tips—be extremely specific to wood species, laminate thickness or drawer weight tolerances.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              layoutConcept: {
                type: Type.STRING,
                description: "Short elegant summary (2 sentences) of the overall visual composition and styling strategy."
              },
              recommendedMaterials: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    itemType: {
                      type: Type.STRING,
                      description: "Bespoke product name (e.g., Maruti Gold 100% Calibrated Gurjan Plywood, or 1.0mm Elite Soft-Touch Laminate)."
                    },
                    specification: {
                      type: Type.STRING,
                      description: "Clear technical specification detail (e.g., 18mm thickness, BWP grade, or 45kg load-bearing soft-closing)."
                    },
                    whyItFits: {
                      type: Type.STRING,
                      description: "Why it matches this style/room and how it withstands Surat's humid weather spikes."
                    }
                  },
                  required: ["itemType", "specification", "whyItFits"]
                }
              },
              technicalSpecTip: {
                type: Type.STRING,
                description: "Direct numerical specification recommendation for carpentry structural wood thickness or runner length."
              },
              whatsappSummaryText: {
                type: Type.STRING,
                description: "Single structured text paragraph (120-150 words) beginning with 'Greeting from Maruti Customer! Here are my AI-Powered recommended specifications for my room...' summarizing the recommended list so the user can easily copy and send via WhatsApp."
              }
            },
            required: ["layoutConcept", "recommendedMaterials", "technicalSpecTip", "whatsappSummaryText"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        return res.status(500).json({ error: "The recommendation engine failed to generate response text." });
      }

      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("Gemini API server route error:", error);
      res.status(550).json({ error: error.message || "An error occurred inside the recommendation engine." });
    }
  });

  // Vite middleware setup for Development environment
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "3000", () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
}

startServer();
