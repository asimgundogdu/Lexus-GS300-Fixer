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

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/diagnose" component={Diagnose} />
      <Route path="/dtc/:code" component={DtcDetail} />
      <Route path="/systems/:systemId" component={SystemDetail} />
      <Route path="/search" component={SearchPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <PasswordGate>
          <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ""}>
            <Router />
          </WouterRouter>
        </PasswordGate>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
