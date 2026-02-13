import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";

import DashboardPage from "./pages/DashboardPage";
import ProblemsPage from "./pages/ProblemsPage";

const App = () => {
  const { isSignedIn, isLoaded } = useUser();

  // This will get rid of the flickering effect
  if (!isLoaded) return null;
  return (
    <Routes>
      <Route
        path="/"
        element={!isSignedIn ? <HomePage /> : <Navigate to={"/dashboard"} />}
      />
      <Route
        path="/dashboard"
        element={isSignedIn ? <DashboardPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/problem"
        element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};;;;

export default App;
