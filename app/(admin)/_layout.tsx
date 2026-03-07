import { Stack, router } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export default function AdminLayout() {
  const { isAdminOrEmployee, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isAdminOrEmployee)) {
      router.replace("/(auth)/login");
    }
  }, [isLoading, isAuthenticated, isAdminOrEmployee]);

  if (isLoading || !isAuthenticated || !isAdminOrEmployee) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="quote-form" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen name="invoice-form" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen name="reservation-form" options={{ presentation: "modal", headerShown: false }} />
      <Stack.Screen name="client-form" options={{ presentation: "modal", headerShown: false }} />
    </Stack>
  );
}
