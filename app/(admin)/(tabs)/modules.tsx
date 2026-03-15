import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Platform,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/theme";
import { ThemeColors } from "@/constants/theme";
import { useModules, WorklyModule } from "@/lib/modules-context";

const MODULE_ROUTES: Record<string, string> = {
  facturation: "/(admin)/(tabs)/invoices",
  devis: "/(admin)/(tabs)/quotes",
  clients: "/(admin)/(tabs)/clients",
  planning: "/(admin)/(tabs)/reservations",
  stock: "/(admin)/module-stock",
  rh: "/(admin)/module-rh",
  inventaire: "/(admin)/module-inventaire",
  comptabilite: "/(admin)/module-comptabilite",
};

export default function ModulesScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const { modules, toggleModule } = useModules();

  const topPad = Platform.OS === "web" ? 67 + 16 : insets.top + 16;
  const bottomPad = Platform.OS === "web" ? 34 + 100 : insets.bottom + 100;

  const coreModules = modules.filter(m => ["facturation", "devis", "clients", "planning"].includes(m.id));
  const optionalModules = modules.filter(m => ["stock", "rh", "inventaire", "comptabilite"].includes(m.id));

  const handleModuleTap = (mod: WorklyModule) => {
    if (!mod.enabled) return;
    const route = MODULE_ROUTES[mod.id];
    if (route) router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad, paddingBottom: bottomPad, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <Image source={require("@/assets/images/workly_logo.png")} style={styles.headerLogo} contentFit="contain" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.headerTitle}>Modules</Text>
            <Text style={styles.headerSub}>Personnalisez votre espace</Text>
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
            />
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.quickLinks}>
          <Text style={styles.sectionLabel}>Accès rapide</Text>
          <Pressable style={styles.quickLink} onPress={() => router.push("/(admin)/(tabs)/settings" as any)}>
            <View style={[styles.quickLinkIcon, { backgroundColor: theme.primary + "15" }]}>
              <Ionicons name="settings-outline" size={20} color={theme.primary} />
            </View>
            <Text style={styles.quickLinkText}>Paramètres</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
          <Pressable style={styles.quickLink} onPress={() => router.push("/(admin)/guide" as any)}>
            <View style={[styles.quickLinkIcon, { backgroundColor: "#10B981" + "15" }]}>
              <Ionicons name="book-outline" size={20} color="#10B981" />
            </View>
            <Text style={styles.quickLinkText}>Guide d'utilisation</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
          <Pressable style={[styles.quickLink, { borderBottomWidth: 0 }]} onPress={() => router.push("/(admin)/notifications" as any)}>
            <View style={[styles.quickLinkIcon, { backgroundColor: "#F59E0B" + "15" }]}>
              <Ionicons name="notifications-outline" size={20} color="#F59E0B" />
            </View>
            <Text style={styles.quickLinkText}>Notifications</Text>
            <Ionicons name="chevron-forward" size={16} color={theme.textTertiary} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function ModuleCard({
  mod,
  styles,
  theme,
  onToggle,
  onTap,
}: {
  mod: WorklyModule;
  styles: ReturnType<typeof getStyles>;
  theme: ThemeColors;
  onToggle: () => void;
  onTap: () => void;
}) {
  return (
    <Pressable
      style={[styles.moduleCard, mod.enabled && styles.moduleCardEnabled, { borderColor: mod.enabled ? mod.color + "40" : theme.border }]}
      onPress={onTap}
      disabled={!mod.enabled}
    >
      <View style={styles.moduleCardTop}>
        <View style={[styles.moduleIcon, { backgroundColor: mod.enabled ? mod.color + "20" : theme.border + "40" }]}>
          <Ionicons
            name={mod.icon as any}
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
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
      <Text style={[styles.moduleName, { color: mod.enabled ? theme.text : theme.textTertiary }]} numberOfLines={1}>
        {mod.name}
      </Text>
      <Text style={styles.moduleDesc} numberOfLines={2}>{mod.description}</Text>
      {mod.enabled && (
        <View style={styles.moduleAccess}>
          <Text style={[styles.moduleAccessText, { color: mod.color }]}>Ouvrir</Text>
          <Ionicons name="arrow-forward" size={12} color={mod.color} />
        </View>
      )}
    </Pressable>
  );
}

const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  headerLogo: { width: 38, height: 38, borderRadius: 10 },
  headerTitle: { fontSize: 22, fontFamily: "Inter_700Bold", color: theme.text },
  headerSub: { fontSize: 12, fontFamily: "Inter_400Regular", color: theme.textSecondary },
  sectionLabel: {
    fontSize: 11, fontFamily: "Inter_600SemiBold", color: theme.textTertiary,
    textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10, marginTop: 4, marginLeft: 2,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 20 },
  moduleCard: {
    width: "47%", flexGrow: 1,
    backgroundColor: theme.surface, borderRadius: 16, borderWidth: 1,
    borderColor: theme.border, padding: 14, gap: 6,
  },
  moduleCardEnabled: {
    backgroundColor: theme.surface,
  },
  moduleCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  moduleIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: "center", alignItems: "center" },
  moduleName: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: theme.text },
  moduleDesc: { fontSize: 11, fontFamily: "Inter_400Regular", color: theme.textSecondary, lineHeight: 15 },
  moduleAccess: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  moduleAccessText: { fontSize: 12, fontFamily: "Inter_600SemiBold" },
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
});
