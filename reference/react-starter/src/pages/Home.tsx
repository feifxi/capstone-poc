import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

// ต่างจาก Next: ไม่มี Server Component → fetch ทั้งหมดอยู่ฝั่ง client ใน useEffect
// = มี loading state เสมอ, ไม่มี HTML ตอน view-source, ไม่มี built-in cache
export function Home() {
  const [events, setEvents] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/events/public`)
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => [])
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      <h1>Connecta (react-starter)</h1>
      <p>ทุกอย่าง render ที่ browser — view-source เห็นแค่ &lt;div id="root"&gt;&lt;/div&gt;</p>
      <h2>งานที่กำลังจะมาถึง</h2>
      {loading ? <p>loading…</p> : (
        <ul>
          {events.map((e) => <li key={e.id}>{e.name}</li>)}
          {events.length === 0 && <li style={{ color: "#888" }}>(ไม่มี / API ไม่ได้รัน)</li>}
        </ul>
      )}
    </main>
  );
}
