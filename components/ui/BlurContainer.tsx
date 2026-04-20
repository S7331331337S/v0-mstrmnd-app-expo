import React from "react";
import { StyleSheet, ViewStyle, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import { Colors, BorderRadius } from "@/constants/theme";

interface BlurContainerProps {
  children: React.ReactNode;
  intensity?: number;
  tint?: "light" | "dark" | "default";
  style?: ViewStyle;
}

export function BlurContainer({
  children,
  intensity = 80,
  tint = "dark",
  style,
}: BlurContainerProps) {
  // BlurView doesn't work well on web, so we use a fallback
  if (Platform.OS === "web") {
    return (
      <View
        style={[
          styles.fallback,
          style,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={intensity}
      tint={tint}
      style={[styles.base, style]}
    >
      {children}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  base: {
    overflow: "hidden",
  },
  fallback: {
    backgroundColor: "rgba(10, 10, 15, 0.9)",
  },
});
