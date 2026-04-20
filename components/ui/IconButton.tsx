import React from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Colors, BorderRadius } from "@/constants/theme";
import { haptic } from "@/utils/haptics";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type IconButtonVariant = "default" | "filled" | "tinted" | "plain";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps {
  icon: React.ReactNode;
  onPress?: () => void;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  color?: string;
}

export function IconButton({
  icon,
  onPress,
  variant = "default",
  size = "md",
  disabled = false,
  style,
}: IconButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    haptic.light();
    onPress?.();
  };

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case "filled":
        return {
          backgroundColor: Colors.dark.accent,
        };
      case "tinted":
        return {
          backgroundColor: "rgba(0, 217, 255, 0.15)",
        };
      case "plain":
        return {
          backgroundColor: "transparent",
        };
      default:
        return {
          backgroundColor: Colors.dark.secondary,
        };
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case "sm":
        return { width: 36, height: 36 };
      case "md":
        return { width: 44, height: 44 };
      case "lg":
        return { width: 56, height: 56 };
      default:
        return {};
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.base,
        getVariantStyles(),
        getSizeStyles(),
        disabled && styles.disabled,
        animatedStyle,
        style,
      ]}
    >
      {icon}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: BorderRadius.full,
  },
  disabled: {
    opacity: 0.5,
  },
});
