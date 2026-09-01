import "@livekit/components-styles";
import type { ReactNode } from "react";

export const metadata = { title: "A0 — LiveKit audio" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 24 }}>{children}</body>
    </html>
  );
}
