"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  companyName: string;
  siret: string;
  address: string;
  city: string;
  directorName: string;
  directorEmail: string;
  directorPhone: string;
  employeeCount: string;
  clientCount: string;
  clientTypes: string[];
  services: string[];
  currentTool: string;
  painPoints: string;
  planInterest: string;
  message: string;
}

const initialForm: FormData = {
  companyName: "",
  siret: "",
  address: "",
  city: "",
  directorName: "",
  directorEmail: "",
  directorPhone: "",
  employeeCount: "",
  clientCount: "",
  clientTypes: [],
  services: [],
  currentTool: "",
  painPoints: "",
  planInterest: "",
  message: "",
};

const clientTypeOptions = [
  "Particuliers", "Professionnels", "Flottes d'entreprise",
  "Assurances", "Concessionnaires", "Leasing / LOA",
];

const serviceOptions = [
  "Mécanique générale", "Carrosserie", "Pneumatiques",
  "Électronique auto", "Climatisation", "Contrôle technique",
  "Entretien rapide", "Vitrage",
];

const planOptions = [
  { id: "starter", label: "Starter", desc: "1 garage · jusqu'à 50 clients" },
  { id: "pro", label: "Pro", desc: "1 garage · clients illimités" },
  { id: "business", label: "Business", desc: "Multi-sites · fonctionnalités avancées" },
  { id: "enterprise", label: "Enterprise", desc: "Sur mesure · intégrations custom" },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    { label: "Entreprise", icon: "🏢" },
    { label: "Dirigeant", icon: "👤" },
    { label: "Activité", icon: "🔧" },
    { label: "Plan", icon: "🚀" },
  ];

  const set = (key: keyof FormData, value: string | string[]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggleArray = (key: "clientTypes" | "services", val: string) => {
    const arr = form[key] as string[];
    set(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const handleSubmit = () => {
    const body = `
NOUVELLE DEMANDE D'ACCÈS MYTOOLS ADMIN
=======================================

ENTREPRISE
----------
Nom : ${form.companyName}
SIRET : ${form.siret}
Adresse : ${form.address}, ${form.city}

DIRIGEANT
---------
Nom : ${form.directorName}
Email : ${form.directorEmail}
Téléphone : ${form.directorPhone}

ACTIVITÉ
--------
Employés : ${form.employeeCount}
Clients actifs : ${form.clientCount}
Types de clients : ${form.clientTypes.join(", ")}
Services proposés : ${form.services.join(", ")}
Outil actuel : ${form.currentTool || "Aucun / Papier"}
Points de friction : ${form.painPoints}

PLAN SOUHAITÉ
-------------
${form.planInterest}

MESSAGE COMPLÉMENTAIRE
----------------------
${form.message || "—"}
`.trim();

    window.location.href = `mailto:contact@mytoolsgroup.eu?subject=Demande accès MyTools Admin — ${encodeURIComponent(form.companyName)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const canNext = () => {
    if (step === 0) return form.companyName.trim() !== "" && form.city.trim() !== "";
    if (step === 1) return form.directorName.trim() !== "" && form.directorEmail.trim() !== "" && form.directorPhone.trim() !== "";
    if (step === 2) return form.employeeCount !== "" && form.clientCount !== "";
    if (step === 3) return form.planInterest !== "";
    return true;
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 px-4 md:px-8">
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-12 bg-[#DC2626]" />
            <span className="font-michroma text-[#DC2626] text-xs tracking-[0.3em] uppercase">Accès Admin</span>
            <div className="h-px w-12 bg-[#DC2626]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-michroma text-2xl md:text-3xl lg:text-4xl text-white tracking-widest uppercase mb-4 text-center"
          >
            Demander votre<br />
            <span className="text-[#DC2626]">accès personnalisé</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-exo text-[#666] text-xs tracking-widest leading-relaxed"
          >
            Renseignez votre garage en 2 minutes.<br />
            Nous vous proposons le plan le plus adapté à votre activité.
          </motion.p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#161616] border border-green-500/30 rounded-2xl p-10 text-center"
            >
              <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                ✓
              </div>
              <h3 className="font-michroma text-white text-lg tracking-widest uppercase mb-3">
                Demande envoyée
              </h3>
              <p className="font-exo text-[#666] text-xs tracking-widest leading-relaxed">
                Votre client mail s'est ouvert avec le récapitulatif.<br />
                Envoyez-le et nous vous répondons sous 24h avec votre plan sur mesure.
              </p>
              <button
                onClick={() => { setSubmitted(false); setStep(0); setForm(initialForm); }}
                className="mt-8 font-michroma text-[#DC2626] text-xs tracking-widest uppercase hover:text-white transition-colors"
              >
                Nouvelle demande →
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#161616] border border-[#2A2A2A] rounded-2xl overflow-hidden"
            >
              {/* Stepper */}
              <div className="flex border-b border-[#2A2A2A]">
                {steps.map((s, i) => (
                  <button
                    key={s.label}
                    onClick={() => i < step && setStep(i)}
                    className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1.5 py-4 transition-all text-center
                      ${i === step
                        ? "bg-[#DC2626]/10 border-b-2 border-[#DC2626]"
                        : i < step
                        ? "bg-[#0A0A0A] cursor-pointer hover:bg-[#1A1A1A]"
                        : "opacity-40 cursor-default"
                      }`}
                  >
                    <span className="text-base">{s.icon}</span>
                    <span className={`font-michroma text-[9px] tracking-widest uppercase ${i === step ? "text-white" : "text-[#666]"}`}>
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Step content */}
              <div className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-5"
                  >
                    {step === 0 && (
                      <>
                        <StepTitle title="Votre entreprise" sub="Informations générales du garage" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Nom du garage *" value={form.companyName} onChange={(v) => set("companyName", v)} placeholder="Garage Dupont Auto" />
                          <Field label="SIRET" value={form.siret} onChange={(v) => set("siret", v)} placeholder="123 456 789 00012" />
                        </div>
                        <Field label="Adresse" value={form.address} onChange={(v) => set("address", v)} placeholder="12 rue de la Mécanique" />
                        <Field label="Ville *" value={form.city} onChange={(v) => set("city", v)} placeholder="Paris" />
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <StepTitle title="Le dirigeant" sub="Votre contact principal pour l'accès" />
                        <Field label="Prénom et Nom *" value={form.directorName} onChange={(v) => set("directorName", v)} placeholder="Jean Dupont" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <Field label="Email professionnel *" type="email" value={form.directorEmail} onChange={(v) => set("directorEmail", v)} placeholder="jean@garage.fr" />
                          <Field label="Téléphone *" type="tel" value={form.directorPhone} onChange={(v) => set("directorPhone", v)} placeholder="+33 6 XX XX XX XX" />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <StepTitle title="Votre activité" sub="Pour calibrer votre plan au plus juste" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <SelectField
                            label="Nombre d'employés *"
                            value={form.employeeCount}
                            onChange={(v) => set("employeeCount", v)}
                            options={["1 (solo)", "2–5", "6–10", "11–20", "20+"]}
                          />
                          <SelectField
                            label="Clients actifs *"
                            value={form.clientCount}
                            onChange={(v) => set("clientCount", v)}
                            options={["Moins de 50", "50–200", "200–500", "500–1000", "1000+"]}
                          />
                        </div>
                        <CheckboxGroup
                          label="Types de clients"
                          options={clientTypeOptions}
                          selected={form.clientTypes}
                          onToggle={(v) => toggleArray("clientTypes", v)}
                        />
                        <CheckboxGroup
                          label="Services proposés"
                          options={serviceOptions}
                          selected={form.services}
                          onToggle={(v) => toggleArray("services", v)}
                        />
                        <Field
                          label="Outil de gestion actuel"
                          value={form.currentTool}
                          onChange={(v) => set("currentTool", v)}
                          placeholder="EBP, Excel, papier, autre logiciel..."
                        />
                        <TextareaField
                          label="Vos points de friction actuels"
                          value={form.painPoints}
                          onChange={(v) => set("painPoints", v)}
                          placeholder="Ce qui vous fait perdre le plus de temps aujourd'hui..."
                        />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <StepTitle title="Votre plan" sub="Choisissez le plan qui vous correspond" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {planOptions.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => set("planInterest", p.label)}
                              className={`text-left p-4 rounded-xl border transition-all ${
                                form.planInterest === p.label
                                  ? "border-[#DC2626] bg-[#DC2626]/10"
                                  : "border-[#2A2A2A] hover:border-[#DC2626]/40"
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${form.planInterest === p.label ? "border-[#DC2626] bg-[#DC2626]" : "border-[#666]"}`} />
                                <span className="font-michroma text-white text-xs tracking-widest uppercase">{p.label}</span>
                              </div>
                              <p className="font-exo text-[#666] text-[10px] tracking-wide ml-5">{p.desc}</p>
                            </button>
                          ))}
                        </div>
                        <TextareaField
                          label="Message complémentaire (optionnel)"
                          value={form.message}
                          onChange={(v) => set("message", v)}
                          placeholder="Vos besoins spécifiques, questions, délais souhaités..."
                        />
                        <div className="bg-[#0A0A0A] border border-[#2A2A2A] rounded-xl p-4">
                          <p className="font-exo text-[#666] text-[10px] tracking-widest leading-relaxed">
                            En soumettant ce formulaire, votre client mail s'ouvrira avec un récapitulatif complet. Nous vous répondrons sous 24h avec une proposition personnalisée et les accès à MyTools Admin.
                          </p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 flex items-center justify-between gap-4">
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className={`font-michroma text-xs tracking-widest uppercase text-[#666] hover:text-white transition-colors ${step === 0 ? "opacity-0 pointer-events-none" : ""}`}
                >
                  ← Retour
                </button>

                <div className="flex items-center gap-2">
                  {steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 transition-all ${i === step ? "w-8 bg-[#DC2626]" : i < step ? "w-4 bg-[#DC2626]/40" : "w-4 bg-[#2A2A2A]"}`}
                    />
                  ))}
                </div>

                {step < steps.length - 1 ? (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext()}
                    className="font-michroma text-xs tracking-widest uppercase bg-[#DC2626] disabled:bg-[#2A2A2A] disabled:text-[#666] text-white px-6 py-3 rounded-lg transition-all"
                  >
                    Suivant →
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={!canNext()}
                    className="group font-michroma text-xs tracking-widest uppercase bg-[#DC2626] disabled:bg-[#2A2A2A] disabled:text-[#666] text-white px-6 py-3 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] relative overflow-hidden"
                  >
                    <span className="relative z-10">Envoyer ma demande →</span>
                    <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ===== SUBCOMPONENTS ===== */

function StepTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-2">
      <h3 className="font-michroma text-white text-sm tracking-widest uppercase mb-1">{title}</h3>
      <p className="font-michroma text-[#666] text-[10px] tracking-widest">{sub}</p>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-michroma text-[#A8A8A8] text-[10px] tracking-widest uppercase">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#DC2626]/60 rounded-lg px-4 py-3 text-white font-exo text-xs tracking-wide placeholder:text-[#444] outline-none transition-colors w-full"
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-michroma text-[#A8A8A8] text-[10px] tracking-widest uppercase">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#DC2626]/60 rounded-lg px-4 py-3 text-white font-exo text-xs tracking-wide outline-none transition-colors appearance-none cursor-pointer"
      >
        <option value="" className="text-[#444]">Sélectionner...</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-white bg-[#161616]">{o}</option>
        ))}
      </select>
    </div>
  );
}

function CheckboxGroup({
  label, options, selected, onToggle,
}: {
  label: string; options: string[]; selected: string[]; onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="font-michroma text-[#A8A8A8] text-[10px] tracking-widest uppercase">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onToggle(o)}
            className={`font-michroma text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-lg border transition-all ${
              selected.includes(o)
                ? "border-[#DC2626] bg-[#DC2626]/10 text-white"
                : "border-[#2A2A2A] text-[#666] hover:border-[#DC2626]/30 hover:text-[#A8A8A8]"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}

function TextareaField({
  label, value, onChange, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-michroma text-[#A8A8A8] text-[10px] tracking-widest uppercase">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="bg-[#0A0A0A] border border-[#2A2A2A] focus:border-[#DC2626]/60 rounded-lg px-4 py-3 text-white font-exo text-xs tracking-wide placeholder:text-[#444] outline-none transition-colors resize-none w-full"
      />
    </div>
  );
}
