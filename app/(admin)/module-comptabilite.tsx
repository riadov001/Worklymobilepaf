import React, { useMemo } from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/theme";
import { ThemeColors } from "@/constants/theme";

export default function ModuleComptabiliteScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const topPad = Platform.OS === "web" ? 67 + 16 : insets.top + 16;

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={theme.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Comptabilité</Text>
        <View style={{ width: 44 }} />
      </View>
      <View style={styles.content}>
        <View style={[styles.iconWrap, { backgroundColor: "#8B5CF620" }]}>
          <Ionicons name="calculator-outline" size={56} color="#8B5CF6" />
        </View>
        <Text style={styles.title}>Module Comptabilité</Text>
        <Text style={styles.subtitle}>Bientôt disponible</Text>
        <Text style={styles.desc}>
          Suivez vos finances, générez vos rapports comptables et pilotez votre trésorerie. Ce module sera disponible dans une prochaine mise à jour.
        </Text>
        <View style={styles.featureList}>
          {["Tableau de bord financier", "Gestion de la trésorerie", "Rapports et bilans comptables", "Export vers logiciels comptables"].map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={16} color="#8B5CF6" />
              <Text style={styles.featureText}>{f}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme: ThemeColors) => StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.background },
  header: {
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    paddingHorizontal: 16, paddingBottom: 12,
    borderBottomWidth: 1, borderBottomColor: theme.border,
  },
  backBtn: { width: 44, height: 44, justifyContent: "center", alignItems: "center" },
  headerTitle: { fontSize: 17, fontFamily: "Inter_600SemiBold", color: theme.text },
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 12 },
  iconWrap: { width: 96, height: 96, borderRadius: 24, justifyContent: "center", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 24, fontFamily: "Inter_700Bold", color: theme.text },
  subtitle: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#8B5CF6" },
  desc: { fontSize: 14, fontFamily: "Inter_400Regular", color: theme.textSecondary, textAlign: "center", lineHeight: 20 },
  featureList: { gap: 10, width: "100%", marginTop: 8 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { fontSize: 13, fontFamily: "Inter_400Regular", color: theme.textSecondary },
});
