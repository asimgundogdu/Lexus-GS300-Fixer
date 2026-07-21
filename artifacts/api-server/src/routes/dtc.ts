import { Router } from "express";
import { dtcCodes, buildSystems } from "../data/gs300-data";

const router = Router();

// GET /dtc-codes
router.get("/dtc-codes", (req, res) => {
  const { search, system, severity } = req.query as {
    search?: string;
    system?: string;
    severity?: string;
  };

  let results = [...dtcCodes];

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.code.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.symptoms.some((s) => s.toLowerCase().includes(q)) ||
        d.causes.some((c) => c.toLowerCase().includes(q)),
    );
  }

  if (system) {
    results = results.filter((d) => d.system === system);
  }

  if (severity) {
    results = results.filter((d) => d.severity === severity);
  }

  res.json(results);
});

// GET /dtc-codes/:code
router.get("/dtc-codes/:code", (req, res) => {
  const code = req.params.code.toUpperCase();
  const dtc = dtcCodes.find((d) => d.code.toUpperCase() === code);
  if (!dtc) {
    res.status(404).json({ error: `Arıza kodu bulunamadı: ${code}` });
    return;
  }
  res.json(dtc);
});

// GET /stats/summary
router.get("/stats/summary", (_req, res) => {
  const bySeverity: Record<string, number> = {
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
  };

  for (const dtc of dtcCodes) {
    bySeverity[dtc.severity] = (bySeverity[dtc.severity] ?? 0) + 1;
  }

  const systemCounts: Record<string, { label: string; count: number }> = {};
  for (const dtc of dtcCodes) {
    if (!systemCounts[dtc.system]) {
      systemCounts[dtc.system] = { label: dtc.systemLabel, count: 0 };
    }
    systemCounts[dtc.system].count++;
  }

  const bySystem = Object.entries(systemCounts).map(([system, { label, count }]) => ({
    system,
    label,
    count,
  }));

  res.json({
    totalCodes: dtcCodes.length,
    bySeverity,
    bySystem,
  });
});

// GET /systems
router.get("/systems", (_req, res) => {
  res.json(buildSystems());
});

// GET /systems/:systemId/issues
router.get("/systems/:systemId/issues", (req, res) => {
  const { systemId } = req.params;
  const systems = buildSystems();
  const system = systems.find((s) => s.id === systemId);

  if (!system) {
    res.status(404).json({ error: `Sistem bulunamadı: ${systemId}` });
    return;
  }

  const issues = dtcCodes.filter((d) => d.system === systemId);
  res.json(issues);
});

export default router;
