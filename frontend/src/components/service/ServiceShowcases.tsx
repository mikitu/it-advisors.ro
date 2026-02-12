"use client";

import { motion } from "framer-motion";
import type { Showcase } from "@/lib/strapi";

interface ServiceShowcasesProps {
  showcases: Showcase[];
}

export default function ServiceShowcases({ showcases }: ServiceShowcasesProps) {
  if (!showcases || showcases.length === 0) return null;

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
            Studii de caz
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Proiecte de succes implementate pentru clienții noștri
          </p>
        </motion.div>

        <div className="space-y-16">
          {showcases.map((showcase, index) => (
            <motion.div
              key={showcase.id}
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              {/* Image placeholder */}
              <div className={`${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#2e6932] to-[#28504a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">{showcase.clientName}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2e6932]/10 text-[#2e6932] rounded-full text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Proiect finalizat
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{showcase.title}</h3>
                
                {showcase.challenge && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Provocarea:</h4>
                    <p className="text-gray-600">{showcase.challenge}</p>
                  </div>
                )}
                
                {showcase.solution && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Soluția:</h4>
                    <p className="text-gray-600">{showcase.solution}</p>
                  </div>
                )}

                {showcase.results && showcase.results.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Rezultate:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {showcase.results.map((result, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <svg className="w-4 h-4 text-[#2e6932] shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          <span className="text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

