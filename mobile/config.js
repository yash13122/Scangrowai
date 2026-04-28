import Constants from "expo-constants";

const hostFromManifest = Constants.manifest?.debuggerHost?.split(":")[0];
const host = hostFromManifest || "10.0.1.26";

export const BACKEND_URL = `http://${host}:8000`;
