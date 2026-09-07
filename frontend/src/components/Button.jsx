export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  disabled = false,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center px-5 py-3 rounded-xl font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-green-700 text-white hover:bg-green-800 focus:ring-green-500",

    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-slate-400",

    danger:
      "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",

    ghost:
      "text-slate-600 hover:bg-slate-100 focus:ring-slate-400",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {children}
    </button>
  );
}
