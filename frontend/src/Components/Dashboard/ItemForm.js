import React, { useState } from "react";

function ItemForm({ onItemSubmit }) {
  const [itemName, setItemName] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [date, setDate] = useState("");
  const [gainSpent, setGainSpent] = useState("gain"); // Default to 'gain'
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent double submission

  // Handles form submission and sends data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    setError(null);

    // Convert itemCost to number safely
    const cost = parseFloat(itemCost);
    if (isNaN(cost) || cost <= 0) {
      setError("Invalid item cost. Please enter a valid number.");
      setIsSubmitting(false);
      return;
    }

    const newItem = {
      itemName: itemName.trim(),
      itemCost: cost,
      date,
      gainSpent,
      balance: gainSpent === "gain" ? cost : -cost,
    };

    try {
      const response = await fetch("http://localhost:5000/add_item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to add item.");
      }

      onItemSubmit(data.item); // Update UI with new item

      // Reset form fields after successful submission
      setItemName("");
      setItemCost("");
      setDate("");
      setGainSpent("gain");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }

    window.location.reload();
  };

  return (
    <div className="item-form">
      <h3>Add New Item</h3>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Item Name:</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Item Cost:</label>
          <input
            type="number"
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="gain"
              checked={gainSpent === "gain"}
              onChange={() => setGainSpent("gain")}
            />
            Gain
          </label>
          <label>
            <input
              type="radio"
              value="spent"
              checked={gainSpent === "spent"}
              onChange={() => setGainSpent("spent")}
            />
            Spent
          </label>
        </div>

        <button type="submit" className="add-item-btn" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "➕ Add Item"}
        </button>
      </form>
    </div>
  );
}

export { ItemForm };
