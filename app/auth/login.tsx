import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Colors, Typography, BorderRadius } from "@/constants/theme";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/app-store";

export default function LoginScreen() {
  const router = useRouter();
  const signIn = useAppStore((state) => state.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async () => {
    setError(null);
    setIsSubmitting(true);
    const result = await signIn({ email: email.trim(), password });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error || "Unable to sign in.");
      return;
    }

    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Sign in to continue your MSTRMND projects.</Text>

        <View style={styles.form}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor={Colors.dark.mutedForeground}
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={Colors.dark.mutedForeground}
            style={styles.input}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            onPress={onSubmit}
            disabled={isSubmitting || !email.trim() || password.length < 6}
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Need an account?</Text>
          <Pressable onPress={() => router.push("/auth/signup" as never)}>
            <Text style={styles.footerLink}>Create one</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.dark.foreground,
  },
  subtitle: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
  },
  form: {
    gap: 12,
  },
  input: {
    ...Typography.body,
    color: Colors.dark.foreground,
    backgroundColor: Colors.dark.secondary,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  error: {
    ...Typography.footnote,
    color: Colors.dark.error,
  },
  footer: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
  },
  footerText: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
  },
  footerLink: {
    ...Typography.footnote,
    color: Colors.dark.accent,
    fontWeight: "600",
  },
});
