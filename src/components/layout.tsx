import { Link, useLocation } from "wouter";
import { useState } from "react";

const tickerMessages = [
  "NEW DROP: KISS COLLECTION — AVAILABLE NOW",
  "DESIRE. TENSION. LOVE.",
  "MADE IN TRINIDAD & TOBAGO",
  "HEARTZ SET — STILL AVAILABLE",
  "TT$250 PER TEE — LIMITED RUN",
  "LOCAL PICKUP & DELIVERY — INQUIRE TO ORDER",
];

export function Ticker() {
  const repeated = [...tickerMessages, ...tickerMessages, ...tickerMessages];
  return (
    <div className="ticker-bar w-full overflow-hidden bg-primary py-2 relative z-50">
      <div className="ticker-track flex whitespace-nowrap">
        {repeated.map((msg, i) => (
          <span key={i} className="ticker-item text-white font-display font-bold uppercase text-xs tracking-widest px-8">
            {msg} <span className="text-white/40 mx-2">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const categories = [
  { href: "/collections", label: "New Drops" },
  { href: "/collections?tag=tops", label: "Tops" },
  { href: "/collections?tag=bottoms", label: "Bottoms" },
  { href: "/collections?tag=outerwear", label: "Outerwear" },
  { href: "/collections?tag=accessories", label: "Accessories" },
  { href: "/order", label: "Order" },
];

export function Navbar() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const mainLinks = [
    { href: "/", label: "Home" },
    { href: "/collections", label: "Collections" },
    { href: "/about", label: "Manifesto" },
    { href: "/order", label: "Acquire" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40">
      <Ticker />

      <nav className="bg-background/95 backdrop-blur-sm border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <Link href="/" className="font-display font-bold text-2xl tracking-tighter uppercase text-white z-50 relative">
          Eros
        </Link>

        <div className="hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest relative z-50">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-300 hover:text-primary ${location === link.href ? "text-primary" : "text-white/60"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          data-testid="button-mobile-menu"
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </nav>

      <div className="hidden md:block bg-background/90 backdrop-blur-sm border-b border-white/5 px-6 py-2 overflow-x-auto">
        <div className="flex gap-6 min-w-max">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="text-xs uppercase tracking-widest text-white/50 hover:text-primary whitespace-nowrap transition-colors duration-200 py-1"
              data-testid={`link-category-${cat.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background border-b border-white/10 px-6 py-6 flex flex-col gap-4">
          {mainLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-display font-bold uppercase text-lg tracking-tight transition-colors ${location === link.href ? "text-primary" : "text-white/80"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-display text-4xl font-bold tracking-tighter text-white/20">EROS</div>
        <div className="text-xs text-white/40 uppercase tracking-widest text-center md:text-right">
          <p>© {new Date().getFullYear()} EROS — TRINIDAD & TOBAGO.</p>
          <p>Embrace the tension.</p>
        </div>
      </div>
    </footer>
  );
}
