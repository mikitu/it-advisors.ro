"use client";

import { motion } from "framer-motion";
import CountUp from "@/components/ui/CountUp";

interface ServiceStatsProps {
  stats: Record<string, string | number>;
}

const statLabels: Record<string, string> = {
  clients: "Clienți",
  uptime: "Uptime",
  response: "Timp răspuns",
  experience: "Experiență",
  tickets: "Tickete rezolvate",
  satisfaction: "Satisfacție",
  firstCall: "First-call resolution",
  avgResponse: "Răspuns mediu",
  calls: "Apeluri gestionate",
  quality: "Calitate audio",
  savings: "Economii",
  websites: "Website-uri create",
  speed: "Timp încărcare",
  vms: "VM-uri gestionate",
  migration: "Migrări",
  threats: "Amenințări detectate",
  blocked: "Blocate",
  audits: "Audituri",
  users: "Utilizatori",
  countries: "Țări",
  agents: "Agenți",
  downtime: "Downtime",
  servers: "Servere",
  recovery: "Recovery time",
  compliance: "Conformitate",
  visitors: "Vizitatori/zi",
  loadTime: "Load time",
  conversion: "Conversie",
  detectionTime: "Timp detecție",
  breaches: "Breșe",
  riskReduction: "Reducere risc",
};

export default function ServiceStats({ stats }: ServiceStatsProps) {
  const entries = Object.entries(stats);
  
  return (
    <section className="py-16 bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {entries.map(([key, value], index) => {
            const isNumber = typeof value === "number" || /^\d+/.test(String(value));
            const numericPart = String(value).match(/^(\d+)/)?.[1];
            const suffix = String(value).replace(/^\d+/, "");
            
            return (
              <motion.div
                key={key}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {isNumber && numericPart ? (
                    <CountUp 
                      value={parseInt(numericPart)} 
                      suffix={suffix}
                      className="text-3xl md:text-4xl font-bold text-white"
                    />
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
                <div className="text-sm text-gray-400">
                  {statLabels[key] || key}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

