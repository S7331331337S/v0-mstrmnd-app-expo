import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolation,
  FadeIn,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import {
  Sparkles,
  Rocket,
  Globe,
  Zap,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/app-store";
import { haptic } from "@/utils/haptics";

const { width, height } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: readonly [string, string, ...string[]];
}

const SLIDES: OnboardingSlide[] = [
  {
    id: "1",
    title: "Turn your ideas\ninto apps",
    subtitle: "Build production-ready apps with natural language",
    icon: <Sparkles size={48} color="#fff" />,
    gradient: ["#00D9FF", "#0099CC"],
  },
  {
    id: "2",
    title: "All your projects\nin your pocket",
    subtitle: "Access, edit, and manage your projects anywhere",
    icon: <Rocket size={48} color="#fff" />,
    gradient: ["#8B5CF6", "#6366F1"],
  },
  {
    id: "3",
    title: "Publish to\nthe world",
    subtitle: "Deploy to Vercel with one tap",
    icon: <Globe size={48} color="#fff" />,
    gradient: ["#F59E0B", "#EF4444"],
  },
  {
    id: "4",
    title: "Make changes\non the fly",
    subtitle: "Iterate and improve with AI assistance",
    icon: <Zap size={48} color="#fff" />,
    gradient: ["#22C55E", "#10B981"],
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { setOnboarded } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);

  const handleNext = () => {
    haptic.light();
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      completeOnboarding();
    }
  };

  const completeOnboarding = () => {
    haptic.success();
    setOnboarded(true);
    router.replace("/(tabs)");
  };

  const renderSlide = ({ item, index }: { item: OnboardingSlide; index: number }) => {
    return (
      <View style={styles.slide}>
        {/* Phone mockup with gradient */}
        <View style={styles.phoneContainer}>
          <View style={styles.phoneMockup}>
            <LinearGradient
              colors={item.gradient}
              style={styles.phoneScreen}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.iconContainer}>{item.icon}</View>
            </LinearGradient>
          </View>
        </View>

        {/* Text */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
    );
  };

  const renderDot = (index: number) => {
    const isActive = index === currentIndex;
    return (
      <View
        key={index}
        style={[
          styles.dot,
          isActive && styles.dotActive,
        ]}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip button */}
      <Animated.View entering={FadeIn.delay(500)} style={styles.header}>
        <Pressable onPress={completeOnboarding}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </Animated.View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        onScroll={(e) => {
          scrollX.value = e.nativeEvent.contentOffset.x;
        }}
        scrollEventThrottle={16}
      />

      {/* Bottom section */}
      <View style={styles.bottomSection}>
        {/* Pagination */}
        <View style={styles.pagination}>
          {SLIDES.map((_, index) => renderDot(index))}
        </View>

        {/* Button */}
        <Button variant="primary" size="lg" fullWidth onPress={handleNext}>
          {currentIndex === SLIDES.length - 1 ? "Get Started" : "Continue"}
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  skipText: {
    ...Typography.body,
    color: Colors.dark.mutedForeground,
  },
  slide: {
    width,
    alignItems: "center",
    paddingHorizontal: 40,
  },
  phoneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  phoneMockup: {
    width: width * 0.65,
    height: height * 0.45,
    borderRadius: 40,
    backgroundColor: Colors.dark.secondary,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 40,
    elevation: 20,
  },
  phoneScreen: {
    flex: 1,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.dark.foreground,
    textAlign: "center",
    marginBottom: 12,
    lineHeight: 42,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    maxWidth: 280,
  },
  bottomSection: {
    paddingHorizontal: 40,
    paddingBottom: 40,
    gap: 24,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dark.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.dark.accent,
  },
});
