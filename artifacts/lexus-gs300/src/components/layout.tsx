import React from "react";
import { Link, useLocation } from "wouter";
import { Search, Wrench, AlertTriangle, Activity, Settings2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { path: "/", icon: Activity, label: "Panel" },
    { path: "/diagnose", icon: Wrench, label: "Teşhis" },
    { path: "/search", icon: Search, label: "Arama" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background relative">
      <div className="bg-noise" />
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Settings2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight text-foreground uppercase tracking-widest">GS300</span>
                <span className="text-[10px] leading-tight text-muted-foreground uppercase tracking-wider">Tanı Sistemi</span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === item.path ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/diagnose">
              <Button size="sm" className="hidden md:flex gap-2 font-semibold">
                <AlertTriangle className="w-4 h-4" />
                Yeni Teşhis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8 flex flex-col z-10">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-card/90 backdrop-blur pb-safe">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const isActive = location === item.path || (item.path !== "/" && location.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
