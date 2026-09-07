import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import AddProduce from "./pages/AddProduce";
import AIInsights from "./pages/AIInsights";
import Marketplace from "./pages/Marketplace";
import Orders from "./pages/Orders";
import Logistics from "./pages/Logistics";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Farmer */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route
          path="/farmer/add-produce"
          element={<AddProduce />}
        />
        <Route
          path="/farmer/ai-insights"
          element={<AIInsights />}
        />
        <Route
          path="/farmer/orders"
          element={<Orders />}
        />

        {/* Logistics */}
        <Route path="/logistics" element={<Logistics />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Unknown route */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
