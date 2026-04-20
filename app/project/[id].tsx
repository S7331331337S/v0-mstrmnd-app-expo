import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown, SlideInRight } from "react-native-reanimated";
import {
  ArrowLeft,
  Share2,
  MoreHorizontal,
  Globe,
  ExternalLink,
  Clock,
  User,
  Play,
  Eye,
  Code,
  ChevronRight,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius, Shadows } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Card } from "@/components/ui/Card";
import { formatDistanceToNow, formatDate } from "@/utils/date";
import { haptic } from "@/utils/haptics";

const { width } = Dimensions.get("window");

export default function ProjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { projects, toggleFavorite } = useAppStore();
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorState}>
          <Text style={styles.errorText}>Project not found</Text>
          <Button onPress={() => router.back()}>Go back</Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Animated.View entering={FadeIn.duration(300)} style={styles.header}>
        <IconButton
          icon={<ArrowLeft size={22} color={Colors.dark.foreground} />}
          variant="default"
          size="md"
          onPress={() => router.back()}
        />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {project.name}
          </Text>
          <Text style={styles.headerSubtitle}>Version {project.version}</Text>
        </View>
        <View style={styles.headerActions}>
          <IconButton
            icon={<Share2 size={20} color={Colors.dark.foreground} />}
            variant="default"
            size="md"
            onPress={() => haptic.light()}
          />
          <IconButton
            icon={<MoreHorizontal size={20} color={Colors.dark.foreground} />}
            variant="default"
            size="md"
            onPress={() => haptic.light()}
          />
        </View>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Card variant="elevated" padding="none" style={styles.previewCard}>
            {/* Tabs */}
            <View style={styles.tabs}>
              <Pressable
                style={[styles.tab, activeTab === "preview" && styles.tabActive]}
                onPress={() => {
                  haptic.selection();
                  setActiveTab("preview");
                }}
              >
                <Eye
                  size={16}
                  color={
                    activeTab === "preview"
                      ? Colors.dark.accent
                      : Colors.dark.mutedForeground
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "preview" && styles.tabTextActive,
                  ]}
                >
                  Preview
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === "code" && styles.tabActive]}
                onPress={() => {
                  haptic.selection();
                  setActiveTab("code");
                }}
              >
                <Code
                  size={16}
                  color={
                    activeTab === "code"
                      ? Colors.dark.accent
                      : Colors.dark.mutedForeground
                  }
                />
                <Text
                  style={[
                    styles.tabText,
                    activeTab === "code" && styles.tabTextActive,
                  ]}
                >
                  Code
                </Text>
              </Pressable>
            </View>

            {/* Preview Area */}
            <View style={styles.previewArea}>
              <View style={styles.previewPlaceholder}>
                <Play size={48} color={Colors.dark.mutedForeground} />
                <Text style={styles.previewPlaceholderText}>
                  Tap to preview
                </Text>
              </View>
            </View>
          </Card>
        </Animated.View>

        {/* Status & Actions */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.statusSection}
        >
          <View style={styles.statusRow}>
            <StatusBadge status={project.status} />
            <Text style={styles.updatedText}>
              Updated {formatDistanceToNow(project.updatedAt)}
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <Button variant="primary" fullWidth onPress={() => {}}>
              Publish
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onPress={() => haptic.light()}
            >
              Share
            </Button>
          </View>
        </Animated.View>

        {/* Details */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <Card variant="outlined" padding="none">
            <Pressable style={styles.detailItem}>
              <View style={styles.detailLeft}>
                <Globe size={18} color={Colors.dark.mutedForeground} />
                <Text style={styles.detailLabel}>Domains</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailValue}>mstrmnd.vercel.app</Text>
                <ChevronRight size={16} color={Colors.dark.mutedForeground} />
              </View>
            </Pressable>

            <Pressable style={styles.detailItem}>
              <View style={styles.detailLeft}>
                <Clock size={18} color={Colors.dark.mutedForeground} />
                <Text style={styles.detailLabel}>Created</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailValue}>
                  {formatDate(project.createdAt)}
                </Text>
              </View>
            </Pressable>

            <Pressable style={styles.detailItem}>
              <View style={styles.detailLeft}>
                <User size={18} color={Colors.dark.mutedForeground} />
                <Text style={styles.detailLabel}>Owner</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.detailValue}>@mstrmnd</Text>
              </View>
            </Pressable>

            <Pressable style={[styles.detailItem, styles.detailItemLast]}>
              <View style={styles.detailLeft}>
                <ExternalLink size={18} color={Colors.dark.mutedForeground} />
                <Text style={styles.detailLabel}>Inspect on Vercel</Text>
              </View>
              <View style={styles.detailRight}>
                <ChevronRight size={16} color={Colors.dark.mutedForeground} />
              </View>
            </Pressable>
          </Card>
        </Animated.View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Bottom Actions */}
      <Animated.View entering={SlideInRight.delay(400).duration(400)} style={styles.bottomBar}>
        <Button
          variant="secondary"
          onPress={() => haptic.light()}
          style={styles.bottomButton}
        >
          Visit Site
        </Button>
        <Button
          variant="primary"
          onPress={() => haptic.success()}
          style={styles.bottomButton}
        >
          Publish
        </Button>
      </Animated.View>
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
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  headerTitle: {
    ...Typography.headline,
    color: Colors.dark.foreground,
  },
  headerSubtitle: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
  },
  headerActions: {
    flexDirection: "row",
    gap: 8,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  previewCard: {
    marginBottom: 20,
    overflow: "hidden",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.dark.accent,
  },
  tabText: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
    fontWeight: "500",
  },
  tabTextActive: {
    color: Colors.dark.accent,
  },
  previewArea: {
    height: 280,
    backgroundColor: Colors.dark.secondary,
  },
  previewPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  previewPlaceholderText: {
    ...Typography.body,
    color: Colors.dark.mutedForeground,
  },
  statusSection: {
    marginBottom: 20,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  updatedText: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  detailItemLast: {
    borderBottomWidth: 0,
  },
  detailLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  detailLabel: {
    ...Typography.body,
    color: Colors.dark.foreground,
  },
  detailRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailValue: {
    ...Typography.body,
    color: Colors.dark.mutedForeground,
  },
  bottomBar: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    paddingBottom: 32,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    backgroundColor: Colors.dark.background,
  },
  bottomButton: {
    flex: 1,
  },
  errorState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  errorText: {
    ...Typography.headline,
    color: Colors.dark.foreground,
  },
});
