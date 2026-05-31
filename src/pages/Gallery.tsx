import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "",
    category: "",
    span: "col-span-1 row-span-2",
    image: import.meta.env.BASE_URL + "images/heartz-lifestyle.jpg",
  },
  {
    id: 2,
    title: " ",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/heartz-gallery-1.jpeg",
  },
  {
    id: 3,
    title: "",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/heartz-tee.png",
  },
  {
    id: 4,
    title: " ",
    category: "",
    span: "col-span-2 row-span-1",
    image: import.meta.env.BASE_URL + "images/banner-heartz.jpeg",
  },
  {
    id: 5,
    title: " ",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/EROS Picnic Launch-21.jpg",
  },
  {
    id: 6,
    title: " ",
    category: "",
    span: "col-span-1 row-span-2",
    image: import.meta.env.BASE_URL + "images/kiss-animation.jpeg",
  },
  {
    id: 7,
    title: "",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/EROS Picnic Launch-6.jpg",
  },
  {
    id: 8,
    title: "",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/EROS Picnic Launch-12.jpg",
  },
  {
    id: 9,
    title: "",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/EROS Picnic Launch-10.jpg",
  },
  {
    id: 10,
    title: "",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/EROS Picnic Launch-23.jpg",
  },
  {
    id: 11,
    title: "",
    category: "",
    span: "col-span-2 row-span-1",
    image: import.meta.env.BASE_URL + "images/EROS Picnic Launch-16.jpg",
  },
  {
    id: 12,
    title: "",
    category: "",
    span: "col-span-1 row-span-1",
    image: import.meta.env.BASE_URL + "images/EROS Picnic Launch-36.jpg",
  },
];

export default function Gallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = GALLERY_ITEMS;

  return (
    <div className="min-h-[100dvh] bg-background text-foreground w-full">

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Header */}
      <div className="relative border-b border-white/5 py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center">
          <span
            className="font-display text-[22vw] leading-none text-white/[0.03] uppercase tracking-tighter"
            aria-hidden="true"
          >
            Gallery
          </span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/40 uppercase tracking-[0.3em] text-xs font-medium mb-4"
          >
            Eros &nbsp;·&nbsp; Visual Archive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-7xl md:text-9xl uppercase tracking-wide leading-none"
          >
            Gallery
          </motion.h1>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 auto-rows-[280px] gap-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className={`relative overflow-hidden bg-muted cursor-pointer group ${item.span}`}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{
                    filter: "contrast(1.15) brightness(0.75) saturate(0.7)",
                  }}
                />

                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Red tint on hover */}
                <motion.div
                  className="absolute inset-0 bg-primary/10 pointer-events-none"
                  animate={{ opacity: hovered === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Red border reveal */}
                <motion.div
                  className="absolute inset-0 border border-primary pointer-events-none"
                  animate={{ opacity: hovered === item.id ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <motion.p
                    className="text-white/40 uppercase tracking-[0.25em] text-[10px] mb-1"
                    animate={{ y: hovered === item.id ? 0 : 4, opacity: hovered === item.id ? 1 : 0.6 }}
                    transition={{ duration: 0.3 }}
                  >
                    {item.category}
                  </motion.p>
                  <h3 className="font-display text-2xl uppercase tracking-wide text-white leading-none">
                    {item.title}
                  </h3>
                  
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-32 text-white/20 font-display text-4xl uppercase tracking-widest">
            No works found
          </div>
        )}
      </div>

      {/* Marquee divider */}
      <div className="border-t border-white/5 py-12 overflow-hidden">
        <div className="marquee-slow flex whitespace-nowrap text-white/5 font-display font-bold text-[8vw] leading-none uppercase tracking-tighter select-none">
          {["Gallery", "Archive", "Eros", "Visual", "Desire", "Gallery", "Archive", "Eros", "Visual", "Desire"].map(
            (word, i) => (
              <span key={i} className="px-8">
                {word}
              </span>
            )
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="border-t border-white/5 py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/30 uppercase tracking-[0.3em] text-xs mb-6">
            Ready to wear
          </p>
          <h2 className="font-display text-5xl md:text-7xl uppercase tracking-wide mb-10">
            Acquire the <span className="text-primary">collection</span>
          </h2>
          <Link
            to="/collections"
            className="inline-block px-12 py-4 bg-primary text-white font-display uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-500"
          >
            View Collections
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
