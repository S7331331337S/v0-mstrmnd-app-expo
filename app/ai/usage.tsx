import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeft, Zap, TrendingUp, Activity } from "lucide-react-native";
import { Colors, Typography, BorderRadius } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";

export default function UsageScreen() {
  const router = useRouter();
  const { credits, maxCredits, usageHistory } = useAppStore();

  const totalInput = usageHistory.reduce((s, e) => s + e.inputTokens, 0);
  const totalOutput = usageHistory.reduce((s, e) => s + e.outputTokens, 0);
  const totalCost = usageHistory.reduce((s, e) => s + e.estimatedCost, 0);

  const usedCredits = maxCredits - credits;
  const progressPercent = Math.min(100, (usedCredits / maxCredits) * 100);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(50).duration(400)} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={22} color={Colors.dark.foreground} />
        </Pressable>
        <Text style={styles.title}>Usage</Text>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Credits Card */}
        <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.creditsCard}>
          <View style={styles.cardHeader}>
            <Zap size={18} color={Colors.dark.accent} />
            <Text style={styles.cardTitle}>Credits</Text>
          </View>
          <Text style={styles.creditsValue}>
            {credits.toFixed(2)}
            <Text style={styles.creditsDivider}> / </Text>
            <Text style={styles.creditsMax}>{maxCredits}</Text>
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` as any }]} />
          </View>
          <Text style={styles.creditsHint}>
            {usedCredits.toFixed(2)} credits used this cycle
          </Text>
        </Animated.View>

        {/* Stats */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.statsRow}>
          <View style={styles.statCard}>
            <Activity size={16} color={Colors.dark.mutedForeground} />
            <Text style={styles.statValue}>{usageHistory.length}</Text>
            <Text style={styles.statLabel}>Runs</Text>
          </View>
          <View style={styles.statCard}>
            <TrendingUp size={16} color={Colors.dark.mutedForeground} />
            <Text style={styles.statValue}>{(totalInput + totalOutput).toLocaleString()}</Text>
            <Text style={styles.statLabel}>Tokens</Text>
          </View>
          <View style={styles.statCard}>
            <Zap size={16} color={Colors.dark.mutedForeground} />
            <Text style={styles.statValue}>${totalCost.toFixed(4)}</Text>
            <Text style={styles.statLabel}>Cost</Text>
          </View>
        </Animated.View>

        {/* History */}
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <Text style={styles.sectionTitle}>Run History</Text>
          {usageHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No runs yet</Text>
              <Text style={styles.emptySubtext}>Run a pipeline to see usage</Text>
            </View>
          ) : (
            [...usageHistory].reverse().map((event, i) => (
              <View key={i} style={styles.historyItem}>
                <View style={styles.historyLeft}>
                  <Text style={styles.historyModel}>{event.model}</Text>
                  <Text style={styles.historyProvider}>{event.provider}</Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyTokens}>
                    {(event.inputTokens + event.outputTokens).toLocaleString()} tokens
                  </Text>
                  <Text style={styles.historyCost}>${event.estimatedCost.toFixed(5)}</Text>
                </View>
              </View>
            ))
          )}
        </Animated.View>

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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...Typography.headline,
    color: Colors.dark.foreground,
    flex: 1,
  },
  scrollView: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 8 },
  creditsCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: "rgba(0, 224, 255, 0.2)",
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  cardTitle: {
    ...Typography.subheadline,
    color: Colors.dark.accent,
    fontWeight: "600",
  },
  creditsValue: {
    ...Typography.title1,
    color: Colors.dark.foreground,
    marginBottom: 12,
  },
  creditsDivider: {
    color: Colors.dark.mutedForeground,
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
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.dark.accent,
    borderRadius: 2,
  },
  creditsHint: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 14,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    ...Typography.title3,
    color: Colors.dark.foreground,
  },
  statLabel: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
  },
  sectionTitle: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
    fontWeight: "600",
    marginBottom: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    ...Typography.headline,
    color: Colors.dark.foreground,
    marginBottom: 6,
  },
  emptySubtext: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 14,
    marginBottom: 8,
  },
  historyLeft: { gap: 2 },
  historyModel: {
    ...Typography.footnote,
    color: Colors.dark.foreground,
    fontWeight: "500",
  },
  historyProvider: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
  },
  historyRight: { alignItems: "flex-end", gap: 2 },
  historyTokens: {
    ...Typography.footnote,
    color: Colors.dark.foreground,
  },
  historyCost: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
  },
});
