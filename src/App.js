import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Deck from "./pages/Deck";
import Study from "./pages/Study";
import PrivateRoute from "./pages/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth (Login + Signup in same card) */}
        <Route path="/" element={<Auth />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/deck/:id"
          element={
            <PrivateRoute>
              <Deck />
            </PrivateRoute>
          }
        />
        <Route
          path="/study/:id"
          element={
            <PrivateRoute>
              <Study />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
