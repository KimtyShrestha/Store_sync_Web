// import "./owner.css";
// import Link from "next/link";

// export default function OwnerLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="owner-layout">
//       <aside className="sidebar">
//         <h2>STORE SYNC</h2>
//         <nav>
//           <Link href="/owner/dashboard">Dashboard</Link>
//           <Link href="/owner/branches">Branches</Link>
//           <Link href="/owner/managers">Managers</Link>
//           <Link href="/owner/profile">Profile</Link>
//         </nav>
//       </aside>

//       <main className="content">{children}</main>
//     </div>
//   );
// }

import "./owner.css";

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="owner-layout">
      <aside className="sidebar">
        {/* ───────── Store Sync Logo with Red Triangle ───────── */}
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

        {/* ───────── Navigation ───────── */}
        <nav>
          <a href="/owner/dashboard">Dashboard</a>
          <a href="/owner/branches">Branches</a>
          <a href="/owner/managers">Managers</a>
          <a href="/owner/profile">Profile</a>
        </nav>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}