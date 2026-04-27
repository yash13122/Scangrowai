import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl, StyleSheet } from "react-native";

export default function Insights() {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchInsights = async () => {
    try {
      const res = await fetch("http://YOUR_BACKEND_URL/dashboard/demo");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.log("Error fetching insights:", err);
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

  if (!data) {
    return (
      <View style={styles.center}>
        <Text>Loading insights...</Text>
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

      {/* SALES */}
      <View style={styles.card}>
        <Text style={styles.title}>Sales</Text>
        <Text>Total: {data.sales.sales}</Text>
        <Text>Trend: {data.sales.trend}</Text>
      </View>

      {/* RECOMMENDATIONS */}
      <View style={styles.card}>
        <Text style={styles.title}>🤖 AI Recommendations</Text>
        {data.recommendations.length === 0 ? (
          <Text>No recommendations yet</Text>
        ) : (
          data.recommendations.map((item, index) => (
            <Text key={index}>• {item}</Text>
          ))
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
    marginBottom: 6,
  },
});