import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-[100dvh] pt-44 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter text-white uppercase">Manifesto</h1>
        </motion.div>

        <div className="space-y-16 text-lg md:text-2xl text-white/80 leading-relaxed font-light">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            We pray that through this brand, everyone who sees it and supports it will truly enjoy what it represents.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            May the message we are pushing be clear and impactful to all.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[16/9] w-full overflow-hidden"
          >
            <img src="/editorial-couple.jpg" alt="Eros — worn together" className="w-full h-full object-cover" style={{ filter: 'contrast(1.25) brightness(0.7) saturate(0.75)' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            We pray for continued support, consistency in our journey, and the strength to always put you first in everything we do.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-primary font-display font-bold uppercase text-3xl md:text-5xl text-center pt-4"
          >
            Dear God, guide us and bless this vision.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-white/40 uppercase tracking-[0.4em] text-sm text-center pb-8"
          >
            Amen.
          </motion.p>
        </div>
      </div>
    </div>
  );
}
