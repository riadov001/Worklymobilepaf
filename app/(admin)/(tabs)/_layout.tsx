import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Platform, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import type { ComponentProps } from "react";
import { useTheme } from "@/lib/theme";
import { useModules } from "@/lib/modules-context";

type IoniconName = ComponentProps<typeof Ionicons>["name"];

const MODULE_TAB_MAP: Record<string, { screen: string; icon: IoniconName; title: string }> = {
  devis:        { screen: "quotes",        icon: "document-text-outline", title: "Devis"      },
  facturation:  { screen: "invoices",      icon: "receipt-outline",       title: "Factures"   },
  planning:     { screen: "reservations",  icon: "calendar-outline",      title: "Planning"   },
  clients:      { screen: "clients",       icon: "people-outline",        title: "Clients"    },
  stock:        { screen: "stock",         icon: "cube-outline",          title: "Stock"      },
  rh:           { screen: "rh",            icon: "briefcase-outline",     title: "RH"         },
  inventaire:   { screen: "inventaire",    icon: "clipboard-outline",     title: "Inventaire" },
  comptabilite: { screen: "comptabilite",  icon: "calculator-outline",    title: "Compta"     },
};

const ALL_SCREENS = ["quotes", "invoices", "reservations", "clients", "stock", "rh", "inventaire", "comptabilite"];

export default function AdminTabLayout() {
  const theme = useTheme();
  const isWeb = Platform.OS === "web";
  const isIOS = Platform.OS === "ios";
  const { pinnedTabIds, modules } = useModules();

  const pinnedScreens = useMemo(() => {
    return pinnedTabIds
      .map(id => {
        const mod = modules.find(m => m.id === id);
        const tabDef = MODULE_TAB_MAP[id];
        if (!tabDef || !mod?.enabled) return null;
        return {
          screen: tabDef.screen,
          icon: (mod.icon || tabDef.icon) as IoniconName,
          title: mod.name.length > 8 ? mod.name.slice(0, 7) + "…" : mod.name,
        };
      })
      .filter(Boolean) as { screen: string; icon: IoniconName; title: string }[];
  }, [pinnedTabIds, modules]);

  const isScreenPinned = (screen: string) => pinnedScreens.some(p => p.screen === screen);

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
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {ALL_SCREENS.map(screen => {
        const pinned = pinnedScreens.find(p => p.screen === screen);
        return (
          <Tabs.Screen
            key={screen}
            name={screen}
            options={{
              href: isScreenPinned(screen) ? undefined : null,
              title: pinned?.title || screen,
              tabBarIcon: ({ color, size }) => (
                <Ionicons name={pinned?.icon || "apps-outline"} size={size} color={color} />
              ),
            }}
          />
        );
      })}

      <Tabs.Screen
        name="modules"
        options={{
          title: "Plus",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
