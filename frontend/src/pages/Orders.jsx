import { Link } from "react-router-dom";

const orders = [
  {
    id: "KD-1001",
    crop: "Tomato",
    emoji: "🍅",
    farmer: "Raj Kumar",
    location: "Ghaziabad, UP",
    quantity: 100,
    price: 30,
    total: 3000,
    status: "Confirmed",
    date: "07 Sep 2026",
    logistics: "Pickup scheduled",
  },
  {
    id: "KD-1002",
    crop: "Potato",
    emoji: "🥔",
    farmer: "Suresh Kumar",
    location: "Meerut, UP",
    quantity: 200,
    price: 24,
    total: 4800,
    status: "In Transit",
    date: "06 Sep 2026",
    logistics: "Vehicle assigned",
  },
  {
    id: "KD-1003",
    crop: "Onion",
    emoji: "🧅",
    farmer: "Amit Singh",
    location: "Bulandshahr, UP",
    quantity: 150,
    price: 28,
    total: 4200,
    status: "Delivered",
    date: "04 Sep 2026",
    logistics: "Delivered successfully",
  },
];

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

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-green-800">
              KisanDirect AI
            </h1>

            <p className="text-sm text-slate-500">
              Order Management
            </p>
          </div>

          <Link
            to="/farmer"
            className="text-sm font-semibold text-green-700 hover:underline"
          >
            ← Dashboard
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Total Orders
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {totalOrders}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Total Order Value
            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              ₹{totalValue.toLocaleString()}
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Orders In Transit
            </p>

            <h3 className="text-3xl font-bold text-blue-700 mt-2">
              {inTransit}
            </h3>
          </div>

        </div>

        {/* Order list */}
        <div className="space-y-5">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-2xl p-6"
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

        {/* Marketplace button */}
        <div className="mt-7">

          <Link
            to="/marketplace"
            className="inline-block bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            🛒 Continue Shopping
          </Link>

        </div>

      </main>

    </div>
  );
                    }
