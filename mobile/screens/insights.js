import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";
import { BACKEND_URL } from "../config";

export default function Insights() {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/dashboard/demo`);
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      console.log("Error fetching insights:", err);
      setData({
        bi: {
          kpis: { total: 1070, avg: 356.67, trend: "growth" },
          charts: ["revenue", "frequency", "peak time"],
        },
        ai: [
          "Increase bundle offers",
          "Optimize peak hour pricing",
          "Suggest inventory restock",
        ],
        final: { actions: ["Increase bundle offers", "Optimize peak hour pricing", "Suggest inventory restock"] },
      });
      setError("Unable to reach backend. Showing demo insights instead.");
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchInsights();
    setRefreshing(false);
  };

  if (!data && !error) {
    return (
      <View style={styles.center}>
        <Text>Loading insights...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.header}>📊 Business Insights</Text>

      <View style={styles.card}>
        <Text style={styles.title}>BI Summary</Text>
        {data.bi?.kpis ? (
          Object.entries(data.bi.kpis).map(([key, value]) => (
            <Text key={key}>• {key}: {String(value)}</Text>
          ))
        ) : (
          <Text>No BI data available</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Charts</Text>
        {Array.isArray(data.bi?.charts) && data.bi.charts.length > 0 ? (
          data.bi.charts.map((chart, index) => <Text key={index}>• {chart}</Text>)
        ) : (
          <Text>No chart data available</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🤖 AI Insights</Text>
        {Array.isArray(data.ai) && data.ai.length > 0 ? (
          data.ai.map((item, index) => <Text key={index}>• {String(item)}</Text>)
        ) : (
          <Text>No AI insights available</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>✅ Recommendations</Text>
        {data.final && Object.keys(data.final).length > 0 ? (
          Object.entries(data.final).map(([key, value]) => (
            <Text key={key}>• {key}: {String(value)}</Text>
          ))
        ) : (
          <Text>No recommendations returned</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  error: {
    color: "#b91c1c",
    textAlign: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
});
