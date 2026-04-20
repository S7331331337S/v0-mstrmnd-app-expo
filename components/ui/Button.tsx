import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors, BorderRadius, Typography } from "@/constants/theme";
import { haptic } from "@/utils/haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticFeedback?: boolean;
}

export function Button({
  children,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  hapticFeedback = true,
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    if (hapticFeedback) {
      haptic.light();
    }
    onPress?.();
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: Colors.dark.accent,
        };
      case "secondary":
        return {
          backgroundColor: Colors.dark.secondary,
          borderWidth: 1,
          borderColor: Colors.dark.border,
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
        };
      case "destructive":
        return {
          backgroundColor: Colors.dark.error,
        };
      default:
        return {};
    }
  };

  const getTextColor = (): string => {
    switch (variant) {
      case "primary":
        return Colors.dark.accentForeground;
      case "secondary":
      case "ghost":
        return Colors.dark.foreground;
      case "destructive":
        return Colors.dark.foreground;
      default:
        return Colors.dark.foreground;
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case "sm":
        return { paddingVertical: 8, paddingHorizontal: 12 };
      case "md":
        return { paddingVertical: 12, paddingHorizontal: 20 };
      case "lg":
        return { paddingVertical: 16, paddingHorizontal: 28 };
      default:
        return {};
    }
  };

  const getTextSize = (): TextStyle => {
    switch (size) {
      case "sm":
        return Typography.footnote;
      case "md":
        return Typography.callout;
      case "lg":
        return Typography.body;
      default:
        return {};
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.base,
        getVariantStyles(),
        getSizeStyles(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <Text
          style={[
            styles.text,
            getTextSize(),
            { color: getTextColor() },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.lg,
    gap: 8,
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.5,
  },
});
