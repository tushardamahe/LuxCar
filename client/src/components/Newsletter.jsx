import { motion } from "motion/react";

const Newsletter = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative px-4 my-20 mb-28"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-125 h-62.5 bg-orange-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-4xl mx-auto rounded-4xl border border-orange-500/10 bg-[#111111]/90 backdrop-blur-xl px-6 md:px-12 py-12 overflow-hidden shadow-[0_0_60px_rgba(249,115,22,0.08)]">
        <div className="absolute -top-16 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="uppercase tracking-[0.3em] text-xs text-orange-400"
          >
            Luxury Updates
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-3xl md:text-5xl font-semibold text-white leading-tight"
          >
            Stay Connected to Luxury
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-5 max-w-2xl text-sm md:text-base text-neutral-400 leading-relaxed"
          >
            Get exclusive access to premium arrivals, luxury travel inspiration,
            and curated driving experiences.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-3 w-full max-w-2xl"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              required
              className="w-full h-14 rounded-2xl bg-[#18181b] border border-white/10 focus:border-orange-500 px-5 text-white placeholder:text-neutral-500 outline-none transition-all duration-300"
            />

            <button
              type="submit"
              className="h-14 px-8 rounded-2xl bg-linear-to-r from-orange-500 to-orange-600 text-white font-medium hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-all duration-300 whitespace-nowrap"
            >
              Join Now
            </button>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Newsletter;
