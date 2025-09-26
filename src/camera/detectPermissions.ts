export async function detectPermissions(deviceId: string) {
  const query: { name: PermissionName; deviceId?: string } = { name: "camera" };

  if (deviceId) {
    query.deviceId = deviceId;
  }

  const { state } = await navigator.permissions.query(query);
  return state;
}
