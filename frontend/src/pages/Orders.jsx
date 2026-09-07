import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { orders } from "../data/mockData";

const statusStyle = {
  Confirmed: "bg-green-50 text-green-700",
  "In Transit": "bg-blue-50 text-blue-700",
  Delivered: "bg-slate-100 text-slate-700",
  Pending: "bg-orange-50 text-orange-700",
};

export default function Orders() {
  const totalOrders = orders.length;

  const totalValue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const inTransit = orders.filter(
    (order) => order.status === "In Transit"
  ).length;

  const delivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="page-container py-8">
        {/* Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            ORDERS
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            My Orders 📦
          </h2>

          <p className="text-slate-500 mt-2">
            Track your direct farmer purchases and logistics status.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
          <StatCard
            title="Total Orders"
            value={totalOrders}
            subtitle="All orders"
            icon="📦"
          />

          <StatCard
            title="Total Order Value"
            value={`₹${totalValue.toLocaleString()}`}
            subtitle="Combined order value"
            icon="💰"
          />

          <StatCard
            title="In Transit"
            value={inTransit}
            subtitle="Currently moving"
            icon="🚚"
            trend={inTransit > 0 ? "Active" : "None"}
            trendType={inTransit > 0 ? "positive" : "neutral"}
          />

          <StatCard
            title="Delivered"
            value={delivered}
            subtitle="Successfully delivered"
            icon="✅"
            trend="Completed"
            trendType="positive"
          />
        </div>

        {/* Order List */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              Order History
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Your recent marketplace activity
            </p>
          </div>

          <Link
            to="/marketplace"
            className="hidden sm:inline-flex bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition"
          >
            🛒 Marketplace
          </Link>
        </div>

        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              {/* Top */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-3xl">
                    {order.emoji}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {order.crop}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Order #{order.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-bold px-3 py-2 rounded-full ${
                      statusStyle[order.status] ||
                      "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {order.status}
                  </span>

                  <span className="text-sm text-slate-400">
                    {order.date}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400">
                    Farmer
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {order.farmer}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Pickup Location
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    📍 {order.location}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Quantity
                  </p>

                  <p className="font-semibold text-slate-800 mt-1">
                    {order.quantity} kg
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    ₹{order.price}/kg
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">
                    Total Amount
                  </p>

                  <p className="font-bold text-green-700 mt-1">
                    ₹{order.total.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Logistics */}
              <div className="mt-5 bg-slate-50 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-400">
                    Logistics
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    🚚 {order.logistics}
                  </p>
                </div>

                <Link
                  to="/logistics"
                  className="text-sm font-semibold text-green-700 hover:underline"
                >
                  View Logistics →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {orders.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">📦</div>

            <h3 className="text-xl font-bold text-slate-900">
              No orders yet
            </h3>

            <p className="text-slate-500 mt-2">
              Your marketplace orders will appear here.
            </p>

            <Link
              to="/marketplace"
              className="inline-block mt-5 bg-green-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-800"
            >
              Browse Marketplace
            </Link>
          </div>
        )}

        {/* Bottom Action */}
        <div className="mt-7">
          <Link
            to="/marketplace"
            className="inline-flex items-center bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            🛒 Continue Shopping
          </Link>
        </div>

        {/* Prototype Notice */}
        <div className="mt-7 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800">
            <strong>Prototype:</strong> Order records shown here are
            demo data. Real-time order creation, status updates and
            logistics tracking will be connected through the backend.
          </p>
        </div>
      </main>
    </div>
  );
}
