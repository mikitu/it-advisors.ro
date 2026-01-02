"use client";

import { motion } from "framer-motion";
import Breadcrumbs from "./Breadcrumbs";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description: string;
  badge?: string;
  breadcrumbs?: BreadcrumbItem[];
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

export default function PageHeader({ title, description, badge, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-[#2e6932]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-80 h-80 bg-[#28504a]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.div
            className="flex justify-center mb-6"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Breadcrumbs items={breadcrumbs} />
          </motion.div>
        )}
        {badge && (
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#2e6932]/20 text-[#4a9c50] rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-[#2e6932]/30"
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            {badge}
          </motion.div>
        )}
        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-white mb-6"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0.3}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}

