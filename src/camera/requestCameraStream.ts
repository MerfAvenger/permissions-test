export async function requestCameraStream(deviceId?: string) {
  const constraints: { video: { deviceId?: { exact?: string } } } = {
    video: {},
  };
  console.log("Requesting camera stream", deviceId);

  if (deviceId) {
    constraints.video.deviceId = { exact: deviceId };
  }

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  const { deviceId: returnedDeviceId } = stream.getTracks()[0].getSettings();

  const devices = await navigator.mediaDevices.enumerateDevices();
  return devices.find((d) => d.deviceId === returnedDeviceId);
}
