import { Link, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/">หน้าแรก</Link>
        <Link to="/world">โลก 2D</Link>
      </nav>
      <Outlet />
    </>
  );
}
