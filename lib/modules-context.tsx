import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { adminModules } from "./admin-api";

export interface WorklyModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  enabled: boolean;
  category?: string;
  order?: number;
  route?: string;
}

const TAB_ROUTES: Record<string, string> = {
  facturation: "/(admin)/(tabs)/invoices",
  devis: "/(admin)/(tabs)/quotes",
  clients: "/(admin)/(tabs)/clients",
  planning: "/(admin)/(tabs)/reservations",
  stock: "/(admin)/(tabs)/stock",
  rh: "/(admin)/(tabs)/rh",
  inventaire: "/(admin)/(tabs)/inventaire",
  comptabilite: "/(admin)/(tabs)/comptabilite",
};

const DEFAULT_MODULES: WorklyModule[] = [
  { id: "facturation", name: "Facturation", description: "Gestion des devis et factures", icon: "receipt-outline", color: "#4F46E5", enabled: true, category: "core", order: 1 },
  { id: "devis", name: "Devis", description: "Création et suivi des devis", icon: "document-text-outline", color: "#7C3AED", enabled: true, category: "core", order: 2 },
  { id: "clients", name: "Clients", description: "Base de données clients", icon: "people-outline", color: "#0EA5E9", enabled: true, category: "core", order: 3 },
  { id: "planning", name: "Planning", description: "Rendez-vous et calendrier", icon: "calendar-outline", color: "#10B981", enabled: true, category: "core", order: 4 },
  { id: "stock", name: "Gestion de stock", description: "Suivi des stocks et inventaire", icon: "cube-outline", color: "#F59E0B", enabled: false, category: "optional", order: 5 },
  { id: "rh", name: "Ressources Humaines", description: "Gestion du personnel et congés", icon: "briefcase-outline", color: "#EC4899", enabled: false, category: "optional", order: 6 },
  { id: "inventaire", name: "Inventaire", description: "Suivi et gestion de l'inventaire", icon: "clipboard-outline", color: "#14B8A6", enabled: false, category: "optional", order: 7 },
  { id: "comptabilite", name: "Comptabilité", description: "Suivi financier et rapports", icon: "calculator-outline", color: "#8B5CF6", enabled: false, category: "optional", order: 8 },
];

const STORAGE_KEY = "workly_modules";
const PINNED_KEY = "workly_pinned_tabs";
const MAX_PINNED = 3;

const DEFAULT_PINNED: string[] = ["devis", "planning", "clients"];

interface ModulesContextType {
  modules: WorklyModule[];
  toggleModule: (id: string) => void;
  isModuleEnabled: (id: string) => boolean;
  enabledModules: WorklyModule[];
  updateModuleConfig: (id: string, updates: Partial<WorklyModule>) => void;
  refreshFromApi: () => Promise<void>;
  isSyncing: boolean;
  pinnedTabIds: string[];
  togglePinnedTab: (id: string) => void;
  isPinned: (id: string) => boolean;
  maxPinned: number;
}

const ModulesContext = createContext<ModulesContextType>({
  modules: DEFAULT_MODULES,
  toggleModule: () => {},
  isModuleEnabled: () => false,
  enabledModules: [],
  updateModuleConfig: () => {},
  refreshFromApi: async () => {},
  isSyncing: false,
  pinnedTabIds: DEFAULT_PINNED,
  togglePinnedTab: () => {},
  isPinned: () => false,
  maxPinned: MAX_PINNED,
});

export function ModulesProvider({ children }: { children: ReactNode }) {
  const [modules, setModules] = useState<WorklyModule[]>(DEFAULT_MODULES);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pinnedTabIds, setPinnedTabIds] = useState<string[]>(DEFAULT_PINNED);

  useEffect(() => {
    loadLocal().then(() => syncFromApi());
    loadPinned();
  }, []);

  const loadPinned = async () => {
    try {
      const stored = await AsyncStorage.getItem(PINNED_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setPinnedTabIds(parsed);
      }
    } catch {}
  };

  const savePinned = async (ids: string[]) => {
    try {
      await AsyncStorage.setItem(PINNED_KEY, JSON.stringify(ids));
    } catch {}
  };

  const loadLocal = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === "object") {
          setModules(parsed.map((m: any) => ({ ...m, route: TAB_ROUTES[m.id] })));
        } else if (Array.isArray(parsed)) {
          setModules(prev => prev.map(m => ({ ...m, enabled: parsed.includes(m.id) })));
        }
      }
    } catch {}
  };

  const saveLocal = async (mods: WorklyModule[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mods));
    } catch {}
  };

  const syncFromApi = async () => {
    try {
      setIsSyncing(true);
      const data = await adminModules.getAll();
      if (data?.modules && Array.isArray(data.modules)) {
        const apiModules: WorklyModule[] = data.modules.map((m: any) => ({
          id: m.id,
          name: m.name,
          description: m.description,
          icon: m.icon,
          color: m.color,
          enabled: m.enabled ?? false,
          category: m.category || "optional",
          order: m.order || 99,
          route: TAB_ROUTES[m.id],
        }));
        apiModules.sort((a, b) => (a.order || 99) - (b.order || 99));
        setModules(apiModules);
        await saveLocal(apiModules);
      }
    } catch {} finally {
      setIsSyncing(false);
    }
  };

  const syncToApi = useCallback(async (mods: WorklyModule[]) => {
    try {
      const enabledIds = mods.filter(m => m.enabled).map(m => m.id);
      await adminModules.savePreferences(enabledIds);
    } catch {}
  }, []);

  const toggleModule = useCallback((id: string) => {
    setModules(prev => {
      const updated = prev.map(m =>
        m.id === id ? { ...m, enabled: !m.enabled } : m
      );
      saveLocal(updated);
      syncToApi(updated);
      return updated;
    });
  }, [syncToApi]);

  const updateModuleConfig = useCallback((id: string, updates: Partial<WorklyModule>) => {
    setModules(prev => {
      const updated = prev.map(m =>
        m.id === id ? { ...m, ...updates } : m
      );
      saveLocal(updated);
      adminModules.updateModule(id, updates).catch(() => {});
      return updated;
    });
  }, []);

  const isModuleEnabled = useCallback((id: string) => {
    return modules.find(m => m.id === id)?.enabled || false;
  }, [modules]);

  const togglePinnedTab = useCallback((id: string) => {
    setPinnedTabIds(prev => {
      let next: string[];
      if (prev.includes(id)) {
        next = prev.filter(p => p !== id);
      } else {
        if (prev.length >= MAX_PINNED) {
          next = [...prev.slice(1), id];
        } else {
          next = [...prev, id];
        }
      }
      savePinned(next);
      return next;
    });
  }, []);

  const isPinned = useCallback((id: string) => pinnedTabIds.includes(id), [pinnedTabIds]);

  const enabledModules = modules.filter(m => m.enabled);

  return (
    <ModulesContext.Provider value={{
      modules,
      toggleModule,
      isModuleEnabled,
      enabledModules,
      updateModuleConfig,
      refreshFromApi: syncFromApi,
      isSyncing,
      pinnedTabIds,
      togglePinnedTab,
      isPinned,
      maxPinned: MAX_PINNED,
    }}>
      {children}
    </ModulesContext.Provider>
  );
}

export function useModules() {
  return useContext(ModulesContext);
}
