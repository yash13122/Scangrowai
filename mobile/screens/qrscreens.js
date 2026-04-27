import React, { useState, useEffect } from "react";
import { View, Text, Button, TextInput, StyleSheet, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Linking from "expo-linking";

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
      const res = await fetch(
        `http://YOUR_BACKEND_URL/pay/${storeId}?amount=${amount}`
      );
      const json = await res.json();

      if (json.upi_link) {
        Linking.openURL(json.upi_link);
      } else {
        Alert.alert("Error", "Payment link not received");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Payment failed");
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
          <Text>{storeId}</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter amount"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />

          <Button title="Pay Now" onPress={handlePayment} />

          <Button
            title="Scan Again"
            onPress={() => {
              setScanned(false);
              setStoreId(null);
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
  },
  form: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
});