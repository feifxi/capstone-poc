// fetch wrapper — ทุก call ไป NestJS ผ่านตัวนี้ (ใส่ auth header ที่เดียว)
// ของจริง: token เก็บใน cookie (httpOnly) หรือ memory — ที่นี่ทำ interface ไว้เฉยๆ

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

let authToken: string | null = null;
export function setAuthToken(t: string | null) {
  authToken = t;
}

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(authToken ? { authorization: `Bearer ${authToken}` } : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status} ${path}: ${body}`);
  }
  return res.json() as Promise<T>;
}

// ── ตัวอย่างการใช้ ──
export const getEvent = (id: string) => api<{ id: string; name: string }>(`/events/${id}`);
export const getGuestToken = (eventId: string, name: string) =>
  api<{ colyseus: string; livekit: string }>(`/events/${eventId}/guest-token`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
