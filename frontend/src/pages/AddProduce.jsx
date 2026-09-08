import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import {
  getFarmers,
  createFarmer,
  createProduct,
} from "../services/api";

export default function AddProduce() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    crop: "",
    quantity: "",
    price: "",
    location: "Ghaziabad, UP",
    harvest_date: "",
    quality: "Grade A",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Get existing farmer or create demo farmer
  const getCurrentFarmerId = async () => {
    const savedId = localStorage.getItem("kisandirect_farmer_id");

    if (savedId) {
      return Number(savedId);
    }

    const farmersResponse = await getFarmers();
    const farmers = farmersResponse.data || [];

    // If farmer already exists
    if (farmers.length > 0) {
      const farmerId = farmers[0].id;

      localStorage.setItem(
        "kisandirect_farmer_id",
        farmerId
      );

      return farmerId;
    }

    // Create demo farmer if database is empty
    const newFarmerResponse = await createFarmer({
      name: "Raj Kumar",
      phone: "9999999999",
      location: "Ghaziabad, Uttar Pradesh",
      farmer_type: "Individual Farmer",
    });

    const farmerId = newFarmerResponse.data?.farmer?.id;

    if (!farmerId) {
      throw new Error("Unable to create farmer profile.");
    }

    localStorage.setItem(
      "kisandirect_farmer_id",
      farmerId
    );

    return farmerId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.crop ||
      !form.quantity ||
      !form.price ||
      !form.harvest_date
    ) {
      setError("Please fill all required fields.");
      return;
    }

    if (Number(form.quantity) <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }

    if (Number(form.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    try {
      setLoading(true);

      // Get real farmer ID from backend
      const farmerId = await getCurrentFarmerId();

      // Create produce
      const response = await createProduct({
        farmer_id: farmerId,
        crop: form.crop,
        quantity: Number(form.quantity),
        price: Number(form.price),
        location: form.location,
        harvest_date: form.harvest_date,
        quality: form.quality,
      });

      console.log("Produce created:", response.data);

      setSuccess(
        "Produce listed successfully! Redirecting..."
      );

      setTimeout(() => {
        navigate("/marketplace");
      }, 1200);
    } catch (err) {
      console.error("Add produce error:", err);

      const message =
        err?.response?.data?.detail ||
        err?.message ||
        "Unable to list produce. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="page-container py-10">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-green-700">
              FARMER MARKETPLACE
            </p>

            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
              Add Your Produce
            </h1>

            <p className="text-slate-500 mt-2">
              List your crops directly for buyers without
              unnecessary intermediaries.
            </p>
          </div>

          <div className="card p-6 sm:p-8">

            {/* Error */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                ❌ {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                ✅ {success}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Crop */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Crop Name *
                </label>

                <select
                  name="crop"
                  value={form.crop}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select crop</option>
                  <option value="Tomato">Tomato</option>
                  <option value="Potato">Potato</option>
                  <option value="Onion">Onion</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Carrot">Carrot</option>
                  <option value="Cauliflower">
                    Cauliflower
                  </option>
                  <option value="Rice">Rice</option>
                  <option value="Sugarcane">
                    Sugarcane
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Quantity + Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Quantity (kg) *
                  </label>

                  <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="e.g. 500"
                    min="1"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Price (₹/kg) *
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    min="1"
                    step="0.01"
                    className="input-field"
                    required
                  />
                </div>

              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="e.g. Ghaziabad, UP"
                  className="input-field"
                  required
                />
              </div>

              {/* Harvest Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Harvest Date *
                </label>

                <input
                  type="date"
                  name="harvest_date"
                  value={form.harvest_date}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              {/* Quality */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Produce Quality
                </label>

                <select
                  name="quality"
                  value={form.quality}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="Grade A">Grade A</option>
                  <option value="Grade B">Grade B</option>
                  <option value="Grade C">Grade C</option>
                </select>
              </div>

              {/* Backend info */}
              <div className="rounded-xl bg-green-50 border border-green-100 p-4">
                <p className="text-sm font-semibold text-green-800">
                  🌱 Live Farmer Listing
                </p>

                <p className="text-sm text-green-700 mt-1">
                  Your produce will be saved in the KisanDirect
                  database and displayed in the live marketplace.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading
                    ? "Listing Produce..."
                    : "List Produce →"}
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate("/farmer")}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>

              </div>

            </form>
          </div>

          <p className="text-center text-xs text-slate-400 mt-5">
            KisanDirect AI • Direct Markets • Smarter Decisions •
            Stronger Farmers
          </p>

        </div>
      </main>
    </div>
  );
}
