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

  // 🔹 Fetch Profile
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

  // 🔹 Update Profile
  const handleUpdateProfile = async () => {
    try {
      setMessage("");
      setError("");

      const res = await api.put("/owner/profile", {
        firstName,
        lastName,
      });

      setProfile(res.data.data);
      setEditing(false);
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setError("Failed to update profile");
    }
  };

  // 🔹 Change Password
  const handleChangePassword = async () => {
    try {
      setMessage("");
      setError("");

      await api.put("/owner/change-password", {
        currentPassword,
        newPassword,
      });

      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password changed successfully");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to change password"
      );
    }
  };

  if (loading) return <div style={{ color: "white" }}>Loading...</div>;
  if (!profile) return <div style={{ color: "white" }}>No profile data</div>;

  return (
    <>
      <h1 className="dashboard-title logo">Owner Profile</h1>

      {message && (
        <div style={{ color: "#16a34a", marginBottom: "15px" }}>
          {message}
        </div>
      )}

      {error && (
        <div style={{ color: "#dc2626", marginBottom: "15px" }}>
          {error}
        </div>
      )}

      <div style={{ display: "grid", gap: "20px", maxWidth: "600px" }}>

        {/* ================= PROFILE CARD ================= */}
        <div className="db-chart-card">
          <h3 style={{ marginBottom: "15px" }}>Profile Information</h3>

          <div style={{ marginBottom: "12px" }}>
            <label>Email</label>
            <input
              type="text"
              value={profile.email}
              disabled
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              disabled={!editing}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              disabled={!editing}
              onChange={(e) => setLastName(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          {!editing ? (
            <button onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          ) : (
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={handleUpdateProfile}>
                Save Changes
              </button>
              <button onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* ================= PASSWORD CARD ================= */}
        <div className="db-chart-card">
          <h3 style={{ marginBottom: "15px" }}>Change Password</h3>

          <div style={{ marginBottom: "12px" }}>
            <label>Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(e.target.value)
              }
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            />
          </div>

          <button onClick={handleChangePassword}>
            Update Password
          </button>
        </div>

      </div>
    </>
  );
}