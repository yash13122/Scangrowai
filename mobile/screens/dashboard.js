import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const metrics = [
  { label: "Monthly Revenue", value: "₹126,400" },
  { label: "This Week", value: "₹32,800" },
  { label: "Transactions", value: "420" },
  { label: "Avg. Order", value: "₹780" },
];

export default function Dashboard({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Revenue Dashboard</Text>
      <Text style={styles.subtitle}>Track business health, orders, and AI recommendations.</Text>

      <View style={styles.grid}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metricCard}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick insights</Text>
        <Text style={styles.cardText}>• Growth target: 12% above last month</Text>
        <Text style={styles.cardText}>• Best performing category: QR orders</Text>
        <Text style={styles.cardText}>• Use the scanner to accept fast payments</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Insights")}
        >
          <Text style={styles.buttonText}>View AI Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("QRScreen")}
        >
          <Text style={styles.buttonText}>Scan QR Code</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 18,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  metricLabel: {
    color: "#6b7280",
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 18,
    marginTop: 10,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardText: {
    color: "#d1d5db",
    marginBottom: 6,
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
