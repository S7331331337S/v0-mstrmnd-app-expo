import React from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors, BorderRadius, Shadows } from "@/constants/theme";
import { haptic } from "@/utils/haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: "default" | "elevated" | "outlined" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({
  children,
  style,
  onPress,
  variant = "default",
  padding = "md",
}: CardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    }
  };

  const handlePress = () => {
    haptic.light();
    onPress?.();
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "elevated":
        return {
          backgroundColor: Colors.dark.card,
          ...Shadows.md,
        };
      case "outlined":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: Colors.dark.border,
        };
      case "glass":
        return {
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
        };
      default:
        return {
          backgroundColor: Colors.dark.card,
        };
    }
  };

  const getPaddingStyles = (): ViewStyle => {
    switch (padding) {
      case "none":
        return { padding: 0 };
      case "sm":
        return { padding: 12 };
      case "md":
        return { padding: 16 };
      case "lg":
        return { padding: 20 };
      default:
        return {};
    }
  };

  const Container = onPress ? AnimatedPressable : View;

  const containerProps = onPress
    ? {
        onPress: handlePress,
        onPressIn: handlePressIn,
        onPressOut: handlePressOut,
        style: [
          styles.base,
          getVariantStyles(),
          getPaddingStyles(),
          animatedStyle,
          style,
        ],
      }
    : {
        style: [
          styles.base,
          getVariantStyles(),
          getPaddingStyles(),
          style,
        ],
      };

  return <Container {...containerProps}>{children}</Container>;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
  },
});
