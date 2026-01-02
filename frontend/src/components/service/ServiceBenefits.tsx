"use client";

import { motion } from "framer-motion";

interface ServiceBenefitsProps {
  benefits: string[];
}

export default function ServiceBenefits({ benefits }: ServiceBenefitsProps) {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Beneficii cheie
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            De ce să alegi serviciile noastre
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="group relative p-6 bg-gray-50 rounded-2xl hover:bg-gradient-to-br hover:from-[#2e6932] hover:to-[#28504a] transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-[#2e6932]/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors">
                  <svg 
                    className="w-5 h-5 text-[#2e6932] group-hover:text-white transition-colors" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={2} 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <span className="text-gray-700 group-hover:text-white font-medium transition-colors">
                  {benefit}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

