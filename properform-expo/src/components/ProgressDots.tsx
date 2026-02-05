import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

export default function ProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <View style={styles.container}>
      {[...Array(total)].map((_, i) => (
        <View
          key={i}
          style={[
            styles.dot,
            i === current - 1
              ? styles.currentDot
              : i < current
                ? styles.completedDot
                : styles.inactiveDot,
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.sm,
    marginVertical: spacing.lg,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  currentDot: {
    width: 24, // LÄNGER für aktuellen Schritt
    backgroundColor: colors.primaryBlue,
  },
  completedDot: {
    width: 8, // Normal für abgeschlossene Schritte
    backgroundColor: colors.primaryBlue,
  },
  inactiveDot: {
    width: 8, // Normal für zukünftige Schritte
    backgroundColor: colors.borderLight,
  },
});
