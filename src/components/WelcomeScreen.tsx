import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, FileSpreadsheet, Package } from 'lucide-react';

interface WelcomeScreenProps {
  onSuccess: () => void;
}

export default function WelcomeScreen({ onSuccess }: WelcomeScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (password === 'Naty') {
      onSuccess();
    } else {
      setError('❌ Accès refusé.');
      setIsShaking(true);
      setPassword('');
      setTimeout(() => setIsShaking(false), 400);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0b0c10] flex flex-col items-center justify-center z-[9999] px-4">
      {/* Background decoration elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`w-full max-w-md bg-[#161a23] border border-slate-700/60 rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden ${
          isShaking ? 'animate-bounce' : ''
        }`}
      >
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-[#4f8ef7] to-[#9b72f5]" />

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <Package className="w-8 h-8" />
          </div>
        </div>

        <h1 className="text-2xl font-bold font-sans text-slate-100 tracking-tight">
          PACKING LIST PRO
        </h1>
        <p className="text-xs font-mono text-slate-400 tracking-widest mt-1 mb-8">
          LOGISTICS OFFICER SYSTEM — v10.0
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="MOT DE PASSE"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="w-full text-center bg-[#1f2430] border border-slate-700 rounded-lg py-3 px-4 text-white font-mono font-bold tracking-[0.2em] placeholder:text-slate-500 placeholder:tracking-normal focus:outline-none focus:border-blue-500 transition-all text-sm"
              autoFocus
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-400 font-mono text-xs font-semibold"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-[#9b72f5] hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/10 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Lock className="w-4 h-4" />
            ENTRER SÉCURISÉ
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500">
          <Lock className="w-3 h-3" />
          RESTRICTED TO LOGISTICS OFFICERS ONLY
        </div>
      </motion.div>
    </div>
  );
}
