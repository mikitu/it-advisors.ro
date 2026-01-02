"use client";

import { motion } from "framer-motion";
import type { ProcessStep } from "@/lib/strapi";

interface ServiceProcessProps {
  process: ProcessStep[];
}

export default function ServiceProcess({ process }: ServiceProcessProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Procesul nostru
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            O abordare structurată pentru rezultate garantate
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2e6932] to-[#28504a] transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg relative z-10">
                  {/* Step number */}
                  <div className="w-12 h-12 bg-gradient-to-br from-[#2e6932] to-[#28504a] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto md:mx-0">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 text-center md:text-left">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center md:text-left">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

