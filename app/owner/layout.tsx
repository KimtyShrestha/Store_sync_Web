
"use client";

import "./owner.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logoutApi } from "@/lib/api/auth.api";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  };

  return (
    <div className="owner-layout">
      <aside className="sidebar">
        <div className="sidebar-top">
          {/* Logo */}
          <div className="logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 40 36"
              fill="none"
              style={{ marginRight: "6px", verticalAlign: "middle" }}
            >
              <polygon points="20,2 38,34 2,34" fill="#cc2f2f" />
            </svg>
            Store Sync
          </div>

          {/* Navigation */}
          <nav>
            <Link href="/owner/dashboard">Dashboard</Link>
            <Link href="/owner/branches">Branches</Link>
            <Link href="/owner/managers">Managers</Link>
            <Link href="/owner/daily-records">Daily Records</Link>
            <Link href="/owner/message">Message</Link>
            <Link href="/owner/profile">Profile</Link>
          </nav>
        </div>

        {/* Logout at bottom */}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}