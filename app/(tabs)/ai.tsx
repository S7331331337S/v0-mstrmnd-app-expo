import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import {
  Send,
  Mic,
  Plus,
  Sparkles,
  Search,
  Palette,
  Code,
  ChevronRight,
  Play,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius } from "@/constants/theme";
import { IconButton } from "@/components/ui/IconButton";
import { haptic } from "@/utils/haptics";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  isThinking?: boolean;
  actions?: { label: string; icon: React.ReactNode }[];
  version?: number;
}

const INITIAL_MESSAGES: Message[] = [];

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (!input.trim()) return;
    haptic.light();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const thinkingMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        isThinking: true,
      };
      setMessages((prev) => [...prev, thinkingMessage]);

      // Replace thinking with actual response
      setTimeout(() => {
        setMessages((prev) => {
          const newMessages = prev.filter((m) => !m.isThinking);
          return [
            ...newMessages,
            {
              id: (Date.now() + 2).toString(),
              role: "assistant",
              content: `I'll help you build that! Let me gather the necessary context and create a compelling design for your app.`,
              actions: [
                { label: "Searched AI SDK examples", icon: <Search size={14} /> },
                { label: "Generated design inspiration", icon: <Palette size={14} /> },
                { label: "Understood codebase", icon: <Code size={14} /> },
              ],
              version: 1,
            },
          ];
        });
      }, 2000);
    }, 500);

    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={90}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Assistant</Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <Animated.View
              entering={FadeIn.duration(500)}
              style={styles.emptyState}
            >
              <View style={styles.emptyIcon}>
                <Sparkles size={32} color={Colors.dark.accent} />
              </View>
              <Text style={styles.emptyTitle}>How can I help?</Text>
              <Text style={styles.emptySubtitle}>
                Ask me to build apps, explain code, or help with design
              </Text>

              {/* Quick prompts */}
              <View style={styles.quickPrompts}>
                {[
                  "Build an AI image generator",
                  "Create a dashboard with charts",
                  "Make a portfolio website",
                ].map((prompt, index) => (
                  <Pressable
                    key={index}
                    style={styles.quickPrompt}
                    onPress={() => {
                      haptic.light();
                      setInput(prompt);
                    }}
                  >
                    <Text style={styles.quickPromptText}>{prompt}</Text>
                    <ChevronRight size={16} color={Colors.dark.mutedForeground} />
                  </Pressable>
                ))}
              </View>
            </Animated.View>
          ) : (
            messages.map((message, index) => (
              <MessageBubble key={message.id} message={message} index={index} />
            ))
          )}
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Input */}
        <Animated.View
          entering={FadeInUp.duration(300)}
          style={styles.inputContainer}
        >
          <View style={styles.inputRow}>
            <IconButton
              icon={<Plus size={20} color={Colors.dark.mutedForeground} />}
              variant="default"
              size="md"
              onPress={() => {}}
            />
            <View style={styles.inputWrapper}>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask v0..."
                placeholderTextColor={Colors.dark.mutedForeground}
                style={styles.input}
                multiline
                maxLength={2000}
              />
            </View>
            <IconButton
              icon={<Mic size={20} color={Colors.dark.mutedForeground} />}
              variant="default"
              size="md"
              onPress={() => haptic.light()}
            />
            <IconButton
              icon={<Send size={18} color={Colors.dark.accentForeground} />}
              variant="filled"
              size="md"
              onPress={handleSend}
              disabled={!input.trim()}
            />
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function MessageBubble({
  message,
  index,
}: {
  message: Message;
  index: number;
}) {
  const isUser = message.role === "user";
  const opacity = useSharedValue(1);

  const thinkingStyle = useAnimatedStyle(() => {
    if (!message.isThinking) return {};
    return {
      opacity: withRepeat(
        withSequence(
          withTiming(0.5, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1,
        true
      ),
    };
  });

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(400)}
      style={[
        styles.messageBubble,
        isUser ? styles.userBubble : styles.assistantBubble,
        thinkingStyle,
      ]}
    >
      {message.isThinking ? (
        <View style={styles.thinkingContainer}>
          <Sparkles size={16} color={Colors.dark.accent} />
          <Text style={styles.thinkingText}>Thinking...</Text>
        </View>
      ) : (
        <>
          <Text
            style={[
              styles.messageText,
              isUser && styles.userMessageText,
            ]}
          >
            {message.content}
          </Text>

          {/* Actions */}
          {message.actions && (
            <View style={styles.actionsContainer}>
              {message.actions.map((action, idx) => (
                <Pressable key={idx} style={styles.actionRow}>
                  {action.icon}
                  <Text style={styles.actionText}>{action.label}</Text>
                  <ChevronRight size={14} color={Colors.dark.mutedForeground} />
                </Pressable>
              ))}
            </View>
          )}

          {/* Version badge */}
          {message.version && (
            <Pressable style={styles.versionBadge}>
              <Text style={styles.versionText}>v{message.version}</Text>
              <Text style={styles.versionLabel}>Built AI image generator</Text>
              <Play size={16} color={Colors.dark.foreground} />
            </Pressable>
          )}
        </>
      )}
    </Animated.View>
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  title: {
    ...Typography.headline,
    color: Colors.dark.foreground,
    textAlign: "center",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(0, 217, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    ...Typography.title2,
    color: Colors.dark.foreground,
    marginBottom: 8,
  },
  emptySubtitle: {
    ...Typography.body,
    color: Colors.dark.mutedForeground,
    textAlign: "center",
    marginBottom: 32,
  },
  quickPrompts: {
    width: "100%",
    gap: 8,
  },
  quickPrompt: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.secondary,
    borderRadius: BorderRadius.lg,
    padding: 16,
  },
  quickPromptText: {
    ...Typography.body,
    color: Colors.dark.foreground,
    flex: 1,
  },
  messageBubble: {
    maxWidth: "85%",
    marginBottom: 12,
    borderRadius: BorderRadius.xl,
    padding: 14,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: Colors.dark.accent,
  },
  assistantBubble: {
    alignSelf: "flex-start",
    backgroundColor: Colors.dark.secondary,
  },
  messageText: {
    ...Typography.body,
    color: Colors.dark.foreground,
  },
  userMessageText: {
    color: Colors.dark.accentForeground,
  },
  thinkingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  thinkingText: {
    ...Typography.body,
    color: Colors.dark.mutedForeground,
  },
  actionsContainer: {
    marginTop: 12,
    gap: 8,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
  actionText: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
    flex: 1,
  },
  versionBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.dark.tertiary,
    borderRadius: BorderRadius.lg,
    padding: 12,
    marginTop: 12,
  },
  versionText: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
    backgroundColor: Colors.dark.border,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  versionLabel: {
    ...Typography.footnote,
    color: Colors.dark.foreground,
    flex: 1,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingBottom: Platform.OS === "ios" ? 90 : 80,
    backgroundColor: Colors.dark.background,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
  },
  inputWrapper: {
    flex: 1,
    backgroundColor: Colors.dark.secondary,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 120,
  },
  input: {
    ...Typography.body,
    color: Colors.dark.foreground,
    maxHeight: 100,
  },
});
