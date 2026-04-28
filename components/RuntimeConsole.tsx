import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAppStore } from "@/store/app-store";

export function RuntimeConsole() {
  const { runDemoPipeline, runLogs } = useAppStore();

  return (
    <View style={styles.panel}>
      <View style={styles.header}>
        <Text style={styles.title}>MSTRMND Runtime</Text>
        <Text style={styles.subtitle}>Agent pipeline console</Text>
      </View>

      <Pressable style={styles.button} onPress={runDemoPipeline}>
        <Text style={styles.buttonText}>Run Pipeline</Text>
      </Pressable>

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
  logPanel: {
    backgroundColor: "#070708",
    borderRadius: 14,
    padding: 12,
    minHeight: 96,
  },
  empty: { color: "#9A9AA6" },
  logText: { color: "#00E0FF", marginBottom: 6 },
});
