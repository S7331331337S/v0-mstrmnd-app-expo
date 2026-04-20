import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, {
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import {
  Mic,
  Camera,
  Image as ImageIcon,
  Send,
  Sparkles,
  Code,
  Palette,
  Globe,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius, Shadows } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { haptic } from "@/utils/haptics";

const SUGGESTIONS = [
  { id: "1", label: "Landing page", icon: Globe },
  { id: "2", label: "Dashboard", icon: Code },
  { id: "3", label: "Mobile app", icon: Palette },
];

const TEMPLATES = [
  { id: "1", name: "Portfolio", category: "Personal" },
  { id: "2", name: "E-commerce", category: "Business" },
  { id: "3", name: "Blog", category: "Content" },
  { id: "4", name: "SaaS Dashboard", category: "Business" },
];

export default function CreateScreen() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    haptic.success();
    // Navigate to AI chat with prompt
    router.push("/ai");
  };

  const handleVoiceInput = () => {
    haptic.medium();
    setIsRecording(!isRecording);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <Animated.View
            entering={FadeInDown.delay(100).duration(500)}
            style={styles.header}
          >
            <Text style={styles.title}>Create</Text>
            <Text style={styles.subtitle}>
              Turn your ideas{"\n"}
              <Text style={styles.subtitleAccent}>into apps</Text>
            </Text>
          </Animated.View>

          {/* Main Input */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(500)}
            style={styles.inputSection}
          >
            <View style={styles.inputContainer}>
              <TextInput
                value={prompt}
                onChangeText={setPrompt}
                placeholder="Ask v0 to build..."
                placeholderTextColor={Colors.dark.mutedForeground}
                style={styles.input}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View style={styles.inputActions}>
                <View style={styles.inputActionsLeft}>
                  <IconButton
                    icon={<Camera size={20} color={Colors.dark.mutedForeground} />}
                    variant="plain"
                    size="sm"
                    onPress={() => {}}
                  />
                  <IconButton
                    icon={<ImageIcon size={20} color={Colors.dark.mutedForeground} />}
                    variant="plain"
                    size="sm"
                    onPress={() => {}}
                  />
                </View>
                <View style={styles.inputActionsRight}>
                  <IconButton
                    icon={
                      <Mic
                        size={20}
                        color={
                          isRecording
                            ? Colors.dark.error
                            : Colors.dark.mutedForeground
                        }
                      />
                    }
                    variant={isRecording ? "tinted" : "plain"}
                    size="sm"
                    onPress={handleVoiceInput}
                  />
                  <IconButton
                    icon={<Send size={18} color={Colors.dark.accentForeground} />}
                    variant="filled"
                    size="sm"
                    onPress={handleSubmit}
                    disabled={!prompt.trim()}
                  />
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Suggestions */}
          <Animated.View
            entering={FadeInDown.delay(300).duration(500)}
            style={styles.suggestionsSection}
          >
            <Text style={styles.sectionLabel}>Suggestions</Text>
            <View style={styles.suggestions}>
              {SUGGESTIONS.map((suggestion) => (
                <Pressable
                  key={suggestion.id}
                  style={styles.suggestionPill}
                  onPress={() => {
                    haptic.light();
                    setPrompt(`Build me a ${suggestion.label.toLowerCase()}`);
                  }}
                >
                  <suggestion.icon size={14} color={Colors.dark.accent} />
                  <Text style={styles.suggestionText}>{suggestion.label}</Text>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* Templates */}
          <Animated.View
            entering={FadeInDown.delay(400).duration(500)}
            style={styles.templatesSection}
          >
            <Text style={styles.sectionLabel}>Start from a template</Text>
            <View style={styles.templates}>
              {TEMPLATES.map((template, index) => (
                <Pressable
                  key={template.id}
                  style={styles.templateCard}
                  onPress={() => {
                    haptic.light();
                    setPrompt(`Build me a ${template.name.toLowerCase()} app`);
                  }}
                >
                  <LinearGradient
                    colors={[
                      "rgba(255, 255, 255, 0.08)",
                      "rgba(255, 255, 255, 0.02)",
                    ]}
                    style={styles.templateGradient}
                  >
                    <View style={styles.templateIcon}>
                      <Sparkles size={24} color={Colors.dark.accent} />
                    </View>
                    <Text style={styles.templateName}>{template.name}</Text>
                    <Text style={styles.templateCategory}>{template.category}</Text>
                  </LinearGradient>
                </Pressable>
              ))}
            </View>
          </Animated.View>

          {/* Bottom spacing */}
          <View style={{ height: 120 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.dark.foreground,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.title2,
    color: Colors.dark.mutedForeground,
    lineHeight: 32,
  },
  subtitleAccent: {
    color: Colors.dark.accent,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: Colors.dark.secondary,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    overflow: "hidden",
  },
  input: {
    ...Typography.body,
    color: Colors.dark.foreground,
    padding: 16,
    minHeight: 100,
  },
  inputActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  inputActionsLeft: {
    flexDirection: "row",
    gap: 4,
  },
  inputActionsRight: {
    flexDirection: "row",
    gap: 8,
  },
  suggestionsSection: {
    marginBottom: 32,
  },
  sectionLabel: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
    fontWeight: "600",
    marginBottom: 12,
  },
  suggestions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  suggestionPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: "rgba(0, 217, 255, 0.2)",
  },
  suggestionText: {
    ...Typography.footnote,
    color: Colors.dark.accent,
    fontWeight: "500",
  },
  templatesSection: {
    marginBottom: 24,
  },
  templates: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  templateCard: {
    width: "48%",
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  templateGradient: {
    padding: 16,
    alignItems: "flex-start",
  },
  templateIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  templateName: {
    ...Typography.headline,
    color: Colors.dark.foreground,
    marginBottom: 4,
  },
  templateCategory: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
  },
});
