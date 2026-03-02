"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function OwnerProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await api.get("/owner/profile");
      setProfile(res.data.data);
      setFirstName(res.data.data.firstName);
      setLastName(res.data.data.lastName);
    } catch (err: any) {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      setMessage("");
      setError("");
      const res = await api.put("/owner/profile", { firstName, lastName });
      setProfile(res.data.data);
      setEditing(false);
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setError("Failed to update profile");
    }
  };

  const handleChangePassword = async () => {
    try {
      setMessage("");
      setError("");
      await api.put("/owner/change-password", { currentPassword, newPassword });
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password changed successfully");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to change password");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "9px 12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    fontSize: "14px",
    color: "#374151",
    backgroundColor: "#f8fafc",
    outline: "none",
    boxSizing: "border-box",
  };

  const disabledInputStyle: React.CSSProperties = {
    ...inputStyle,
    backgroundColor: "#f1f5f9",
    color: "#94a3b8",
    cursor: "not-allowed",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "13px",
    fontWeight: "600",
    color: "#64748b",
    marginBottom: "6px",
  };

  if (loading) return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", padding: "32px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#94a3b8", fontSize: "15px" }}>Loading...</p>
    </div>
  );

  if (!profile) return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", padding: "32px" }}>
      <p style={{ color: "#ef4444" }}>No profile data found.</p>
    </div>
  );

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", padding: "32px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "4px" }}>
        Profile
      </h1>
      <p style={{ color: "#64748b", marginBottom: "28px", fontSize: "14px" }}>
        Manage your account information and password
      </p>

      {message && (
        <div style={{
          backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px",
          padding: "12px 16px", marginBottom: "20px", fontSize: "14px",
          color: "#16a34a", fontWeight: "500", maxWidth: "600px",
        }}>
          ✓ {message}
        </div>
      )}

      {error && (
        <div style={{
          backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px",
          padding: "12px 16px", marginBottom: "20px", fontSize: "14px",
          color: "#dc2626", fontWeight: "500", maxWidth: "600px",
        }}>
          ✕ {error}
        </div>
      )}

      <div style={{ display: "grid", gap: "20px", maxWidth: "600px" }}>

        {/* PROFILE CARD */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
            <div style={{
              width: "52px", height: "52px", borderRadius: "50%", backgroundColor: "#1e293b",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "20px", fontWeight: "700", color: "#ffffff", flexShrink: 0,
            }}>
              {firstName?.[0]?.toUpperCase() || "?"}
            </div>
            <div>
              <p style={{ fontSize: "16px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                {firstName} {lastName}
              </p>
              <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>{profile.email}</p>
            </div>
          </div>

          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            Profile Information
          </h3>

          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>Email</label>
            <input type="text" value={profile.email} disabled style={disabledInputStyle} />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "20px" }}>
            <div>
              <label style={labelStyle}>First Name</label>
              <input type="text" value={firstName} disabled={!editing}
                onChange={(e) => setFirstName(e.target.value)}
                style={editing ? inputStyle : disabledInputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Last Name</label>
              <input type="text" value={lastName} disabled={!editing}
                onChange={(e) => setLastName(e.target.value)}
                style={editing ? inputStyle : disabledInputStyle} />
            </div>
          </div>

          {!editing ? (
            <button onClick={() => setEditing(true)} style={{
              padding: "9px 20px", borderRadius: "8px", border: "1px solid #e2e8f0",
              backgroundColor: "#ffffff", color: "#1e293b", fontSize: "14px", fontWeight: "600", cursor: "pointer",
            }}>
              Edit Profile
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleUpdateProfile} style={{
                padding: "9px 20px", borderRadius: "8px", border: "none",
                backgroundColor: "#1e293b", color: "#ffffff", fontSize: "14px", fontWeight: "600", cursor: "pointer",
              }}>
                Save Changes
              </button>
              <button onClick={() => setEditing(false)} style={{
                padding: "9px 20px", borderRadius: "8px", border: "1px solid #e2e8f0",
                backgroundColor: "#ffffff", color: "#64748b", fontSize: "14px", fontWeight: "600", cursor: "pointer",
              }}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* PASSWORD CARD */}
        <div style={{ backgroundColor: "#ffffff", borderRadius: "12px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}>
          <h3 style={{ fontSize: "15px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            Change Password
          </h3>

          <div style={{ marginBottom: "14px" }}>
            <label style={labelStyle}>Current Password</label>
            <input type="password" value={currentPassword} placeholder="Enter current password"
              onChange={(e) => setCurrentPassword(e.target.value)} style={inputStyle} />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>New Password</label>
            <input type="password" value={newPassword} placeholder="Enter new password"
              onChange={(e) => setNewPassword(e.target.value)} style={inputStyle} />
          </div>

          <button onClick={handleChangePassword} style={{
            padding: "9px 20px", borderRadius: "8px", border: "none",
            backgroundColor: "#1e293b", color: "#ffffff", fontSize: "14px", fontWeight: "600", cursor: "pointer",
          }}>
            Update Password
          </button>
        </div>

      </div>
    </div>
  );
}