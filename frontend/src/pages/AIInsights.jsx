import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import { aiInsights } from "../data/mockData";

export default function AIInsights() {
  const demand = aiInsights.predictedDemand;
  const supply = aiInsights.availableSupply;
  const gap = aiInsights.supplyGap;

  const demandPercentage = Math.min(
    100,
    Math.round((demand / Math.max(demand, supply)) * 100)
  );

  const supplyPercentage = Math.min(
    100,
    Math.round((supply / Math.max(demand, supply)) * 100)
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="page-container py-8">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-green-700">
            AI-POWERED DECISION SUPPORT
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Market Insights 🤖
          </h2>

          <p className="text-slate-500 mt-2 max-w-3xl">
            AI analyzes demand, supply, price and location signals to
            help you decide where and when to sell.
          </p>
        </div>

        {/* Crop Information */}
        <div className="card p-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">
                Selected Produce
              </p>

              <h3 className="text-xl font-bold text-slate-900 mt-1">
                🍅 {aiInsights.crop}
              </h3>

              <p className="text-sm text-slate-500">
                {aiInsights.location} • 500 kg available
              </p>
            </div>

            <select
              defaultValue={aiInsights.crop}
              className="input-field md:w-48 bg-white"
            >
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
            <div className="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center text-2xl shrink-0">
              🤖
            </div>

            <div>
              <p className="text-green-100 text-sm font-semibold">
                AI RECOMMENDATION
              </p>

              <h3 className="text-xl font-bold mt-1">
                Good time to sell your {aiInsights.crop.toLowerCase()}s
              </h3>

              <p className="text-green-100 text-sm mt-2 max-w-3xl">
                {aiInsights.recommendation}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatCard
            title="Predicted Demand"
            value={`${demand.toLocaleString()} kg`}
            subtitle="AI market estimate"
            icon="📈"
            trend={`↑ ${aiInsights.demandLevel}`}
            trendType="positive"
          />

          <StatCard
            title="Estimated Supply"
            value={`${supply.toLocaleString()} kg`}
            subtitle="Current market estimate"
            icon="🌾"
            trend={`Gap ${gap.toLocaleString()} kg`}
            trendType="negative"
          />

          <StatCard
            title="Suggested Price"
            value={`₹${aiInsights.priceRange.min}–₹${aiInsights.priceRange.max}`}
            subtitle="Per kilogram"
            icon="💰"
            trend="AI Range"
            trendType="positive"
          />

          <StatCard
            title="Prediction Confidence"
            value={`${aiInsights.confidence}%`}
            subtitle="Model confidence"
            icon="🎯"
            trend="High"
            trendType="positive"
          />
        </div>

        {/* Demand vs Supply + Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Demand vs Supply */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900">
              Demand vs Supply
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Current AI-estimated market situation
            </p>

            {/* Demand */}
            <div className="mt-7">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">
                  Demand
                </span>

                <span className="font-bold">
                  {demand.toLocaleString()} kg
                </span>
              </div>

              <div className="w-full h-4 bg-slate-100 rounded-full">
                <div
                  className="h-4 bg-green-600 rounded-full transition-all"
                  style={{ width: `${demandPercentage}%` }}
                />
              </div>
            </div>

            {/* Supply */}
            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold text-slate-700">
                  Supply
                </span>

                <span className="font-bold">
                  {supply.toLocaleString()} kg
                </span>
              </div>

              <div className="w-full h-4 bg-slate-100 rounded-full">
                <div
                  className="h-4 bg-orange-400 rounded-full transition-all"
                  style={{ width: `${supplyPercentage}%` }}
                />
              </div>
            </div>

            {/* Gap */}
            <div className="mt-6 p-4 bg-orange-50 rounded-xl">
              <p className="text-sm font-semibold text-orange-800">
                ⚠️ Demand exceeds estimated supply
              </p>

              <p className="text-xs text-orange-700 mt-1">
                Estimated supply gap: {gap.toLocaleString()} kg.
                This may create an opportunity for farmers with
                available produce.
              </p>
            </div>
          </div>

          {/* High Demand Locations */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-slate-900">
              High-Demand Locations 📍
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Locations where buyer demand is currently strong
            </p>

            <div className="space-y-4 mt-6">
              {aiInsights.highDemandLocations.map((location, index) => (
                <div
                  key={location.name}
                  className={`flex items-center justify-between gap-4 p-4 rounded-xl ${
                    index === 0
                      ? "bg-green-50"
                      : "bg-slate-50"
                  }`}
                >
                  <div>
                    <p className="font-bold text-slate-900">
                      {location.name}
                    </p>

                    <p className="text-xs text-slate-500 mt-1">
                      Estimated demand:{" "}
                      {location.demand.toLocaleString()} kg
                    </p>
                  </div>

                  <span
                    className={`text-xs font-bold px-3 py-2 rounded-lg bg-white ${
                      location.level === "HIGH"
                        ? "text-green-700"
                        : "text-blue-700"
                    }`}
                  >
                    {location.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Factors */}
        <div className="card p-6 mt-6">
          <h3 className="text-lg font-bold text-slate-900">
            Why is AI recommending this? 🔍
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
            {aiInsights.factors.map((factor) => (
              <div
                key={factor.title}
                className="p-4 rounded-xl bg-slate-50"
              >
                <p className="font-semibold text-slate-900">
                  {factor.icon} {factor.title}
                </p>

                <p className="text-sm text-slate-500 mt-1">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
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

        {/* Prototype Notice */}
        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800">
            <strong>Prototype:</strong> AI values shown here are
            demonstration estimates. In the final system, these
            values will be generated from market, demand, supply and
            historical data through the ML backend.
          </p>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          AI outputs are decision-support estimates and should not
          be treated as guaranteed prices or demand.
        </p>
      </main>
    </div>
  );
}
