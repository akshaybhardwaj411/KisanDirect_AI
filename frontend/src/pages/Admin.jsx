import { Link } from "react-router-dom";

const crops = [
  { name: "Tomato", emoji: "🍅", supply: 5000, demand: 7200 },
  { name: "Potato", emoji: "🥔", supply: 6800, demand: 6100 },
  { name: "Onion", emoji: "🧅", supply: 4200, demand: 5600 },
  { name: "Wheat", emoji: "🌾", supply: 9000, demand: 8400 },
];

const markets = [
  { name: "Noida Sector 62", demand: "2,400 kg", level: "HIGH" },
  { name: "Ghaziabad", demand: "1,850 kg", level: "HIGH" },
  { name: "Delhi NCR", demand: "1,400 kg", level: "MEDIUM" },
  { name: "Meerut", demand: "950 kg", level: "MEDIUM" },
];

export default function Admin() {
  const totalSupply = crops.reduce((sum, crop) => sum + crop.supply, 0);
  const totalDemand = crops.reduce((sum, crop) => sum + crop.demand, 0);

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
              Admin & Market Intelligence
            </p>
          </div>

          <Link
            to="/farmer"
            className="text-sm font-semibold text-green-700 hover:underline"
          >
            ← Farmer Dashboard
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            ADMIN CONTROL CENTER
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Market Overview 📊
          </h2>

          <p className="text-slate-500 mt-2">
            Monitor farmers, buyers, supply, demand and logistics across the platform.
          </p>
        </div>

        {/* System status */}
        <div className="bg-green-700 text-white rounded-2xl p-5 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-sm text-green-100 font-semibold">
                SYSTEM STATUS
              </p>

              <h3 className="text-xl font-bold mt-1">
                All core services operational
              </h3>
            </div>

            <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">

              <span className="w-3 h-3 bg-white rounded-full" />

              <span className="text-sm font-semibold">
                AI Engine Online
              </span>

            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Active Farmers / FPOs
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              1,248
            </h3>

            <p className="text-sm text-green-700 font-semibold mt-2">
              ↑ 12.4% this month
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Active Buyers
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              684
            </h3>

            <p className="text-sm text-green-700 font-semibold mt-2">
              ↑ 8.7% this month
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Produce Listed
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              24.8K kg
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              Across active listings
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Orders Processed
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              3,426
            </h3>

            <p className="text-sm text-green-700 font-semibold mt-2">
              94.2% completed
            </p>
          </div>

        </div>

        {/* Supply demand + market */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Supply demand */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h3 className="text-lg font-bold text-slate-900">
              Supply vs Demand
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current platform-level estimates
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">

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

            </div>

            <div className="mt-6">

              {crops.map((crop) => {

                const maxValue = Math.max(
                  crop.supply,
                  crop.demand
                );

                const supplyWidth =
                  (crop.supply / maxValue) * 100;

                const demandWidth =
                  (crop.demand / maxValue) * 100;

                return (
                  <div key={crop.name} className="mb-5">

                    <div className="flex justify-between mb-2">

                      <span className="text-sm font-semibold text-slate-700">
                        {crop.emoji} {crop.name}
                      </span>

                      <span className="text-xs text-slate-400">
                        S: {crop.supply} / D: {crop.demand}
                      </span>

                    </div>

                    <div className="space-y-2">

                      <div className="h-2 bg-slate-100 rounded-full">
                        <div
                          className="h-2 bg-orange-400 rounded-full"
                          style={{ width: `${supplyWidth}%` }}
                        />
                      </div>

                      <div className="h-2 bg-slate-100 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${demandWidth}%` }}
                        />
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            <div className="flex gap-5 mt-3 text-xs text-slate-500">
              <span>🟧 Supply</span>
              <span>🟩 Demand</span>
            </div>

          </div>

          {/* High demand markets */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

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
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
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

        {/* Platform performance */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">

          <h3 className="text-lg font-bold text-slate-900">
            Platform Performance 🚚
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                Aggregated Orders
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                782
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                Routes Optimized
              </p>

              <p className="text-2xl font-bold text-green-700 mt-1">
                526
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                Deliveries Today
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                143
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-400">
                AI Predictions
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                1,892
              </p>
            </div>

          </div>

        </div>

        {/* AI monitoring */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          <div className="bg-white border border-slate-200 rounded-2xl p-6">

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

          <div className="bg-white border border-slate-200 rounded-2xl p-6">

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
                  526
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

        {/* Prototype disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Dashboard figures shown are prototype/demo values. Production
          deployment will use verified platform and market data.
        </p>

      </main>

    </div>
  );
        }
