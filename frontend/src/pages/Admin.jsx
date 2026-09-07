import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import {
  adminStats,
  markets,
  cropAnalytics,
} from "../data/mockData";

export default function Admin() {
  const totalSupply = cropAnalytics.reduce(
    (sum, crop) => sum + crop.supply,
    0
  );

  const totalDemand = cropAnalytics.reduce(
    (sum, crop) => sum + crop.demand,
    0
  );

  const demandGap = totalDemand - totalSupply;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="page-container py-8">
        {/* Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            ADMIN CONTROL CENTER
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Market Overview 📊
          </h2>

          <p className="text-slate-500 mt-2 max-w-3xl">
            Monitor farmers, buyers, supply, demand and logistics
            across the platform.
          </p>
        </div>

        {/* System Status */}
        <div className="bg-green-700 text-white rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-green-100 font-semibold">
                SYSTEM STATUS
              </p>

              <h3 className="text-xl font-bold mt-1">
                All core services operational
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl w-fit">
              <span className="w-3 h-3 bg-white rounded-full" />

              <span className="text-sm font-semibold">
                AI Engine Online
              </span>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Active Farmers / FPOs"
            value={adminStats.activeFarmers.toLocaleString()}
            subtitle="Registered on platform"
            icon="👨‍🌾"
            trend="+12.4%"
            trendType="positive"
          />

          <StatCard
            title="Active Buyers"
            value={adminStats.activeBuyers.toLocaleString()}
            subtitle="Current active buyers"
            icon="🛒"
            trend="+8.7%"
            trendType="positive"
          />

          <StatCard
            title="Produce Listed"
            value={adminStats.produceListed}
            subtitle="Across active listings"
            icon="🌾"
          />

          <StatCard
            title="Orders Processed"
            value={adminStats.ordersProcessed.toLocaleString()}
            subtitle="Platform orders"
            icon="📦"
            trend="94.2% completed"
            trendType="positive"
          />
        </div>

        {/* Supply / Demand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Supply Demand */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900">
              Supply vs Demand
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current platform-level estimates
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-sm text-green-700">
                  Total Demand
                </p>

                <p className="text-2xl font-bold text-green-800 mt-1">
                  {totalDemand.toLocaleString()} kg
                </p>
              </div>

              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-sm text-orange-700">
                  Total Supply
                </p>

                <p className="text-2xl font-bold text-orange-800 mt-1">
                  {totalSupply.toLocaleString()} kg
                </p>
              </div>

              <div
                className={`rounded-xl p-4 ${
                  demandGap > 0
                    ? "bg-red-50"
                    : "bg-blue-50"
                }`}
              >
                <p
                  className={`text-sm ${
                    demandGap > 0
                      ? "text-red-700"
                      : "text-blue-700"
                  }`}
                >
                  Market Gap
                </p>

                <p
                  className={`text-2xl font-bold mt-1 ${
                    demandGap > 0
                      ? "text-red-800"
                      : "text-blue-800"
                  }`}
                >
                  {Math.abs(demandGap).toLocaleString()} kg
                </p>
              </div>
            </div>

            {/* Crop Analytics */}
            <div className="mt-7">
              {cropAnalytics.map((crop) => {
                const maxValue = Math.max(
                  crop.supply,
                  crop.demand
                );

                const supplyWidth =
                  (crop.supply / maxValue) * 100;

                const demandWidth =
                  (crop.demand / maxValue) * 100;

                return (
                  <div
                    key={crop.name}
                    className="mb-6 last:mb-0"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <span className="text-sm font-semibold text-slate-700">
                        {crop.emoji} {crop.name}
                      </span>

                      <span className="text-xs text-slate-400">
                        S: {crop.supply.toLocaleString()} / D:{" "}
                        {crop.demand.toLocaleString()}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {/* Supply */}
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-orange-400 rounded-full"
                          style={{
                            width: `${supplyWidth}%`,
                          }}
                        />
                      </div>

                      {/* Demand */}
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{
                            width: `${demandWidth}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-5 mt-5 text-xs text-slate-500">
              <span>🟧 Supply</span>
              <span>🟩 Demand</span>
            </div>
          </div>

          {/* High Demand Markets */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900">
              High-Demand Markets 📍
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Locations requiring closer supply monitoring
            </p>

            <div className="space-y-4 mt-6">
              {markets.map((market) => (
                <div
                  key={market.name}
                  className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl"
                >
                  <div>
                    <p className="font-bold text-slate-900">
                      {market.name}
                    </p>

                    <p className="text-sm text-slate-500 mt-1">
                      Estimated demand: {market.demand}
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-2 rounded-lg ${
                      market.level === "HIGH"
                        ? "bg-green-50 text-green-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {market.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Performance */}
        <div className="card p-6 mt-6">
          <h3 className="text-lg font-bold text-slate-900">
            Platform Performance 🚚
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                Aggregated Orders
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {adminStats.aggregatedOrders.toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                Routes Optimized
              </p>

              <p className="text-2xl font-bold text-green-700 mt-1">
                {adminStats.routesOptimized.toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                Deliveries Today
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {adminStats.deliveriesToday.toLocaleString()}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                AI Predictions
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {adminStats.aiPredictions.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* AI Monitoring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Demand Forecasting */}
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl">
                🤖
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Demand Forecasting
                </h3>

                <p className="text-sm text-green-700 font-semibold">
                  Operational
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">
                  Model confidence
                </span>

                <span className="font-bold">
                  87%
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full">
                <div
                  className="h-2 bg-green-600 rounded-full"
                  style={{ width: "87%" }}
                />
              </div>
            </div>
          </div>

          {/* Route Optimization */}
          <div className="card p-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl">
                🚚
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  Route Optimization
                </h3>

                <p className="text-sm text-green-700 font-semibold">
                  Operational
                </p>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">
                  Routes optimized
                </span>

                <span className="font-bold">
                  {adminStats.routesOptimized.toLocaleString()}
                </span>
              </div>

              <div className="h-2 bg-slate-100 rounded-full">
                <div
                  className="h-2 bg-blue-600 rounded-full"
                  style={{ width: "78%" }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link
            to="/marketplace"
            className="flex-1 text-center bg-green-700 text-white py-3.5 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            🛒 Open Marketplace
          </Link>

          <Link
            to="/logistics"
            className="flex-1 text-center border border-slate-300 bg-white text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            🚚 Logistics Monitor
          </Link>
        </div>

        {/* Prototype Notice */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800">
            <strong>Prototype:</strong> Dashboard figures and AI
            analytics are demonstration values. Production deployment
            will use verified platform, market and logistics data.
          </p>
        </div>
      </main>
    </div>
  );
}
