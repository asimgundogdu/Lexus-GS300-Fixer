import { Dashboard } from "./pages/dashboard";
import { Diagnose } from "./pages/diagnose";
import { DtcDetail } from "./pages/dtc-detail";
import { SystemDetail } from "./pages/system-detail";
import { SearchPage } from "./pages/search";
import NotFound from "./pages/not-found";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PasswordGate } from "./components/password-gate";
import { Route, Switch, Router as WouterRouter } from 'wouter';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

function ProtectedPage({ children }: { children: ReactNode }) {
  return <PasswordGate>{children}</PasswordGate>;
}

function DashboardRoute() {
  return (
    <ProtectedPage>
      <Dashboard />
    </ProtectedPage>
  );
}

function DiagnoseRoute() {
  return (
    <ProtectedPage>
      <Diagnose />
    </ProtectedPage>
  );
}

function DtcDetailRoute() {
  return (
    <ProtectedPage>
      <DtcDetail />
    </ProtectedPage>
  );
}

function SystemDetailRoute() {
  return (
    <ProtectedPage>
      <SystemDetail />
    </ProtectedPage>
  );
}

function SearchRoute() {
  return (
    <ProtectedPage>
      <SearchPage />
    </ProtectedPage>
  );
}

function NotFoundRoute() {
  return (
    <ProtectedPage>
      <NotFound />
    </ProtectedPage>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardRoute} />
      <Route path="/diagnose" component={DiagnoseRoute} />
      <Route path="/dtc/:code" component={DtcDetailRoute} />
      <Route path="/systems/:systemId" component={SystemDetailRoute} />
      <Route path="/search" component={SearchRoute} />
      <Route component={NotFoundRoute} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ""}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
