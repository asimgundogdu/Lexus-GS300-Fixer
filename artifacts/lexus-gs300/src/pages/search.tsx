import React from "react";
import { Layout } from "@/components/layout";
import { useListDtcCodes, DtcCodeSeverity, getListDtcCodesQueryKey } from "@workspace/api-client-react";
import { useLocation, useSearch } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function SearchPage() {
  const [location, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = React.useState(initialQuery);
  const [activeSearch, setActiveSearch] = React.useState(initialQuery);

  const { data: results, isLoading, isFetching } = useListDtcCodes(
    { search: activeSearch },
    { query: { enabled: activeSearch.length > 1, queryKey: getListDtcCodesQueryKey({ search: activeSearch }) } }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 1) {
      setActiveSearch(query.trim());
      setLocation(`/search?q=${encodeURIComponent(query.trim())}`, { replace: true });
    }
  };

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
      <div className="flex flex-col gap-6 pb-20 md:pb-0 max-w-3xl mx-auto w-full">
        
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Kapsamlı Arama</h1>
        
        <form onSubmit={handleSearch} className="relative flex gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Hata kodu (P0300) veya kelime arayın..."
              className="pl-10 h-12 bg-card/50 border-border/50 focus-visible:ring-primary text-base font-mono"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
          </div>
          <Button type="submit" className="h-12 px-6" disabled={isFetching || query.length < 2}>
            {isFetching ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ara"}
          </Button>
        </form>

        <div className="flex flex-col gap-4 mt-4">
          {!activeSearch ? (
            <div className="py-12 text-center flex flex-col items-center gap-3 text-muted-foreground opacity-60">
              <Search className="w-12 h-12" />
              <p>Aramaya başlamak için en az 2 karakter girin.</p>
            </div>
          ) : isLoading || isFetching ? (
            Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-xl bg-card/50" />)
          ) : results && results.length > 0 ? (
            <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <p className="text-sm text-muted-foreground mb-2">
                "{activeSearch}" için {results.length} sonuç bulundu
              </p>
              {results.map((code) => (
                <Card 
                  key={code.code}
                  className="bg-card/40 border-border/50 hover:border-primary/50 cursor-pointer transition-colors group"
                  onClick={() => setLocation(`/dtc/${code.code}`)}
                >
                  <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-lg font-bold text-primary group-hover:text-primary transition-colors">
                          {code.code}
                        </span>
                        {getSeverityBadge(code.severity)}
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">{code.systemLabel}</Badge>
                      </div>
                      <h3 className="font-medium text-sm">{code.title}</h3>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center flex flex-col items-center gap-3 text-muted-foreground bg-card/20 rounded-xl border border-dashed border-border/50">
              <AlertCircle className="w-8 h-8 text-muted-foreground/50" />
              <p>"{activeSearch}" için sonuç bulunamadı.</p>
              <Button variant="link" onClick={() => { setQuery(""); setActiveSearch(""); }}>
                Aramayı Temizle
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
