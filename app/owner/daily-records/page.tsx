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

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "100vh", padding: "32px" }}>
      {/*  Header */}
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#1e293b", marginBottom: "4px" }}>
        Daily Records
      </h1>
      <p style={{ color: "#64748b", marginBottom: "24px", fontSize: "14px" }}>
        View and filter your branch daily records
      </p>

      {/* Filter Card */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "16px 20px",
        marginBottom: "24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}>
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
            color: "#374151",
            backgroundColor: "#f8fafc",
            outline: "none",
            cursor: "pointer",
            minWidth: "160px",
          }}
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b._id} value={b._id}>{b.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
            color: "#374151",
            backgroundColor: "#f8fafc",
            outline: "none",
          }}
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #e2e8f0",
            fontSize: "14px",
            color: "#374151",
            backgroundColor: "#f8fafc",
            outline: "none",
          }}
        />

        <button
          onClick={fetchRecords}
          style={{
            padding: "8px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#1e293b",
            color: "#ffffff",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
      </div>

      {/* Table Card */}
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        overflow: "hidden",
      }}>
        {loading ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#94a3b8", fontSize: "15px" }}>
            Loading...
          </div>
        ) : records.length === 0 ? (
          <div style={{ padding: "60px", textAlign: "center", color: "#94a3b8", fontSize: "15px" }}>
            No records found.
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                {["Date", "Branch", "Manager", "Total Sales", "Total Expense", "Total Purchases", "Profit", ""].map((h) => (
                  <th key={h} style={{
                    padding: "12px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#64748b",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    whiteSpace: "nowrap",
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => {
                const profit = record.totalSales - record.totalExpense - record.totalPurchases;
                const isExpanded = expandedRow === record._id;

                return (
                  <Fragment key={record._id}>
                    <tr style={{
                      borderBottom: "1px solid #f1f5f9",
                      backgroundColor: index % 2 === 0 ? "#ffffff" : "#fafafa",
                      transition: "background 0.15s",
                    }}>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151", fontWeight: "500" }}>
                        {record.branchId?.name}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>
                        {record.managerId?.firstName} {record.managerId?.lastName}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>
                        NRS {record.totalSales.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>
                        NRS {record.totalExpense.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", color: "#374151" }}>
                        NRS {record.totalPurchases.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px", fontSize: "14px", fontWeight: "600", color: profit < 0 ? "#ef4444" : "#22c55e" }}>
                        NRS {profit.toLocaleString()}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <button
                          onClick={() => setExpandedRow(isExpanded ? null : record._id)}
                          style={{
                            padding: "6px 14px",
                            borderRadius: "6px",
                            border: "1px solid #e2e8f0",
                            backgroundColor: isExpanded ? "#1e293b" : "#ffffff",
                            color: isExpanded ? "#ffffff" : "#374151",
                            fontSize: "13px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {isExpanded ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>

                    {/* Expanded Details Row */}
                    {isExpanded && (
                      <tr>
                        <td colSpan={8} style={{ backgroundColor: "#f8fafc", padding: "0" }}>
                          <div style={{
                            padding: "20px 24px",
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                            gap: "16px",
                            borderTop: "1px solid #e2e8f0",
                            borderBottom: "1px solid #e2e8f0",
                          }}>
                            {/* Sales Items */}
                            <div style={{
                              backgroundColor: "#ffffff",
                              borderRadius: "10px",
                              padding: "16px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}>
                              <p style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                                Sales Items
                              </p>
                              {record.salesItems?.length === 0 ? (
                                <p style={{ fontSize: "13px", color: "#94a3b8" }}>No items</p>
                              ) : (
                                record.salesItems?.map((item: any, i: number) => (
                                  <div key={i} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "13px",
                                    color: "#374151",
                                    padding: "6px 0",
                                    borderBottom: i < record.salesItems.length - 1 ? "1px solid #f1f5f9" : "none",
                                  }}>
                                    <span>{item.itemName}</span>
                                    <span style={{ color: "#64748b" }}>Qty: {item.quantity} &nbsp;|&nbsp; NRS {item.price}</span>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Expense Items */}
                            <div style={{
                              backgroundColor: "#ffffff",
                              borderRadius: "10px",
                              padding: "16px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}>
                              <p style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                                Expense Items
                              </p>
                              {record.expenseItems?.length === 0 ? (
                                <p style={{ fontSize: "13px", color: "#94a3b8" }}>No items</p>
                              ) : (
                                record.expenseItems?.map((item: any, i: number) => (
                                  <div key={i} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "13px",
                                    color: "#374151",
                                    padding: "6px 0",
                                    borderBottom: i < record.expenseItems.length - 1 ? "1px solid #f1f5f9" : "none",
                                  }}>
                                    <span>{item.category}</span>
                                    <span style={{ color: "#64748b" }}>Qty: {item.quantity} &nbsp;|&nbsp; NRS {item.subtotal}</span>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Purchase Items */}
                            <div style={{
                              backgroundColor: "#ffffff",
                              borderRadius: "10px",
                              padding: "16px",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            }}>
                              <p style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                                Purchase Items
                              </p>
                              {record.purchaseItems?.length === 0 ? (
                                <p style={{ fontSize: "13px", color: "#94a3b8" }}>No items</p>
                              ) : (
                                record.purchaseItems?.map((item: any, i: number) => (
                                  <div key={i} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "13px",
                                    color: "#374151",
                                    padding: "6px 0",
                                    borderBottom: i < record.purchaseItems.length - 1 ? "1px solid #f1f5f9" : "none",
                                  }}>
                                    <span>{item.category}</span>
                                    <span style={{ color: "#64748b" }}>Qty: {item.quantity} &nbsp;|&nbsp; NRS {item.subtotal}</span>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}