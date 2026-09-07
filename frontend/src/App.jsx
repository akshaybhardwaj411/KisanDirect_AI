import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
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

        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Farmer */}
        <Route path="/farmer" element={<FarmerDashboard />} />
        <Route path="/farmer/add-produce" element={<AddProduce />} />
        <Route path="/farmer/ai-insights" element={<AIInsights />} />
        <Route path="/farmer/orders" element={<Orders />} />

        {/* Marketplace */}
        <Route path="/marketplace" element={<Marketplace />} />

        {/* Logistics */}
        <Route path="/logistics" element={<Logistics />} />

        {/* Admin */}
        <Route path="/admin" element={<Admin />} />

        {/* Unknown URL */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
