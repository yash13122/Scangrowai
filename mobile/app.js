import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Dashboard from "./screens/dashboard";
import Insights from "./screens/insights";
import QRScreen from "./screens/qrscreens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#111827",
          },
          headerTintColor: "#ffffff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: "ScanGrow Dashboard",
          }}
        />
        <Stack.Screen
          name="Insights"
          component={Insights}
          options={{
            title: "Business Insights",
          }}
        />
        <Stack.Screen
          name="QRScreen"
          component={QRScreen}
          options={{
            title: "Scan QR Code",
          }}
        />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
