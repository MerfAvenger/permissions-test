import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { detectPermissions } from "./camera/detectPermissions";
import { requestCameraStream } from "./camera/requestCameraStream";
import { UAParser } from "ua-parser-js";

const getCameraFields = (deviceInfo?: MediaDeviceInfo) => {
  console.log(deviceInfo);
  return {
    label: deviceInfo?.label || `Unknown Camera`,
    id: deviceInfo?.deviceId || "",
  };
};

function App() {
  const [permissionsState, setPermissionsState] = useState<string | null>(null);
  const [selectedCameraLabel, setSelectedCameraLabel] = useState<string>("");
  const [selectedCameraId, setSelectedCameraId] = useState<string>(
    localStorage.getItem("selectedCameraId") || ""
  );
  const [browser, setBrowser] = useState<string>("Unknown Browser");

  useMemo(() => {
    detectPermissions(selectedCameraId).then(setPermissionsState);

    const parser = new UAParser();
    const result = parser.getResult();
    setBrowser(`${result.browser.name} ${result.browser.version}`);
  }, []);

  useEffect(() => {
    console.log("Storing selected camera ID", selectedCameraId);
    localStorage.setItem("selectedCameraId", selectedCameraId || "");
  }, [selectedCameraId]);

  return (
    <>
      <h1>Permissions Test</h1>
      <h2>{browser}</h2>
      <div className="card">
        <button
          onClick={() =>
            requestCameraStream(selectedCameraId)
              .then(getCameraFields)
              .then(({ label, id }) => {
                setSelectedCameraLabel(label);
                setSelectedCameraId(id);
              })
              .then(() => detectPermissions(selectedCameraId))
              .then(setPermissionsState)
          }
        >
          Fetch Camera
        </button>
      </div>
      <p>Permissions state: {permissionsState ?? "unknown"}</p>
      <p>Selected camera: {selectedCameraLabel}</p>
    </>
  );
}

export default App;
