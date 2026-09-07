export default function StatCard({
  title,
  value,
  subtitle,
  icon = "📊",
  trend,
  trendType = "positive",
}) {
  const trendStyles = {
    positive: "text-green-700 bg-green-50",
    negative: "text-red-700 bg-red-50",
    neutral: "text-slate-600 bg-slate-100",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition duration-200">

      {/* Top */}
      <div className="flex items-start justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
            {value}
          </h3>
        </div>

        <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl shrink-0">
          {icon}
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-4 flex items-center justify-between gap-2">

        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-400">
            {subtitle}
          </p>
        )}

        {trend && (
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              trendStyles[trendType] || trendStyles.positive
            }`}
          >
            {trend}
          </span>
        )}

      </div>

    </div>
  );
}
