import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const features = [
  {
    icon: "🤝",
    title: "Direct Marketplace",
    description:
      "Connect farmers and FPOs directly with consumers and bulk buyers.",
  },
  {
    icon: "🤖",
    title: "AI Demand Forecast",
    description:
      "Use demand signals to help farmers make better selling decisions.",
  },
  {
    icon: "💰",
    title: "Price Intelligence",
    description:
      "Get an AI-assisted reference price range based on market signals.",
  },
  {
    icon: "🚚",
    title: "Smart Logistics",
    description:
      "Aggregate nearby orders and plan efficient delivery routes.",
  },
];

const steps = [
  {
    number: "01",
    title: "List Produce",
    description: "Farmer adds crop, quantity, location and expected price.",
  },
  {
    number: "02",
    title: "AI Analyzes",
    description: "Demand, supply and market signals are analyzed.",
  },
  {
    number: "03",
    title: "Find Buyers",
    description: "Buyers discover produce directly from farmers.",
  },
  {
    number: "04",
    title: "Optimize Delivery",
    description: "Nearby orders are aggregated for efficient logistics.",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">

        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-80 -left-32 w-72 h-72 bg-green-50 rounded-full blur-3xl opacity-70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                <span>🌾</span>
                <span>AI-Powered Agricultural Marketplace</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mt-6">
                From
                <span className="text-green-700"> Farm </span>
                Directly to
                <span className="text-green-700"> Market.</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mt-6 max-w-xl">
                KisanDirect AI helps farmers and FPOs connect directly with
                buyers, understand market demand and coordinate smarter
                logistics — reducing unnecessary intermediaries.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center bg-green-700 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-green-800 transition shadow-sm"
                >
                  Start Selling →
                </Link>

                <Link
                  to="/marketplace"
                  className="inline-flex items-center justify-center bg-white text-slate-700 border border-slate-300 px-6 py-3.5 rounded-xl font-semibold hover:bg-slate-50 transition"
                >
                  Explore Marketplace
                </Link>

              </div>

              {/* Trust points */}
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="text-green-600">✓</span>
                  Direct farmer access
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="text-green-600">✓</span>
                  AI decision support
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="text-green-600">✓</span>
                  Smart logistics
                </div>

              </div>

            </div>

            {/* Right dashboard visual */}
            <div className="relative">

              <div className="bg-white border border-slate-200 rounded-3xl shadow-xl p-5 sm:p-7">

                {/* Dashboard top */}
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold text-green-700">
                      FARMER AI DASHBOARD
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-1">
                      Today's Market
                    </h3>
                  </div>

                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl">
                    🤖
                  </div>

                </div>

                {/* Main prediction */}
                <div className="bg-green-700 text-white rounded-2xl p-5 mt-5">

                  <div className="flex justify-between items-start">

                    <div>
                      <p className="text-sm text-green-100">
                        Tomato Demand
                      </p>

                      <p className="text-3xl font-bold mt-1">
                        HIGH
                      </p>
                    </div>

                    <span className="bg-white/15 px-3 py-1.5 rounded-lg text-xs font-semibold">
                      AI Forecast
                    </span>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div>
                      <p className="text-xs text-green-100">
                        Predicted Demand
                      </p>

                      <p className="font-bold mt-1">
                        7,200 kg
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-green-100">
                        Price Range
                      </p>

                      <p className="font-bold mt-1">
                        ₹28–32/kg
                      </p>
                    </div>

                  </div>

                </div>

                {/* Market cards */}
                <div className="grid grid-cols-2 gap-4 mt-5">

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400">
                      Best Market
                    </p>

                    <p className="font-bold text-slate-800 mt-1">
                      📍 Noida 62
                    </p>

                    <p className="text-xs text-green-700 mt-1">
                      High demand
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <p className="text-xs text-slate-400">
                      Route
                    </p>

                    <p className="font-bold text-slate-800 mt-1">
                      🚚 Optimized
                    </p>

                    <p className="text-xs text-green-700 mt-1">
                      61 km
                    </p>
                  </div>

                </div>

                {/* Mini route */}
                <div className="mt-5 border border-slate-100 rounded-xl p-4">

                  <div className="flex items-center justify-between text-xs">

                    <span className="font-semibold text-slate-600">
                      Ghaziabad
                    </span>

                    <span className="text-green-600">
                      ────────●────────
                    </span>

                    <span className="font-semibold text-slate-600">
                      Noida
                    </span>

                  </div>

                </div>

              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-white border border-slate-200 shadow-lg rounded-2xl px-4 py-3">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                    📈
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Market Signal
                    </p>

                    <p className="text-sm font-bold text-green-700">
                      Demand ↑ 18%
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Problem / Solution */}
      <section className="py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-3xl mx-auto text-center">

            <p className="text-sm font-bold text-green-700">
              WHY KISANDIRECT AI?
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Making the agricultural supply chain smarter
            </h2>

            <p className="text-slate-500 mt-4 leading-relaxed">
              Farmers often lack direct access to buyers and timely market
              intelligence. Buyers, meanwhile, face fragmented supply and
              inefficient logistics.
            </p>

          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition"
              >

                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl">
                  {feature.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 mt-5">
                  {feature.title}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mt-2">
                  {feature.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-200 py-16 md:py-20">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center">

            <p className="text-sm font-bold text-green-700">
              HOW IT WORKS
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              From harvest to buyer in four steps
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">

            {steps.map((step, index) => (

              <div
                key={step.number}
                className="relative"
              >

                <div className="bg-slate-50 rounded-2xl p-6 h-full">

                  <span className="text-sm font-extrabold text-green-700">
                    {step.number}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mt-4">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed mt-2">
                    {step.description}
                  </p>

                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-slate-300 text-xl z-10">
                    →
                  </div>
                )}

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">

        <div className="max-w-5xl mx-auto px-4 sm:px-6">

          <div className="bg-green-700 rounded-3xl p-8 md:p-12 text-center text-white">

            <p className="text-sm font-semibold text-green-100">
              BUILDING A FAIRER SUPPLY CHAIN
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold mt-3">
              Give farmers better market intelligence.
            </h2>

            <p className="text-green-100 max-w-2xl mx-auto mt-4">
              Connect supply with demand, reduce unnecessary coordination
              layers and make agricultural logistics more efficient.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

              <Link
                to="/login"
                className="bg-white text-green-800 px-6 py-3.5 rounded-xl font-bold hover:bg-green-50 transition"
              >
                Get Started
              </Link>

              <Link
                to="/marketplace"
                className="border border-white/30 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-white/10 transition"
              >
                Browse Marketplace
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="text-center md:text-left">

              <p className="font-bold text-white">
                🌾 KisanDirect AI
              </p>

              <p className="text-xs mt-1">
                Direct Markets • Smarter Decisions • Stronger Farmers
              </p>

            </div>

            <p className="text-xs">
              SIH 2026 Prototype
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
                  }
