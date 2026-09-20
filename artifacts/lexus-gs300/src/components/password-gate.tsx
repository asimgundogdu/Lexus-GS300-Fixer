import React from "react";
import { LockKeyhole, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ACCESS_PIN = "1974";
const STORAGE_KEY = "gs300-diagnosis-access-v2";

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isUnlocked, setIsUnlocked] = React.useState(false);
  const [pin, setPin] = React.useState("");
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
    if (pin === ACCESS_PIN) {
      try {
        window.localStorage.setItem(STORAGE_KEY, "granted");
      } catch {
        // Kalıcı depolama kullanılamasa da mevcut oturumu açmaya devam et.
      }
      setHasError(false);
      setIsUnlocked(true);
      return;
    }

    setPin("");
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
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">PIN Kilidi</h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Ana sayfa, arıza kodları ve teşhis ekranına devam etmek için 4 haneli PIN kodunu girin.
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
            <label htmlFor="access-pin" className="text-sm font-medium">
              4 Haneli PIN
            </label>
            <Input
              id="access-pin"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={4}
              pattern="[0-9]{4}"
              autoFocus
              placeholder="••••"
              value={pin}
              onChange={(event) => {
                const nextPin = event.target.value.replace(/\D/g, "").slice(0, 4);
                setPin(nextPin);
                if (hasError) setHasError(false);
              }}
              aria-invalid={hasError}
              aria-describedby={hasError ? "pin-error" : undefined}
              className="h-12 bg-background/70 text-center text-2xl tracking-[0.5em]"
              data-testid="input-access-pin"
            />
            {hasError && (
              <p id="pin-error" className="text-sm text-destructive" role="alert">
                PIN kodu yanlış. Lütfen 4 haneli kodu tekrar deneyin.
              </p>
            )}
            <Button type="submit" className="h-12 mt-2 font-bold" disabled={pin.length !== 4}>
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