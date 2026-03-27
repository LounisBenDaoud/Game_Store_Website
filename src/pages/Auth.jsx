import React, { useState } from "react";
import "./auth.css";

function Auth({ onLogin, onSignup }) {
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const resetFields = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleModeSwitch = (modeIsLogin) => {
        setIsLoginMode(modeIsLogin);
        resetFields();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        if (!username.trim() || !password.trim() || (!isLoginMode && !email.trim())) {
            setError("Please fill all required fields.");
            return;
        }

        try {
            setLoading(true);

            if (isLoginMode) {
                await onLogin({ username, password });
            } else {
                await onSignup({ username, email, password });
            }

            resetFields();
        } catch (submitError) {
            setError(submitError.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="authPage">
            <div className="authCard">
                <h1>Welcome to Game Store</h1>
                <p>{isLoginMode ? "Login to continue" : "Create your new account"}</p>

                <div className="authSwitch">
                    <button
                        type="button"
                        className={isLoginMode ? "active" : ""}
                        onClick={() => handleModeSwitch(true)}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={!isLoginMode ? "active" : ""}
                        onClick={() => handleModeSwitch(false)}
                    >
                        Create Account
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="auth-username">Username</label>
                    <input
                        id="auth-username"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Enter username"
                    />

                    {!isLoginMode && (
                        <>
                            <label htmlFor="auth-email">Email</label>
                            <input
                                id="auth-email"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="Enter email"
                            />
                        </>
                    )}

                    <label htmlFor="auth-password">Password</label>
                    <input
                        id="auth-password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                    />

                    {error && <span className="authError">{error}</span>}

                    <button className="authSubmit" type="submit" disabled={loading}>
                        {loading ? "Please wait..." : isLoginMode ? "Login" : "Create Account"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Auth;
