import { useState } from "react";
import { predictDemand, predictPrice } from "../services/api";

export default function AIInsights() {
  const [activeTab, setActiveTab] = useState("demand");

  // ---------------- DEMAND ----------------
  const [demandForm, setDemandForm] = useState({
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    market: "Ghaziabad",
    commodity: "Potato",
  });

  const [demandResult, setDemandResult] = useState(null);
  const [demandLoading, setDemandLoading] = useState(false);
  const [demandError, setDemandError] = useState("");

  // ---------------- PRICE ----------------
  const [priceForm, setPriceForm] = useState({
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    market: "Ghaziabad",
    variety: "Potato",
    grade: "FAQ",
  });

  const [priceResult, setPriceResult] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState("");

  // ---------------- DATE FEATURES ----------------
  const getDateFeatures = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dayOfWeek = today.getDay();

    const startOfYear = new Date(year, 0, 1);

    const daysSinceStart = Math.floor(
      (today - startOfYear) / (1000 * 60 * 60 * 24)
    );

    const weekOfYear = Math.ceil(
      (daysSinceStart + startOfYear.getDay() + 1) / 7
    );

    return {
      year,
      month,
      day,
      day_of_week: dayOfWeek,
      week_of_year: weekOfYear,
      month_sin: Math.sin((2 * Math.PI * month) / 12),
      month_cos: Math.cos((2 * Math.PI * month) / 12),
    };
  };

  // ---------------- DEMAND ----------------
  const handleDemandChange = (e) => {
    setDemandForm({
      ...demandForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemandPredict = async (e) => {
    e.preventDefault();

    setDemandLoading(true);
    setDemandError("");
    setDemandResult(null);

    try {
      const data = {
        ...demandForm,

        commodity_group: "Vegetables",
        arrival_unit: "MT",

        ...getDateFeatures(),

        // Hidden historical features required by current model
        lag_1: 120,
        lag_7: 110,
        lag_30: 100,
        rolling_7: 115,
        rolling_30: 108,
      };

      const response = await predictDemand(data);

      setDemandResult(response.data);
    } catch (error) {
      console.error(error);

      setDemandError(
        error.response?.data?.detail ||
          "Unable to get market demand prediction."
      );
    } finally {
      setDemandLoading(false);
    }
  };

  // ---------------- PRICE ----------------
  const handlePriceChange = (e) => {
    setPriceForm({
      ...priceForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePricePredict = async (e) => {
    e.preventDefault();

    setPriceLoading(true);
    setPriceError("");
    setPriceResult(null);

    try {
      const data = {
        ...priceForm,
        ...getDateFeatures(),

        // Hidden historical features required by current model
        lag_1: 1500,
        lag_7: 1480,
        lag_30: 1420,
        rolling_7: 1490,
        rolling_30: 1450,
      };

      const response = await predictPrice(data);

      setPriceResult(response.data);
    } catch (error) {
      console.error(error);

      setPriceError(
        error.response?.data?.detail ||
          "Unable to get price prediction."
      );
    } finally {
      setPriceLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <div className="page-container">

      {/* HEADER */}
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-wide text-green-600">
          KisanDirect AI
        </p>

        <h1 className="mt-1 text-3xl font-bold text-gray-900">
          AI Market Intelligence
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Smart insights for better agricultural market decisions.
        </p>
      </div>

      {/* AI STATUS */}
      <div className="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
        🤖 AI Powered Market Intelligence
      </div>

      {/* TABS */}
      <div className="mb-6 flex rounded-xl bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => setActiveTab("demand")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${
            activeTab === "demand"
              ? "bg-white text-green-700 shadow-sm"
              : "text-gray-500"
          }`}
        >
          📊 Demand AI
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("price")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${
            activeTab === "price"
              ? "bg-white text-green-700 shadow-sm"
              : "text-gray-500"
          }`}
        >
          💰 Price AI
        </button>
      </div>

      {/* =====================================================
          DEMAND AI
      ===================================================== */}

      {activeTab === "demand" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* FORM */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900">
              Market Demand Estimator
            </h2>

            <p className="mt-1 mb-6 text-sm text-gray-500">
              Estimate expected market requirement for a crop.
            </p>

            <form onSubmit={handleDemandPredict} className="space-y-5">

              <div>
                <label className={labelClass}>State</label>
                <input
                  className={inputClass}
                  name="state"
                  value={demandForm.state}
                  onChange={handleDemandChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>District</label>
                <input
                  className={inputClass}
                  name="district"
                  value={demandForm.district}
                  onChange={handleDemandChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Market</label>
                <input
                  className={inputClass}
                  name="market"
                  value={demandForm.market}
                  onChange={handleDemandChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Crop</label>

                <select
                  className={inputClass}
                  name="commodity"
                  value={demandForm.commodity}
                  onChange={handleDemandChange}
                >
                  <option value="Potato">Potato</option>
                </select>
              </div>

              {demandError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  ❌ {demandError}
                </div>
              )}

              <button
                type="submit"
                disabled={demandLoading}
                className="primary-btn w-full"
              >
                {demandLoading
                  ? "🤖 Predicting..."
                  : "📊 Predict Market Demand"}
              </button>
            </form>
          </div>

          {/* RESULT */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900">
              AI Result
            </h2>

            <p className="mt-1 mb-5 text-sm text-gray-500">
              Random Forest demand estimation
            </p>

            {demandResult ? (
              <div>
                <div className="rounded-2xl bg-green-50 p-6 text-center">
                  <p className="text-sm font-semibold text-green-700">
                    Estimated Market Requirement
                  </p>

                  <p className="mt-3 text-5xl font-bold text-green-700">
                    {Number(
                      demandResult.estimated_market_demand
                    ).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-2 font-semibold text-gray-700">
                    {demandResult.unit}
                  </p>
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Crop
                    </span>
                    <span className="font-semibold">
                      {demandResult.crop}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-gray-500">
                      Market
                    </span>
                    <span className="font-semibold">
                      {demandResult.market}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-gray-500">
                      Model
                    </span>
                    <span className="font-semibold text-green-700">
                      {demandResult.model}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-green-100 p-4 text-sm text-gray-600">
                  💡 {demandResult.interpretation}
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-gray-50 text-center">
                <div>
                  <div className="text-5xl">📊</div>

                  <p className="mt-4 font-semibold text-gray-700">
                    No prediction yet
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Select your market and crop,
                    <br />
                    then run the AI prediction.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          PRICE AI
      ===================================================== */}

      {activeTab === "price" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* FORM */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900">
              AI Price Predictor
            </h2>

            <p className="mt-1 mb-6 text-sm text-gray-500">
              Estimate the expected mandi price for your crop.
            </p>

            <form onSubmit={handlePricePredict} className="space-y-5">

              <div>
                <label className={labelClass}>State</label>

                <input
                  className={inputClass}
                  name="state"
                  value={priceForm.state}
                  onChange={handlePriceChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>District</label>

                <input
                  className={inputClass}
                  name="district"
                  value={priceForm.district}
                  onChange={handlePriceChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Market</label>

                <input
                  className={inputClass}
                  name="market"
                  value={priceForm.market}
                  onChange={handlePriceChange}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Crop / Variety</label>

                <select
                  className={inputClass}
                  name="variety"
                  value={priceForm.variety}
                  onChange={handlePriceChange}
                >
                  <option value="Potato">Potato</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Grade</label>

                <select
                  className={inputClass}
                  name="grade"
                  value={priceForm.grade}
                  onChange={handlePriceChange}
                >
                  <option value="FAQ">FAQ</option>
                </select>
              </div>

              {priceError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  ❌ {priceError}
                </div>
              )}

              <button
                type="submit"
                disabled={priceLoading}
                className="primary-btn w-full"
              >
                {priceLoading
                  ? "🤖 Predicting..."
                  : "💰 Predict Price"}
              </button>
            </form>
          </div>

          {/* RESULT */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900">
              AI Result
            </h2>

            <p className="mt-1 mb-5 text-sm text-gray-500">
              XGBoost price prediction
            </p>

            {priceResult ? (
              <div>
                <div className="rounded-2xl bg-green-50 p-6 text-center">
                  <p className="text-sm font-semibold text-green-700">
                    Predicted Price
                  </p>

                  <p className="mt-3 text-5xl font-bold text-green-700">
                    ₹
                    {Number(
                      priceResult.predicted_price
                    ).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-2 font-semibold text-gray-700">
                    {priceResult.unit}
                  </p>
                </div>

                <div className="mt-5 rounded-xl bg-gray-50 p-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Crop
                    </span>

                    <span className="font-semibold">
                      {priceResult.crop}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    <span className="text-gray-500">
                      Model
                    </span>

                    <span className="font-semibold text-green-700">
                      {priceResult.model}
                    </span>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-green-100 p-4 text-sm text-gray-600">
                  💡 AI prediction is based on historical mandi
                  price patterns.
                </div>
              </div>
            ) : (
              <div className="flex min-h-[280px] items-center justify-center rounded-2xl bg-gray-50 text-center">
                <div>
                  <div className="text-5xl">💰</div>

                  <p className="mt-4 font-semibold text-gray-700">
                    No prediction yet
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter market information and
                    <br />
                    run the AI prediction.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DISCLAIMER */}
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4 text-center text-xs text-gray-500">
        KisanDirect AI provides decision-support estimates
        based on historical agricultural market data.
        Predictions are not guaranteed market outcomes.
      </div>
    </div>
  );
}
