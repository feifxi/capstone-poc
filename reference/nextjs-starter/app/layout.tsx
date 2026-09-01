import type { ReactNode } from "react";

// metadata ที่นี่ = default ของทุกหน้า · หน้า marketing จะ override เพื่อ SEO/OG
export const metadata = {
  title: "Connecta",
  description: "พื้นที่จัดงานเสมือน 2 มิติ",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 24, lineHeight: 1.6 }}>
        {children}
      </body>
    </html>
  );
}
