import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Deck from "./pages/Deck";
import Study from "./pages/Study";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deck/:id" element={<Deck />} />
        <Route path="/study/:id" element={<Study />} />
      </Routes>
    </BrowserRouter>
  );
}
