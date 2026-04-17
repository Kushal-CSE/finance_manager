import React, { useState } from "react";
import { LogInForm } from "./LogInForm"; // Make sure to import these components
import { RegistrationForm } from "./RegistrationForm"; // Make sure to import these components

function LogIn() {
    // State to track whether to show the login or registration form
    const [isLogin, setIsLogin] = useState(true);

    // Toggle between login and registration
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="main-container">
            <div className="left-section">
              <div className="greeting-text">
                <h2>Welcome to Finance Manager!</h2>
                <p>Your one-stop solution to manage finances easily and efficiently.</p>
                <p>Start by logging in or creating an account to track your expenses, income, and more.</p>
              </div>
            </div>
            <div className="right-section">
                {/* Conditionally render either LogInForm or RegistrationForm */}
                {isLogin ? <LogInForm /> : <RegistrationForm />}

                <button onClick={toggleForm}>
                    {isLogin ? "Need an account? Register" : "Already have an account? Log In"}
                </button>
            </div>
        </div>
    );
}

export { LogIn };
