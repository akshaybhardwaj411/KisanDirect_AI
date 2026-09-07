export default function ProductCard({
  product,
  onOrder,
  showFarmer = true,
}) {
  if (!product) return null;

  const {
    crop,
    emoji = "🌾",
    farmer,
    location,
    quantity,
    price,
    demand = "MEDIUM",
    quality = "Grade A",
  } = product;

  const demandStyles = {
    HIGH: "bg-green-50 text-green-700",
    MEDIUM: "bg-blue-50 text-blue-700",
    LOW: "bg-orange-50 text-orange-700",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-200">

      {/* Product */}
      <div className="p-6">

        <div className="flex items-start justify-between gap-3">

          <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-4xl">
            {emoji}
          </div>

          <span
            className={`text-xs font-bold px-3 py-2 rounded-full ${
              demandStyles[demand] || demandStyles.MEDIUM
            }`}
          >
            {demand} DEMAND
          </span>

        </div>

        {/* Name */}
        <h3 className="text-xl font-bold text-slate-900 mt-5">
          {crop}
        </h3>

        <p className="text-sm text-slate-500 mt-1">
          {quality}
        </p>

        {/* Details */}
        <div className="mt-5 space-y-3">

          {showFarmer && farmer && (
            <div className="flex justify-between gap-3">
              <span className="text-sm text-slate-500">
                Farmer
              </span>

              <span className="text-sm font-semibold text-slate-800 text-right">
                {farmer}
              </span>
            </div>
          )}

          {location && (
            <div className="flex justify-between gap-3">
              <span className="text-sm text-slate-500">
                Location
              </span>

              <span className="text-sm font-semibold text-slate-800 text-right">
                📍 {location}
              </span>
            </div>
          )}

          {quantity !== undefined && (
            <div className="flex justify-between gap-3">
              <span className="text-sm text-slate-500">
                Available
              </span>

              <span className="text-sm font-semibold text-slate-800">
                {Number(quantity).toLocaleString()} kg
              </span>
            </div>
          )}

        </div>

        {/* Price */}
        <div className="mt-5 pt-5 border-t border-slate-100">

          <p className="text-xs text-slate-400">
            Direct Farmer Price
          </p>

          <p className="text-2xl font-bold text-green-700 mt-1">
            ₹{price}
            <span className="text-sm text-slate-400 font-normal">
              /kg
            </span>
          </p>

        </div>

      </div>

      {/* Action */}
      {onOrder && (
        <div className="px-6 pb-6">

          <button
            onClick={() => onOrder(product)}
            className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition duration-200"
          >
            Place Order →
          </button>

        </div>
      )}

    </div>
  );
}
