// import axios from "axios";
// import { cookies } from "next/headers";

// export default async function DashboardPage() {
//   try {
//     const cookieStore = await cookies();  //must await
//     const token = cookieStore.get("token")?.value;

//     if (!token) {
//       return <div style={{ color: "white" }}>Not authenticated</div>;
//     }

//     const res = await axios.get(
//       "http://localhost:5050/api/dashboard",
//       {
//         headers: {
//           Cookie: `token=${token}`,
//         },
//       }
//     );

//     const data = res.data.data;

//     return (
//       <div style={{ color: "white" }}>
//         <h1>Dashboard</h1>
//         <p>Total Sales: Rs. {data.totalSales}</p>
//         <p>Total Expense: Rs. {data.totalExpense}</p>
//         <p>Total Purchases: Rs. {data.totalPurchases}</p>
//         <p>Net Profit: Rs. {data.netProfit}</p>
//       </div>
//     );
//   } catch (error) {
//     return <div style={{ color: "white" }}>Unauthorized</div>;
//   }
// }


import axios from "axios";
import { cookies } from "next/headers";

export default async function DashboardPage() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return <div style={{ color: "white" }}>Not authenticated</div>;
    }

    const res = await axios.get("http://localhost:5050/api/dashboard", {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const data = res.data.data;

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
  } catch (error) {
    return <div style={{ color: "white" }}>Unauthorized</div>;
  }
}