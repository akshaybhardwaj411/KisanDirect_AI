import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";

export default function AddProduce() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    crop: "",
    quantity: "",
    price: "",
    location: "",
    harvestDate: "",
    quality: "Grade A",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setTimeout(() => {
      navigate("/farmer");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="page-container py-8">
        {/* Page Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            FARMER MARKETPLACE
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            List Your Produce 🌾
          </h2>

          <p className="text-slate-500 mt-2 max-w-2xl">
            Add your produce details so buyers can discover and order
            directly.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 rounded-xl px-5 py-4">
            <p className="font-semibold">
              ✅ Produce listed successfully!
            </p>

            <p className="text-sm mt-1">
              Redirecting you to the farmer dashboard...
            </p>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8 max-w-4xl"
        >
          {/* Section */}
          <div className="mb-7">
            <h3 className="text-lg font-bold text-slate-900">
              Produce Information
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Tell buyers what you are selling.
            </p>
          </div>

          {/* Crop + Quality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Crop
              </label>

              <select
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                required
                className="input-field bg-white"
              >
                <option value="">Select crop</option>
                <option value="Tomato">🍅 Tomato</option>
                <option value="Potato">🥔 Potato</option>
                <option value="Onion">🧅 Onion</option>
                <option value="Wheat">🌾 Wheat</option>
                <option value="Rice">🌾 Rice</option>
                <option value="Carrot">🥕 Carrot</option>
                <option value="Cauliflower">🥦 Cauliflower</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quality
              </label>

              <select
                name="quality"
                value={formData.quality}
                onChange={handleChange}
                className="input-field bg-white"
              >
                <option value="Grade A">Grade A</option>
                <option value="Grade B">Grade B</option>
                <option value="Grade C">Grade C</option>
              </select>
            </div>
          </div>

          {/* Quantity + Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Quantity (kg)
              </label>

              <div className="relative">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  min="1"
                  step="1"
                  placeholder="e.g. 500"
                  required
                  className="input-field pr-14"
                />

                <span className="absolute right-4 top-3.5 text-sm text-slate-400">
                  kg
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Expected Price (₹/kg)
              </label>

              <div className="relative">
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="1"
                  step="0.01"
                  placeholder="e.g. 30"
                  required
                  className="input-field pr-16"
                />

                <span className="absolute right-4 top-3.5 text-sm text-slate-400">
                  ₹/kg
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="mt-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Pickup / Farm Location
            </label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Ghaziabad, Uttar Pradesh"
              required
              className="input-field"
            />

            <p className="text-xs text-slate-400 mt-2">
              This helps us match your produce with nearby buyers and
              optimize logistics.
            </p>
          </div>

          {/* Harvest Date */}
          <div className="mt-5">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Expected Harvest / Ready Date
            </label>

            <input
              type="date"
              name="harvestDate"
              value={formData.harvestDate}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          {/* AI Box */}
          <div className="mt-7 bg-green-50 border border-green-200 rounded-xl p-5">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-xl shrink-0">
                🤖
              </div>

              <div>
                <h4 className="font-bold text-green-900">
                  AI Market Intelligence
                </h4>

                <p className="text-sm text-green-800 mt-1">
                  After listing, KisanDirect AI can analyze demand,
                  market signals and location data to provide price
                  and demand insights.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              type="submit"
              disabled={submitted}
              className="flex-1"
            >
              {submitted ? "Listing Produce..." : "🌾 List Produce"}
            </Button>

            <Link
              to="/farmer"
              className="sm:w-40 inline-flex items-center justify-center border border-slate-300 text-slate-700 py-3.5 rounded-xl font-semibold text-center hover:bg-slate-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Trust Note */}
        <div className="max-w-4xl text-center mt-6">
          <p className="text-xs text-slate-400">
            Your produce details are used only to facilitate marketplace
            matching and logistics.
          </p>
        </div>

        {/* Prototype Notice */}
        <div className="max-w-4xl mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <p className="text-xs text-amber-800">
            <strong>Prototype:</strong> Submitted produce is currently
            handled in frontend demo state. Persistent marketplace
            listings will be connected to the backend later.
          </p>
        </div>
      </main>
    </div>
  );
}
