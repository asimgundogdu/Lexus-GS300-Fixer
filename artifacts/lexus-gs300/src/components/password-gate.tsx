import React from "react";
import { LockKeyhole, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ACCESS_PASSWORD = "1974";
const STORAGE_KEY = "gs300-diagnosis-access";

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    try {
      setIsUnlocked(window.localStorage.getItem(STORAGE_KEY) === "granted");
    } catch {
      // localStorage kapalıysa uygulama oturum boyunca şifre istemeye devam eder.
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === ACCESS_PASSWORD) {
      try {
        window.localStorage.setItem(STORAGE_KEY, "granted");
      } catch {
        // Kalıcı depolama kullanılamasa da mevcut oturumu açmaya devam et.
      }
      setHasError(false);
      setIsUnlocked(true);
      return;
    }

    setPassword("");
    setHasError(true);
  };

  if (isUnlocked) return <>{children}</>;

  return (
    <main className="min-h-[100dvh] bg-background relative overflow-hidden flex items-center justify-center px-4">
      <div className="bg-noise" />
      <section className="relative z-10 w-full max-w-md">
        <div className="bg-card/80 border border-border/60 rounded-2xl p-7 md:p-9 shadow-2xl backdrop-blur">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shadow-[0_0_30px_rgba(245,158,11,0.18)]">
              <LockKeyhole className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">GS300 Tanı Sistemi</p>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Erişim Şifresi</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Arıza kodları ve teşhis ekranına devam etmek için şifrenizi girin.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-3">
            <input
              type="text"
              name="username"
              autoComplete="username"
              value="gs300"
              readOnly
              tabIndex={-1}
              aria-hidden="true"
              className="hidden"
            />
            <label htmlFor="access-password" className="text-sm font-medium">
              Şifre
            </label>
            <Input
              id="access-password"
              type="password"
              inputMode="numeric"
              autoComplete="current-password"
              autoFocus
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                if (hasError) setHasError(false);
              }}
              aria-invalid={hasError}
              className="h-12 bg-background/70 text-center text-lg tracking-[0.35em]"
              data-testid="input-access-password"
            />
            {hasError && (
              <p className="text-sm text-destructive" role="alert">
                Şifre yanlış. Lütfen tekrar deneyin.
              </p>
            )}
            <Button type="submit" className="h-12 mt-2 font-bold" disabled={!password}>
              Devam Et
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Bu tarayıcıda doğrulama hatırlanır.</span>
          </div>
        </div>
      </section>
    </main>
  );
}