import { Link } from "react-router-dom";

const stops = [
  {
    number: 1,
    name: "Raj Kumar Farm",
    location: "Ghaziabad, UP",
    type: "Pickup",
    quantity: "500 kg",
  },
  {
    number: 2,
    name: "Buyer — Sector 62",
    location: "Noida, UP",
    type: "Delivery",
    quantity: "250 kg",
  },
  {
    number: 3,
    name: "Buyer — Sector 18",
    location: "Noida, UP",
    type: "Delivery",
    quantity: "150 kg",
  },
  {
    number: 4,
    name: "Buyer — Delhi NCR",
    location: "Delhi, NCR",
    type: "Delivery",
    quantity: "100 kg",
  },
];

export default function Logistics() {
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
              Smart Logistics
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
        <div className="bg-green-700 text-white rounded-2xl p-6 mb-6">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl">
              🧠
            </div>

            <div>
              <p className="text-sm font-semibold text-green-100">
                AI OPTIMIZED ROUTE
              </p>

              <h3 className="text-xl font-bold mt-1">
                4 stops • 1 aggregated delivery
              </h3>

              <p className="text-sm text-green-100 mt-2">
                Nearby buyer orders have been grouped to reduce unnecessary
                travel and improve vehicle utilization.
              </p>
            </div>

          </div>

        </div>

        {/* Route stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Original Distance
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              84 km
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Optimized Distance
            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              61 km
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Distance Saved
            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              23 km
            </h3>

            <span className="inline-block mt-2 text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full">
              ~27% shorter
            </span>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Estimated Transport Saving
            </p>

            <h3 className="text-3xl font-bold text-green-700 mt-2">
              ₹460
            </h3>

            <p className="text-xs text-slate-400 mt-1">
              Prototype estimate
            </p>
          </div>

        </div>

        {/* Map + route */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Map */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl overflow-hidden">

            <div className="p-5 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Optimized Delivery Map 📍
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Suggested route for today's aggregated orders
              </p>
            </div>

            {/* Map-style visual */}
            <div className="relative h-[430px] bg-slate-100 overflow-hidden">

              {/* Roads */}
              <div className="absolute left-[12%] top-[48%] w-[78%] h-3 bg-white rotate-[-10deg] shadow-sm" />
              <div className="absolute left-[40%] top-[8%] w-3 h-[80%] bg-white rotate-[18deg] shadow-sm" />
              <div className="absolute left-[18%] top-[25%] w-[60%] h-3 bg-white rotate-[35deg] shadow-sm" />

              {/* Route line */}
              <div className="absolute left-[17%] top-[55%] w-[67%] h-2 bg-green-600 rotate-[-12deg] rounded-full" />

              {/* Start */}
              <div className="absolute left-[12%] top-[57%] text-center">
                <div className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center text-xl shadow-lg">
                  🚜
                </div>

                <p className="text-xs font-bold text-slate-700 mt-2">
                  Ghaziabad
                </p>
              </div>

              {/* Stop 1 */}
              <div className="absolute left-[43%] top-[40%] text-center">
                <div className="w-11 h-11 bg-white border-4 border-green-600 text-green-700 rounded-full flex items-center justify-center font-bold shadow-lg">
                  1
                </div>

                <p className="text-xs font-bold text-slate-700 mt-2">
                  Sector 62
                </p>
              </div>

              {/* Stop 2 */}
              <div className="absolute left-[63%] top-[27%] text-center">
                <div className="w-11 h-11 bg-white border-4 border-green-600 text-green-700 rounded-full flex items-center justify-center font-bold shadow-lg">
                  2
                </div>

                <p className="text-xs font-bold text-slate-700 mt-2">
                  Sector 18
                </p>
              </div>

              {/* Stop 3 */}
              <div className="absolute left-[81%] top-[18%] text-center">
                <div className="w-11 h-11 bg-white border-4 border-green-600 text-green-700 rounded-full flex items-center justify-center font-bold shadow-lg">
                  3
                </div>

                <p className="text-xs font-bold text-slate-700 mt-2">
                  Delhi NCR
                </p>
              </div>

              {/* Map label */}
              <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-md">

                <p className="text-xs font-semibold text-slate-500">
                  ROUTE STATUS
                </p>

                <p className="text-sm font-bold text-green-700 mt-1">
                  ✓ Optimized
                </p>

              </div>

            </div>

          </div>

          {/* Route stops */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

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

                  {/* Vertical line */}
                  {index !== stops.length - 1 && (
                    <div className="absolute left-5 top-10 w-0.5 h-full bg-green-100" />
                  )}

                  {/* Number */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      stop.type === "Pickup"
                        ? "bg-green-700 text-white"
                        : "bg-green-50 text-green-700"
                    }`}
                  >
                    {stop.number}
                  </div>

                  <div className="flex-1">

                    <p className="font-bold text-slate-900">
                      {stop.name}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      📍 {stop.location}
                    </p>

                    <div className="flex gap-2 mt-2">

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

        {/* Vehicle + logistics summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Vehicle */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h3 className="text-lg font-bold text-slate-900">
              Assigned Vehicle 🚚
            </h3>

            <div className="flex items-center gap-4 mt-5">

              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-3xl">
                🚛
              </div>

              <div>
                <p className="font-bold text-slate-900">
                  Vehicle UP-14-AB-4582
                </p>

                <p className="text-sm text-slate-500">
                  Capacity: 1,000 kg
                </p>

                <p className="text-sm text-green-700 font-semibold mt-1">
                  Load: 500 kg • 50% utilized
                </p>
              </div>

            </div>

          </div>

          {/* Delivery */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h3 className="text-lg font-bold text-slate-900">
              Delivery Summary
            </h3>

            <div className="grid grid-cols-2 gap-4 mt-5">

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">
                  Total Produce
                </p>

                <p className="text-xl font-bold text-slate-900 mt-1">
                  500 kg
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">
                  Delivery Stops
                </p>

                <p className="text-xl font-bold text-slate-900 mt-1">
                  3
                </p>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-xs text-slate-400">
                  Estimated Time
                </p>

                <p className="text-xl font-bold text-slate-900 mt-1">
                  2h 15m
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

        {/* Action */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">

          <button
            onClick={() => alert("Route dispatched successfully!")}
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

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Route distances and savings shown here are prototype estimates.
          Production deployment will use live map and routing data.
        </p>

      </main>

    </div>
  );
}
