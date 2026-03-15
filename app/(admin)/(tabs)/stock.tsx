import React, { useMemo } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/lib/theme";
import { ThemeColors } from "@/constants/theme";

const FEATURES = [
  "Suivi des niveaux de stock en temps réel",
  "Alertes de réapprovisionnement automatiques",
  "Gestion des fournisseurs",
  "Rapports d'inventaire",
];

export default function StockTab() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const topPad = Platform.OS === "web" ? 67 + 24 : insets.top + 24;

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      <View style={styles.content}>
        <View style={[styles.iconWrap, { backgroundColor: "#F59E0B20" }]}>
          <Ionicons name="cube-outline" size={56} color="#F59E0B" />
        </View>
        <Text style={styles.title}>Gestion de stock</Text>
        <Text style={styles.badge}>Bientôt disponible</Text>
        <Text style={styles.desc}>
          Gérez vos stocks, suivez vos inventaires et recevez des alertes de réapprovisionnement. Ce module sera disponible dans une prochaine mise à jour.
        </Text>
        <View style={styles.featureList}>
          {FEATURES.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={16} color="#F59E0B" />
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
  content: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 32, gap: 12 },
  iconWrap: { width: 96, height: 96, borderRadius: 24, justifyContent: "center", alignItems: "center", marginBottom: 8 },
  title: { fontSize: 24, fontFamily: "Inter_700Bold", color: theme.text },
  badge: { fontSize: 14, fontFamily: "Inter_600SemiBold", color: "#F59E0B" },
  desc: { fontSize: 14, fontFamily: "Inter_400Regular", color: theme.textSecondary, textAlign: "center", lineHeight: 20 },
  featureList: { gap: 10, width: "100%", marginTop: 8 },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  featureText: { fontSize: 13, fontFamily: "Inter_400Regular", color: theme.textSecondary },
});
