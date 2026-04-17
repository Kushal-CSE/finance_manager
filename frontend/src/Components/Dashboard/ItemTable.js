import React, { useEffect, useState } from "react";
import "./dashboard.css";

function ItemTable({ refresh }) {
  const [transactions, setTransactions] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc"); // Default: Newest first

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:5000/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch transactions");

        const data = await response.json();
        setTransactions(data.transactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [refresh]);

  // Toggle selection for bulk actions
  const toggleSelect = (itemId) => {
    setSelectedItems((prev) => {
      const newSelected = new Set(prev);
      newSelected.has(itemId) ? newSelected.delete(itemId) : newSelected.add(itemId);
      return newSelected;
    });
  };

  // Handle bulk delete
  const handleDeleteSelected = async () => {
    if (selectedItems.size === 0) {
      alert("No items selected.");
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${selectedItems.size} selected transactions?`)) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/delete_items", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemIds: Array.from(selectedItems) }),
      });

      if (!response.ok) throw new Error("Failed to delete transactions");

      // Remove deleted items from state and clear selection
      setTransactions((prev) => prev.filter((item) => !selectedItems.has(item._id)));
      setSelectedItems(new Set());
    } catch (err) {
      alert("Error deleting transactions: " + err.message);
    }
  };

  // Search & Filter Transactions
  const filteredTransactions = transactions.filter(({ itemName, itemCost, date }) =>
    [itemName, itemCost.toString(), new Date(date).toLocaleDateString()]
      .some(value => value.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort Transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let valA = a[sortColumn];
    let valB = b[sortColumn];

    if (sortColumn === "date") {
      valA = new Date(valA);
      valB = new Date(valB);
    } else if (sortColumn === "itemCost") {
      valA = parseFloat(valA);
      valB = parseFloat(valB);
    } else {
      valA = valA.toString().toLowerCase();
      valB = valB.toString().toLowerCase();
    }

    return sortOrder === "asc" ? valA - valB : valB - valA;
  });

  // Handle Column Sorting
  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div className="table-container">
      <h3>Transaction History</h3>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Bulk Delete Button */}
      <button onClick={handleDeleteSelected} className="bulk-delete-btn">
        🗑 Delete Selected ({selectedItems.size})
      </button>

      {/* Transactions Table */}
      <table className="transaction-table">
        <thead>
          <tr>
            <th className="checkbox-cell">Select</th>
            <th>Serial No.</th>
            <th onClick={() => handleSort("itemName")}>Item Name {sortColumn === "itemName" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("itemCost")}>Item Cost {sortColumn === "itemCost" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</th>
            <th onClick={() => handleSort("date")}>Date {sortColumn === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}</th>
            <th>Gain/Spent</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((item, index) => (
            <tr key={item._id}>
              <td className="checkbox-cell">
                <input
                  type="checkbox"
                  checked={selectedItems.has(item._id)}
                  onChange={() => toggleSelect(item._id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.itemName}</td>
              <td>${item.itemCost.toFixed(2)}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td style={{ color: item.gainSpent === "gain" ? "green" : "red" }}>
                {item.gainSpent}
              </td>
              <td>{item.balance.toFixed(2)}</td>
              <td>
                <button onClick={() => toggleSelect(item._id)} className="delete-btn">
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ItemTable };
