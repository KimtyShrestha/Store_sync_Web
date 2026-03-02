"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  LabelList,
} from "recharts";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [unauthorized, setUnauthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (selectedBranch) params.branchId = selectedBranch;
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }
      const res = await api.get("/dashboard", { params });
      setData(res.data.data);
    } catch (error: any) {
      if (error.response?.status === 401) setUnauthorized(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    const res = await api.get("/branch/my-branches");
    setBranches(res.data.data);
  };

  const fetchOwner = async () => {
  try {
    const res = await api.get("/owner/profile");
    setOwnerName(res.data.data.firstName || "");
  } catch (error) {
    console.error("Failed to fetch owner");
  }
  };

  useEffect(() => {
  fetchBranches();
  fetchDashboard();
  fetchOwner(); 
}, []);

  useEffect(() => {
    fetchDashboard();
  }, [selectedBranch]);

  if (unauthorized) return <div style={{ color: "white" }}>Unauthorized</div>;
  if (loading) return <div style={{ color: "white" }}>Loading...</div>;
  if (!data) return <div style={{ color: "white" }}>No data available</div>;

  // Sort by profit desc, top 3. Rank 1 = highest = green, 2 & 3 = blue
  const topBranches = (data.branchComparison || [])
    .sort((a: any, b: any) => b.profit - a.profit)
    .slice(0, 3)
    .map((b: any, i: number) => ({ ...b, rank: i + 1 }));

  // Bar colors: rank 1 (highest) = green, others = blue
  const barColors = topBranches.map((b: any) =>
    b.rank === 1 ? "#16a34a" : "#2563eb"
  );

  return (
    <>
      <div style={{ marginBottom: "10px" }}>
  <h1
    className="dashboard-title logo"
    style={{ marginBottom: "2px" }}
  >
    Dashboard
  </h1>

   <div
    style={{
      fontSize: "16px",
      color: "#666",
      marginTop: "0px",
      fontWeight: 500,
    }}
  >
    Hello, {ownerName || "Owner"} 
    </div>
    </div>

      {/* 🔹 FILTER SECTION */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "12px" }}>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchDashboard}>Apply</button>
      </div>

      {/* 🔹 ROW 1: 4 KPI CARDS */}
      <div className="db-stats-grid">
        <div className="db-stat-card">
          <div className="db-stat-label">Total Sales</div>
          <div className="db-stat-value">
            NRS {Number(data.totalSales || 0).toLocaleString()}
          </div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Net Profit</div>
          <div className="db-stat-value">
            NRS {Number(data.netProfit || 0).toLocaleString()}
          </div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Total Purchases</div>
          <div className="db-stat-value">
            NRS {Number(data.totalPurchases || 0).toLocaleString()}
          </div>
        </div>
        <div className="db-stat-card">
          <div className="db-stat-label">Total Expenses</div>
          <div className="db-stat-value">
            NRS {Number(data.totalExpense || 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/*
        🔹 ROW 2: Two-column layout
        LEFT  → [Avg Daily Sales] [Top Branch]  (small cards, side by side)
                [Sales Trend chart]              (below small cards)
        RIGHT → [Bar Chart]                     (spans full height of left col, top-aligned with small cards)

        Both chart cards share the same bottom edge because they're in the same grid row
        with alignItems: "stretch".
      */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
          alignItems: "stretch",
        }}
      >
        {/* ── LEFT COLUMN ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Small cards: Avg Daily Sales + Top Branch */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div className="db-stat-card">
              <div className="db-stat-label">Avg Daily Sales</div>
              <div className="db-stat-value">
                NRS {Number(data.averageDailySales || 0).toLocaleString()}
              </div>
            </div>
            <div className="db-stat-card">
              <div className="db-stat-label">Top Branch</div>
              <div className="db-stat-value">
                {data.topBranch?.branchName || "No Data"}
              </div>
              {data.topBranch && (
                <div style={{ fontSize: "13px", marginTop: "6px", color: "#16a34a" }}>
                  Profit: NRS {Number(data.topBranch.profit || 0).toLocaleString()}
                </div>
              )}
            </div>
          </div>

          {/* Sales Trend chart — fills remaining height of left column */}
          <div className="db-chart-card" style={{ flex: 1 }}>
            <div className="db-chart-label">Sales Trend</div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={data.salesTrend || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="_id"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#e63946"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ── RIGHT COLUMN: Bar Chart ──
            Uses display:flex + flex:1 inner div so ResponsiveContainer fills
            exactly the same total height as the left column (small cards + Sales Trend).
        */}
        <div
          className="db-chart-card"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="db-chart-label">Top 3 Branches by Profit</div>

          {/* This flex:1 div gives ResponsiveContainer a defined height to fill */}
          <div style={{ flex: 1, minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topBranches}
                barCategoryGap="55%"   /* wider gaps → slimmer bars */
                barSize={28}
                margin={{ top: 24, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="branchName" />
                <YAxis />
                <Tooltip
                  formatter={(value: any) =>
                    `NRS ${Number(value).toLocaleString()}`
                  }
                />
                <Bar dataKey="profit" radius={[3, 3, 0, 0]}>
                  {topBranches.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={barColors[index]} />
                  ))}
                  {/* Rank labels above each bar: 1, 2, 3 */}
                  <LabelList
                    dataKey="rank"
                    position="top"
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                      fill: "#333",
                    }}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}