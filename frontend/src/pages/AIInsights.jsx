import { Link } from "react-router-dom";

export default function AIInsights() {
  const demand = 7200;
  const supply = 5000;
  const gap = demand - supply;

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
              AI Market Intelligence
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
        <div className="mb-8">
          <p className="text-sm font-semibold text-green-700">
            AI-POWERED DECISION SUPPORT
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Market Insights 🤖
          </h2>

          <p className="text-slate-500 mt-2">
            AI analyzes demand, supply, price and location signals to help
            you decide where and when to sell.
          </p>
        </div>

        {/* Crop selector */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-sm text-slate-500">
                Selected Produce
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-1">
                🍅 Tomato
              </h3>

              <p className="text-sm text-slate-500">
                Ghaziabad • 500 kg available
              </p>
            </div>

            <select className="px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-green-500">
              <option>Tomato</option>
              <option>Potato</option>
              <option>Onion</option>
              <option>Wheat</option>
              <option>Rice</option>
            </select>

          </div>
        </div>

        {/* AI Recommendation */}
        <div className="bg-green-700 text-white rounded-2xl p-6 mb-6 shadow-sm">

          <div className="flex gap-4">

            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl">
              🤖
            </div>

            <div>
              <p className="text-green-100 text-sm font-semibold">
                AI RECOMMENDATION
              </p>

              <h3 className="text-xl font-bold mt-1">
                Good time to sell your tomatoes
              </h3>

              <p className="text-green-100 text-sm mt-2 max-w-3xl">
                Demand is currently higher than estimated supply. Consider
                targeting high-demand buyer locations instead of selling
                through multiple intermediaries.
              </p>
            </div>

          </div>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">

          {/* Demand */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Predicted Demand
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {demand.toLocaleString()} kg
            </h3>

            <span className="inline-block mt-3 text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
              ↑ High Demand
            </span>
          </div>

          {/* Supply */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Estimated Supply
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              {supply.toLocaleString()} kg
            </h3>

            <span className="inline-block mt-3 text-sm font-semibold text-orange-700 bg-orange-50 px-3 py-1 rounded-full">
              Supply Gap: {gap.toLocaleString()} kg
            </span>
          </div>

          {/* Price */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Suggested Price
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              ₹28–32
            </h3>

            <p className="text-sm text-slate-400 mt-1">
              per kg
            </p>

            <span className="inline-block mt-3 text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
              AI Reference Range
            </span>
          </div>

          {/* Confidence */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5">
            <p className="text-sm text-slate-500">
              Prediction Confidence
            </p>

            <h3 className="text-3xl font-bold text-slate-900 mt-2">
              87%
            </h3>

            <div className="w-full h-2 bg-slate-100 rounded-full mt-4">
              <div
                className="h-2 bg-green-600 rounded-full"
                style={{ width: "87%" }}
              />
            </div>
          </div>

        </div>

        {/* Demand vs Supply */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h3 className="text-lg font-bold text-slate-900">
              Demand vs Supply
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current AI-estimated market situation
            </p>

            <div className="mt-7">

              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">
                  Demand
                </span>

                <span className="font-bold">
                  7,200 kg
                </span>
              </div>

              <div className="w-full h-4 bg-slate-100 rounded-full">
                <div
                  className="h-4 bg-green-600 rounded-full"
                  style={{ width: "90%" }}
                />
              </div>

            </div>

            <div className="mt-6">

              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">
                  Supply
                </span>

                <span className="font-bold">
                  5,000 kg
                </span>
              </div>

              <div className="w-full h-4 bg-slate-100 rounded-full">
                <div
                  className="h-4 bg-orange-400 rounded-full"
                  style={{ width: "63%" }}
                />
              </div>

            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-sm font-semibold text-orange-800">
                ⚠️ Demand exceeds estimated supply
              </p>

              <p className="text-xs text-orange-700 mt-1">
                This may create an opportunity for farmers with available
                produce.
              </p>
            </div>

          </div>

          {/* High demand locations */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">

            <h3 className="text-lg font-bold text-slate-900">
              High-Demand Locations 📍
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Locations where buyer demand is currently strong
            </p>

            <div className="space-y-4 mt-6">

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                <div>
                  <p className="font-bold text-slate-900">
                    Noida Sector 62
                  </p>
                  <p className="text-xs text-slate-500">
                    Estimated demand: 2,400 kg
                  </p>
                </div>

                <span className="text-xs font-bold text-green-700 bg-white px-3 py-2 rounded-lg">
                  HIGH
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-bold text-slate-900">
                    Ghaziabad
                  </p>
                  <p className="text-xs text-slate-500">
                    Estimated demand: 1,850 kg
                  </p>
                </div>

                <span className="text-xs font-bold text-green-700 bg-white px-3 py-2 rounded-lg">
                  HIGH
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <p className="font-bold text-slate-900">
                    Delhi NCR
                  </p>
                  <p className="text-xs text-slate-500">
                    Estimated demand: 1,400 kg
                  </p>
                </div>

                <span className="text-xs font-bold text-blue-700 bg-white px-3 py-2 rounded-lg">
                  MEDIUM
                </span>
              </div>

            </div>

          </div>

        </div>

        {/* AI factors */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6">

          <h3 className="text-lg font-bold text-slate-900">
            Why is AI recommending this? 🔍
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">

            <div className="p-4 rounded-xl bg-slate-50">
              <p className="font-semibold text-slate-900">
                📈 Demand Trend
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Recent buyer demand is showing an upward trend.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50">
              <p className="font-semibold text-slate-900">
                💰 Price Signals
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Historical market prices support the recommended range.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50">
              <p className="font-semibold text-slate-900">
                📍 Location Demand
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Nearby high-demand markets can reduce unnecessary transport.
              </p>
            </div>

          </div>

        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">

          <Link
            to="/marketplace"
            className="flex-1 text-center bg-green-700 text-white py-3.5 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            🛒 View Buyers & Marketplace
          </Link>

          <Link
            to="/logistics"
            className="flex-1 text-center border border-slate-300 bg-white text-slate-700 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition"
          >
            🚚 Optimize Logistics
          </Link>

        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          AI outputs are decision-support estimates based on available
          market data and should not be treated as guaranteed prices or demand.
        </p>

      </main>

    </div>
  );
      }
