import { useState } from "react";
import { predictDemand, predictPrice } from "../services/api";

export default function AIInsights() {
  // =========================================================
  // COMMON STATE
  // =========================================================

  const [activeTab, setActiveTab] = useState("demand");

  // =========================================================
  // DEMAND FORM
  // =========================================================

  const [demandForm, setDemandForm] = useState({
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    market: "Ghaziabad",
    commodity_group: "Vegetables",
    commodity: "Potato",
    arrival_unit: "MT",
    lag_1: 120,
    lag_7: 110,
    lag_30: 100,
    rolling_7: 115,
    rolling_30: 108,
  });

  const [demandPrediction, setDemandPrediction] = useState(null);
  const [demandLoading, setDemandLoading] = useState(false);
  const [demandError, setDemandError] = useState("");

  // =========================================================
  // PRICE FORM
  // =========================================================

  const [priceForm, setPriceForm] = useState({
    state: "Uttar Pradesh",
    district: "Ghaziabad",
    market: "Ghaziabad",
    variety: "Potato",
    grade: "FAQ",
    lag_1: 1500,
    lag_7: 1480,
    lag_30: 1420,
    rolling_7: 1490,
    rolling_30: 1450,
  });

  const [pricePrediction, setPricePrediction] = useState(null);
  const [priceLoading, setPriceLoading] = useState(false);
  const [priceError, setPriceError] = useState("");

  // =========================================================
  // DATE FEATURES
  // =========================================================

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

    const monthSin = Math.sin((2 * Math.PI * month) / 12);
    const monthCos = Math.cos((2 * Math.PI * month) / 12);

    return {
      year,
      month,
      day,
      day_of_week: dayOfWeek,
      week_of_year: weekOfYear,
      month_sin: monthSin,
      month_cos: monthCos,
    };
  };

  // =========================================================
  // HANDLE DEMAND INPUT
  // =========================================================

  const handleDemandChange = (e) => {
    const { name, value } = e.target;

    setDemandForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // HANDLE PRICE INPUT
  // =========================================================

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    setPriceForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // DEMAND PREDICTION
  // =========================================================

  const handleDemandPredict = async (e) => {
    e.preventDefault();

    setDemandLoading(true);
    setDemandError("");
    setDemandPrediction(null);

    try {
      const dateFeatures = getDateFeatures();

      const requestData = {
        state: demandForm.state,
        district: demandForm.district,
        market: demandForm.market,
        commodity_group: demandForm.commodity_group,
        commodity: demandForm.commodity,
        arrival_unit: demandForm.arrival_unit,

        ...dateFeatures,

        lag_1: Number(demandForm.lag_1),
        lag_7: Number(demandForm.lag_7),
        lag_30: Number(demandForm.lag_30),
        rolling_7: Number(demandForm.rolling_7),
        rolling_30: Number(demandForm.rolling_30),
      };

      const response = await predictDemand(requestData);

      setDemandPrediction(response.data);
    } catch (err) {
      console.error(err);

      setDemandError(
        err.response?.data?.detail ||
          "Unable to get AI demand prediction."
      );
    } finally {
      setDemandLoading(false);
    }
  };

  // =========================================================
  // PRICE PREDICTION
  // =========================================================

  const handlePricePredict = async (e) => {
    e.preventDefault();

    setPriceLoading(true);
    setPriceError("");
    setPricePrediction(null);

    try {
      const dateFeatures = getDateFeatures();

      const requestData = {
        state: priceForm.state,
        district: priceForm.district,
        market: priceForm.market,
        variety: priceForm.variety,
        grade: priceForm.grade,

        ...dateFeatures,

        lag_1: Number(priceForm.lag_1),
        lag_7: Number(priceForm.lag_7),
        lag_30: Number(priceForm.lag_30),
        rolling_7: Number(priceForm.rolling_7),
        rolling_30: Number(priceForm.rolling_30),
      };

      const response = await predictPrice(requestData);

      setPricePrediction(response.data);
    } catch (err) {
      console.error(err);

      setPriceError(
        err.response?.data?.detail ||
          "Unable to get AI price prediction."
      );
    } finally {
      setPriceLoading(false);
    }
  };

  // =========================================================
  // REUSABLE INPUT CLASS
  // =========================================================

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-700";

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="page-container">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
              KisanDirect AI
            </p>

            <h1 className="text-3xl font-bold text-gray-900">
              AI Market Intelligence
            </h1>

            <p className="mt-2 max-w-2xl text-gray-600">
              Use AI to estimate market requirement and predict
              agricultural prices using historical mandi data.
            </p>
          </div>

          <div className="rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
            🤖 AI Powered
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="mb-8 flex w-full max-w-md rounded-xl bg-gray-100 p-1">
        <button
          onClick={() => setActiveTab("demand")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${
            activeTab === "demand"
              ? "bg-white text-green-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          📊 Demand AI
        </button>

        <button
          onClick={() => setActiveTab("price")}
          className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition ${
            activeTab === "price"
              ? "bg-white text-green-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          💰 Price AI
        </button>
      </div>

      {/* =====================================================
          DEMAND AI
      ====================================================== */}

      {activeTab === "demand" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* FORM */}
          <div className="card xl:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Market Demand Estimator
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Estimate expected market requirement from
                historical mandi arrival patterns.
              </p>
            </div>

            <form onSubmit={handleDemandPredict}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* STATE */}
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

                {/* DISTRICT */}
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

                {/* MARKET */}
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

                {/* CROP */}
                <div>
                  <label className={labelClass}>Commodity</label>

                  <select
                    className={inputClass}
                    name="commodity"
                    value={demandForm.commodity}
                    onChange={handleDemandChange}
                  >
                    <option value="Potato">Potato</option>
                  </select>
                </div>

                {/* GROUP */}
                <div>
                  <label className={labelClass}>
                    Commodity Group
                  </label>

                  <input
                    className={inputClass}
                    name="commodity_group"
                    value={demandForm.commodity_group}
                    onChange={handleDemandChange}
                    required
                  />
                </div>

                {/* UNIT */}
                <div>
                  <label className={labelClass}>
                    Arrival Unit
                  </label>

                  <select
                    className={inputClass}
                    name="arrival_unit"
                    value={demandForm.arrival_unit}
                    onChange={handleDemandChange}
                  >
                    <option value="MT">MT</option>
                  </select>
                </div>

                {/* LAG 1 */}
                <div>
                  <label className={labelClass}>
                    Previous Arrival (Lag 1)
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="lag_1"
                    value={demandForm.lag_1}
                    onChange={handleDemandChange}
                    required
                  />
                </div>

                {/* LAG 7 */}
                <div>
                  <label className={labelClass}>
                    Previous 7 Observation
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="lag_7"
                    value={demandForm.lag_7}
                    onChange={handleDemandChange}
                    required
                  />
                </div>

                {/* LAG 30 */}
                <div>
                  <label className={labelClass}>
                    Previous 30 Observation
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="lag_30"
                    value={demandForm.lag_30}
                    onChange={handleDemandChange}
                    required
                  />
                </div>

                {/* ROLLING 7 */}
                <div>
                  <label className={labelClass}>
                    7-Observation Average
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="rolling_7"
                    value={demandForm.rolling_7}
                    onChange={handleDemandChange}
                    required
                  />
                </div>

                {/* ROLLING 30 */}
                <div>
                  <label className={labelClass}>
                    30-Observation Average
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="rolling_30"
                    value={demandForm.rolling_30}
                    onChange={handleDemandChange}
                    required
                  />
                </div>
              </div>

              {/* ERROR */}
              {demandError && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  ❌ {demandError}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={demandLoading}
                className="primary-btn mt-6 w-full md:w-auto"
              >
                {demandLoading
                  ? "🤖 Predicting..."
                  : "🚀 Predict Market Demand"}
              </button>
            </form>
          </div>

          {/* RESULT */}
          <div className="card flex flex-col">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                AI Result
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Random Forest prediction
              </p>
            </div>

            {demandPrediction ? (
              <div className="flex flex-1 flex-col">
                <div className="rounded-2xl bg-green-50 p-6 text-center">
                  <p className="text-sm font-medium text-green-700">
                    Estimated Market Requirement
                  </p>

                  <p className="mt-3 text-5xl font-bold text-green-700">
                    {Number(
                      demandPrediction.estimated_market_demand
                    ).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-2 text-lg font-semibold text-gray-700">
                    {demandPrediction.unit}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                    <span className="text-gray-500">
                      Crop
                    </span>

                    <span className="font-semibold text-gray-900">
                      {demandPrediction.crop}
                    </span>
                  </div>

                  <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                    <span className="text-gray-500">
                      Market
                    </span>

                    <span className="font-semibold text-gray-900">
                      {demandPrediction.market}
                    </span>
                  </div>

                  <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                    <span className="text-gray-500">
                      Model
                    </span>

                    <span className="font-semibold text-green-700">
                      {demandPrediction.model}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-5">
                  <div className="rounded-xl border border-green-100 bg-white p-4 text-sm text-gray-600">
                    💡 {demandPrediction.interpretation}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-2xl bg-gray-50 p-8 text-center">
                <div>
                  <div className="mb-4 text-5xl">📊</div>

                  <p className="font-semibold text-gray-700">
                    No prediction yet
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter market information and click
                    <br />
                    <span className="font-medium">
                      Predict Market Demand
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================
          PRICE AI
      ====================================================== */}

      {activeTab === "price" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {/* FORM */}
          <div className="card xl:col-span-2">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                AI Price Predictor
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Predict the next observed mandi price using
                historical price patterns.
              </p>
            </div>

            <form onSubmit={handlePricePredict}>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* STATE */}
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

                {/* DISTRICT */}
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

                {/* MARKET */}
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

                {/* VARIETY */}
                <div>
                  <label className={labelClass}>Variety</label>

                  <input
                    className={inputClass}
                    name="variety"
                    value={priceForm.variety}
                    onChange={handlePriceChange}
                    required
                  />
                </div>

                {/* GRADE */}
                <div>
                  <label className={labelClass}>Grade</label>

                  <input
                    className={inputClass}
                    name="grade"
                    value={priceForm.grade}
                    onChange={handlePriceChange}
                    required
                  />
                </div>

                {/* LAG 1 */}
                <div>
                  <label className={labelClass}>
                    Previous Price
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="lag_1"
                    value={priceForm.lag_1}
                    onChange={handlePriceChange}
                    required
                  />
                </div>

                {/* LAG 7 */}
                <div>
                  <label className={labelClass}>
                    7-Observation Lag
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="lag_7"
                    value={priceForm.lag_7}
                    onChange={handlePriceChange}
                    required
                  />
                </div>

                {/* LAG 30 */}
                <div>
                  <label className={labelClass}>
                    30-Observation Lag
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="lag_30"
                    value={priceForm.lag_30}
                    onChange={handlePriceChange}
                    required
                  />
                </div>

                {/* ROLLING 7 */}
                <div>
                  <label className={labelClass}>
                    7-Observation Average
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="rolling_7"
                    value={priceForm.rolling_7}
                    onChange={handlePriceChange}
                    required
                  />
                </div>

                {/* ROLLING 30 */}
                <div>
                  <label className={labelClass}>
                    30-Observation Average
                  </label>

                  <input
                    className={inputClass}
                    type="number"
                    step="0.01"
                    name="rolling_30"
                    value={priceForm.rolling_30}
                    onChange={handlePriceChange}
                    required
                  />
                </div>
              </div>

              {/* ERROR */}
              {priceError && (
                <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  ❌ {priceError}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={priceLoading}
                className="primary-btn mt-6 w-full md:w-auto"
              >
                {priceLoading
                  ? "🤖 Predicting..."
                  : "💰 Predict Price"}
              </button>
            </form>
          </div>

          {/* RESULT */}
          <div className="card flex flex-col">
            <div className="mb-5">
              <h2 className="text-xl font-bold text-gray-900">
                AI Result
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                XGBoost prediction
              </p>
            </div>

            {pricePrediction ? (
              <div className="flex flex-1 flex-col">
                <div className="rounded-2xl bg-green-50 p-6 text-center">
                  <p className="text-sm font-medium text-green-700">
                    Predicted Price
                  </p>

                  <p className="mt-3 text-5xl font-bold text-green-700">
                    ₹
                    {Number(
                      pricePrediction.predicted_price
                    ).toLocaleString("en-IN", {
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="mt-2 text-lg font-semibold text-gray-700">
                    {pricePrediction.unit}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                    <span className="text-gray-500">
                      Crop
                    </span>

                    <span className="font-semibold text-gray-900">
                      {pricePrediction.crop}
                    </span>
                  </div>

                  <div className="flex justify-between rounded-xl bg-gray-50 p-3">
                    <span className="text-gray-500">
                      Model
                    </span>

                    <span className="font-semibold text-green-700">
                      {pricePrediction.model}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-5">
                  <div className="rounded-xl border border-green-100 bg-white p-4 text-sm text-gray-600">
                    💡 AI prediction is based on historical
                    mandi price patterns and supplied market
                    features.
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-2xl bg-gray-50 p-8 text-center">
                <div>
                  <div className="mb-4 text-5xl">💰</div>

                  <p className="font-semibold text-gray-700">
                    No prediction yet
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter price information and click
                    <br />
                    <span className="font-medium">
                      Predict Price
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTNOTE */}
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-4 text-center text-xs text-gray-500">
        KisanDirect AI uses historical agricultural market
        data to generate decision-support estimates. AI
        predictions should be used as guidance, not as a
        guaranteed market outcome.
      </div>
    </div>
  );
}
