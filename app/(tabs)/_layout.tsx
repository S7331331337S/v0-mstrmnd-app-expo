import React from "react";
import { Tabs } from "expo-router";
import { StyleSheet, View, Platform } from "react-native";
import { BlurView } from "expo-blur";
import {
  Home,
  Plus,
  FolderOpen,
  Settings,
  Sparkles,
} from "lucide-react-native";
import { Colors, Typography } from "@/constants/theme";
import { haptic } from "@/utils/haptics";

function TabBarBackground() {
  if (Platform.OS === "web") {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: "rgba(0, 0, 0, 0.9)" },
        ]}
      />
    );
  }
  return (
    <BlurView
      intensity={100}
      tint="dark"
      style={[
        StyleSheet.absoluteFill,
        { borderTopWidth: 0.5, borderTopColor: Colors.dark.border },
      ]}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => <TabBarBackground />,
        tabBarActiveTintColor: Colors.dark.accent,
        tabBarInactiveTintColor: Colors.dark.mutedForeground,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
      screenListeners={{
        tabPress: () => {
          haptic.light();
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Home size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color, size }) => (
            <FolderOpen size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <View style={styles.createButton}>
              <Plus
                size={24}
                color={Colors.dark.accentForeground}
                strokeWidth={2.5}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: "AI",
          tabBarIcon: ({ color, size }) => (
            <Sparkles size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: Platform.OS === "ios" ? 88 : 68,
    paddingTop: 8,
    borderTopWidth: 0,
    backgroundColor: "transparent",
    elevation: 0,
  },
  tabBarLabel: {
    ...Typography.caption2,
    fontWeight: "500",
    marginTop: 2,
  },
  tabBarItem: {
    paddingTop: 4,
  },
  createButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.dark.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,
    shadowColor: Colors.dark.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
