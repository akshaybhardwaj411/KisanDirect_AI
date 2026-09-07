import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-green-700 rounded-xl flex items-center justify-center text-xl">
              🌾
            </div>

            <div>
              <h1 className="text-lg font-bold text-green-800 leading-tight">
                KisanDirect AI
              </h1>

              <p className="hidden sm:block text-[10px] text-slate-400">
                Direct Markets • Smarter Decisions
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">

            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                isActive("/")
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/marketplace"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                isActive("/marketplace")
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Marketplace
            </Link>

            <Link
              to="/farmer"
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                isActive("/farmer")
                  ? "bg-green-50 text-green-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              Dashboard
            </Link>

          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">

            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-slate-600 hover:text-green-700 transition"
            >
              Login
            </Link>

            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center bg-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-800 transition"
            >
              Explore Market
            </Link>

          </div>

        </div>

      </div>
    </nav>
  );
}
