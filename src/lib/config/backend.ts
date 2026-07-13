export function getBackendUrl(): string {
  return process.env.BACKEND_API_URL ?? "http://localhost:8000/api/v1";
}
