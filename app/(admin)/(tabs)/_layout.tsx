import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { useTheme } from "@/lib/theme";
import { useModules } from "@/lib/modules-context";

const MODULE_TAB_MAP: Record<string, { screen: string; title: string; icon: string }> = {
  devis: { screen: "quotes", title: "Devis", icon: "document-text-outline" },
  facturation: { screen: "invoices", title: "Factures", icon: "receipt-outline" },
  planning: { screen: "reservations", title: "RDV", icon: "calendar-outline" },
  clients: { screen: "clients", title: "Clients", icon: "people-outline" },
};

export default function AdminTabLayout() {
  const theme = useTheme();
  const isWeb = Platform.OS === "web";
  const isIOS = Platform.OS === "ios";
  const { modules } = useModules();

  const visibleTabs = useMemo(() => {
    const enabled = modules.filter(m => m.enabled && MODULE_TAB_MAP[m.id]);
    return enabled.map(m => MODULE_TAB_MAP[m.id].screen);
  }, [modules]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textTertiary,
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 10,
        },
        tabBarStyle: {
          position: "absolute" as const,
          backgroundColor: isIOS ? "transparent" : theme.surface,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView intensity={100} tint="dark" style={StyleSheet.absoluteFill} />
          ) : isWeb ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: theme.surface }]} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />,
        }}
      />
      {visibleTabs.includes("quotes") && (
        <Tabs.Screen
          name="quotes"
          options={{
            title: "Devis",
            tabBarIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
          }}
        />
      )}
      {visibleTabs.includes("invoices") && (
        <Tabs.Screen
          name="invoices"
          options={{
            title: "Factures",
            tabBarIcon: ({ color, size }) => <Ionicons name="receipt-outline" size={size} color={color} />,
          }}
        />
      )}
      {visibleTabs.includes("reservations") && (
        <Tabs.Screen
          name="reservations"
          options={{
            title: "RDV",
            tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
          }}
        />
      )}
      {visibleTabs.includes("clients") && (
        <Tabs.Screen
          name="clients"
          options={{
            title: "Clients",
            tabBarIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
          }}
        />
      )}
      <Tabs.Screen
        name="modules"
        options={{
          title: "Modules",
          tabBarIcon: ({ color, size }) => <Ionicons name="apps-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
