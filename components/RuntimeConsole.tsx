import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppStore } from "@/store/app-store";

export function RuntimeConsole() {
  const { runDemoPipeline, runLogs, runOutput } = useAppStore();

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.title}>MSTRMND Runtime</Text>
        <Text style={styles.subtitle}>Agent pipeline console</Text>
      </View>

      <Pressable style={styles.button} onPress={runDemoPipeline}>
        <Text style={styles.buttonText}>Run Pipeline</Text>
      </Pressable>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Logs</Text>
        <View style={styles.logPanel}>
          {runLogs.length === 0 ? (
            <Text style={styles.empty}>Runtime waiting.</Text>
          ) : (
            runLogs.map((log, index) => (
              <Text key={`${index}-${log}`} style={styles.logText}>
                {log}
              </Text>
            ))
          )}
        </View>
      </View>

      {runOutput?.finalText && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Final Output</Text>
          <View style={styles.outputPanel}>
            <Text style={styles.outputText}>{runOutput.finalText}</Text>
          </View>
        </View>
      )}

      {runOutput?.steps?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Agent Steps</Text>
          {runOutput.steps.map((step, index) => (
            <View key={index} style={styles.step}>
              <Text style={styles.stepAgent}>{step.agent}</Text>
              <Text style={styles.stepText}>{step.output}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "#292934",
    backgroundColor: "#111114",
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
  },
  header: { marginBottom: 12 },
  title: { color: "#F4F4F7", fontSize: 18, fontWeight: "700" },
  subtitle: { color: "#9A9AA6", marginTop: 4 },
  button: {
    backgroundColor: "#7C5CFF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 14,
  },
  buttonText: { color: "#FFFFFF", fontWeight: "700" },
  section: { marginTop: 16 },
  sectionTitle: { color: "#9A9AA6", marginBottom: 6 },
  logPanel: {
    backgroundColor: "#070708",
    borderRadius: 14,
    padding: 12,
    minHeight: 96,
  },
  outputPanel: {
    backgroundColor: "#0D0D12",
    borderRadius: 14,
    padding: 12,
  },
  outputText: { color: "#F4F4F7" },
  step: {
    marginBottom: 12,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#0D0D12",
  },
  stepAgent: { color: "#7C5CFF", fontWeight: "700" },
  stepText: { color: "#F4F4F7", marginTop: 4 },
  empty: { color: "#9A9AA6" },
  logText: { color: "#00E0FF", marginBottom: 6 },
});
