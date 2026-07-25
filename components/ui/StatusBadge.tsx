import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
} from "react-native-reanimated";
import { Colors, BorderRadius, Typography } from "@/constants/theme";

<<<<<<< HEAD
type StatusType = "ready" | "building" | "error" | "pending";
=======
type StatusType = "ready" | "building" | "error" | "pending" | "draft";
>>>>>>> origin/main

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
}

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const pulseStyle = useAnimatedStyle(() => {
    if (status !== "building") {
      return { opacity: 1 };
    }
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.4, { duration: 800 }),
          withTiming(1, { duration: 800 })
        ),
        -1,
        true
      ),
    };
  });

  const getStatusConfig = () => {
    switch (status) {
      case "ready":
        return {
          color: Colors.dark.success,
          text: label || "Ready",
          bgColor: "rgba(34, 197, 94, 0.15)",
        };
      case "building":
        return {
          color: Colors.dark.warning,
          text: label || "Building",
          bgColor: "rgba(245, 158, 11, 0.15)",
        };
      case "error":
        return {
          color: Colors.dark.error,
          text: label || "Error",
          bgColor: "rgba(239, 68, 68, 0.15)",
        };
      case "pending":
        return {
          color: Colors.dark.mutedForeground,
          text: label || "Pending",
          bgColor: "rgba(113, 113, 122, 0.15)",
        };
<<<<<<< HEAD
=======
      case "draft":
        return {
          color: Colors.dark.mutedForeground,
          text: label || "Draft",
          bgColor: "rgba(113, 113, 122, 0.1)",
        };
>>>>>>> origin/main
      default:
        return {
          color: Colors.dark.mutedForeground,
          text: label || "Unknown",
          bgColor: "rgba(113, 113, 122, 0.15)",
        };
    }
  };

  const config = getStatusConfig();

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: config.bgColor },
        pulseStyle,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.text, { color: config.color }]}>{config.text}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    ...Typography.caption1,
    fontWeight: "600",
  },
});
