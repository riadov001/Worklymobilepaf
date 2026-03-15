import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import type { ComponentProps } from "react";
import { useTheme } from "@/lib/theme";
import { useModules } from "@/lib/modules-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

type TabDef = {
  screen: string;
  title: string;
  icon: IoniconName;
};

const MODULE_TAB_MAP: Record<string, TabDef> = {
  devis: { screen: "quotes", title: "Devis", icon: "document-text-outline" },
  facturation: { screen: "invoices", title: "Factures", icon: "receipt-outline" },
  planning: { screen: "reservations", title: "RDV", icon: "calendar-outline" },
  clients: { screen: "clients", title: "Clients", icon: "people-outline" },
  stock: { screen: "stock", title: "Stock", icon: "cube-outline" },
  rh: { screen: "rh", title: "RH", icon: "briefcase-outline" },
  inventaire: { screen: "inventaire", title: "Inventaire", icon: "clipboard-outline" },
  comptabilite: { screen: "comptabilite", title: "Comptabilité", icon: "calculator-outline" },
};

export default function AdminTabLayout() {
  const theme = useTheme();
  const isWeb = Platform.OS === "web";
  const isIOS = Platform.OS === "ios";
  const { modules } = useModules();

  const visibleTabs = useMemo<TabDef[]>(() => {
    return modules
      .filter(m => m.enabled && MODULE_TAB_MAP[m.id])
      .map(m => MODULE_TAB_MAP[m.id]);
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
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="quotes"
        options={{
          href: visibleTabs.some(t => t.screen === "quotes") ? undefined : null,
          title: "Devis",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="invoices"
        options={{
          href: visibleTabs.some(t => t.screen === "invoices") ? undefined : null,
          title: "Factures",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          href: visibleTabs.some(t => t.screen === "reservations") ? undefined : null,
          title: "RDV",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="clients"
        options={{
          href: visibleTabs.some(t => t.screen === "clients") ? undefined : null,
          title: "Clients",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="stock"
        options={{
          href: visibleTabs.some(t => t.screen === "stock") ? undefined : null,
          title: "Stock",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rh"
        options={{
          href: visibleTabs.some(t => t.screen === "rh") ? undefined : null,
          title: "RH",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="briefcase-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventaire"
        options={{
          href: visibleTabs.some(t => t.screen === "inventaire") ? undefined : null,
          title: "Inventaire",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="comptabilite"
        options={{
          href: visibleTabs.some(t => t.screen === "comptabilite") ? undefined : null,
          title: "Comptabilité",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calculator-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="modules"
        options={{
          title: "Modules",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Paramètres",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
