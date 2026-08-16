import { ScreenContainer } from "@/components/shared";
import { useTheme } from "@/hooks/useTheme";
import { useThemedStyles } from "@/hooks/useThemedStyles";
import { platformService } from "@/services/platformService";
import { usePlatformStore } from "@/store/platformStore";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";

const SettingsScreen = () => {
  const { mode, toggleTheme } = useTheme();
  const setLoading = usePlatformStore((s) => s.setLoading);

  const s = useThemedStyles((t) => ({
    title: {
      fontSize: t.typography.size.xl,
      fontWeight: t.typography.weight.bold,
      color: t.colors.text.primary,
      marginBottom: t.spacing.md,
    },
    card: {
      ...t.mixins.card,
    },
    rowGroup: {
      ...t.mixins.card,
      paddingHorizontal: 0,
      paddingVertical: 0,
      overflow: "hidden",
    },
    groupTitle: {
      paddingHorizontal: t.spacing.md,
      paddingTop: t.spacing.md,
      paddingBottom: t.spacing.sm,
      color: t.colors.text.secondary,
      fontSize: t.typography.size.sm,
      fontWeight: t.typography.weight.semibold,
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    row: {
      minHeight: 56,
      paddingHorizontal: t.spacing.md,
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      borderTopWidth: 1,
      borderTopColor: t.colors.border.subtle,
    },
    rowFirst: {
      borderTopWidth: 0,
    },
    rowLabelGroup: {
      flexDirection: "row",
      alignItems: "center",
      gap: t.spacing.sm + 4,
    },
    rowLabel: {
      color: t.colors.text.primary,
      fontSize: t.typography.size.base,
      fontWeight: t.typography.weight.medium,
    },
    rowValue: {
      color: t.colors.text.secondary,
      fontSize: t.typography.size.sm,
    },
    iconWrap: {
      width: 32,
      height: 32,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: t.colors.bg.hover,
    },
    chevron: {
      color: t.colors.text.disabled,
    },
  }));

  useEffect(() => {
    platformService.loadAll();
  }, []);

  const handleExport = async () => {
    try {
      const json = await platformService.exportJSON();
      const dir = (FileSystem as any).documentDirectory as string | null;
      if (!dir) {
        Alert.alert(
          "Unavailable",
          "Document directory is not available on this platform",
        );
        return;
      }
      const uri = `${dir}mailseed-export-${Date.now()}.json`;
      await FileSystem.writeAsStringAsync(uri, json, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Exported", `Saved to: ${uri}`);
      }
    } catch (e: any) {
      Alert.alert("Export failed", e?.message ?? String(e));
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    try {
      await platformService.create({
        name: "GitHub",
        email: "dev@example.com",
        url: "https://github.com",
        notes: "Personal account",
        tags: ["dev", "social"],
        starred: true,
      });
      await platformService.create({
        name: "Netflix",
        email: "home@example.com",
        url: "https://netflix.com",
        tags: ["streaming"],
      });
      await platformService.create({
        name: "Gmail",
        email: "dev@example.com",
        url: "https://mail.google.com",
        notes: "Main email provider",
        tags: ["email", "google"],
        starred: true,
      });
      await platformService.loadAll();
      Alert.alert("Done", "Added 3 demo platforms");
    } catch (e: any) {
      Alert.alert("Failed", e?.message ?? String(e));
    }
  };

  const Row = ({
    first = false,
    icon,
    label,
    value,
    onPress,
    chevron = true,
  }: {
    first?: boolean;
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    onPress?: () => void;
    chevron?: boolean;
  }) => (
    <Pressable
      onPress={onPress}
      style={[s.row, first ? s.rowFirst : null]}
      android_ripple={{ color: "rgba(0,0,0,0.05)" }}
    >
      <View style={s.rowLabelGroup}>
        <View style={s.iconWrap}>
          <Ionicons name={icon} size={18} color={s.rowValue.color} />
        </View>
        <Text style={s.rowLabel}>{label}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {value ? <Text style={s.rowValue}>{value}</Text> : null}
        {chevron ? (
          <Ionicons name="chevron-forward" size={18} style={s.chevron} />
        ) : null}
      </View>
    </Pressable>
  );

  return (
    <ScreenContainer scrollable>
      <Text style={s.title}>⚙️ Settings</Text>

      <View style={s.rowGroup}>
        <Text style={s.groupTitle}>Appearance</Text>
        <Row
          first
          icon={mode === "dark" ? "moon" : "sunny"}
          label="Theme"
          value={mode === "dark" ? "Dark" : "Light"}
          onPress={toggleTheme}
        />
      </View>

      <View style={[s.rowGroup, { marginTop: 24 }]}>
        <Text style={s.groupTitle}>Data</Text>
        <Row
          first
          icon="cloud-upload"
          label="Export as JSON"
          onPress={handleExport}
        />
        <Row
          icon="cloud-download"
          label="Import from JSON"
          value="Coming soon"
          onPress={() => {}}
        />
        <Row icon="add-circle" label="Add demo data (3)" onPress={handleSeed} />
      </View>

      <View style={[s.rowGroup, { marginTop: 24 }]}>
        <Text style={s.groupTitle}>About</Text>
        <Row
          first
          icon="information-circle"
          label="App version"
          value="1.0.0"
          chevron={false}
        />
        <Row
          icon="build"
          label="Stack"
          value="Expo 57 · Drizzle · SQLite"
          chevron={false}
        />
      </View>
    </ScreenContainer>
  );
};

export { SettingsScreen };
