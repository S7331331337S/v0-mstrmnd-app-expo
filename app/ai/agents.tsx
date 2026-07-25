import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  ArrowLeft,
  Plus,
  Trash2,
  ChevronRight,
  Bot,
  Pencil,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import type { Agent, AgentProvider, AgentTool } from "@/lib/ai/agents";
import { haptic } from "@/utils/haptics";

const PROVIDERS: AgentProvider[] = ["openai", "anthropic", "google", "local"];
const TOOLS: AgentTool[] = ["files", "web", "figma", "vercel", "github", "supabase", "media"];

export default function AgentsScreen() {
  const router = useRouter();
  const { agents, addAgent, removeAgent } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [provider, setProvider] = useState<AgentProvider>("google");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [selectedTools, setSelectedTools] = useState<AgentTool[]>([]);
  const [systemPrompt, setSystemPrompt] = useState("");

  const handleAdd = () => {
    if (!name.trim() || !role.trim()) return;
    haptic.success();
    addAgent({
      id: Date.now().toString(),
      name: name.trim(),
      role: role.trim(),
      provider,
      model: model.trim() || "gemini-2.5-flash",
      tools: selectedTools,
      systemPrompt: systemPrompt.trim(),
    });
    setName("");
    setRole("");
    setProvider("google");
    setModel("gemini-2.5-flash");
    setSelectedTools([]);
    setSystemPrompt("");
    setShowForm(false);
  };

  const handleRemove = (agent: Agent) => {
    Alert.alert("Remove Agent", `Remove "${agent.name}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          haptic.medium();
          removeAgent(agent.id);
        },
      },
    ]);
  };

  const toggleTool = (tool: AgentTool) => {
    setSelectedTools((prev) =>
      prev.includes(tool) ? prev.filter((t) => t !== tool) : [...prev, tool]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Animated.View entering={FadeInDown.delay(50).duration(400)} style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={22} color={Colors.dark.foreground} />
        </Pressable>
        <Text style={styles.title}>Agents</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => {
            haptic.light();
            setShowForm((v) => !v);
          }}
        >
          <Plus size={20} color={Colors.dark.accentForeground} />
        </Pressable>
      </Animated.View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Add Agent Form */}
        {showForm && (
          <Animated.View entering={FadeInDown.duration(300)} style={styles.form}>
            <Text style={styles.formTitle}>New Agent</Text>

            <View style={styles.field}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="e.g. Visual Director"
                placeholderTextColor={Colors.dark.mutedForeground}
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Role</Text>
              <TextInput
                value={role}
                onChangeText={setRole}
                placeholder="e.g. Generate visual prompts"
                placeholderTextColor={Colors.dark.mutedForeground}
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Provider</Text>
              <View style={styles.pills}>
                {PROVIDERS.map((p) => (
                  <Pressable
                    key={p}
                    style={[styles.pill, provider === p && styles.pillActive]}
                    onPress={() => {
                      haptic.selection();
                      setProvider(p);
                    }}
                  >
                    <Text
                      style={[styles.pillText, provider === p && styles.pillTextActive]}
                    >
                      {p}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Model</Text>
              <TextInput
                value={model}
                onChangeText={setModel}
                placeholder="e.g. gemini-2.5-flash"
                placeholderTextColor={Colors.dark.mutedForeground}
                style={styles.input}
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Tools</Text>
              <View style={styles.pills}>
                {TOOLS.map((t) => (
                  <Pressable
                    key={t}
                    style={[styles.pill, selectedTools.includes(t) && styles.pillActive]}
                    onPress={() => {
                      haptic.selection();
                      toggleTool(t);
                    }}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        selectedTools.includes(t) && styles.pillTextActive,
                      ]}
                    >
                      {t}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>System Prompt</Text>
              <TextInput
                value={systemPrompt}
                onChangeText={setSystemPrompt}
                placeholder="Describe what this agent does..."
                placeholderTextColor={Colors.dark.mutedForeground}
                style={[styles.input, styles.textArea]}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <Pressable
              style={[styles.saveButton, (!name.trim() || !role.trim()) && styles.saveButtonDisabled]}
              onPress={handleAdd}
              disabled={!name.trim() || !role.trim()}
            >
              <Text style={styles.saveButtonText}>Add Agent</Text>
            </Pressable>
          </Animated.View>
        )}

        {/* Agent List */}
        {agents.map((agent, index) => (
          <Animated.View
            key={agent.id}
            entering={FadeInDown.delay(index * 60).duration(400)}
            style={styles.agentCard}
          >
            <View style={styles.agentIcon}>
              <Bot size={20} color={Colors.dark.accent} />
            </View>
            <View style={styles.agentInfo}>
              <Text style={styles.agentName}>{agent.name}</Text>
              <Text style={styles.agentRole} numberOfLines={1}>
                {agent.role}
              </Text>
              <View style={styles.agentMeta}>
                <Text style={styles.agentMetaText}>{agent.provider}</Text>
                <Text style={styles.agentMetaDot}>·</Text>
                <Text style={styles.agentMetaText}>{agent.model}</Text>
              </View>
            </View>
            <View style={styles.agentActions}>
              <Pressable
                style={styles.iconBtn}
                onPress={() => {
                  haptic.light();
                }}
              >
                <Pencil size={16} color={Colors.dark.mutedForeground} />
              </Pressable>
              <Pressable style={styles.iconBtn} onPress={() => handleRemove(agent)}>
                <Trash2 size={16} color={Colors.dark.error} />
              </Pressable>
            </View>
          </Animated.View>
        ))}

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
  addButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.dark.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  form: {
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 16,
    marginBottom: 24,
    gap: 16,
  },
  formTitle: {
    ...Typography.headline,
    color: Colors.dark.foreground,
  },
  field: {
    gap: 8,
  },
  label: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    ...Typography.body,
    color: Colors.dark.foreground,
    backgroundColor: Colors.dark.secondary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 10,
  },
  pills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.dark.secondary,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  pillActive: {
    backgroundColor: "rgba(0, 224, 255, 0.15)",
    borderColor: Colors.dark.accent,
  },
  pillText: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
    fontWeight: "500",
  },
  pillTextActive: {
    color: Colors.dark.accent,
  },
  saveButton: {
    backgroundColor: Colors.dark.accent,
    borderRadius: BorderRadius.lg,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.4,
  },
  saveButtonText: {
    ...Typography.headline,
    color: Colors.dark.accentForeground,
  },
  agentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.card,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    padding: 14,
    marginBottom: 12,
    gap: 12,
  },
  agentIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(0, 224, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  agentInfo: {
    flex: 1,
    gap: 2,
  },
  agentName: {
    ...Typography.headline,
    color: Colors.dark.foreground,
  },
  agentRole: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
  },
  agentMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  agentMetaText: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
    opacity: 0.7,
  },
  agentMetaDot: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
    opacity: 0.4,
  },
  agentActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.dark.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
});
