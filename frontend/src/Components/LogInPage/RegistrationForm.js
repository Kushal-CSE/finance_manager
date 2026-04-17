import React, { useState } from "react"; // React hooks for managing state
import { useNavigate } from "react-router-dom"; // Hook for programmatic navigation
import "./RegistrationForm.css"; // Importing styles

function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Handles form submission, registration, and auto-login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords don't match!");
      return;
    }

    if (!username || !email || !password) {
      setMessage("All fields are required!");
      return;
    }

    setLoading(true);
    try {
      // Register the user
      const registerResponse = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
      });

      const registerData = await registerResponse.json();
      if (!registerResponse.ok) throw new Error(registerData.message || "Registration failed!");

      // Log in the user automatically after registration
      const loginResponse = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginResponse.json();
      if (!loginResponse.ok) throw new Error(loginData.message || "Login failed after registration!");

      // Store token and redirect to dashboard
      localStorage.setItem("token", loginData.token);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setMessage(error.message || "Server error! Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register an Account</h2>
      {message && <p className={message.includes("success") ? "success" : "error"}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export { RegistrationForm };
