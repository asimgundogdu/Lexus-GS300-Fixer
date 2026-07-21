import React from "react";
import { Layout } from "@/components/layout";
import { useGetDtcCode, DtcCodeSeverity, DtcCodeDifficulty } from "@workspace/api-client-react";
import { useRoute, useLocation } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Info, Wrench, Clock, Banknote, ListChecks, CheckCircle2, ChevronRight, Share2, Printer, Activity } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function DtcDetail() {
  const [match, params] = useRoute("/dtc/:code");
  const [, setLocation] = useLocation();
  const code = params?.code || "";

  const { data: dtc, isLoading, isError } = useGetDtcCode(code, { 
    query: { enabled: !!code, queryKey: ['/api/dtc-codes', code] } 
  });

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case DtcCodeSeverity.critical: return { color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20", label: "Kritik" };
      case DtcCodeSeverity.high: return { color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20", label: "Yüksek" };
      case DtcCodeSeverity.medium: return { color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", label: "Orta" };
      case DtcCodeSeverity.low: return { color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20", label: "Düşük" };
      default: return { color: "text-foreground", bg: "bg-secondary", border: "border-border", label: severity };
    }
  };

  const getDifficultyConfig = (diff: string) => {
    switch (diff) {
      case DtcCodeDifficulty.easy: return { label: "Kolay", dots: 1, color: "text-green-500" };
      case DtcCodeDifficulty.medium: return { label: "Orta", dots: 2, color: "text-primary" };
      case DtcCodeDifficulty.hard: return { label: "Zor", dots: 3, color: "text-orange-500" };
      case DtcCodeDifficulty.professional: return { label: "Profesyonel", dots: 4, color: "text-destructive" };
      default: return { label: diff, dots: 0, color: "text-muted-foreground" };
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex flex-col gap-6">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <div className="grid md:grid-cols-3 gap-6">
            <Skeleton className="h-64 rounded-xl md:col-span-2" />
            <Skeleton className="h-64 rounded-xl md:col-span-1" />
          </div>
        </div>
      </Layout>
    );
  }

  if (isError || !dtc) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold">Kod Bulunamadı</h2>
          <p className="text-muted-foreground">Aradığınız "{code}" kodu veritabanında bulunamadı.</p>
          <Button onClick={() => setLocation("/")} variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Panoya Dön
          </Button>
        </div>
      </Layout>
    );
  }

  const sev = getSeverityConfig(dtc.severity);
  const diff = getDifficultyConfig(dtc.difficulty);

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-20 md:pb-0 max-w-5xl mx-auto w-full animate-in fade-in duration-500">
        
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="w-8 h-8 text-muted-foreground">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-8 h-8 text-muted-foreground">
              <Printer className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Hero Card */}
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-lg">
          <div className={`absolute top-0 w-full h-1.5 ${sev.bg} border-b ${sev.border}`} />
          <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-4xl md:text-5xl font-mono font-black tracking-tight text-foreground drop-shadow-md">
                  {dtc.code}
                </h1>
                <Badge variant="outline" className={`${sev.color} ${sev.bg} ${sev.border} border uppercase tracking-widest font-bold px-3 py-1`}>
                  {sev.label}
                </Badge>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mt-2 text-foreground/90">{dtc.title}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <Badge variant="secondary" className="bg-secondary/50 hover:bg-secondary/80 cursor-pointer" onClick={() => setLocation(`/systems/${dtc.system}`)}>
                  {dtc.systemLabel}
                </Badge>
              </div>
            </div>

            <div className="flex gap-4 md:flex-col md:items-end p-4 rounded-xl bg-secondary/20 border border-border/50">
              <div className="flex flex-col gap-1 md:items-end">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Zorluk</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{diff.label}</span>
                  <div className="flex gap-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`w-2 h-2 rounded-full ${i <= diff.dots ? diff.color : 'bg-muted/30'}`} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block w-full h-[1px] bg-border/50 my-1" />
              <div className="flex flex-col gap-1 md:items-end">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Tahmini Maliyet</span>
                <div className="flex items-center gap-1 font-mono font-bold text-base">
                  <Banknote className="w-4 h-4 text-primary" />
                  {dtc.estimatedCost}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Description */}
            <section className="bg-card/40 border border-border/50 rounded-xl p-6">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                <Info className="w-5 h-5 text-primary" />
                Açıklama
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {dtc.description}
              </p>
            </section>

            {/* Causes & Symptoms */}
            <div className="grid sm:grid-cols-2 gap-6">
              <section className="bg-card/40 border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  Olası Nedenler
                </h3>
                <ul className="flex flex-col gap-3">
                  {dtc.causes.map((cause, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="bg-card/40 border border-border/50 rounded-xl p-6">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Belirtiler
                </h3>
                <ul className="flex flex-col gap-3">
                  {dtc.symptoms.map((sym, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Repair Steps */}
            <section className="bg-card border border-border/50 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-border/50 bg-secondary/10 flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-primary" />
                  Onarım Adımları
                </h3>
                <Badge variant="outline" className="font-mono text-xs">
                  {dtc.repairSteps.length} Adım
                </Badge>
              </div>
              <div className="p-6">
                <div className="relative border-l-2 border-border/50 ml-3 md:ml-4 flex flex-col gap-8 pb-4">
                  {dtc.repairSteps.map((step) => (
                    <div key={step.order} className="relative pl-6 md:pl-8">
                      <div className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center text-[10px] font-bold text-primary font-mono">
                        {step.order}
                      </div>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-foreground">{step.description}</p>
                        {(step.estimatedTime || step.toolRequired) && (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {step.estimatedTime && (
                              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md border border-border/50">
                                <Clock className="w-3 h-3" />
                                {step.estimatedTime}
                              </span>
                            )}
                            {step.toolRequired && (
                              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md border border-border/50">
                                <Wrench className="w-3 h-3" />
                                {step.toolRequired}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1 flex flex-col gap-6">
            
            {/* Warning / Pro Tip */}
            {dtc.difficulty === DtcCodeDifficulty.professional && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-5 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-destructive font-bold">
                  <AlertTriangle className="w-5 h-5" />
                  Profesyonel Müdahale
                </div>
                <p className="text-sm text-destructive/80 leading-relaxed">
                  Bu arızanın onarımı özel ekipman veya uzmanlık gerektirir. Yetkili bir Lexus servisine başvurmanız şiddetle tavsiye edilir.
                </p>
              </div>
            )}

            {/* Related Codes */}
            {dtc.relatedCodes && dtc.relatedCodes.length > 0 && (
              <Card className="bg-card/40 border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <ListChecks className="w-4 h-4 text-muted-foreground" />
                    İlişkili Kodlar
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  {dtc.relatedCodes.map((rcode) => (
                    <Button 
                      key={rcode} 
                      variant="outline" 
                      className="justify-between w-full font-mono text-sm bg-secondary/30 hover:bg-secondary/60 hover:text-primary transition-colors"
                      onClick={() => setLocation(`/dtc/${rcode}`)}
                    >
                      {rcode}
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
            
          </div>
        </div>
      </div>
    </Layout>
  );
}
