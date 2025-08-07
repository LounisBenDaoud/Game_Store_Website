import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import Toast from "./components/Toast";
import "./App.css";
import Main from "./pages/Main";

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  // Show toast for 2 seconds
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2000);
  };

  return (
    <>
      <AppContext.Provider value={{
        library, setLibrary, bag, setBag,
        showToast
      }}>
        <Main />
        <Toast message={toast.message} show={toast.show} />
      </AppContext.Provider>
    </>
  );
}

export default App;
