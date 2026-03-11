"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "40+",  label: "Endpoints API" },
  { value: "5",    label: "Modules" },
  { value: "100%", label: "REST" },
  { value: "PWA",  label: "Live maintenant" },
  { value: "2026", label: "App mobile" },
];

export default function Numbers() {
  return (
    <section className="border-t border-b border-[#1A1A1A] overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 md:px-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-y divide-[#1A1A1A] sm:divide-y-0 sm:divide-x sm:divide-[#1A1A1A]">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className={`flex flex-col gap-0.5 py-5 px-5 group ${
                i === 4 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              <span className="font-michroma text-xl md:text-2xl lg:text-3xl text-white group-hover:text-[#DC2626] transition-colors duration-300">
                {s.value}
              </span>
              <span className="font-michroma text-[#444] text-[9px] tracking-widest uppercase">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
