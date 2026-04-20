import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Star } from "lucide-react-native";
import { Colors, BorderRadius, Typography, Shadows } from "@/constants/theme";
import { Project } from "@/store/app-store";
import { haptic } from "@/utils/haptics";
import { formatDistanceToNow } from "@/utils/date";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ProjectCardProps {
  project: Project;
  onPress: () => void;
  onLongPress?: () => void;
  isSelected?: boolean;
}

export function ProjectCard({
  project,
  onPress,
  onLongPress,
  isSelected = false,
}: ProjectCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    haptic.light();
    onPress();
  };

  const handleLongPress = () => {
    haptic.medium();
    onLongPress?.();
  };

  const getStatusColor = () => {
    switch (project.status) {
      case "ready":
        return Colors.dark.success;
      case "building":
        return Colors.dark.warning;
      case "error":
        return Colors.dark.error;
      default:
        return Colors.dark.mutedForeground;
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onLongPress={handleLongPress}
      delayLongPress={300}
      style={[
        styles.container,
        isSelected && styles.selected,
        animatedStyle,
      ]}
    >
      {/* Thumbnail */}
      <View style={styles.thumbnail}>
        <View style={styles.thumbnailPlaceholder}>
          <Text style={styles.thumbnailText}>
            {project.name.charAt(0).toUpperCase()}
          </Text>
        </View>
        {project.isFavorite && (
          <View style={styles.favoriteIcon}>
            <Star size={10} color={Colors.dark.warning} fill={Colors.dark.warning} />
          </View>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {project.name}
        </Text>
        <Text style={styles.time}>
          {formatDistanceToNow(project.updatedAt)}
        </Text>
      </View>

      {/* Status indicator */}
      <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: BorderRadius.lg,
    backgroundColor: "transparent",
    gap: 12,
  },
  selected: {
    backgroundColor: Colors.dark.secondary,
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.dark.secondary,
    overflow: "hidden",
    position: "relative",
  },
  thumbnailPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.dark.tertiary,
  },
  thumbnailText: {
    ...Typography.headline,
    color: Colors.dark.mutedForeground,
  },
  favoriteIcon: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: Colors.dark.background,
    borderRadius: BorderRadius.full,
    padding: 3,
  },
  content: {
    flex: 1,
  },
  name: {
    ...Typography.body,
    color: Colors.dark.foreground,
    fontWeight: "500",
    marginBottom: 2,
  },
  time: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
