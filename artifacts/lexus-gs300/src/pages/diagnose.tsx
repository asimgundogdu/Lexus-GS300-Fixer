import React, { useState } from "react";
import { Layout } from "@/components/layout";
import { useListSymptoms, useDiagnoseBySymptoms } from "@/lib/local-api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wrench, Loader2, ChevronRight, Activity, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useLocation } from "wouter";

export function Diagnose() {
  const [, setLocation] = useLocation();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  
  const { data: categories, isLoading: categoriesLoading } = useListSymptoms();
  const diagnoseMutation = useDiagnoseBySymptoms();

  const handleToggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) => 
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleDiagnose = () => {
    if (selectedSymptoms.length === 0) return;
    
    diagnoseMutation.mutate({ data: { symptoms: selectedSymptoms } });
  };

  const getConfidenceLabel = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'Yüksek';
      case 'medium': return 'Orta';
      case 'low': return 'Düşük';
      default: return confidence;
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium': return 'bg-primary/10 text-primary border-primary/20';
      case 'low': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 pb-20 md:pb-0 max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <section className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Wrench className="w-6 h-6" />
            </div>
            Arıza Teşhis Sihirbazı
          </h1>
          <p className="text-muted-foreground">
            Aracınızda gözlemlediğiniz belirtileri seçerek olası arıza kodlarını ve çözümlerini bulun.
          </p>
        </section>

        {!diagnoseMutation.data && (
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="md:col-span-2 flex flex-col gap-6">
              {categoriesLoading ? (
                Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-xl bg-card" />)
              ) : categories?.map((category) => (
                <Card key={category.id} className="bg-card/40 border-border/50">
                  <CardHeader className="pb-3 border-b border-border/50">
                    <CardTitle className="text-lg">{category.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/30">
                      {category.symptoms.map((symptom) => (
                        <label 
                          key={symptom.id} 
                          className="flex items-center gap-3 p-4 hover:bg-secondary/30 cursor-pointer transition-colors"
                        >
                          <Checkbox 
                            checked={selectedSymptoms.includes(symptom.id)}
                            onCheckedChange={() => handleToggleSymptom(symptom.id)}
                            className="border-muted-foreground/40 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">{symptom.label}</span>
                            {symptom.systemHint && (
                              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{symptom.systemHint}</span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="md:col-span-1">
              <Card className="sticky top-24 bg-card border-primary/20 shadow-[0_0_30px_rgba(245,158,11,0.05)]">
                <CardHeader>
                  <CardTitle className="text-base flex items-center justify-between">
                    Seçilen Belirtiler
                    <Badge variant="secondary" className="font-mono">{selectedSymptoms.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedSymptoms.length === 0 ? (
                    <div className="py-6 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
                      <Activity className="w-8 h-8 opacity-20" />
                      Lütfen en az bir belirti seçin
                    </div>
                  ) : (
                    <ScrollArea className="h-[200px] pr-4">
                      <div className="flex flex-col gap-2">
                        {categories?.flatMap(c => c.symptoms)
                          .filter(s => selectedSymptoms.includes(s.id))
                          .map(s => (
                            <div key={s.id} className="text-xs bg-secondary/50 p-2 rounded-md flex items-center gap-2 border border-border/50">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                              <span className="line-clamp-2">{s.label}</span>
                            </div>
                          ))}
                      </div>
                    </ScrollArea>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full font-bold" 
                    disabled={selectedSymptoms.length === 0 || diagnoseMutation.isPending}
                    onClick={handleDiagnose}
                  >
                    {diagnoseMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analiz Ediliyor...</>
                    ) : (
                      <>Teşhis Et <ChevronRight className="w-4 h-4 ml-1" /></>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}

        {diagnoseMutation.data && (
          <div className="flex flex-col gap-6 animate-in slide-in-from-right-8 duration-500">
            <div className="flex items-center justify-between bg-card/80 p-6 rounded-xl border border-primary/30 backdrop-blur">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-bold">Teşhis Sonuçları</h2>
                <p className="text-sm text-muted-foreground">{selectedSymptoms.length} belirti analiz edildi</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Güven Skoru</span>
                <Badge className={getConfidenceColor(diagnoseMutation.data.confidence)}>
                  {getConfidenceLabel(diagnoseMutation.data.confidence)}
                </Badge>
              </div>
            </div>

            {diagnoseMutation.data.note && (
              <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-lg flex gap-3 text-sm text-orange-200">
                <AlertCircle className="w-5 h-5 shrink-0 text-orange-500" />
                <p>{diagnoseMutation.data.note}</p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-bold">Olası Arıza Kodları</h3>
              {diagnoseMutation.data.matches.length === 0 ? (
                <div className="text-center p-8 bg-card/40 rounded-xl border border-border border-dashed">
                  Eşleşen arıza kodu bulunamadı.
                </div>
              ) : (
                diagnoseMutation.data.matches.map((match, idx) => (
                  <Card 
                    key={idx} 
                    className="bg-card/40 border-border/50 hover:bg-card hover:border-primary/50 transition-colors cursor-pointer group"
                    onClick={() => setLocation(`/dtc/${match.dtcCode.code}`)}
                  >
                    <CardHeader className="p-5 flex flex-row items-start justify-between pb-2">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xl font-bold text-primary group-hover:text-primary transition-colors">
                            {match.dtcCode.code}
                          </span>
                          <Badge variant="outline">{match.dtcCode.systemLabel}</Badge>
                        </div>
                        <CardTitle className="text-base font-medium mt-1">{match.dtcCode.title}</CardTitle>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Eşleşme</span>
                        <div className="text-lg font-mono font-bold text-foreground">%{match.score}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-5 pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                        {match.dtcCode.description}
                      </p>
                      
                      <div className="flex flex-col gap-2">
                        <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Eşleşen Belirtiler</span>
                        <div className="flex flex-wrap gap-2">
                          {match.matchedSymptoms.map((symId) => {
                            const symptom = categories?.flatMap(c => c.symptoms).find(s => s.id === symId);
                            return symptom ? (
                              <Badge key={symId} variant="secondary" className="bg-secondary/50 font-normal text-xs py-0.5">
                                <CheckCircle2 className="w-3 h-3 mr-1 text-primary" />
                                {symptom.label}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <Button 
              variant="outline" 
              className="self-center mt-4"
              onClick={() => {
                diagnoseMutation.reset();
                setSelectedSymptoms([]);
              }}
            >
              Yeni Teşhis Başlat
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}

import { CheckCircle2 } from "lucide-react";
