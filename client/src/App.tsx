import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Blog from "@/pages/Blog";
import Projects from "@/pages/Projects";
import Bookshelf from "@/pages/Bookshelf";

function Router() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/blog" component={Blog} />
          <Route path="/projects" component={Projects} />
          <Route path="/bookshelf" component={Bookshelf} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Navbar />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;