import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  Search,
  SlidersHorizontal,
  Star,
  Clock,
  X,
} from "lucide-react-native";
import { Colors, Typography, BorderRadius } from "@/constants/theme";
import { useAppStore, Project } from "@/store/app-store";
import { ProjectCard } from "@/components/ProjectCard";
import { IconButton } from "@/components/ui/IconButton";
import { haptic } from "@/utils/haptics";

type FilterType = "all" | "favorites" | "recent";

export default function ProjectsScreen() {
  const router = useRouter();
  const { projects, toggleFavorite } = useAppStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Apply search
    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filter
    if (filter === "favorites") {
      result = result.filter((p) => p.isFavorite);
    }

    // Sort
    result.sort((a, b) => {
      if (filter === "favorites") {
        return b.updatedAt.getTime() - a.updatedAt.getTime();
      }
      return b.updatedAt.getTime() - a.updatedAt.getTime();
    });

    return result;
  }, [projects, searchQuery, filter]);

  const favoriteProjects = filteredProjects.filter((p) => p.isFavorite);
  const recentProjects = filteredProjects.filter((p) => !p.isFavorite);

  const handleFilterChange = (newFilter: FilterType) => {
    haptic.selection();
    setFilter(newFilter);
  };

  const renderProject = ({ item }: { item: Project }) => (
    <ProjectCard
      project={item}
      onPress={() => router.push(`/project/${item.id}`)}
      onLongPress={() => toggleFavorite(item.id)}
    />
  );

  const renderSectionHeader = (title: string, icon: React.ReactNode) => (
    <View style={styles.sectionHeader}>
      {icon}
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={styles.header}
      >
        <Text style={styles.title}>Projects</Text>
        <IconButton
          icon={<SlidersHorizontal size={20} color={Colors.dark.foreground} />}
          variant="default"
          size="sm"
          onPress={() => {}}
        />
      </Animated.View>

      {/* Search Bar */}
      <Animated.View
        entering={FadeInDown.delay(150).duration(500)}
        style={styles.searchContainer}
      >
        <View style={styles.searchBar}>
          <Search size={18} color={Colors.dark.mutedForeground} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search..."
            placeholderTextColor={Colors.dark.mutedForeground}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <X size={18} color={Colors.dark.mutedForeground} />
            </Pressable>
          )}
        </View>
      </Animated.View>

      {/* Filter Pills */}
      <Animated.View
        entering={FadeInDown.delay(200).duration(500)}
        style={styles.filterContainer}
      >
        <Pressable
          style={[styles.filterPill, filter === "all" && styles.filterActive]}
          onPress={() => handleFilterChange("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterPill,
            filter === "favorites" && styles.filterActive,
          ]}
          onPress={() => handleFilterChange("favorites")}
        >
          <Star
            size={14}
            color={
              filter === "favorites"
                ? Colors.dark.accentForeground
                : Colors.dark.mutedForeground
            }
          />
          <Text
            style={[
              styles.filterText,
              filter === "favorites" && styles.filterTextActive,
            ]}
          >
            Favorites
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.filterPill,
            filter === "recent" && styles.filterActive,
          ]}
          onPress={() => handleFilterChange("recent")}
        >
          <Clock
            size={14}
            color={
              filter === "recent"
                ? Colors.dark.accentForeground
                : Colors.dark.mutedForeground
            }
          />
          <Text
            style={[
              styles.filterText,
              filter === "recent" && styles.filterTextActive,
            ]}
          >
            Recent
          </Text>
        </Pressable>
      </Animated.View>

      {/* Project List */}
      <FlatList
        data={filter === "favorites" ? favoriteProjects : filteredProjects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          filter === "all" && favoriteProjects.length > 0 ? (
            <View>
              {renderSectionHeader(
                "Favorites",
                <Star size={16} color={Colors.dark.warning} fill={Colors.dark.warning} />
              )}
              {favoriteProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onPress={() => router.push(`/project/${project.id}`)}
                  onLongPress={() => toggleFavorite(project.id)}
                />
              ))}
              {recentProjects.length > 0 &&
                renderSectionHeader(
                  "Recents",
                  <Clock size={16} color={Colors.dark.mutedForeground} />
                )}
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No projects found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery
                ? "Try a different search term"
                : "Create your first project"}
            </Text>
          </View>
        }
      />
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    ...Typography.largeTitle,
    color: Colors.dark.foreground,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark.secondary,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: 14,
    height: 44,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    ...Typography.body,
    color: Colors.dark.foreground,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 16,
  },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.dark.secondary,
  },
  filterActive: {
    backgroundColor: Colors.dark.accent,
  },
  filterText: {
    ...Typography.footnote,
    color: Colors.dark.mutedForeground,
    fontWeight: "500",
  },
  filterTextActive: {
    color: Colors.dark.accentForeground,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  sectionTitle: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: {
    ...Typography.headline,
    color: Colors.dark.foreground,
    marginBottom: 8,
  },
  emptySubtext: {
    ...Typography.subheadline,
    color: Colors.dark.mutedForeground,
  },
});
