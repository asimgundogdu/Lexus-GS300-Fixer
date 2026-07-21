import React from "react";
import { Layout } from "@/components/layout";
import { useLocation } from "wouter";
import { 
  useGetStatsSummary, 
  useListSystems, 
  useListDtcCodes 
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Activity, AlertTriangle, CheckCircle2, ChevronRight, Gauge, Layers, Thermometer, BatteryWarning, Settings2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export function Dashboard() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: stats, isLoading: statsLoading } = useGetStatsSummary();
  const { data: systems, isLoading: systemsLoading } = useListSystems();
  const { data: recentCodes, isLoading: codesLoading } = useListDtcCodes({ severity: "critical" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getSystemIcon = (iconName: string) => {
    switch (iconName) {
      case 'engine': return <Gauge className="w-6 h-6" />;
      case 'transmission': return <Layers className="w-6 h-6" />;
      case 'abs': return <Activity className="w-6 h-6" />;
      case 'electrical': return <BatteryWarning className="w-6 h-6" />;
      case 'cooling': return <Thermometer className="w-6 h-6" />;
      default: return <Settings2 className="w-6 h-6" />;
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8 pb-20 md:pb-0 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Hero Section */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Sistem Durumu
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl">
              2005 Lexus GS300 için arıza tespiti ve onarım rehberi. Hata kodunu girin veya belirtilerden arıza teşhisi yapın.
            </p>
          </div>

          <form onSubmit={handleSearch} className="relative mt-2 max-w-xl group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="search"
              placeholder="OBD-II Kodu (örn. P0300) veya kelime arayın..."
              className="pl-10 h-14 bg-card/50 border-border/50 focus-visible:ring-primary text-base rounded-xl font-mono shadow-inner"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-dashboard"
            />
            <Button 
              type="submit" 
              className="absolute right-1.5 top-1.5 h-11 px-6 rounded-lg font-bold"
            >
              Ara
            </Button>
          </form>
        </section>

        {/* Stats Summary */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {statsLoading ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-28 rounded-xl bg-card" />)
          ) : stats ? (
            <>
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2">
                  <div className="text-3xl font-mono font-bold text-foreground">{stats.totalCodes}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Toplam Kod</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-destructive/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-destructive/5 group-hover:bg-destructive/10 transition-colors" />
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2 relative z-10">
                  <div className="text-3xl font-mono font-bold text-destructive">{stats.bySeverity?.critical || 0}</div>
                  <div className="text-xs text-destructive/80 uppercase tracking-wider font-semibold">Kritik Arıza</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-orange-500/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-orange-500/5 group-hover:bg-orange-500/10 transition-colors" />
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2 relative z-10">
                  <div className="text-3xl font-mono font-bold text-orange-500">{stats.bySeverity?.high || 0}</div>
                  <div className="text-xs text-orange-500/80 uppercase tracking-wider font-semibold">Yüksek Öncelik</div>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-primary/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                <CardContent className="p-6 flex flex-col items-center justify-center text-center gap-2 relative z-10">
                  <div className="text-3xl font-mono font-bold text-primary">{stats.bySeverity?.medium || 0}</div>
                  <div className="text-xs text-primary/80 uppercase tracking-wider font-semibold">Orta Öncelik</div>
                </CardContent>
              </Card>
            </>
          ) : null}
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Systems Overview */}
          <section className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Araç Sistemleri</h2>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {systemsLoading ? (
                Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl bg-card" />)
              ) : systems?.map((sys) => (
                <Card 
                  key={sys.id} 
                  className="bg-card/40 border-border/50 hover:bg-card hover:border-border transition-all cursor-pointer group"
                  onClick={() => setLocation(`/systems/${sys.id}`)}
                >
                  <CardHeader className="p-5 flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        {getSystemIcon(sys.icon)}
                      </div>
                      <CardTitle className="text-base">{sys.label}</CardTitle>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </CardHeader>
                  <CardContent className="p-5 pt-2 flex justify-between items-end">
                    <p className="text-xs text-muted-foreground line-clamp-1 flex-1 pr-4">
                      {sys.description}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      {sys.criticalCount > 0 && (
                        <Badge variant="destructive" className="font-mono text-[10px] px-1.5 py-0">
                          {sys.criticalCount} Kritik
                        </Badge>
                      )}
                      <Badge variant="secondary" className="font-mono text-[10px] px-1.5 py-0 bg-secondary/50">
                        {sys.codeCount} Kod
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Critical Codes */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Kritik Arızalar
              </h2>
            </div>

            <div className="flex flex-col gap-3">
              {codesLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-xl bg-card" />)
              ) : recentCodes && recentCodes.length > 0 ? (
                recentCodes.slice(0, 5).map((code) => (
                  <Card 
                    key={code.code} 
                    className="bg-card/40 border-destructive/20 hover:border-destructive/50 transition-colors cursor-pointer"
                    onClick={() => setLocation(`/dtc/${code.code}`)}
                  >
                    <CardContent className="p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-destructive text-lg">{code.code}</span>
                        <Badge variant="outline" className="text-[10px] border-destructive/20 text-destructive">Kritik</Badge>
                      </div>
                      <p className="text-sm font-medium line-clamp-1">{code.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{code.systemLabel}</p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="bg-card/40 border-border/50 border-dashed">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-3">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                    <p className="text-sm text-muted-foreground">Kritik arıza kodu bulunamadı.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

