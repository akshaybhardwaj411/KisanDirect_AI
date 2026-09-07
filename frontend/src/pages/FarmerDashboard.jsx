import { Link } from "react-router-dom";

const stats = [
  { label: "My Produce", value: "3", icon: "🌾" },
  { label: "Pending Orders", value: "2", icon: "📦" },
  { label: "Total Earnings", value: "₹24,500", icon: "💰" },
  { label: "Active Listings", value: "3", icon: "🛒" },
];

const produce = [
  {
    crop: "Tomato",
    quantity: "500 kg",
    price: "₹30/kg",
    status: "Active",
    emoji: "🍅",
  },
  {
    crop: "Potato",
    quantity: "300 kg",
    price: "₹24/kg",
    status: "Active",
    emoji: "🥔",
  },
  {
    crop: "Wheat",
    quantity: "800 kg",
    price: "₹28/kg",
    status: "Sold",
    emoji: "🌾",
  },
];

export default function FarmerDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-green-800">
              KisanDirect AI
            </h1>
            <p className="text-sm text-slate-500">
              Farmer Dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-slate-800">
                Raj Kumar
              </p>
              <p className="text-xs text-slate-500">
                Farmer • Ghaziabad
              </p>
            </div>

            <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-xl">
              👨‍🌾
            </div>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="mb-7">
          <h2 className="text-3xl font-bold text-slate-900">
            Welcome back, Raj 👋
          </h2>

          <p className="text-slate-500 mt-1">
            Manage your produce and make smarter selling decisions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">

          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    {stat.label}
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-2">
                    {stat.value}
                  </p>
                </div>

                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl">
                  {stat.icon}
                </div>

              </div>
            </div>
          ))}

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
                Demand is expected to exceed current supply in
                Noida. Consider listing additional tomato produce.
              </p>
            </div>

            <Link
              to="/farmer/ai-insights"
              className="bg-white text-green-700 px-5 py-3 rounded-xl font-semibold hover:bg-green-50 transition text-center"
            >
              View AI Insights →
            </Link>

          </div>

        </div>

        {/* Produce section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

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
              className="bg-green-700 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              + Add Produce
            </Link>

          </div>

          <div className="divide-y divide-slate-100">

            {produce.map((item) => (
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
                      {item.quantity} • {item.price}
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

                  <button className="text-green-700 font-semibold text-sm hover:underline">
                    View
                  </button>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Quick actions */}
        <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-5">

          <Link
            to="/marketplace"
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
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
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
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
            className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition"
          >
            <div className="text-2xl mb-3">🚚</div>
            <h3 className="font-bold text-slate-900">
              Logistics
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              View deliveries and optimized routes.
            </p>
          </Link>

        </div>

      </main>
    </div>
  );
        }
