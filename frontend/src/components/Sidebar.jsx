import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    path: "/farmer",
    icon: "📊",
  },
  {
    label: "Add Produce",
    path: "/farmer/add-produce",
    icon: "➕",
  },
  {
    label: "AI Insights",
    path: "/farmer/ai-insights",
    icon: "🤖",
  },
  {
    label: "Marketplace",
    path: "/marketplace",
    icon: "🛒",
  },
  {
    label: "Orders",
    path: "/farmer/orders",
    icon: "📦",
  },
  {
    label: "Logistics",
    path: "/logistics",
    icon: "🚚",
  },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-slate-200 min-h-screen">

      {/* Profile / Brand */}
      <div className="p-5 border-b border-slate-100">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 bg-green-100 rounded-xl flex items-center justify-center text-xl">
            👨‍🌾
          </div>

          <div className="min-w-0">
            <p className="font-bold text-slate-900 truncate">
              Farmer Account
            </p>

            <p className="text-xs text-slate-400 truncate">
              Raj Kumar
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}
      <nav className="p-4">

        <p className="px-3 mb-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
          Main Menu
        </p>

        <div className="space-y-1">

          {menuItems.map((item) => (

            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              end={item.path === "/farmer"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-green-700"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>
            </NavLink>

          ))}

        </div>

      </nav>

      {/* Bottom */}
      <div className="px-4 mt-4">

        <div className="border-t border-slate-100 pt-4">

          <p className="px-3 mb-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            Account
          </p>

          <button
            type="button"
            onClick={() => alert("Settings module will be available soon.")}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            <span className="text-lg">
              ⚙️
            </span>

            Settings
          </button>

          <button
            type="button"
            onClick={() => alert("Logout will be connected to authentication later.")}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
          >
            <span className="text-lg">
              🚪
            </span>

            Logout
          </button>

        </div>

      </div>

      {/* AI status */}
      <div className="p-4 mt-6">

        <div className="bg-green-50 border border-green-100 rounded-xl p-4">

          <div className="flex items-center gap-2">

            <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />

            <p className="text-sm font-bold text-green-800">
              AI Engine Online
            </p>

          </div>

          <p className="text-xs text-green-700 mt-2">
            Demand and market intelligence is available.
          </p>

        </div>

      </div>

    </aside>
  );
}
