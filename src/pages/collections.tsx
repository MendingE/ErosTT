import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearch } from "wouter";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Piece = {
  id: string;
  name: string;
  desc: string;
  price: string;
  images: string[];
  tags: string[];
};

type Collection = {
  name: string;
  season: string;
  description: string;
  pieces: Piece[];
};

const collections: Collection[] = [
  {
    name: "Kiss",
    season: "Kiss Collection",
    description: "Marked, sealed, sent. A white heavyweight tee printed front and back with lipstick kisses — a love letter you wear.",
    pieces: [
      {
        id: "k1",
        name: "Kiss Tee",
        desc: '"With a kiss let us set out for an unknown world." – Alfred de Musset',
        price: "TT$250.00",
        images: [
          import.meta.env.BASE_URL + "images/kiss-tee-front.png",
          import.meta.env.BASE_URL + "images/kiss-tee-back.png",
  
        ],
        tags: ["tops"],
      },
    ],
  },
  {
    name: "Heartz",
    season: "Heartz Set",
    description: "The first chapter. A heavyweight black tee with the signature double-heart graphic — built to be worn together.",
    pieces: [
      {
        id: "h1",
        name: "Heartz Tee",
        desc: "Be devoted to one another in love. Honor one another above yourselves.",
        price: "TT$250.00",
        images: [
          import.meta.env.BASE_URL + "images/heartz-tee.png",
          import.meta.env.BASE_URL + "images/heartz-lifestyle.jpg",
          import.meta.env.BASE_URL + "images/heartz-tee-mockup.jpg",
        ],
        tags: ["tops"],
      },
    ],
  },
];

const tagLabels: Record<string, string> = {
  tops: "Tops",
  bottoms: "Bottoms",
  outerwear: "Outerwear",
  accessories: "Accessories",
};

const emptyStateCopy: Record<string, { title: string; sub: string }> = {
  bottoms: {
    title: "No Bottoms Yet",
    sub: "The next drop is in the workshop. Check back soon — or sign up for early access on the Acquire page.",
  },
  outerwear: {
    title: "Outerwear Coming Soon",
    sub: "Heavy layers are being cut and sewn. Drops are dated when they're ready, never before.",
  },
  accessories: {
    title: "No Accessories Yet",
    sub: "Hardware, headwear, and finishing pieces — all on the way.",
  },
  tops: {
    title: "No Tops Available",
    sub: "Check back soon for new drops.",
  },
};

function ProductCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const total = images.length;

  const goPrev = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((i) => (i - 1 + total) % total);
  };
  const goNext = (e: React.MouseEvent) => {
    e.preventDefault();
    setIndex((i) => (i + 1) % total);
  };

  return (
    <div className="aspect-[3/4] bg-muted mb-4 overflow-hidden relative group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={images[index]}
          alt={`${alt} — view ${index + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </AnimatePresence>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous image"
            data-testid="button-carousel-prev"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/60 text-white border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/80"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next image"
            data-testid="button-carousel-next"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-black/60 text-white border border-white/20 opacity-0 group-hover/carousel:opacity-100 transition-opacity hover:bg-black/80"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIndex(i);
                }}
                aria-label={`Go to image ${i + 1}`}
                data-testid={`button-carousel-dot-${i}`}
                className={`h-1.5 transition-all ${
                  i === index ? "w-6 bg-primary" : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Collections() {
  const search = useSearch();
  const params = new URLSearchParams(search);
  const activeTag = params.get("tag");
  const activeLabel = activeTag ? tagLabels[activeTag] : null;

  const filteredCollections = collections
    .map((collection) => ({
      ...collection,
      pieces: activeTag
        ? collection.pieces.filter((p) => p.tags.includes(activeTag))
        : collection.pieces,
    }))
    .filter((collection) => collection.pieces.length > 0);

  const isEmpty = filteredCollections.length === 0;
  const emptyCopy =
    activeTag && emptyStateCopy[activeTag]
      ? emptyStateCopy[activeTag]
      : { title: "Nothing Here Yet", sub: "Check back soon for new drops." };

  return (
    <div className="min-h-[100dvh] pt-44 pb-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          {activeLabel && (
            <div className="text-primary font-bold tracking-widest text-sm uppercase mb-3">
              Filter — {activeLabel}
            </div>
          )}
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white uppercase mb-4">
            {activeLabel || "Archives"}
          </h1>
          <p className="text-white/50 text-lg max-w-xl">
            Every piece is an artifact. Produced in limited quantities, never to be repeated.
          </p>
          {activeTag && (
            <div className="mt-6">
              <Link
                href="/collections"
                className="text-xs uppercase tracking-widest text-white/60 hover:text-primary transition-colors border-b border-white/30 hover:border-primary pb-1"
                data-testid="link-clear-filter"
              >
                ← View All
              </Link>
            </div>
          )}
        </motion.div>

        {isEmpty ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-white/10 py-24 px-6 text-center max-w-2xl mx-auto"
          >
            <div className="text-primary font-bold tracking-widest text-xs uppercase mb-4">
              Coming Soon
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase text-white mb-4">
              {emptyCopy.title}
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">{emptyCopy.sub}</p>
            
          </motion.div>
        ) : (
          <div className="space-y-32">
            {filteredCollections.map((collection) => (
              <div key={collection.name}>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-12"
                >
                  <div>
                    <div className="text-primary font-bold tracking-widest text-sm uppercase mb-2">
                      {collection.season}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold uppercase">
                      {collection.name}
                    </h2>
                  </div>
                  <p className="text-white/60 max-w-sm mt-4 md:mt-0 md:text-right">
                    {collection.description}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {collection.pieces.map((piece, pieceIdx) => (
                    <motion.div
                      key={piece.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: pieceIdx * 0.1 }}
                      className="group"
                    >
                      <ProductCarousel images={piece.images} alt={piece.name} />
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-display font-bold uppercase text-lg">{piece.name}</h3>
                          <p className="text-white/50 text-sm max-w-xs italic">{piece.desc}</p>
                        </div>
                        <div className="text-primary font-medium whitespace-nowrap pl-3">
                          {piece.price}
                        </div>
                      </div>
                      <Link
                        href="/order"
                        className="inline-block text-primary font-bold uppercase tracking-widest text-xs border-b border-primary pb-1 hover:text-white hover:border-white transition-colors"
                        data-testid={`link-inquire-${piece.id}`}
                      >
                        Inquire to Acquire
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
