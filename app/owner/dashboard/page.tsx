"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/dashboard");
        setData(res.data.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setUnauthorized(true);
        }
      }
    };

    fetchDashboard();
  }, []);

  if (unauthorized) {
    return <div style={{ color: "white" }}>Unauthorized</div>;
  }

  if (!data) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  const stats = [
    {
      label: "Total Sales",
      value: `NRS ${Number(data.totalSales).toLocaleString()}`,
      change: "+12.5%",
      positive: true,
    },
    {
      label: "Net Profit",
      value: `NRS ${Number(data.netProfit).toLocaleString()}`,
      change: "+8.2%",
      positive: true,
    },
    {
      label: "Total Purchases",
      value: `NRS ${Number(data.totalPurchases).toLocaleString()}`,
      change: "+5.1%",
      positive: true,
    },
    {
      label: "Total Expenses",
      value: `NRS ${Number(data.totalExpense).toLocaleString()}`,
      change: "-1.3%",
      positive: false,
    },
  ];

  return (
    <>
      <h1 className="dashboard-title logo">Dashboard</h1>

      <div className="db-stats-grid">
        {stats.map((s) => (
          <div className="db-stat-card" key={s.label}>
            <div className="db-stat-label">{s.label}</div>
            <div className="db-stat-value">{s.value}</div>
            <div className={`db-stat-change ${s.positive ? "up" : "down"}`}>
              {s.positive ? "▲" : "▼"} {s.change}
            </div>
          </div>
        ))}
      </div>

      <div className="db-charts-grid">
        <div className="db-chart-card">
          <div className="db-chart-label">Sales Over Time</div>
          <div className="db-chart-value">
            NRS {Number(data.totalSales).toLocaleString()}
          </div>
          <div className="db-chart-placeholder">Chart coming soon</div>
        </div>

        <div className="db-chart-card">
          <div className="db-chart-label">Expense Breakdown</div>
          <div className="db-chart-value">
            NRS {Number(data.totalExpense).toLocaleString()}
          </div>
          <div className="db-chart-placeholder">Chart coming soon</div>
        </div>
      </div>
    </>
  );
}