import { Router } from "express";
import { symptomCategories, diagnoseBySymptoms } from "../data/gs300-data";

const router = Router();

// GET /symptoms/list
router.get("/symptoms/list", (_req, res) => {
  res.json(symptomCategories);
});

// POST /symptoms/diagnose
router.post("/symptoms/diagnose", (req, res) => {
  const { symptoms, system } = req.body as {
    symptoms?: string[];
    system?: string | null;
  };

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    res.status(400).json({ error: "En az bir semptom seçilmelidir." });
    return;
  }

  const matches = diagnoseBySymptoms(symptoms, system);

  let confidence: "high" | "medium" | "low" = "low";
  if (matches.length > 0) {
    const topScore = matches[0].score;
    if (topScore >= 70) confidence = "high";
    else if (topScore >= 40) confidence = "medium";
    else confidence = "low";
  }

  const note =
    matches.length === 0
      ? "Seçilen semptomlara uyan arıza kodu bulunamadı. Farklı semptomlar deneyin veya doğrudan arıza kodu arayın."
      : `${matches.length} olası arıza tespit edildi. Kesin tanı için OBD-II tarayıcı kullanılması önerilir.`;

  res.json({ matches, confidence, note });
});

export default router;
