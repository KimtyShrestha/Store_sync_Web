"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const fetchBranches = async () => {
    const res = await api.get("/branch/my-branches")
    setBranches(res.data.data);
  };

  const handleCreate = async () => {
    if (!name || !location) return;

    await api.post("/branch/create", { name, location });

    setName("");
    setLocation("");
    fetchBranches();
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <div>
      <h2>Branches</h2>

      {/* Create Branch */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button onClick={handleCreate}>Create Branch</button>
      </div>

      {/* Branch List */}
      <ul>
        {branches.map((branch) => (
          <li key={branch._id}>
            {branch.name} — {branch.location}
          </li>
        ))}
      </ul>
    </div>
  );
}