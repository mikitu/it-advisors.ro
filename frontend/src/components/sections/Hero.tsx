"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background Image with overlay */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/photo-1451187580459-43490279c0fa.jpg')`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-[#2e6932]/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-[#28504a]/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#2e6932]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-white mb-4"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              CAM Advisors <span className="text-[#4a9c50]">|</span> IT Advisors
            </motion.h2>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e6932]/20 text-[#4a9c50] rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#2e6932]/30"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
            >
              <span className="w-2 h-2 bg-[#3d8a42] rounded-full animate-pulse" />
              Partenerul tău IT de încredere
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.2}
            >
              Soluții IT
              <span className="block bg-gradient-to-r from-[#3d8a42] to-[#28504a] bg-clip-text text-transparent">
                pentru afacerea ta
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.3}
            >
              Externalizați serviciile IT și concentrați-vă pe ceea ce contează cu adevărat:
              creșterea afacerii dumneavoastră. O echipă de specialiști IT la dispoziția voastră.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.4}
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#2e6932] text-white font-semibold rounded-xl hover:bg-[#3d8a42] hover:shadow-xl hover:shadow-[#2e6932]/30 transition-all duration-300 text-center"
              >
                Solicită consultanță gratuită
              </Link>
              <Link
                href="/servicii"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-center"
              >
                Descoperă serviciile
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-3 gap-8"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              custom={0.5}
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">2010</div>
                <div className="text-sm text-gray-400">Pe piață din</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-sm text-gray-400">Clienți mulțumiți</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-400">Suport tehnic</div>
              </div>
            </motion.div>
          </div>

          {/* Right content - Illustration */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main card */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#2e6932] to-[#28504a] rounded-3xl transform rotate-3 opacity-50"
                animate={{ rotate: [3, 5, 3] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="absolute inset-0 bg-slate-800/90 backdrop-blur-sm rounded-3xl border border-white/10 p-8 flex flex-col justify-center">
                <div className="space-y-6">
                  {[
                    { icon: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Infrastructură securizată", desc: "Protecție completă a datelor", color: "bg-green-500/20", textColor: "text-green-400" },
                    { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", title: "Răspuns rapid", desc: "Intervenție în maxim 4 ore", color: "bg-[#2e6932]/20", textColor: "text-[#3d8a42]" },
                    { icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z", title: "Performanță maximă", desc: "Optimizare continuă", color: "bg-[#28504a]/20", textColor: "text-[#3d8a42]" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                    >
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center`}>
                        <svg className={`w-6 h-6 ${item.textColor}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <div className="font-semibold text-white">{item.title}</div>
                        <div className="text-sm text-gray-400">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

