import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("farmer");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!phone || !password) {
      setError("Please enter your phone number and password.");
      return;
    }

    // Demo login
    localStorage.setItem(
      "kisandirect_user",
      JSON.stringify({
        name: role === "farmer" ? "Raj Kumar" : "Demo Buyer",
        role,
        phone,
      })
    );

    if (role === "farmer") {
      navigate("/farmer");
    } else if (role === "buyer") {
      navigate("/marketplace");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Top bar */}
      <header className="bg-white border-b border-slate-200">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">

          <Link
            to="/"
            className="inline-flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center text-xl">
              🌾
            </div>

            <div>
              <h1 className="text-lg font-bold text-green-800">
                KisanDirect AI
              </h1>

              <p className="text-[10px] text-slate-400">
                Direct Markets • Smarter Decisions
              </p>
            </div>
          </Link>

        </div>

      </header>

      {/* Main */}
      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-10">

        <div className="w-full max-w-md">

          {/* Login card */}
          <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-6 sm:p-8">

            {/* Heading */}
            <div className="text-center">

              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mx-auto">
                🌾
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-5">
                Welcome Back
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Sign in to your KisanDirect AI account
              </p>

            </div>

            {/* Role */}
            <div className="mt-7">

              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Continue as
              </label>

              <div className="grid grid-cols-3 gap-2">

                <button
                  type="button"
                  onClick={() => setRole("farmer")}
                  className={`p-3 rounded-xl border text-sm font-semibold transition ${
                    role === "farmer"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  👨‍🌾
                  <span className="block mt-1">
                    Farmer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("buyer")}
                  className={`p-3 rounded-xl border text-sm font-semibold transition ${
                    role === "buyer"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  🛒
                  <span className="block mt-1">
                    Buyer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("admin")}
                  className={`p-3 rounded-xl border text-sm font-semibold transition ${
                    role === "admin"
                      ? "border-green-600 bg-green-50 text-green-700"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  🏛️
                  <span className="block mt-1">
                    Admin
                  </span>
                </button>

              </div>

            </div>

            {/* Error */}
            {error && (
              <div className="mt-5 bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 text-sm">
                ⚠️ {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6">

              {/* Phone */}
              <div>

                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter mobile number"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

              </div>

              {/* Password */}
              <div className="mt-5">

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Password recovery will be connected later.")
                    }
                    className="text-xs font-semibold text-green-700 hover:underline"
                  >
                    Forgot password?
                  </button>

                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />

              </div>

              {/* Remember */}
              <label className="flex items-center gap-2 mt-5 text-sm text-slate-500 cursor-pointer">

                <input
                  type="checkbox"
                  className="w-4 h-4 accent-green-700"
                />

                Remember me

              </label>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-700 text-white py-3.5 rounded-xl font-semibold mt-6 hover:bg-green-800 transition"
              >
                Sign In →
              </button>

            </form>

            {/* Demo credentials */}
            <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4">

              <p className="text-xs font-bold text-slate-600">
                Prototype Demo
              </p>

              <p className="text-xs text-slate-500 mt-1">
                Enter any mobile number and password to continue.
              </p>

            </div>

          </div>

          {/* Back */}
          <div className="text-center mt-5">

            <Link
              to="/"
              className="text-sm text-slate-500 hover:text-green-700"
            >
              ← Back to Home
            </Link>

          </div>

        </div>

      </main>

    </div>
  );
                }
