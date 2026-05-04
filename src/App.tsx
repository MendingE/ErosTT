import { Router, Route, Switch } from "wouter";
import Home from "./pages/home";
import About from "./pages/about";
import Collections from "./pages/collections";
import Order from "./pages/order";
import NotFound from "./pages/not-found";
import { Navbar, Footer } from "./components/layout";

function App() {
  return (
    <Router base="/ErosTT">
      <Navbar />

      <main className="pt-[120px]">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/collections" component={Collections} />
          <Route path="/order" component={Order} />

          {/* fallback */}
          <Route component={NotFound} />
        </Switch>
      </main>

      <Footer />
    </Router>
  );
}

export default App;