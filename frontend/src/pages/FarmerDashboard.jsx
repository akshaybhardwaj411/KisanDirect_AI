import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { farmer, aiInsights } from "../data/mockData";

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="h-16 px-4 sm:px-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-800">
              KisanDirect AI
            </h1>
            <p className="text-xs text-slate-400">
              Farmer Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-slate-800">
                {farmer.name}
              </p>
              <p className="text-xs text-slate-500">
                Farmer • {farmer.location}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">
              👨‍🌾
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            {/* Mobile Navigation */}
            <div className="lg:hidden mb-6 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                <Link
                  to="/farmer"
                  className="px-4 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-semibold"
                >
                  📊 Dashboard
                </Link>

                <Link
                  to="/farmer/add-produce"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold"
                >
                  ➕ Add Produce
                </Link>

                <Link
                  to="/farmer/ai-insights"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold"
                >
                  🤖 AI Insights
                </Link>

                <Link
                  to="/farmer/orders"
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold"
                >
                  📦 Orders
                </Link>
              </div>
            </div>

            {/* Welcome */}
            <div className="mb-7">
              <h2 className="text-3xl font-bold text-slate-900">
                Welcome back, {farmer.name.split(" ")[0]} 👋
              </h2>

              <p className="text-slate-500 mt-1">
                Manage your produce and make smarter selling decisions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-7">
              <StatCard
                title="My Produce"
                value={farmer.stats?.produce || "3"}
                subtitle="Total listed produce"
                icon="🌾"
              />

              <StatCard
                title="Pending Orders"
                value={farmer.stats?.pendingOrders || "2"}
                subtitle="Orders awaiting action"
                icon="📦"
                trend="2 pending"
                trendType="neutral"
              />

              <StatCard
                title="Total Earnings"
                value={farmer.stats?.earnings || "₹24,500"}
                subtitle="Current earnings"
                icon="💰"
                trend="+12%"
                trendType="positive"
              />

              <StatCard
                title="Active Listings"
                value={farmer.stats?.activeListings || "3"}
                subtitle="Currently available"
                icon="🛒"
                trend="Active"
                trendType="positive"
              />
            </div>

            {/* AI Insight */}
            <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-6 text-white mb-7 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🤖</span>
                    <span className="font-semibold">
                      AI Market Insight
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold">
                    Tomato demand is HIGH 🔥
                  </h3>

                  <p className="text-green-100 mt-2 max-w-xl">
                    AI estimates demand of{" "}
                    <strong>{aiInsights.demand.toLocaleString()} kg</strong>{" "}
                    against current supply of{" "}
                    <strong>{aiInsights.supply.toLocaleString()} kg</strong>.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-white/15 px-3 py-1.5 rounded-lg text-sm">
                      Suggested: ₹{aiInsights.priceRange.min}–₹
                      {aiInsights.priceRange.max}/kg
                    </span>

                    <span className="bg-white/15 px-3 py-1.5 rounded-lg text-sm">
                      {aiInsights.confidence}% confidence
                    </span>
                  </div>
                </div>

                <Link
                  to="/farmer/ai-insights"
                  className="bg-white text-green-700 px-5 py-3 rounded-xl font-semibold hover:bg-green-50 transition text-center whitespace-nowrap"
                >
                  View AI Insights →
                </Link>
              </div>
            </div>

            {/* Produce */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-5 border-b border-slate-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    My Produce
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Your current listings
                  </p>
                </div>

                <Link
                  to="/farmer/add-produce"
                  className="bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-green-800 transition text-center"
                >
                  + Add Produce
                </Link>
              </div>

              <div className="divide-y divide-slate-100">
                {(farmer.produce || []).map((item) => (
                  <div
                    key={item.crop}
                    className="px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center text-3xl">
                        {item.emoji}
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900">
                          {item.crop}
                        </h4>

                        <p className="text-sm text-slate-500">
                          {item.quantity} • ₹{item.price}/kg
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {item.status}
                      </span>

                      <Link
                        to="/marketplace"
                        className="text-green-700 font-semibold text-sm hover:underline"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-7">
              <h3 className="text-lg font-bold text-slate-900 mb-4">
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <Link
                  to="/marketplace"
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-green-200 transition"
                >
                  <div className="text-2xl mb-3">🛒</div>

                  <h3 className="font-bold text-slate-900">
                    Browse Marketplace
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    See current buyer demand and market listings.
                  </p>
                </Link>

                <Link
                  to="/farmer/orders"
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-green-200 transition"
                >
                  <div className="text-2xl mb-3">📦</div>

                  <h3 className="font-bold text-slate-900">
                    Manage Orders
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    Track incoming and completed orders.
                  </p>
                </Link>

                <Link
                  to="/logistics"
                  className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md hover:border-green-200 transition"
                >
                  <div className="text-2xl mb-3">🚚</div>

                  <h3 className="font-bold text-slate-900">
                    Smart Logistics
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    View deliveries and optimized routes.
                  </p>
                </Link>
              </div>
            </div>

            {/* Prototype Notice */}
            <div className="mt-7 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-xs text-amber-800">
                <strong>Prototype:</strong> Dashboard figures and AI
                recommendations are currently demo data. Live farmer,
                marketplace, prediction and order data will be connected
                through the backend.
              </p>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
