import { useMemo, useState } from "react";
import "./App.css";
import { detectPermissions } from "./camera/detectPermissions";
import { requestCameraStream } from "./camera/requestCameraStream";
import { UAParser } from "ua-parser-js";

const getCameraLabel = (deviceInfo?: MediaDeviceInfo) => {
  return deviceInfo?.label || `Unknown Camera`;
};

function App() {
  const [permissionsState, setPermissionsState] = useState<string | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<string>("None");
  const [browser, setBrowser] = useState<string>("Unknown Browser");

  useMemo(() => {
    detectPermissions().then(setPermissionsState);

    const parser = new UAParser();
    const result = parser.getResult();
    setBrowser(`${result.browser.name} ${result.browser.version}`);
  }, []);

  return (
    <>
      <h1>Permissions Test</h1>
      <h2>{browser}</h2>
      <div className="card">
        <button
          onClick={() =>
            requestCameraStream()
              .then(getCameraLabel)
              .then(setSelectedCamera)
              .then(detectPermissions)
              .then(setPermissionsState)
          }
        >
          Fetch Camera
        </button>
      </div>
      <p>Permissions state: {permissionsState ?? "unknown"}</p>
      <p>Selected camera: {selectedCamera}</p>
    </>
  );
}

export default App;
