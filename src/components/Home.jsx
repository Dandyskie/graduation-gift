import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

const Home = ({ onLogin, isError }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.1, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-md relative"
    >
      <div className="glass-card rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mb-6 neon-glow"
          >
            <GraduationCap className="w-10 h-10 text-accent" />
          </motion.div>

          <h1 className="text-3xl font-bold mb-2 text-white tracking-tight">
            Graduation Card
          </h1>
          <p className="text-secondary/70 mb-8 text-sm sm:text-base">
            Ketik Nama Lengkapmu Ya Njir, Jangan Nama Panggilan Hehehe
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative mb-6">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="NAMA MU CUYY"
                className={clsx(
                  "w-full bg-black/20 border rounded-xl px-5 py-4 text-white placeholder:text-white/30 outline-none transition-all duration-300",
                  "focus:bg-black/30 neon-glow-focus",
                  isError ? "border-red-500" : "border-white/10"
                )}
                autoComplete="off"
              />
              {/* Error message */}
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: isError ? 1 : 0, 
                  height: isError ? 'auto' : 0,
                  y: isError ? [0, -5, 5, -5, 5, 0] : 0
                }}
                transition={{ duration: 0.4 }}
                className="text-red-400 text-sm mt-2 text-left absolute -bottom-6 left-1"
              >
                {isError && "YAHH SORRY LU GA MASUK CF GUA"}
              </motion.p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-primary font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.6)]"
              type="submit"
            >
              <span>Open Card</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
