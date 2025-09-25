export async function detectPermissions() {
  const { state } = await navigator.permissions.query({ name: "camera" });
  return state;
}
