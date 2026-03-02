

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function ManagersPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [managers, setManagers] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  

  const fetchManagers = async () => {
    try {
      const res = await api.get("/owner/managers");
      setManagers(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

   const fetchBranches = async () => {
  try {
    const res = await api.get("/branch/my-branches");
    setBranches(res.data.data);
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
  fetchManagers();
  fetchBranches();
}, []);

 

  const createManager = async () => {
    setLoading(true);
    setMessage("");

    try {
      await api.post("/owner/create-manager", form);

      setIsSuccess(true);
      setMessage("Manager created successfully");
      setForm({ firstName: "", lastName: "", email: "", password: "" });
      setShowForm(false);
      fetchManagers();
    } catch (error: any) {
      setIsSuccess(false);
      setMessage(error.response?.data?.message || "Error creating manager");
    } finally {
      setLoading(false);
    }
  };


 const assignManager = async (managerId: string) => {
  const branchId = selectedBranch[managerId];

  if (!branchId) {
    alert("Please select a branch");
    return;
  }

  try {
    await api.patch(`/branch/assign-manager/${branchId}/${managerId}`);

    await fetchBranches();

    // Exit reassign mode
    setSelectedBranch((prev) => {
      const updated = { ...prev };
      delete updated[managerId];
      return updated;
    });

  } catch (error: any) {
    alert(error.response?.data?.message || "Assignment failed");
  }
};



  const deleteManager = async (id: string) => {
    try {
      await api.delete(`/owner/delete-manager/${id}`);

      setDeleteConfirm(null);
      fetchManagers();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="managers-container">
      {/* Header */}
      <div className="managers-header">
        <div className="managers-title-group">
          <h2 className="managers-title">Managers</h2>
          <span className="managers-count">{managers.length} members</span>
        </div>
        <button className="btn-create" onClick={() => { setShowForm((v) => !v); setMessage(""); }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Manager
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="create-form-card">
          <h3 className="form-title">New Manager</h3>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">First Name</label>
              <input
                className="form-input"
                placeholder="e.g. Riya"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Last Name</label>
              <input
                className="form-input"
                placeholder="e.g. Sharma"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="input-group">
              <label className="input-label">Email</label>
              <input
                className="form-input"
                placeholder="e.g. riya@storex.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label className="input-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="Set a password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {message && (
            <div className={`form-message ${isSuccess ? "success" : "error"}`}>
              {isSuccess ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              )}
              {message}
            </div>
          )}

          <div className="form-actions">
            <button className="btn-cancel" onClick={() => { setShowForm(false); setMessage(""); setForm({ firstName: "", lastName: "", email: "", password: "" }); }}>
              Cancel
            </button>
            <button
              className="btn-submit"
              onClick={createManager}
              disabled={loading || !form.firstName || !form.lastName || !form.email || !form.password}
            >
              {loading ? "Creating..." : "Create Manager"}
            </button>
          </div>
        </div>
      )}

      {/* Manager List */}
      {managers.length === 0 ? (
        <div className="empty-state">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <p className="empty-text">No managers yet</p>
          <p className="empty-sub">Add your first manager to get started</p>
        </div>
      ) : (
        <div className="managers-table-wrapper">
          <table className="managers-table">
            <thead>
              <tr>
                <th>Manager</th>
                <th>Email</th>
                <th>Role</th>
                <th>Branch</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {managers.map((manager) => (
                <tr key={manager._id} className="manager-row">
                  <td>
                    <div className="manager-name-cell">
                      <div className="manager-avatar">
                        {manager.firstName?.charAt(0).toUpperCase() ?? ""}{manager.lastName?.charAt(0).toUpperCase() ?? ""}
                      </div>
                      <span className="manager-name">
                        {manager.firstName} {manager.lastName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="manager-email">{manager.email}</span>
                  </td>
                  <td>
                    <span className="badge-manager">Manager</span>
                  </td>

                  

                  <td>
  {(() => {
    const assignedBranch = branches.find(
      (branch) =>
        branch.managerId &&
        branch.managerId.toString() === manager._id.toString()
    );

    // 🔹 IF ASSIGNED
    if (assignedBranch) {
      const isReassigning =
        selectedBranch[manager._id] !== undefined;

      if (!isReassigning) {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 600,
                color: "#10b981",
              }}
            >
              {assignedBranch.name}
            </span>

            <div style={{ display: "flex", gap: "8px" }}>
              <button
                onClick={() =>
                  setSelectedBranch({
                    ...selectedBranch,
                    [manager._id]: assignedBranch._id,
                  })
                }
                style={{
                  padding: "5px 10px",
                  fontSize: "11px",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  cursor: "pointer",
                }}
              >
                Reassign
              </button>

              <button
                onClick={async () => {
                  try {
                    await api.patch(
                      `/branch/remove-manager/${assignedBranch._id}`
                    );
                    await fetchBranches();
                  } catch {
                    alert("Failed to remove manager");
                  }
                }}
                style={{
                  padding: "5px 10px",
                  fontSize: "11px",
                  borderRadius: "6px",
                  border: "none",
                  background: "#fff1f2",
                  color: "#e63946",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        );
      }

      // 🔹 REASSIGN MODE
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <select
            value={selectedBranch[manager._id]}
            onChange={(e) =>
              setSelectedBranch({
                ...selectedBranch,
                [manager._id]: e.target.value,
              })
            }
            style={{
              padding: "6px 8px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              fontSize: "12px",
            }}
          >
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => assignManager(manager._id)}
            style={{
              padding: "6px 10px",
              fontSize: "12px",
              borderRadius: "6px",
              border: "none",
              background: "#e63946",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      );
    }

    // 🔹 NOT ASSIGNED
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <select
          value={selectedBranch[manager._id] || ""}
          onChange={(e) =>
            setSelectedBranch({
              ...selectedBranch,
              [manager._id]: e.target.value,
            })
          }
          style={{
            padding: "6px 8px",
            borderRadius: "6px",
            border: "1px solid #e2e8f0",
            fontSize: "12px",
          }}
        >
          <option value="">Select</option>
          {branches.map((branch) => (
            <option key={branch._id} value={branch._id}>
              {branch.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => assignManager(manager._id)}
          style={{
            padding: "6px 10px",
            fontSize: "12px",
            borderRadius: "6px",
            border: "none",
            background: "#e63946",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Assign
        </button>
      </div>
    );
  })()}
</td>

  
                  
  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        .managers-container {
          padding: 32px 36px;
          min-height: 100vh;
          background: #f4f6f9;
          font-family: 'Segoe UI', sans-serif;
        }

        /* Header */
        .managers-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .managers-title-group {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .managers-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a2236;
          margin: 0;
          letter-spacing: -0.3px;
        }

        .managers-count {
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

        /* Form Card */
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
          margin-bottom: 16px;
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

        .form-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 16px;
        }

        .form-message.success {
          background: #ecfdf5;
          color: #10b981;
          border: 1px solid #a7f3d0;
        }

        .form-message.error {
          background: #fff1f2;
          color: #e63946;
          border: 1px solid #fecdd3;
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
        .managers-table-wrapper {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        }

        .managers-table {
          width: 100%;
          border-collapse: collapse;
        }

        .managers-table thead tr {
          background: #f8fafc;
          border-bottom: 1.5px solid #e2e8f0;
        }

        .managers-table th {
          text-align: left;
          padding: 12px 20px;
          font-size: 11px;
          font-weight: 700;
          color: #8a94a6;
          text-transform: uppercase;
          letter-spacing: 0.6px;
        }

        .manager-row {
          border-bottom: 1px solid #f0f3f8;
          transition: background 0.12s;
        }

        .manager-row:last-child {
          border-bottom: none;
        }

        .manager-row:hover {
          background: #fafbfd;
        }

        .managers-table td {
          padding: 14px 20px;
          vertical-align: middle;
        }

        .manager-name-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .manager-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a2236 0%, #2d3a54 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
          letter-spacing: 0.5px;
        }

        .manager-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a2236;
        }

        .manager-email {
          font-size: 13px;
          color: #6b7a99;
        }

        .badge-manager {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 20px;
          background: #eff6ff;
          color: #3b82f6;
          font-size: 12px;
          font-weight: 600;
        }

        /* Delete */
        .btn-delete {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #fff1f2;
          color: #e63946;
          border: 1px solid #fecdd3;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.15s;
        }

        .btn-delete:hover {
          background: #ffe4e6;
        }

        .confirm-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .confirm-text {
          font-size: 13px;
          color: #6b7a99;
          font-weight: 500;
        }

        .btn-confirm-yes {
          padding: 5px 12px;
          background: #e63946;
          color: #fff;
          border: none;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-confirm-yes:hover {
          background: #c62b38;
        }

        .btn-confirm-no {
          padding: 5px 12px;
          background: transparent;
          color: #6b7a99;
          border: 1.5px solid #e2e8f0;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-confirm-no:hover {
          background: #f4f6f9;
        }

        @media (max-width: 640px) {
          .managers-container {
            padding: 20px 16px;
          }

          .form-row {
            flex-direction: column;
          }

          .managers-title {
            font-size: 20px;
          }
        }
      `}</style>
    </div>
  );
}