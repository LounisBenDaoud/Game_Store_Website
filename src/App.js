import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

import React, { Suspense, useState } from "react";
import Toast from "./components/Toast";
import "./App.css";
import Auth from "./pages/Auth";

export const AppContext = React.createContext();

const Main = React.lazy(() => import("./pages/Main"));

const AUTH_API = "http://localhost:5000/api/auth";
const SESSION_KEY = "game-store-user";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("App crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#10141a",
            color: "#f3f4f6",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div>
            <h2>Something went wrong while rendering the app.</h2>
            <p>Please refresh the page.</p>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Show toast for 2 seconds
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  const handleLogin = async ({ username, password }) => {
    const response = await fetch(`${AUTH_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Login failed.");
    }

    setCurrentUser(data.user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    showToast(`Welcome back, ${data.user.username}`);
  };

  const handleSignup = async ({ username, email, password }) => {
    const response = await fetch(`${AUTH_API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not create account.");
    }

    setCurrentUser(data.user);
    localStorage.setItem(SESSION_KEY, JSON.stringify(data.user));
    showToast(`Account created for ${data.user.username}`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLibrary([]);
    setBag([]);
    localStorage.removeItem(SESSION_KEY);
    showToast("You are logged out.");
  };

  return (
    <AppErrorBoundary>
      <AppContext.Provider value={{
        library, setLibrary, bag, setBag,
        showToast,
        currentUser,
        logout: handleLogout,
      }}>
        {currentUser ? (
          <Suspense
            fallback={
              <section
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#10141a",
                  color: "#f3f4f6",
                }}
              >
                <p>Loading app...</p>
              </section>
            }
          >
            <Main />
          </Suspense>
        ) : (
          <Auth onLogin={handleLogin} onSignup={handleSignup} />
        )}
        <Toast message={toast.message} show={toast.show} />
      </AppContext.Provider>
    </AppErrorBoundary>
  );
}

export default App;
