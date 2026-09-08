import { useEffect, useState } from "react";
import { getOrders } from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders();
      setOrders(response.data || []);
    } catch (err) {
      console.error("Orders error:", err);
      setError(
        err?.response?.data?.detail ||
          "Unable to load orders from the server."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const getStatusStyle = (status) => {
    const styles = {
      Pending: "bg-yellow-50 text-yellow-700",
      Confirmed: "bg-blue-50 text-blue-700",
      "In Transit": "bg-purple-50 text-purple-700",
      Delivered: "bg-green-50 text-green-700",
      Cancelled: "bg-red-50 text-red-700",
    };

    return styles[status] || "bg-slate-100 text-slate-700";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0">
          <div className="page-container py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-semibold text-green-700">
                  FARMER ORDERS
                </p>

                <h1 className="text-3xl font-bold text-slate-900 mt-2">
                  Orders
                </h1>

                <p className="text-slate-500 mt-2">
                  Track your orders directly from the live KisanDirect
                  database.
                </p>
              </div>

              <button
                onClick={loadOrders}
                disabled={loading}
                className="secondary-btn"
              >
                {loading ? "Refreshing..." : "↻ Refresh Orders"}
              </button>
            </div>

            {/* Live indicator */}
            <div className="mb-6 flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
              <span className="text-green-700 font-semibold">
                Live backend connected
              </span>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                ❌ {error}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="card p-10 text-center">
                <div className="text-4xl mb-4">📦</div>
                <p className="font-semibold text-slate-700">
                  Loading live orders...
                </p>
                <p className="text-sm text-slate-400 mt-1">
                  Fetching data from KisanDirect AI backend.
                </p>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && orders.length === 0 && (
              <div className="card p-10 text-center">
                <div className="text-5xl mb-4">📭</div>

                <h2 className="text-xl font-bold text-slate-800">
                  No orders yet
                </h2>

                <p className="text-slate-500 mt-2">
                  Orders placed by buyers will appear here.
                </p>
              </div>
            )}

            {/* Orders */}
            {!loading && orders.length > 0 && (
              <div className="space-y-5">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="card p-5 sm:p-6 hover:shadow-md transition"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                      {/* Order info */}
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center text-3xl shrink-0">
                          📦
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-bold text-slate-900">
                              {order.order_number}
                            </h2>

                            <span
                              className={`text-xs font-bold px-3 py-1.5 rounded-full ${getStatusStyle(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>

                          <p className="text-sm text-slate-500 mt-1">
                            Produce ID: {order.produce_id}
                          </p>

                          <p className="text-sm text-slate-500 mt-1">
                            {order.created_at
                              ? new Date(
                                  order.created_at
                                ).toLocaleString("en-IN")
                              : "Date unavailable"}
                          </p>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="lg:text-right">
                        <p className="text-xs text-slate-400">
                          Total Amount
                        </p>

                        <p className="text-2xl font-bold text-green-700 mt-1">
                          ₹
                          {Number(order.total_amount || 0).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-5 border-t border-slate-100">
                      <div>
                        <p className="text-xs text-slate-400">
                          Buyer
                        </p>
                        <p className="font-semibold text-slate-800 mt-1">
                          {order.buyer_name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Quantity
                        </p>
                        <p className="font-semibold text-slate-800 mt-1">
                          {Number(order.quantity).toLocaleString()} kg
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Price
                        </p>
                        <p className="font-semibold text-slate-800 mt-1">
                          ₹{order.price_per_kg}/kg
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-400">
                          Delivery Location
                        </p>
                        <p className="font-semibold text-slate-800 mt-1">
                          📍 {order.buyer_location}
                        </p>
                      </div>
                    </div>

                    {/* Logistics */}
                    <div className="mt-5 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-xs text-slate-400">
                            Logistics
                          </p>

                          <p className="text-sm font-semibold text-slate-700 mt-1">
                            🚚 {order.logistics_status || "Not Scheduled"}
                          </p>
                        </div>

                        <span className="text-xs font-semibold text-slate-500">
                          Live Order
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-center text-xs text-slate-400 mt-8">
              KisanDirect AI • Direct Markets • Smarter Decisions • Stronger
              Farmers
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
