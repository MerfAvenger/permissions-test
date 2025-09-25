export async function requestCameraStream() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  const { deviceId } = stream.getTracks()[0].getSettings();

  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.find((d) => d.deviceId === deviceId);
}
