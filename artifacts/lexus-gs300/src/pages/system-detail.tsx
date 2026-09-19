import React from "react";
import { Layout } from "@/components/layout";
import { useGetSystemIssues, useListSystems, DtcCodeSeverity } from "@/lib/local-api";
import { useRoute, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Gauge, Layers, Activity, Thermometer, BatteryWarning, Settings2, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SystemDetail() {
  const [match, params] = useRoute("/systems/:systemId");
  const [, setLocation] = useLocation();
  const systemId = params?.systemId || "";
  const [severityFilter, setSeverityFilter] = React.useState<string>("all");

  const { data: systems, isLoading: systemsLoading } = useListSystems();
  const system = systems?.find(s => s.id === systemId);

  const { data: issues, isLoading: issuesLoading } = useGetSystemIssues(systemId, {
    query: { enabled: !!systemId, queryKey: ['/api/systems', systemId, 'issues'] }
  });

  const getSystemIcon = (iconName: string) => {
    switch (iconName) {
      case 'engine': return <Gauge className="w-8 h-8" />;
      case 'transmission': return <Layers className="w-8 h-8" />;
      case 'abs': return <Activity className="w-8 h-8" />;
      case 'electrical': return <BatteryWarning className="w-8 h-8" />;
      case 'cooling': return <Thermometer className="w-8 h-8" />;
      default: return <Settings2 className="w-8 h-8" />;
    }
  };

  const filteredIssues = React.useMemo(() => {
    if (!issues) return [];
    if (severityFilter === "all") return issues;
    return issues.filter(issue => issue.severity === severityFilter);
  }, [issues, severityFilter]);

  if (systemsLoading) {
    return (
      <Layout>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-40 rounded-xl" />
            <Skeleton className="h-40 rounded-xl" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!system) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <h2 className="text-2xl font-bold">Sistem Bulunamadı</h2>
          <Button onClick={() => setLocation("/")} variant="link" className="mt-4">Panoya Dön</Button>
        </div>
      </Layout>
    );
  }

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case DtcCodeSeverity.critical: return <Badge variant="destructive" className="text-[10px]">Kritik</Badge>;
      case DtcCodeSeverity.high: return <Badge className="bg-orange-500/20 text-orange-500 hover:bg-orange-500/30 text-[10px] border-none">Yüksek</Badge>;
      case DtcCodeSeverity.medium: return <Badge variant="secondary" className="text-primary bg-primary/10 text-[10px] border-none">Orta</Badge>;
      case DtcCodeSeverity.low: return <Badge variant="outline" className="text-green-500 border-green-500/20 text-[10px]">Düşük</Badge>;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-20 md:pb-0 animate-in fade-in duration-500 max-w-5xl mx-auto w-full">
        
        <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="w-fit text-muted-foreground -ml-3">
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
        </Button>

        {/* System Header */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            {getSystemIcon(system.icon)}
          </div>
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              {getSystemIcon(system.icon)}
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{system.label}</h1>
              <p className="text-sm text-muted-foreground">{system.description}</p>
            </div>
          </div>

          <div className="flex gap-3 relative z-10 w-full md:w-auto">
            <div className="bg-secondary/40 border border-border/50 rounded-lg px-4 py-2 flex-1 md:flex-none text-center">
              <div className="text-2xl font-mono font-bold">{system.codeCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Toplam Kod</div>
            </div>
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-2 flex-1 md:flex-none text-center">
              <div className="text-2xl font-mono font-bold text-destructive">{system.criticalCount}</div>
              <div className="text-[10px] uppercase tracking-wider text-destructive/80 font-bold">Kritik</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Sık Görülen Arızalar
          </h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[180px] bg-card h-9">
                <SelectValue placeholder="Öncelik Filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value={DtcCodeSeverity.critical}>Kritik Arızalar</SelectItem>
                <SelectItem value={DtcCodeSeverity.high}>Yüksek Öncelikli</SelectItem>
                <SelectItem value={DtcCodeSeverity.medium}>Orta Öncelikli</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Issue Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {issuesLoading ? (
            Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl bg-card" />)
          ) : filteredIssues.length > 0 ? (
            filteredIssues.map((issue) => (
              <Card 
                key={issue.code}
                className="bg-card/40 border-border/50 hover:border-primary/50 hover:bg-card transition-all cursor-pointer group flex flex-col h-full"
                onClick={() => setLocation(`/dtc/${issue.code}`)}
              >
                <CardHeader className="pb-3 flex flex-row items-start justify-between space-y-0">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {issue.code}
                    </span>
                    {getSeverityBadge(issue.severity)}
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 pb-4">
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{issue.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-auto">
                    {issue.description}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full py-12 text-center border border-dashed border-border/50 rounded-xl bg-card/20">
              <p className="text-muted-foreground">Bu sistem için seçilen kriterde arıza kodu bulunamadı.</p>
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}
