import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Platform,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/theme";
import { ThemeColors } from "@/constants/theme";
import { useModules, WorklyModule } from "@/lib/modules-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

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

export default function ModulesScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { modules, toggleModule, updateModuleConfig, refreshFromApi, isSyncing } = useModules();

  const [editingModule, setEditingModule] = useState<WorklyModule | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const topPad = Platform.OS === "web" ? 67 + 16 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 100 : insets.bottom + 100;

  const coreModules = modules.filter(m => m.category === "core" || ["facturation", "devis", "clients", "planning"].includes(m.id));
  const optionalModules = modules.filter(m => m.category === "optional" || ["stock", "rh", "inventaire", "comptabilite"].includes(m.id));

  const handleModuleTap = (mod: WorklyModule) => {
    if (!mod.enabled) return;
    const route = mod.route || TAB_ROUTES[mod.id];
    if (route) router.push(route as never);
  };

  const handleEdit = (mod: WorklyModule) => {
    setEditingModule(mod);
    setEditName(mod.name);
    setEditDesc(mod.description);
  };

  const handleSaveEdit = () => {
    if (editingModule) {
      updateModuleConfig(editingModule.id, { name: editName, description: editDesc });
      setEditingModule(null);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Image source={require("@/assets/images/workly_logo.png")} style={styles.headerLogo} contentFit="contain" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Modules</Text>
            <Text style={styles.headerSub}>Personnalisez votre espace de travail</Text>
          </View>
          {isSyncing ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Pressable
              style={[styles.syncBtn, { backgroundColor: theme.primary + "12" }]}
              onPress={refreshFromApi}
            >
              <Ionicons name="sync-outline" size={18} color={theme.primary} />
            </Pressable>
          )}
        </View>

        <View style={styles.statsBar}>
          <View style={[styles.statPill, { backgroundColor: theme.primary + "15" }]}>
            <Ionicons name="checkmark-circle" size={14} color={theme.primary} />
            <Text style={[styles.statPillText, { color: theme.primary }]}>
              {modules.filter(m => m.enabled).length} actifs
            </Text>
          </View>
          <View style={[styles.statPill, { backgroundColor: theme.textTertiary + "15" }]}>
            <Ionicons name="apps-outline" size={14} color={theme.textTertiary} />
            <Text style={[styles.statPillText, { color: theme.textTertiary }]}>
              {modules.length} disponibles
            </Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Modules principaux</Text>
        <View style={styles.grid}>
          {coreModules.map(mod => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              styles={styles}
              theme={theme}
              onToggle={() => toggleModule(mod.id)}
              onTap={() => handleModuleTap(mod)}
              onEdit={() => handleEdit(mod)}
            />
          ))}
        </View>

        <Text style={styles.sectionLabel}>Modules complémentaires</Text>
        <View style={styles.grid}>
          {optionalModules.map(mod => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              styles={styles}
              theme={theme}
              onToggle={() => toggleModule(mod.id)}
              onTap={() => handleModuleTap(mod)}
              onEdit={() => handleEdit(mod)}
            />
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.quickLinks}>
          <Pressable style={styles.quickLink} onPress={() => router.push("/(admin)/(tabs)/settings" as never)}>
            <View style={[styles.quickLinkIcon, { backgroundColor: theme.primary + "15" }]}>
              <Ionicons name="settings-outline" size={20} color={theme.primary} />
            </View>
            <Text style={styles.quickLinkText}>Paramètres</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
          <Pressable style={styles.quickLink} onPress={() => router.push("/(admin)/guide" as never)}>
            <View style={[styles.quickLinkIcon, { backgroundColor: "#10B981" + "15" }]}>
              <Ionicons name="book-outline" size={20} color="#10B981" />
            </View>
            <Text style={styles.quickLinkText}>Guide d'utilisation</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
          <Pressable style={[styles.quickLink, { borderBottomWidth: 0 }]} onPress={() => router.push("/(admin)/notifications" as never)}>
            <View style={[styles.quickLinkIcon, { backgroundColor: "#F59E0B" + "15" }]}>
              <Ionicons name="notifications-outline" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.quickLinkText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
        </View>
      </ScrollView>

      <Modal visible={!!editingModule} transparent animationType="fade" onRequestClose={() => setEditingModule(null)}>
        <Pressable style={styles.modalOverlay} onPress={() => setEditingModule(null)}>
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <View style={[styles.modalIcon, { backgroundColor: (editingModule?.color || theme.primary) + "20" }]}>
                <Ionicons name={(editingModule?.icon || "apps-outline") as IoniconName} size={24} color={editingModule?.color || theme.primary} />
              </View>
              <Text style={styles.modalTitle}>Personnaliser le module</Text>
            </View>

            <Text style={styles.inputLabel}>Nom du module</Text>
            <TextInput
              style={styles.input}
              value={editName}
              onChangeText={setEditName}
              placeholder="Nom personnalisé..."
              placeholderTextColor={theme.textTertiary}
            />

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={[styles.input, { height: 80, textAlignVertical: "top" }]}
              value={editDesc}
              onChangeText={setEditDesc}
              placeholder="Description personnalisée..."
              placeholderTextColor={theme.textTertiary}
              multiline
            />

            <View style={styles.modalActions}>
              <Pressable style={[styles.modalBtn, styles.modalBtnCancel]} onPress={() => setEditingModule(null)}>
                <Text style={[styles.modalBtnText, { color: theme.textSecondary }]}>Annuler</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, styles.modalBtnSave, { backgroundColor: theme.primary }]} onPress={handleSaveEdit}>
                <Text style={[styles.modalBtnText, { color: "#fff" }]}>Enregistrer</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function ModuleCard({
  mod,
  styles,
  theme,
  onToggle,
  onTap,
  onEdit,
}: {
  mod: WorklyModule;
  styles: ReturnType<typeof getStyles>;
  theme: ThemeColors;
  onToggle: () => void;
  onTap: () => void;
  onEdit: () => void;
}) {
  return (
    <Pressable
      style={[styles.moduleCard, mod.enabled && { borderColor: mod.color + "35", backgroundColor: theme.surface }]}
      onPress={onTap}
      disabled={!mod.enabled}
    >
      <View style={styles.moduleCardTop}>
        <View style={[styles.moduleIcon, { backgroundColor: mod.enabled ? mod.color + "18" : theme.border + "30" }]}>
          <Ionicons
            name={mod.icon as IoniconName}
            size={22}
            color={mod.enabled ? mod.color : theme.textTertiary}
          />
        </View>
        <Switch
          value={mod.enabled}
          onValueChange={onToggle}
          thumbColor={mod.enabled ? "#fff" : "#ccc"}
          trackColor={{ false: theme.border, true: mod.color }}
          ios_backgroundColor={theme.border}
          style={{ transform: [{ scaleX: 0.78 }, { scaleY: 0.78 }] }}
        />
      </View>
      <Text style={[styles.moduleName, { color: mod.enabled ? theme.text : theme.textTertiary }]} numberOfLines={1}>
        {mod.name}
      </Text>
      <Text style={styles.moduleDesc} numberOfLines={2}>{mod.description}</Text>
      <View style={styles.moduleFooter}>
        {mod.enabled ? (
          <Pressable style={styles.moduleAccess} onPress={onTap}>
            <Text style={[styles.moduleAccessText, { color: mod.color }]}>Ouvrir</Text>
            <Ionicons name="arrow-forward" size={12} color={mod.color} />
          </Pressable>
        ) : (
          <View style={{ height: 20 }} />
        )}
        <Pressable style={styles.editBtn} onPress={onEdit} hitSlop={8}>
          <Ionicons name="pencil-outline" size={14} color={theme.textTertiary} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  headerLogo: { width: 40, height: 40, borderRadius: 12 },
  headerTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: theme.text },
  headerSub: { fontSize: 12, fontFamily: "Inter_400Regular", color: theme.textSecondary, marginTop: 1 },
  syncBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  statsBar: { flexDirection: "row", gap: 8, marginBottom: 20 },
  statPill: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  statPillText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  sectionLabel: {
    fontSize: 11, fontFamily: "Inter_600SemiBold", color: theme.textTertiary,
    textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10, marginTop: 4, marginLeft: 2,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 20 },
  moduleCard: {
    width: "47%", flexGrow: 1,
    backgroundColor: theme.surface, borderRadius: 16, borderWidth: 1.5,
    borderColor: theme.border, padding: 14, gap: 5,
  },
  moduleCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  moduleIcon: { width: 42, height: 42, borderRadius: 13, justifyContent: "center", alignItems: "center" },
  moduleName: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: theme.text },
  moduleDesc: { fontSize: 11, fontFamily: "Inter_400Regular", color: theme.textSecondary, lineHeight: 15 },
  moduleFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6 },
  moduleAccess: { flexDirection: "row", alignItems: "center", gap: 4 },
  moduleAccessText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  editBtn: { width: 28, height: 28, borderRadius: 8, justifyContent: "center", alignItems: "center", backgroundColor: theme.border + "40" },
  divider: { height: 1, backgroundColor: theme.border, marginVertical: 8 },
  quickLinks: {
    backgroundColor: theme.surface, borderRadius: 16, borderWidth: 1,
    borderColor: theme.border, overflow: "hidden", marginTop: 4,
  },
  quickLink: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 14, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: theme.border,
  },
  quickLinkIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  quickLinkText: { flex: 1, fontSize: 15, fontFamily: "Inter_500Medium", color: theme.text },
  modalOverlay: {
    flex: 1, justifyContent: "center", alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", padding: 24,
  },
  modalContent: {
    width: "100%", maxWidth: 400,
    backgroundColor: theme.surface, borderRadius: 20, padding: 24,
  },
  modalHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  modalIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  modalTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: theme.text },
  inputLabel: { fontSize: 12, fontFamily: "Inter_600SemiBold", color: theme.textSecondary, marginBottom: 6, marginTop: 4 },
  input: {
    backgroundColor: theme.inputBg, borderWidth: 1, borderColor: theme.inputBorder,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12,
    fontSize: 15, fontFamily: "Inter_400Regular", color: theme.text, marginBottom: 12,
  },
  modalActions: { flexDirection: "row", gap: 10, marginTop: 8 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  modalBtnCancel: { backgroundColor: theme.border + "40" },
  modalBtnSave: {},
  modalBtnText: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
});
