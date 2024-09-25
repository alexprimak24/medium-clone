import React from "react";
import "./App.css";
import AuthWindow from "./components/AuthWindow";
import authService from "./services/appwrite/auth";

function App() {
  const getSession = async () => {
    try {
      const result = await authService.getCurrentSession();
      console.log(result);
    } catch {
      console.log("Unable to get session");
    }
  };
  const logout = async () => {
    try {
      const result = await authService.logout();
      console.log(result);
    } catch {
      console.log("Unable to logout");
    }
  };
  return (
    <div className="relative">
      <AuthWindow />
      <button className="bg-white" onClick={getSession}>
        Get Session
      </button>
      <button className="bg-white" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default App;
