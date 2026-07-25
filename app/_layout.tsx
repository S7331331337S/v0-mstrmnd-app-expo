import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, useRouter, useSegments } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { initializeSession, watchSession, isAuthenticated, isAuthReady } = useAppStore();

  useEffect(() => {
    initializeSession();
    const unsubscribe = watchSession();

    // Hide splash screen after a short delay
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await SplashScreen.hideAsync();
    };
    hideSplash();

    return unsubscribe;
  }, [initializeSession, watchSession]);

  useEffect(() => {
    if (!isAuthReady) {
      return;
    }

    const inAuthFlow = (segments[0] as string | undefined) === "auth";

    if (!isAuthenticated && !inAuthFlow) {
      router.replace("/auth/login" as never);
      return;
    }

    if (isAuthenticated && inAuthFlow) {
      router.replace("/(tabs)");
    }
  }, [isAuthReady, isAuthenticated, router, segments]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.dark.background },
          animation: "fade",
        }}
      >
        <Stack.Screen name="auth/login" options={{ presentation: "card" }} />
        <Stack.Screen name="auth/signup" options={{ presentation: "card" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="project/[id]"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="onboarding"
          options={{
            presentation: "fullScreenModal",
            animation: "fade",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
});
