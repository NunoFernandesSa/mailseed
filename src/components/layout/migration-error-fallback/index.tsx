import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * MigrationErrorFallback - Fallback component for migration errors
 * Displays an alert icon, error message, and optional message
 */
export const MigrationErrorFallback = ({ message }: { message?: string }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.bg.base }}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing.xl,
          gap: theme.spacing.md,
        }}
      >
        <Ionicons
          name="alert-circle"
          size={64}
          color={theme.colors.accent.red}
        />
        <Text
          style={{
            fontSize: theme.typography.size.xl,
            color: theme.colors.accent.red,
            fontWeight: theme.typography.weight.bold,
            textAlign: "center",
          }}
        >
          Erreur de démarrage
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: theme.colors.text.secondary,
            fontSize: theme.typography.size.base,
            lineHeight: theme.typography.size.lg,
          }}
        >
          Impossible d&apos;initialiser la base de données locale. Veuillez
          relancer l&apos;application.
        </Text>
        {message ? (
          <Text
            style={{
              marginTop: theme.spacing.md,
              padding: theme.spacing.md,
              borderRadius: 12,
              backgroundColor: theme.colors.bg.card,
              color: theme.colors.text.secondary,
              fontSize: theme.typography.size.sm,
              width: "100%",
            }}
          >
            {message}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};
