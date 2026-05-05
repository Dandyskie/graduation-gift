import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

const CardView = ({ user, onBack }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    // Trigger confetti when card view appears (after user inputs name)
    triggerConfetti();
  }, []);

  useEffect(() => {
    if (isFlipped && !isTypingComplete) {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayedText(user.message.slice(0, i + 1));
        i++;
        if (i === user.message.length) {
          clearInterval(timer);
          setIsTypingComplete(true);
        }
      }, 50); // Typing speed

      return () => clearInterval(timer);
    }
  }, [isFlipped, user.message, isTypingComplete]);

  function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#38bdf8', '#f8fafc', '#1e293b']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#38bdf8', '#f8fafc', '#1e293b']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.2 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-sm sm:max-w-md perspective-1000 relative"
    >
      <div className="w-full h-[500px] sm:h-[600px] animate-float relative">
        <motion.div
          className="w-full h-full relative preserve-3d cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 15 }}
          onClick={() => !isFlipped && setIsFlipped(true)}
          whileHover={!isFlipped ? { scale: 1.02, rotateX: 5, rotateY: 5 } : {}}
        >
        {/* Front of the card */}
        <div className="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          
          {/* Subtle glow behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-accent/30 rounded-full blur-3xl"></div>

          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white/20 p-1 mb-6 shadow-[0_0_20px_rgba(56,189,248,0.4)]"
          >
            <img 
              src={user.photoUrl} 
              alt={user.name} 
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 relative z-10">
            {user.name}
          </h2>
          <p className="text-accent text-lg font-medium tracking-wide relative z-10 flex items-center gap-2">
            Happy Graduation <span className="text-2xl">🎓</span>
          </p>
          
          <p className="text-white/40 text-sm mt-10 animate-pulse absolute bottom-8">
            Click to open
          </p>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 backface-hidden glass-card rounded-3xl p-8 rotate-y-180 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 text-accent opacity-50 animate-sparkle">
            <Sparkles className="w-8 h-8" />
          </div>
          <div className="absolute bottom-0 left-0 p-6 text-accent opacity-30 animate-sparkle" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="flex-1 flex flex-col justify-center relative z-10">
            <h3 className="text-xl text-accent font-semibold mb-6">Ada Pesan Nichh...</h3>
            <p className="text-white/90 text-lg sm:text-xl leading-relaxed font-light min-h-[150px]">
              {displayedText}
              {!isTypingComplete && <span className="inline-block w-2 h-5 ml-1 bg-accent animate-pulse"></span>}
            </p>
          </div>

          <AnimatePresence>
            {isTypingComplete && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onBack();
                }}
                className="mt-auto w-full group flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                Back to Home
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
};

export default CardView;
