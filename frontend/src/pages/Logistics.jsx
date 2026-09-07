import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { logistics } from "../data/mockData";

export default function Logistics() {
  const {
    originalDistance,
    optimizedDistance,
    distanceSaved,
    estimatedSaving,
    totalProduce,
    deliveryStops,
    estimatedTime,
    vehicle,
    stops,
  } = logistics;

  const savingPercentage = Math.round(
    (distanceSaved / originalDistance) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="page-container py-8">
        {/* Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            AI LOGISTICS OPTIMIZATION
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Smart Route Planner 🚚
          </h2>

          <p className="text-slate-500 mt-2">
            Aggregate nearby orders and find an efficient delivery route.
          </p>
        </div>

        {/* AI Summary */}
        <div className="bg-green-700 text-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl shrink-0">
              🧠
            </div>

            <div>
              <p className="text-sm font-semibold text-green-100">
                AI OPTIMIZED ROUTE
              </p>

              <h3 className="text-xl font-bold mt-1">
                {stops.length} stops • 1 aggregated delivery
              </h3>

              <p className="text-sm text-green-100 mt-2 max-w-3xl">
                Nearby buyer orders have been grouped to reduce
                unnecessary travel and improve vehicle utilization.
              </p>
            </div>
          </div>
        </div>

        {/* Route Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Original Distance"
            value={`${originalDistance} km`}
            subtitle="Before optimization"
            icon="🛣️"
          />

          <StatCard
            title="Optimized Distance"
            value={`${optimizedDistance} km`}
            subtitle="AI suggested route"
            icon="📍"
            trend="Optimized"
            trendType="positive"
          />

          <StatCard
            title="Distance Saved"
            value={`${distanceSaved} km`}
            subtitle={`${savingPercentage}% shorter route`}
            icon="📉"
            trend={`-${savingPercentage}%`}
            trendType="positive"
          />

          <StatCard
            title="Transport Saving"
            value={`₹${estimatedSaving.toLocaleString()}`}
            subtitle="Prototype estimate"
            icon="💰"
            trend="Estimated"
            trendType="positive"
          />
        </div>

        {/* Map + Route */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Optimized Delivery Map 📍
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Suggested route for today's aggregated orders
              </p>
            </div>

            {/* Prototype Map */}
            <div className="relative h-[430px] bg-slate-100 overflow-hidden">
              {/* Roads */}
              <div className="absolute left-[12%] top-[48%] w-[78%] h-3 bg-white rotate-[-10deg] shadow-sm" />

              <div className="absolute left-[40%] top-[8%] w-3 h-[80%] bg-white rotate-[18deg] shadow-sm" />

              <div className="absolute left-[18%] top-[25%] w-[60%] h-3 bg-white rotate-[35deg] shadow-sm" />

              {/* Route */}
              <div className="absolute left-[17%] top-[55%] w-[67%] h-2 bg-green-600 rotate-[-12deg] rounded-full" />

              {/* Start */}
              <div className="absolute left-[10%] top-[57%] text-center">
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-xl shadow-lg">
                  🚜
                </div>

                <p className="text-xs font-bold text-slate-700 mt-2">
                  Ghaziabad
                </p>
              </div>

              {/* Stops */}
              {stops.slice(1).map((stop, index) => {
                const positions = [
                  {
                    left: "43%",
                    top: "40%",
                    label: "Sector 62",
                  },
                  {
                    left: "63%",
                    top: "27%",
                    label: "Sector 18",
                  },
                  {
                    left: "81%",
                    top: "18%",
                    label: "Delhi NCR",
                  },
                ];

                const position =
                  positions[index] || positions[positions.length - 1];

                return (
                  <div
                    key={stop.number}
                    className="absolute text-center"
                    style={{
                      left: position.left,
                      top: position.top,
                    }}
                  >
                    <div className="w-11 h-11 bg-white border-4 border-green-600 text-green-700 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {stop.number - 1}
                    </div>

                    <p className="text-xs font-bold text-slate-700 mt-2">
                      {position.label}
                    </p>
                  </div>
                );
              })}

              {/* Route Status */}
              <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-md">
                <p className="text-xs font-semibold text-slate-500">
                  ROUTE STATUS
                </p>

                <p className="text-sm font-bold text-green-700 mt-1">
                  ✓ Optimized
                </p>
              </div>

              {/* Prototype Map Badge */}
              <div className="absolute top-5 right-5 bg-white/95 rounded-xl px-3 py-2 shadow-sm">
                <p className="text-[11px] font-semibold text-slate-500">
                  PROTOTYPE MAP
                </p>
              </div>
            </div>
          </div>

          {/* Route Stops */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
              Route Stops
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Optimized delivery sequence
            </p>

            <div className="mt-6">
              {stops.map((stop, index) => (
                <div
                  key={stop.number}
                  className="relative flex gap-4 pb-7 last:pb-0"
                >
                  {/* Vertical Line */}
                  {index !== stops.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-full bg-green-100" />
                  )}

                  {/* Number */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      stop.type === "Pickup"
                        ? "bg-green-700 text-white"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {stop.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-slate-900">
                      {stop.name}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      📍 {stop.location}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                        {stop.type}
                      </span>

                      <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md">
                        {stop.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle + Delivery Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Vehicle */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
              Assigned Vehicle 🚚
            </h3>

            <div className="flex items-center gap-4 mt-5">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-3xl">
                🚛
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  Vehicle {vehicle.number}
                </p>

                <p className="text-sm text-slate-500">
                  Capacity: {vehicle.capacity.toLocaleString()} kg
                </p>

                <p className="text-sm text-green-700 font-semibold mt-1">
                  Load: {vehicle.load.toLocaleString()} kg •{" "}
                  {vehicle.utilization}% utilized
                </p>
              </div>
            </div>

            {/* Utilization Bar */}
            <div className="mt-5">
              <div className="flex justify-between text-xs text-slate-500 mb-2">
                <span>Vehicle Utilization</span>
                <span className="font-semibold">
                  {vehicle.utilization}%
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full">
                <div
                  className="h-2.5 bg-green-600 rounded-full"
                  style={{
                    width: `${vehicle.utilization}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Delivery Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900">
              Delivery Summary
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-5">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">
                  Total Produce
                </p>

                <p className="text-xl font-bold text-slate-900 mt-1">
                  {totalProduce} kg
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">
                  Delivery Stops
                </p>

                <p className="text-xl font-bold text-slate-900 mt-1">
                  {deliveryStops}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">
                  Estimated Time
                </p>

                <p className="text-xl font-bold text-slate-900 mt-1">
                  {estimatedTime}
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">
                  Route Status
                </p>

                <p className="text-xl font-bold text-green-700 mt-1">
                  Ready
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            type="button"
            onClick={() =>
              alert("Route dispatched successfully!")
            }
            className="flex-1 bg-green-700 text-white py-3.5 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            🚚 Dispatch Route
          </button>

          <Link
            to="/farmer/orders"
            className="flex-1 text-center border border-slate-300 bg-white text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            📦 View Orders
          </Link>
        </div>

        {/* Prototype Notice */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800">
            <strong>Prototype:</strong> Route distances, delivery
            sequence and transport savings are demonstration estimates.
            Production deployment will use live map, order and routing
            data.
          </p>
        </div>
      </main>
    </div>
  );
}
