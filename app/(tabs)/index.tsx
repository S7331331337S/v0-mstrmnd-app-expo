import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";
import {
  Zap,
  ArrowRight,
  TrendingUp,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius, Shadows } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ProjectCard";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();
  const { projects, user, credits, maxCredits } = useAppStore();

  const recentProjects = projects
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
    .slice(0, 3);

  const favoriteProjects = projects.filter((p) => p.isFavorite);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || "Builder"}</Text>
          </View>
          <Pressable
            style={styles.avatar}
            onPress={() => router.push("/settings")}
          >
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0).toUpperCase() || "M"}
            </Text>
          </Pressable>
        </Animated.View>

        {/* Credits Card */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <LinearGradient
            colors={["rgba(0, 217, 255, 0.15)", "rgba(0, 217, 255, 0.05)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.creditsCard}
          >
            <View style={styles.creditsHeader}>
              <Zap size={20} color={Colors.dark.accent} />
              <Text style={styles.creditsLabel}>Credits</Text>
            </View>
            <View style={styles.creditsRow}>
              <Text style={styles.creditsValue}>
                {credits.toFixed(2)}
                <Text style={styles.creditsMax}>/{maxCredits}</Text>
              </Text>
              <Button
                variant="secondary"
                size="sm"
                onPress={() => router.push("/settings")}
              >
                Upgrade
              </Button>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(credits / maxCredits) * 100}%` },
                ]}
              />
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(600)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <Pressable
              style={styles.quickAction}
              onPress={() => router.push("/create")}
            >
              <LinearGradient
                colors={[Colors.dark.accent, "#0099CC"]}
                style={styles.quickActionIcon}
              >
                <Zap size={24} color={Colors.dark.accentForeground} />
              </LinearGradient>
              <Text style={styles.quickActionText}>New Project</Text>
            </Pressable>
            <Pressable
              style={styles.quickAction}
              onPress={() => router.push("/ai")}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: Colors.dark.secondary },
                ]}
              >
                <TrendingUp size={24} color={Colors.dark.foreground} />
              </View>
              <Text style={styles.quickActionText}>Ask AI</Text>
            </Pressable>
            <Pressable
              style={styles.quickAction}
              onPress={() => router.push("/projects")}
            >
              <View
                style={[
                  styles.quickActionIcon,
                  { backgroundColor: Colors.dark.secondary },
                ]}
              >
                <Clock size={24} color={Colors.dark.foreground} />
              </View>
              <Text style={styles.quickActionText}>Recent</Text>
            </Pressable>
          </View>
        </Animated.View>

        {/* Favorites */}
        {favoriteProjects.length > 0 && (
          <Animated.View
            entering={FadeInDown.delay(400).duration(600)}
            style={styles.section}
          >
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <Star
                  size={18}
                  color={Colors.dark.warning}
                  fill={Colors.dark.warning}
                />
                <Text style={styles.sectionTitle}>Favorites</Text>
              </View>
              <Pressable
                style={styles.seeAll}
                onPress={() => router.push("/projects")}
              >
                <Text style={styles.seeAllText}>See all</Text>
                <ChevronRight size={16} color={Colors.dark.mutedForeground} />
              </Pressable>
            </View>
            <Card variant="outlined" padding="sm">
              {favoriteProjects.slice(0, 3).map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onPress={() => router.push(`/project/${project.id}`)}
                />
              ))}
            </Card>
          </Animated.View>
        )}

        {/* Recent Projects */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(600)}
          style={styles.section}
        >
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <Clock size={18} color={Colors.dark.mutedForeground} />
              <Text style={styles.sectionTitle}>Recent</Text>
            </View>
            <Pressable
              style={styles.seeAll}
              onPress={() => router.push("/projects")}
            >
              <Text style={styles.seeAllText}>See all</Text>
              <ChevronRight size={16} color={Colors.dark.mutedForeground} />
            </Pressable>
          </View>
          <Card variant="outlined" padding="sm">
            {recentProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onPress={() => router.push(`/project/${project.id}`)}
              />
            ))}
          </Card>
        </Animated.View>

        {/* Bottom spacing for tab bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
  },
  userName: {
    ...Typography.title1,
    color: Colors.dark.foreground,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.dark.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    ...Typography.headline,
    color: Colors.dark.foreground,
  },
  creditsCard: {
    borderRadius: BorderRadius.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(0, 217, 255, 0.2)",
    marginBottom: 24,
  },
  creditsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  creditsLabel: {
    ...Typography.subheadline,
    color: Colors.dark.accent,
    fontWeight: "600",
  },
  creditsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  creditsValue: {
    ...Typography.title1,
    color: Colors.dark.foreground,
  },
  creditsMax: {
    ...Typography.title3,
    color: Colors.dark.mutedForeground,
  },
  progressBar: {
    height: 4,
    backgroundColor: Colors.dark.border,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.dark.accent,
    borderRadius: 2,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    ...Typography.headline,
    color: Colors.dark.foreground,
  },
  seeAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  seeAllText: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
  },
  quickActions: {
    flexDirection: "row",
    gap: 12,
  },
  quickAction: {
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  quickActionIcon: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionText: {
    ...Typography.caption1,
    color: Colors.dark.foreground,
    fontWeight: "500",
  },
});
