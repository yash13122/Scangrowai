import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert, Platform } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Linking from "expo-linking";
import { BACKEND_URL, isWeb } from "../config";

export default function QRScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [storeId, setStoreId] = useState(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setStoreId(data);
    Alert.alert("QR Scanned", `Store ID: ${data}`);
  };

  const handlePayment = async () => {
    if (!storeId || !amount) {
      Alert.alert("Error", "Scan QR and enter amount");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_URL}/pay/${storeId}?amount=${amount}`);
      const json = await res.json();

      if (json.upi) {
        if (isWeb || Platform.OS === "web") {
          window.open(json.upi, "_blank");
        } else {
          Linking.openURL(json.upi);
        }
      } else {
        Alert.alert("Error", "Payment link not received");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Payment failed");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.form}>
          <Text style={styles.label}>Store ID:</Text>
          <Text style={styles.storeId}>{storeId}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Button title="Pay Now" onPress={handlePayment} />

          <View style={styles.spacer} />
          <Button
            title="Scan Again"
            onPress={() => {
              setScanned(false);
              setStoreId(null);
              setAmount("");
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  storeId: {
    marginBottom: 16,
    fontSize: 16,
    color: "#111827",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  spacer: {
    height: 12,
  },
});
