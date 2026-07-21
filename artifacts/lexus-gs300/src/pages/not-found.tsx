import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center flex-1 py-20 text-center gap-6 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mb-2 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black tracking-tight text-foreground font-mono">404</h1>
          <h2 className="text-xl font-bold">Sayfa Bulunamadı</h2>
          <p className="text-muted-foreground mt-2">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. Bağlantıyı kontrol edip tekrar deneyin.
          </p>
        </div>
        <Link href="/" className="mt-4">
          <Button size="lg" className="font-bold px-8">
            Panele Dön
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
