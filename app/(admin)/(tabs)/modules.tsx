import React, { useMemo, useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, Pressable, Switch, Platform, TextInput, Modal, ActivityIndicator,
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
  facturation:  "/(admin)/(tabs)/invoices",
  devis:        "/(admin)/(tabs)/quotes",
  clients:      "/(admin)/(tabs)/clients",
  planning:     "/(admin)/(tabs)/reservations",
  stock:        "/(admin)/(tabs)/stock",
  rh:           "/(admin)/(tabs)/rh",
  inventaire:   "/(admin)/(tabs)/inventaire",
  comptabilite: "/(admin)/(tabs)/comptabilite",
};

export default function MoreScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { modules, enabledModules, pinnedTabIds, toggleModule, refreshFromApi, isSyncing } = useModules();

  const [editingModule, setEditingModule] = useState<WorklyModule | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const { updateModuleConfig } = useModules();

  const topPad = Platform.OS === "web" ? 67 + 16 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 100 : insets.bottom + 100;

  const notPinnedEnabled = enabledModules.filter(m => !pinnedTabIds.includes(m.id));
  const disabledModules = modules.filter(m => !m.enabled);

  const handleModuleTap = (mod: WorklyModule) => {
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
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Image source={require("@/assets/images/workly_logo.png")} style={styles.logo} contentFit="contain" />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headerTitle}>Plus</Text>
            <Text style={styles.headerSub}>Tous vos outils</Text>
          </View>
          {isSyncing ? (
            <ActivityIndicator size="small" color={theme.primary} />
          ) : (
            <Pressable style={[styles.iconBtn, { backgroundColor: theme.primary + "12" }]} onPress={refreshFromApi}>
              <Ionicons name="sync-outline" size={18} color={theme.primary} />
            </Pressable>
          )}
        </View>

        {notPinnedEnabled.length > 0 && (
          <>
            <Text style={[styles.section, { marginHorizontal: 16 }]}>Modules actifs</Text>
            <View style={styles.grid}>
              {notPinnedEnabled.map(mod => (
                <ModuleCard key={mod.id} mod={mod} theme={theme} styles={styles} onTap={() => handleModuleTap(mod)} onEdit={() => handleEdit(mod)} />
              ))}
            </View>
          </>
        )}

        <View style={[styles.linkGroup, { marginHorizontal: 16 }]}>
          <Pressable style={styles.linkRow} onPress={() => router.push("/(admin)/(tabs)/settings" as never)}>
            <View style={[styles.linkIcon, { backgroundColor: theme.primary + "15" }]}>
              <Ionicons name="settings-outline" size={20} color={theme.primary} />
            </View>
            <Text style={styles.linkLabel}>Paramètres</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
          <Pressable style={styles.linkRow} onPress={() => router.push("/(admin)/notifications" as never)}>
            <View style={[styles.linkIcon, { backgroundColor: "#F59E0B15" }]}>
              <Ionicons name="notifications-outline" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.linkLabel}>Notifications</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
          <Pressable style={[styles.linkRow, { borderBottomWidth: 0 }]} onPress={() => router.push("/(admin)/guide" as never)}>
            <View style={[styles.linkIcon, { backgroundColor: "#10B98115" }]}>
              <Ionicons name="book-outline" size={20} color="#10B981" />
            </View>
            <Text style={styles.linkLabel}>Guide d&apos;utilisation</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
        </View>

        {disabledModules.length > 0 && (
          <>
            <Text style={[styles.section, { marginHorizontal: 16, marginTop: 20 }]}>Modules disponibles</Text>
            <View style={[styles.linkGroup, { marginHorizontal: 16 }]}>
              {disabledModules.map((mod, i) => (
                <View key={mod.id} style={[styles.disabledRow, i === disabledModules.length - 1 && { borderBottomWidth: 0 }]}>
                  <View style={[styles.linkIcon, { backgroundColor: mod.color + "18" }]}>
                    <Ionicons name={mod.icon as IoniconName} size={20} color={mod.color} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.disabledName}>{mod.name}</Text>
                    <Text style={styles.disabledDesc} numberOfLines={1}>{mod.description}</Text>
                  </View>
                  <Switch
                    value={false}
                    onValueChange={() => toggleModule(mod.id)}
                    thumbColor="#fff"
                    trackColor={{ false: theme.border, true: mod.color }}
                    ios_backgroundColor={theme.border}
                    style={{ transform: [{ scaleX: 0.78 }, { scaleY: 0.78 }] }}
                  />
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <Modal visible={!!editingModule} transparent animationType="fade" onRequestClose={() => setEditingModule(null)}>
        <Pressable style={styles.overlay} onPress={() => setEditingModule(null)}>
          <Pressable style={styles.modalBox} onPress={() => {}}>
            <View style={styles.modalHeader}>
              <View style={[styles.modalIconBox, { backgroundColor: (editingModule?.color || theme.primary) + "20" }]}>
                <Ionicons name={(editingModule?.icon || "apps-outline") as IoniconName} size={24} color={editingModule?.color || theme.primary} />
              </View>
              <Text style={styles.modalTitle}>Personnaliser</Text>
            </View>
            <Text style={styles.inputLabel}>Nom</Text>
            <TextInput style={styles.input} value={editName} onChangeText={setEditName} placeholderTextColor={theme.textTertiary} />
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput style={[styles.input, { height: 72, textAlignVertical: "top" }]} value={editDesc} onChangeText={setEditDesc} placeholderTextColor={theme.textTertiary} multiline />
            <View style={styles.modalActions}>
              <Pressable style={[styles.modalBtn, { backgroundColor: theme.border + "40" }]} onPress={() => setEditingModule(null)}>
                <Text style={[styles.modalBtnTxt, { color: theme.textSecondary }]}>Annuler</Text>
              </Pressable>
              <Pressable style={[styles.modalBtn, { backgroundColor: theme.primary }]} onPress={handleSaveEdit}>
                <Text style={[styles.modalBtnTxt, { color: "#fff" }]}>Enregistrer</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

function ModuleCard({ mod, theme, styles, onTap, onEdit }: { mod: WorklyModule; theme: ThemeColors; styles: ReturnType<typeof getStyles>; onTap: () => void; onEdit: () => void }) {
  return (
    <Pressable style={[styles.card, { borderColor: mod.color + "30" }]} onPress={onTap}>
      <View style={styles.cardTop}>
        <View style={[styles.cardIcon, { backgroundColor: mod.color + "18" }]}>
          <Ionicons name={mod.icon as IoniconName} size={22} color={mod.color} />
        </View>
        <Pressable style={styles.editBtn} onPress={onEdit} hitSlop={8}>
          <Ionicons name="pencil-outline" size={13} color={theme.textTertiary} />
        </Pressable>
      </View>
      <Text style={[styles.cardName, { color: theme.text }]} numberOfLines={1}>{mod.name}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{mod.description}</Text>
      <View style={styles.cardFooter}>
        <Text style={[styles.openText, { color: mod.color }]}>Ouvrir</Text>
        <Ionicons name="arrow-forward" size={12} color={mod.color} />
      </View>
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20, paddingHorizontal: 16 },
  logo: { width: 40, height: 40, borderRadius: 12 },
  headerTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: theme.text },
  headerSub: { fontSize: 12, fontFamily: "Inter_400Regular", color: theme.textSecondary },
  iconBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  section: { fontSize: 11, fontFamily: "Inter_600SemiBold", color: theme.textTertiary, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16, paddingHorizontal: 16 },
  card: {
    width: "47%", flexGrow: 1,
    backgroundColor: theme.surface, borderRadius: 16, borderWidth: 1.5,
    borderColor: theme.border, padding: 14, gap: 4,
  },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  cardIcon: { width: 42, height: 42, borderRadius: 13, justifyContent: "center", alignItems: "center" },
  cardName: { fontSize: 14, fontFamily: "Inter_600SemiBold" },
  cardDesc: { fontSize: 11, fontFamily: "Inter_400Regular", color: theme.textSecondary, lineHeight: 15 },
  cardFooter: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 6 },
  openText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
  editBtn: { width: 26, height: 26, borderRadius: 8, justifyContent: "center", alignItems: "center", backgroundColor: theme.border + "40" },
  linkGroup: {
    backgroundColor: theme.surface, borderRadius: 16,
    borderWidth: 1, borderColor: theme.border, overflow: "hidden", marginBottom: 8,
  },
  linkRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 14, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: theme.border,
  },
  linkIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: "center", alignItems: "center" },
  linkLabel: { flex: 1, fontSize: 15, fontFamily: "Inter_500Medium", color: theme.text },
  disabledRow: {
    flexDirection: "row", alignItems: "center", gap: 12,
    paddingHorizontal: 14, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: theme.border,
  },
  disabledName: { fontSize: 14, fontFamily: "Inter_500Medium", color: theme.text },
  disabledDesc: { fontSize: 11, fontFamily: "Inter_400Regular", color: theme.textSecondary, marginTop: 1 },
  overlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: 24 },
  modalBox: { width: "100%", maxWidth: 400, backgroundColor: theme.surface, borderRadius: 20, padding: 24 },
  modalHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  modalIconBox: { width: 48, height: 48, borderRadius: 14, justifyContent: "center", alignItems: "center" },
  modalTitle: { fontSize: 18, fontFamily: "Inter_700Bold", color: theme.text },
  inputLabel: { fontSize: 12, fontFamily: "Inter_600SemiBold", color: theme.textSecondary, marginBottom: 6, marginTop: 4 },
  input: {
    backgroundColor: theme.inputBg, borderWidth: 1, borderColor: theme.inputBorder,
    borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11,
    fontSize: 15, fontFamily: "Inter_400Regular", color: theme.text, marginBottom: 12,
  },
  modalActions: { flexDirection: "row", gap: 10, marginTop: 8 },
  modalBtn: { flex: 1, paddingVertical: 13, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  modalBtnTxt: { fontSize: 15, fontFamily: "Inter_600SemiBold" },
});
