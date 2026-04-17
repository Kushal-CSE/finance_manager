import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "./Header";
import { ItemForm } from "./ItemForm";
import { ItemTable } from "./ItemTable";
import "./dashboard.css";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refresh, setRefresh] = useState(false); // Used to trigger table update
    const navigate = useNavigate();

    // Fetch user on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Unauthorized");

                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                setError("Failed to fetch user. Redirecting...");
                setTimeout(() => navigate("/login"), 2000);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [navigate]);

    // Handle new item submission
    const handleItemSubmit = async (newItem) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:5000/add_item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(newItem),
            });

            if (!response.ok) throw new Error("Failed to add item");

            setRefresh(prev => !prev); // Toggle refresh to update the table
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token"); // Clear token
        setUser(null); // Reset user state
        navigate("/login"); // Redirect to login page
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard-container">
            <div className="main-content-area">
                <Header />
                <div className="dashboard-header">
                    <h1>Welcome, {user?.email}!</h1>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
                <ItemForm onItemSubmit={handleItemSubmit} />
                <ItemTable refresh={refresh} />
            </div>
        </div>
    );
};

export { Dashboard };
