/**
 * Statik yerel API katmanı — ağ çağrısı yapmaz.
 * Tüm veriler src/data/gs300-data.ts içinden gelir.
 * Sayfalardaki hooks, @workspace/api-client-react yerine buradan import edilir.
 */
import React from "react";
import {
  dtcCodes,
  symptomCategories,
  filterDtcCodes,
  getDtcCode,
  buildSystems,
  getStatsSummary,
  diagnoseBySymptoms,
  type DtcCode,
  type SymptomCategory,
  type VehicleSystem,
  type StatsSummary,
  type DiagnosisResult,
  type DiagnosisMatch,
} from "@/data/gs300-data";

export type { DtcCode, SymptomCategory, VehicleSystem, StatsSummary, DiagnosisResult, DiagnosisMatch };
export { dtcCodes, symptomCategories };

// ─── Severity / Difficulty sabitleri ──────────────────────────────────────────

export const DtcCodeSeverity = {
  critical: "critical",
  high: "high",
  medium: "medium",
  low: "low",
} as const;

export const DtcCodeDifficulty = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  professional: "professional",
} as const;

// ─── Query hooks ──────────────────────────────────────────────────────────────

type QueryResult<T> = { data: T; isLoading: false; isError: false; isFetching: false };

export function useGetStatsSummary(): QueryResult<StatsSummary> {
  const data = React.useMemo(() => getStatsSummary(), []);
  return { data, isLoading: false, isError: false, isFetching: false };
}

export function useListSystems(): QueryResult<VehicleSystem[]> {
  const data = React.useMemo(() => buildSystems(), []);
  return { data, isLoading: false, isError: false, isFetching: false };
}

export function useListDtcCodes(
  params?: { search?: string; system?: string; severity?: string },
  _options?: unknown,
): QueryResult<DtcCode[]> {
  const search = params?.search;
  const system = params?.system;
  const severity = params?.severity;
  const data = React.useMemo(
    () => filterDtcCodes({ search, system, severity }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search, system, severity],
  );
  return { data, isLoading: false, isError: false, isFetching: false };
}

export function useGetDtcCode(
  code: string,
  _options?: unknown,
): { data: DtcCode | undefined; isLoading: false; isError: boolean } {
  const data = React.useMemo(() => getDtcCode(code), [code]);
  return { data, isLoading: false, isError: !data && !!code };
}

export function useListSymptoms(): QueryResult<SymptomCategory[]> {
  return { data: symptomCategories, isLoading: false, isError: false, isFetching: false };
}

export function useGetSystemIssues(
  systemId: string,
  _options?: unknown,
): { data: DtcCode[]; isLoading: false; isError: boolean } {
  const data = React.useMemo(
    () => dtcCodes.filter((d) => d.system === systemId),
    [systemId],
  );
  const systems = buildSystems();
  const systemExists = systems.some((s) => s.id === systemId);
  return { data, isLoading: false, isError: !systemExists && !!systemId };
}

// ─── Mutation hook ────────────────────────────────────────────────────────────

export function useDiagnoseBySymptoms() {
  const [result, setResult] = React.useState<DiagnosisResult | null>(null);

  const mutate = ({ data }: { data: { symptoms: string[]; system?: string | null } }) => {
    const matches = diagnoseBySymptoms(data.symptoms, data.system);
    let confidence: "high" | "medium" | "low" = "low";
    if (matches.length > 0) {
      const top = matches[0].score;
      if (top >= 70) confidence = "high";
      else if (top >= 40) confidence = "medium";
    }
    const note =
      matches.length === 0
        ? "Seçilen semptomlara uyan arıza kodu bulunamadı. Farklı semptomlar deneyin veya doğrudan arıza kodu arayın."
        : `${matches.length} olası arıza tespit edildi. Kesin tanı için OBD-II tarayıcı kullanılması önerilir.`;
    setResult({ matches, confidence, note });
  };

  const reset = () => setResult(null);

  return { mutate, data: result, isPending: false, reset };
}
