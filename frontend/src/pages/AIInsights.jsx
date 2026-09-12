import { useState } from "react";
import { predictPrice } from "../services/api";

export default function AIInsights() {
  const [form, setForm] = useState({
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

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePredict = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const today = new Date();

      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const dayOfWeek = today.getDay();

      // ISO-like week calculation
      const startOfYear = new Date(year, 0, 1);
      const daysSinceStart =
        Math.floor(
          (today - startOfYear) / (1000 * 60 * 60 * 24)
        );

      const weekOfYear = Math.ceil(
        (daysSinceStart + startOfYear.getDay() + 1) / 7
      );

      // Same seasonal features used during training
      const monthSin = Math.sin(
        (2 * Math.PI * month) / 12
      );

      const monthCos = Math.cos(
        (2 * Math.PI * month) / 12
      );

      const requestData = {
        state: form.state,
        district: form.district,
        market: form.market,
        variety: form.variety,
        grade: form.grade,

        year,
        month,
        day,
        day_of_week: dayOfWeek,
        week_of_year: weekOfYear,

        month_sin: monthSin,
        month_cos: monthCos,

        lag_1: Number(form.lag_1),
        lag_7: Number(form.lag_7),
        lag_30: Number(form.lag_30),

        rolling_7: Number(form.rolling_7),
        rolling_30: Number(form.rolling_30),
      };

      const response = await predictPrice(requestData);

      setPrediction(response.data);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.detail ||
          "Unable to get AI price prediction."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-700">
          AI Price Intelligence
        </h1>

        <p className="mt-2 text-gray-600">
          Get an AI-based potato price prediction using
          historical market data.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Input Card */}
        <div className="card">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Market Information
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Enter market and recent price information.
            </p>
          </div>

          <form onSubmit={handlePredict} className="space-y-4">

            {/* State */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                State
              </label>

              <input
                className="input-field"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
              />
            </div>

            {/* District */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                District
              </label>

              <input
                className="input-field"
                name="district"
                value={form.district}
                onChange={handleChange}
                required
              />
            </div>

            {/* Market */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Market
              </label>

              <input
                className="input-field"
                name="market"
                value={form.market}
                onChange={handleChange}
                required
              />
            </div>

            {/* Variety */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Potato Variety
              </label>

              <input
                className="input-field"
                name="variety"
                value={form.variety}
                onChange={handleChange}
                required
              />
            </div>

            {/* Grade */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Grade
              </label>

              <input
                className="input-field"
                name="grade"
                value={form.grade}
                onChange={handleChange}
                required
              />
            </div>

            <div className="border-t pt-4">
              <h3 className="mb-3 font-semibold">
                Recent Price History
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1 block text-sm">
                    Latest Price
                  </label>

                  <input
                    type="number"
                    className="input-field"
                    name="lag_1"
                    value={form.lag_1}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm">
                    Price 7 Records Ago
                  </label>

                  <input
                    type="number"
                    className="input-field"
                    name="lag_7"
                    value={form.lag_7}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm">
                    Price 30 Records Ago
                  </label>

                  <input
                    type="number"
                    className="input-field"
                    name="lag_30"
                    value={form.lag_30}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm">
                    7-Record Average
                  </label>

                  <input
                    type="number"
                    className="input-field"
                    name="rolling_7"
                    value={form.rolling_7}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm">
                    30-Record Average
                  </label>

                  <input
                    type="number"
                    className="input-field"
                    name="rolling_30"
                    value={form.rolling_30}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>

              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
                ❌ {error}
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="primary-btn w-full disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "🤖 AI is predicting..."
                : "🔮 Predict Potato Price"}
            </button>

          </form>
        </div>

        {/* Result Card */}
        <div className="card flex min-h-[400px] flex-col justify-center">

          {!prediction && !loading && (
            <div className="text-center">

              <div className="mb-4 text-6xl">
                🤖
              </div>

              <h2 className="text-2xl font-bold">
                AI Price Prediction
              </h2>

              <p className="mx-auto mt-2 max-w-md text-gray-500">
                Enter market information and recent prices,
                then let our XGBoost model estimate the
                potato price.
              </p>

              <div className="mt-6 rounded-xl bg-green-50 p-4">
                <p className="text-sm text-green-700">
                  Model: <strong>XGBoost</strong>
                </p>

                <p className="mt-1 text-sm text-green-700">
                  Trained on historical agricultural market
                  price data.
                </p>
              </div>

            </div>
          )}

          {loading && (
            <div className="text-center">

              <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

              <h2 className="text-xl font-semibold">
                AI is analyzing market data...
              </h2>

              <p className="mt-2 text-gray-500">
                Please wait while XGBoost generates the
                prediction.
              </p>

            </div>
          )}

          {prediction && !loading && (
            <div className="text-center">

              <div className="mb-3 text-5xl">
                📈
              </div>

              <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Predicted Potato Price
              </p>

              <div className="mt-3 text-5xl font-bold text-green-700">
                ₹{Number(
                  prediction.predicted_price
                ).toLocaleString("en-IN")}
              </div>

              <p className="mt-2 text-gray-500">
                per quintal
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-green-50 p-4">
                  <p className="text-xs text-gray-500">
                    Crop
                  </p>

                  <p className="mt-1 font-semibold text-green-700">
                    {prediction.crop}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <p className="text-xs text-gray-500">
                    AI Model
                  </p>

                  <p className="mt-1 font-semibold text-blue-700">
                    {prediction.model}
                  </p>
                </div>

              </div>

              <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-left">

                <p className="font-semibold text-green-800">
                  💡 AI Market Insight
                </p>

                <p className="mt-1 text-sm text-green-700">
                  Based on the provided recent market prices,
                  the model estimates approximately{" "}
                  <strong>
                    ₹
                    {Number(
                      prediction.predicted_price
                    ).toLocaleString("en-IN")}
                  </strong>{" "}
                  per quintal.
                </p>

              </div>

              <button
                onClick={() => setPrediction(null)}
                className="secondary-btn mt-6"
              >
                Make Another Prediction
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        ⚠️ <strong>Note:</strong> This is an AI-generated
        price estimate based on historical market patterns.
        Actual market prices may vary depending on supply,
        demand, quality, weather and local conditions.
      </div>
    </div>
  );
}
