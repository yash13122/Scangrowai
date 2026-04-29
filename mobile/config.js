import Constants from "expo-constants";
import { Platform } from "react-native";

const hostFromManifest = Constants.manifest?.debuggerHost?.split(":")[0];
const webHost = typeof window !== "undefined" ? window.location.hostname : null;
const host = hostFromManifest || webHost || "127.0.0.1";

export const BACKEND_URL = `http://${host}:8000`;

export const isWeb = Platform.OS === "web";
