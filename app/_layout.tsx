import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
<<<<<<< HEAD
import { Stack, useRouter, useSegments } from "expo-router";
=======
import { Stack } from "expo-router";
>>>>>>> origin/main
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
<<<<<<< HEAD
  const router = useRouter();
  const segments = useSegments();
  const { initializeSession, watchSession, isAuthenticated, isAuthReady } = useAppStore();

  useEffect(() => {
    initializeSession();
    const unsubscribe = watchSession();
=======
  const initAuth = useAppStore((s) => s.initAuth);

  useEffect(() => {
    // Initialise auth and subscribe to changes
    const unsubscribe = initAuth();
>>>>>>> origin/main

    // Hide splash screen after a short delay
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await SplashScreen.hideAsync();
    };
    hideSplash();

    return unsubscribe;
<<<<<<< HEAD
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
=======
  }, []);
>>>>>>> origin/main

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
<<<<<<< HEAD
        <Stack.Screen name="auth/login" options={{ presentation: "card" }} />
        <Stack.Screen name="auth/signup" options={{ presentation: "card" }} />
=======
>>>>>>> origin/main
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="project/[id]"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
<<<<<<< HEAD
=======
          name="ai/agents"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="ai/usage"
          options={{
            presentation: "card",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
>>>>>>> origin/main
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
