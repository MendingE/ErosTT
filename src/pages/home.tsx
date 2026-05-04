import { motion } from "framer-motion";
import { Link } from "wouter";


export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background w-full">
      <div className="relative h-screen w-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/30 z-10" />
          <img
            src={import.meta.env.BASE_URL + "images/hero-bg.jpg"}
            alt="Eros Hero"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        <div className="absolute inset-0 z-20 flex flex-col items-end justify-end text-center px-4 pb-20">
          <div className="w-full flex flex-col items-center gap-6">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/60 uppercase tracking-[0.3em] text-xs font-medium"
          >
            Desire &nbsp;·&nbsp; Tension &nbsp;·&nbsp; Love
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex gap-4 flex-wrap justify-center"
          >
            <Link
              to="/collections"
              className="px-10 py-4 bg-primary text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-500"
              data-testid="link-hero-collections"
            >
              View Collections
            </Link>
            <Link
              to="/order"
              className="px-10 py-4 border border-white/40 text-white font-display font-bold uppercase tracking-widest text-sm hover:border-primary hover:text-primary transition-colors duration-500"
              data-testid="link-hero-order"
            >
              Acquire
            </Link>
          </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-[10px] uppercase tracking-widest">Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
          </motion.div>
        </div>
      </div>

      <div className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="font-drip text-5xl normal-case tracking-normal">
              Desire.<br />Tension.<br /><span className="text-primary">Love.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Love, isn't just a feeling, it's a daily decision. The hardest truth, some people love you, but not enough to treat you right. Real love is shown by actions, not just words.
            </p>
            <div className="mt-10">
              <Link
                to="/about"
                className="text-primary font-bold uppercase tracking-widest text-sm border-b border-primary pb-1 hover:text-white hover:border-white transition-colors"
                data-testid="link-manifesto"
              >
                Read Manifesto
              </Link>
            </div>
          </div>
          <div className="aspect-[3/4] bg-muted relative overflow-hidden">
            <img
              src={import.meta.env.BASE_URL + "images/editorial-couple.jpg"}
              alt="Eros — worn together"
              className="object-cover w-full h-full transition-all duration-700"
              style={{ filter: 'contrast(1.25) brightness(0.7) saturate(0.75)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 mix-blend-multiply pointer-events-none" />
            <div className="absolute inset-0 bg-red-900/10 mix-blend-color pointer-events-none" />
          </div>
        </motion.div>
      </div>

      <div className="border-t border-white/5 py-16 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="marquee-slow flex whitespace-nowrap text-white/10 font-display font-bold text-[10vw] leading-none uppercase tracking-tighter select-none">
            {["Desire", "Tension", "Love", "Void", "Eros", "Desire", "Tension", "Love", "Void", "Eros"].map((word, i) => (
              <span key={i} className="px-8">{word}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
