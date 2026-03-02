"use client";

import { useEffect, useState, Fragment } from "react";
import api from "@/lib/axios";

export default function DailyRecordsPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      setLoading(true);

      const params: any = {};
      if (selectedBranch) params.branchId = selectedBranch;
      if (startDate && endDate) {
        params.startDate = startDate;
        params.endDate = endDate;
      }

      const res = await api.get("/daily-record/owner", { params });
      setRecords(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    const res = await api.get("/branch/my-branches");
    setBranches(res.data.data);
  };

  useEffect(() => {
    fetchBranches();
    fetchRecords();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Daily Records</h1>

      {/* 🔹 FILTER SECTION */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
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

        <button onClick={fetchRecords}>Apply</button>
      </div>

      {/* 🔹 TABLE */}
      <table border={1} cellPadding={10} width="100%">
        <thead>
          <tr>
            <th>Date</th>
            <th>Branch</th>
            <th>Manager</th>
            <th>Total Sales</th>
            <th>Total Expense</th>
            <th>Total Purchases</th>
            <th>Profit</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const profit =
              record.totalSales -
              record.totalExpense -
              record.totalPurchases;

            return (
              <Fragment key={record._id}>
                <tr>
              
                  <td>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td>{record.branchId?.name}</td>
                  <td>
                    {record.managerId?.firstName}{" "}
                    {record.managerId?.lastName}
                  </td>
                  <td>NRS {record.totalSales.toLocaleString()}</td>
                  <td>NRS {record.totalExpense.toLocaleString()}</td>
                  <td>NRS {record.totalPurchases.toLocaleString()}</td>
                  <td
                    style={{
                      color: profit < 0 ? "red" : "green",
                      fontWeight: "bold",
                    }}
                  >
                    NRS {profit.toLocaleString()}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === record._id
                            ? null
                            : record._id
                        )
                      }
                    >
                      {expandedRow === record._id ? "Hide" : "View"}
                    </button>
                  </td>
                </tr>

                {/* 🔹 EXPANDED ROW */}
                {expandedRow === record._id && (
                  <tr>
                    <td colSpan={8}>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>Sales Items</strong>
                        <ul>
                          {record.salesItems.map((item: any, i: number) => (
                            <li key={i}>
                              {item.itemName} — Qty: {item.quantity} — Price:
                              NRS {item.price}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ marginBottom: "10px" }}>
                        <strong>Expense Items</strong>
                        <ul>
                          {record.expenseItems.map((item: any, i: number) => (
                            <li key={i}>
                              {item.category} — Qty: {item.quantity} — Price:
                              NRS {item.price} — Subtotal:
                              NRS {item.subtotal}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <strong>Purchase Items</strong>
                        <ul>
                          {record.purchaseItems.map((item: any, i: number) => (
                            <li key={i}>
                              {item.category} — Qty: {item.quantity} — Price:
                              NRS {item.price} — Subtotal:
                              NRS {item.subtotal}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
                
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}