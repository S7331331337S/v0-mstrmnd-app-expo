import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  User,
  CreditCard,
  Bell,
  Moon,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
  Zap,
  ExternalLink,
  Bot,
  BarChart2,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius } from "@/constants/theme";
import { useAppStore } from "@/store/app-store";
import { Card } from "@/components/ui/Card";
import { haptic } from "@/utils/haptics";

interface SettingsItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  value?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onPress?: () => void;
  danger?: boolean;
}

export default function SettingsScreen() {
  const router = useRouter();
  const { user, credits, maxCredits, signOut: storeSignOut } = useAppStore();
  const [darkMode, setDarkMode] = React.useState(true);
  const [notifications, setNotifications] = React.useState(true);

  const accountItems: SettingsItem[] = [
    {
      id: "profile",
      icon: <User size={20} color={Colors.dark.foreground} />,
      label: "Profile",
      value: user?.name || "Not set",
      onPress: () => {},
    },
    {
      id: "subscription",
      icon: <CreditCard size={20} color={Colors.dark.foreground} />,
      label: "Subscription",
      value: "Free Plan",
      onPress: () => {},
    },
    {
      id: "agents",
      icon: <Bot size={20} color={Colors.dark.foreground} />,
      label: "Agents",
      onPress: () => router.push("/ai/agents"),
    },
    {
      id: "usage",
      icon: <BarChart2 size={20} color={Colors.dark.foreground} />,
      label: "Usage",
      onPress: () => router.push("/ai/usage"),
    },
  ];

  const preferencesItems: SettingsItem[] = [
    {
      id: "notifications",
      icon: <Bell size={20} color={Colors.dark.foreground} />,
      label: "Notifications",
      hasSwitch: true,
      switchValue: notifications,
      onPress: () => {
        haptic.selection();
        setNotifications(!notifications);
      },
    },
    {
      id: "darkMode",
      icon: <Moon size={20} color={Colors.dark.foreground} />,
      label: "Dark Mode",
      hasSwitch: true,
      switchValue: darkMode,
      onPress: () => {
        haptic.selection();
        setDarkMode(!darkMode);
      },
    },
  ];

  const supportItems: SettingsItem[] = [
    {
      id: "privacy",
      icon: <Shield size={20} color={Colors.dark.foreground} />,
      label: "Privacy Policy",
      onPress: () => {},
    },
    {
      id: "help",
      icon: <HelpCircle size={20} color={Colors.dark.foreground} />,
      label: "Help & Support",
      onPress: () => {},
    },
    {
      id: "logout",
      icon: <LogOut size={20} color={Colors.dark.error} />,
      label: "Sign Out",
      danger: true,
      onPress: () => {
        haptic.medium();
        storeSignOut();
      },
    },
  ];

  const renderItem = (item: SettingsItem) => (
    <Pressable
      key={item.id}
      style={styles.settingsItem}
      onPress={item.onPress}
    >
      <View style={styles.settingsItemLeft}>
        {item.icon}
        <Text
          style={[
            styles.settingsItemLabel,
            item.danger && styles.dangerText,
          ]}
        >
          {item.label}
        </Text>
      </View>
      <View style={styles.settingsItemRight}>
        {item.value && (
          <Text style={styles.settingsItemValue}>{item.value}</Text>
        )}
        {item.hasSwitch ? (
          <Switch
            value={item.switchValue}
            onValueChange={() => item.onPress?.()}
            trackColor={{
              false: Colors.dark.border,
              true: Colors.dark.accent,
            }}
            thumbColor={Colors.dark.foreground}
          />
        ) : (
          !item.danger && (
            <ChevronRight size={18} color={Colors.dark.mutedForeground} />
          )
        )}
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={styles.header}
        >
          <Text style={styles.title}>Settings</Text>
        </Animated.View>

        {/* User Card */}
        <Animated.View entering={FadeInDown.delay(150).duration(500)}>
          <Card variant="glass" style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name?.charAt(0).toUpperCase() || "M"}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.name || "User"}</Text>
                <Text style={styles.userPlan}>Free Plan</Text>
              </View>
            </View>
            <View style={styles.creditsSection}>
              <View style={styles.creditsInfo}>
                <Zap size={16} color={Colors.dark.accent} />
                <Text style={styles.creditsText}>
                  {credits.toFixed(2)} / {maxCredits} credits
                </Text>
              </View>
              <Pressable style={styles.upgradeButton} onPress={() => {}}>
                <Text style={styles.upgradeButtonText}>Upgrade</Text>
                <ExternalLink size={14} color={Colors.dark.accent} />
              </Pressable>
            </View>
          </Card>
        </Animated.View>

        {/* Account Section */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Account</Text>
          <Card variant="outlined" padding="none">
            {accountItems.map(renderItem)}
          </Card>
        </Animated.View>

        {/* Preferences Section */}
        <Animated.View
          entering={FadeInDown.delay(250).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Preferences</Text>
          <Card variant="outlined" padding="none">
            {preferencesItems.map(renderItem)}
          </Card>
        </Animated.View>

        {/* Support Section */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>Support</Text>
          <Card variant="outlined" padding="none">
            {supportItems.map(renderItem)}
          </Card>
        </Animated.View>

        {/* Version */}
        <Animated.View
          entering={FadeInDown.delay(350).duration(500)}
          style={styles.footer}
        >
          <Text style={styles.versionText}>MSTRMND v1.0.0</Text>
        </Animated.View>

        <View style={{ height: 120 }} />
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
    marginBottom: 24,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.dark.foreground,
  },
  userCard: {
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    ...Typography.title2,
    color: Colors.dark.accentForeground,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    ...Typography.headline,
    color: Colors.dark.foreground,
  },
  userPlan: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
  },
  creditsSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.dark.secondary,
    borderRadius: BorderRadius.lg,
    padding: 12,
  },
  creditsInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  creditsText: {
    ...Typography.footnote,
    color: Colors.dark.foreground,
    fontWeight: "500",
  },
  upgradeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  upgradeButtonText: {
    ...Typography.footnote,
    color: Colors.dark.accent,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
    fontWeight: "600",
    marginBottom: 12,
    paddingLeft: 4,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  settingsItemLabel: {
    ...Typography.body,
    color: Colors.dark.foreground,
  },
  settingsItemRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  settingsItemValue: {
    ...Typography.body,
    color: Colors.dark.mutedForeground,
  },
  dangerText: {
    color: Colors.dark.error,
  },
  footer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  versionText: {
    ...Typography.caption1,
    color: Colors.dark.mutedForeground,
  },
});
