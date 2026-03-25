import { Outlet } from "react-router";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-[#F5F6FA]">
      <Outlet />
    </div>
  );
}