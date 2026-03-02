// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/axios";

// export default function BranchesPage() {
//   const [branches, setBranches] = useState<any[]>([]);
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");

//   const fetchBranches = async () => {
//     const res = await api.get("/branch/my-branches")
//     setBranches(res.data.data);
//   };

//   const handleCreate = async () => {
//     if (!name || !location) return;

//     await api.post("/branch/create", { name, location });

//     setName("");
//     setLocation("");
//     fetchBranches();
//   };

//   useEffect(() => {
//     fetchBranches();
//   }, []);

//   return (
//     <div>
//       <h2>Branches</h2>

//       {/* Create Branch */}
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           placeholder="Branch Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           placeholder="Location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         />
//         <button onClick={handleCreate}>Create Branch</button>
//       </div>

//       {/* Branch List */}
//       <ul>
//         {branches.map((branch) => (
//           <li key={branch._id}>
//             {branch.name} — {branch.location}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBranches = async () => {
    const res = await api.get("/branch/my-branches");
    setBranches(res.data.data);
  };

  const handleCreate = async () => {
    if (!name || !location) return;
    setLoading(true);
    await api.post("/branch/create", { name, location });
    setName("");
    setLocation("");
    setShowForm(false);
    setLoading(false);
    fetchBranches();
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div className="branches-container">
      {/* Header */}
      <div className="branches-header">
        <div className="branches-title-group">
          <h2 className="branches-title">Branches</h2>
          <span className="branches-count">{branches.length} locations</span>
        </div>
        <button
          className="btn-create"
          onClick={() => setShowForm((v) => !v)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Create Branch
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="create-form-card">
          <h3 className="form-title">New Branch</h3>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Branch Name</label>
              <input
                className="form-input"
                placeholder="e.g. Kathmandu Branch"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Location</label>
              <input
                className="form-input"
                placeholder="e.g. New Road"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button
              className="btn-cancel"
              onClick={() => {
                setShowForm(false);
                setName("");
                setLocation("");
              }}
            >
              Cancel
            </button>
            <button
              className="btn-submit"
              onClick={handleCreate}
              disabled={loading || !name || !location}
            >
              {loading ? "Creating..." : "Create Branch"}
            </button>
          </div>
        </div>
      )}

      {/* Branch List */}
      {branches.length === 0 ? (
        <div className="empty-state">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="empty-icon"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <p className="empty-text">No branches yet</p>
          <p className="empty-sub">Create your first branch to get started</p>
        </div>
      ) : (
        <div className="branches-table-wrapper">
          <table className="branches-table">
            <thead>
              <tr>
                <th>Branch Name</th>
                <th>Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch, i) => (
                <tr key={branch._id} className="branch-row">
                  <td>
                    <div className="branch-name-cell">
                      <span className="branch-icon">
                        {branch.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="branch-name">{branch.name}</span>
                    </div>
                  </td>
                  <td>
                    <span className="branch-location">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      {branch.location}
                    </span>
                  </td>
                  <td>
                    <span className="badge-active">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .branches-container {
          padding: 32px 36px;
          min-height: 100vh;
          background: #f4f6f9;
          font-family: 'Segoe UI', sans-serif;
        }

        /* Header */
        .branches-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .branches-title-group {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .branches-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a2236;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .branches-count {
          font-size: 13px;
          color: #8a94a6;
          background: #e8edf5;
          padding: 3px 10px;
          border-radius: 20px;
          font-weight: 500;
        }

        .btn-create {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #e63946;
          color: #fff;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }

        .btn-create:hover {
          background: #c62b38;
          transform: translateY(-1px);
        }

        .btn-create:active {
          transform: translateY(0);
        }

        /* Create Form Card */
        .create-form-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
        }

        .form-title {
          font-size: 15px;
          font-weight: 700;
          color: #1a2236;
          margin: 0 0 18px 0;
        }

        .form-row {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }

        .input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-label {
          font-size: 12px;
          font-weight: 600;
          color: #6b7a99;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          padding: 10px 14px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 14px;
          color: #1a2236;
          background: #f8fafc;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .form-input:focus {
          border-color: #e63946;
          box-shadow: 0 0 0 3px rgba(230, 57, 70, 0.1);
          background: #fff;
        }

        .form-input::placeholder {
          color: #b0b9cc;
        }

        .form-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }

        .btn-cancel {
          padding: 9px 18px;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          background: transparent;
          color: #6b7a99;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-cancel:hover {
          background: #f4f6f9;
        }

        .btn-submit {
          padding: 9px 20px;
          background: #e63946;
          border: none;
          border-radius: 8px;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-submit:hover:not(:disabled) {
          background: #c62b38;
        }

        .btn-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Empty State */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 32px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          text-align: center;
        }

        .empty-icon {
          color: #c8d0e0;
          margin-bottom: 16px;
        }

        .empty-text {
          font-size: 16px;
          font-weight: 600;
          color: #4a5568;
          margin: 0 0 6px 0;
        }

        .empty-sub {
          font-size: 13px;
          color: #a0aec0;
          margin: 0;
        }

        /* Table */
        .branches-table-wrapper {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        }

        .branches-table {
          width: 100%;
          border-collapse: collapse;
        }

        .branches-table thead tr {
          background: #f8fafc;
          border-bottom: 1.5px solid #e2e8f0;
        }

        .branches-table th {
          text-align: left;
          padding: 12px 20px;
          font-size: 11px;
          font-weight: 700;
          color: #8a94a6;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .branch-row {
          border-bottom: 1px solid #f0f3f8;
          transition: background 0.12s;
        }

        .branch-row:last-child {
          border-bottom: none;
        }

        .branch-row:hover {
          background: #fafbfd;
        }

        .branches-table td {
          padding: 14px 20px;
          vertical-align: middle;
        }

        .branch-name-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .branch-icon {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: linear-gradient(135deg, #1a2236 0%, #2d3a54 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .branch-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a2236;
        }

        .branch-location {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #6b7a99;
        }

        .badge-active {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          background: #ecfdf5;
          color: #10b981;
          font-size: 12px;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .branches-container {
            padding: 20px 16px;
          }

          .form-row {
            flex-direction: column;
          }

          .branches-title {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}