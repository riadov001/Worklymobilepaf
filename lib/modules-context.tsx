import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface WorklyModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
  route?: string;
}

const DEFAULT_MODULES: WorklyModule[] = [
  {
    id: "facturation",
    name: "Facturation",
    description: "Gestion des devis et factures",
    icon: "receipt-outline",
    color: "#4F46E5",
    enabled: true,
    route: "/(admin)/(tabs)/invoices",
  },
  {
    id: "devis",
    name: "Devis",
    description: "Création et suivi des devis",
    icon: "document-text-outline",
    color: "#7C3AED",
    enabled: true,
    route: "/(admin)/(tabs)/quotes",
  },
  {
    id: "clients",
    name: "Clients",
    description: "Base de données clients",
    icon: "people-outline",
    color: "#0EA5E9",
    enabled: true,
    route: "/(admin)/(tabs)/clients",
  },
  {
    id: "planning",
    name: "Planning",
    description: "Rendez-vous et calendrier",
    icon: "calendar-outline",
    color: "#10B981",
    enabled: true,
    route: "/(admin)/(tabs)/reservations",
  },
  {
    id: "stock",
    name: "Gestion de stock",
    description: "Suivi des stocks et inventaire",
    icon: "cube-outline",
    color: "#F59E0B",
    enabled: false,
  },
  {
    id: "rh",
    name: "Ressources Humaines",
    description: "Gestion du personnel et congés",
    icon: "briefcase-outline",
    color: "#EC4899",
    enabled: false,
  },
  {
    id: "inventaire",
    name: "Inventaire",
    description: "Suivi et gestion de l'inventaire",
    icon: "clipboard-outline",
    color: "#14B8A6",
    enabled: false,
  },
  {
    id: "comptabilite",
    name: "Comptabilité",
    description: "Suivi financier et rapports",
    icon: "calculator-outline",
    color: "#8B5CF6",
    enabled: false,
  },
];

const STORAGE_KEY = "workly_modules";

interface ModulesContextType {
  modules: WorklyModule[];
  toggleModule: (id: string) => void;
  isModuleEnabled: (id: string) => boolean;
  enabledModules: WorklyModule[];
}

const ModulesContext = createContext<ModulesContextType>({
  modules: DEFAULT_MODULES,
  toggleModule: () => {},
  isModuleEnabled: () => false,
  enabledModules: [],
});

export function ModulesProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState<WorklyModule[]>(DEFAULT_MODULES);

  useEffect(() => {
    loadModules();
  }, []);

  const loadModules = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const enabledIds: string[] = JSON.parse(stored);
        setModules(prev =>
          prev.map(m => ({ ...m, enabled: enabledIds.includes(m.id) }))
        );
      }
    } catch {}
  };

  const saveModules = async (mods: WorklyModule[]) => {
    try {
      const enabledIds = mods.filter(m => m.enabled).map(m => m.id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(enabledIds));
    } catch {}
  };

  const toggleModule = (id: string) => {
    setModules(prev => {
      const updated = prev.map(m =>
        m.id === id ? { ...m, enabled: !m.enabled } : m
      );
      saveModules(updated);
      return updated;
    });
  };

  const isModuleEnabled = (id: string) => {
    return modules.find(m => m.id === id)?.enabled || false;
  };

  const enabledModules = modules.filter(m => m.enabled);

  return (
    <ModulesContext.Provider value={{ modules, toggleModule, isModuleEnabled, enabledModules }}>
      {children}
    </ModulesContext.Provider>
  );
}

export function useModules() {
  return useContext(ModulesContext);
}
