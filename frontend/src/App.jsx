import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProblemPage from "./pages/ProblemPage";

const App = () => {
  const { isSignedIn } = useUser();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/problem"
        element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default App;
