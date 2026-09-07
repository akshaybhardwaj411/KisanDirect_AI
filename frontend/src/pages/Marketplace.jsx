import { useState } from "react";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    crop: "Tomato",
    emoji: "🍅",
    farmer: "Raj Kumar",
    location: "Ghaziabad, UP",
    quantity: 500,
    price: 30,
    demand: "HIGH",
    quality: "Grade A",
  },
  {
    id: 2,
    crop: "Potato",
    emoji: "🥔",
    farmer: "Suresh Kumar",
    location: "Meerut, UP",
    quantity: 800,
    price: 24,
    demand: "HIGH",
    quality: "Grade A",
  },
  {
    id: 3,
    crop: "Onion",
    emoji: "🧅",
    farmer: "Amit Singh",
    location: "Bulandshahr, UP",
    quantity: 650,
    price: 28,
    demand: "MEDIUM",
    quality: "Grade A",
  },
  {
    id: 4,
    crop: "Wheat",
    emoji: "🌾",
    farmer: "Vikas Sharma",
    location: "Muzaffarnagar, UP",
    quantity: 1200,
    price: 27,
    demand: "MEDIUM",
    quality: "Grade A",
  },
  {
    id: 5,
    crop: "Carrot",
    emoji: "🥕",
    farmer: "Rohit Kumar",
    location: "Noida, UP",
    quantity: 400,
    price: 32,
    demand: "HIGH",
    quality: "Grade A",
  },
  {
    id: 6,
    crop: "Cauliflower",
    emoji: "🥦",
    farmer: "Deepak Singh",
    location: "Hapur, UP",
    quantity: 350,
    price: 26,
    demand: "MEDIUM",
    quality: "Grade B",
  },
];

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.crop.toLowerCase().includes(search.toLowerCase()) ||
      product.farmer.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "All Locations" ||
      product.location.includes(location);

    return matchesSearch && matchesLocation;
  });

  const openOrder = (product) => {
    setSelectedProduct(product);
    setOrderQuantity("");
    setOrderPlaced(false);
  };

  const closeOrder = () => {
    setSelectedProduct(null);
    setOrderQuantity("");
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (
      !orderQuantity ||
      Number(orderQuantity) <= 0 ||
      Number(orderQuantity) > selectedProduct.quantity
    ) {
      return;
    }

    setOrderPlaced(true);
  };

  const totalAmount =
    selectedProduct && orderQuantity
      ? Number(orderQuantity) * selectedProduct.price
      : 0;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold text-green-800">
              KisanDirect AI
            </h1>

            <p className="text-sm text-slate-500">
              Direct Farmer Marketplace
            </p>
          </div>

          <Link
            to="/farmer"
            className="text-sm font-semibold text-green-700 hover:underline"
          >
            ← Dashboard
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Heading */}
        <div className="mb-7">
          <p className="text-sm font-semibold text-green-700">
            DIRECT MARKETPLACE
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-1">
            Buy Directly From Farmers 🛒
          </h2>

          <p className="text-slate-500 mt-2">
            Discover fresh produce directly from farmers and FPOs.
          </p>
        </div>

        {/* AI banner */}
        <div className="bg-green-700 text-white rounded-2xl p-5 mb-6">

          <div className="flex items-start gap-4">

            <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center text-xl">
              🤖
            </div>

            <div>
              <p className="font-bold">
                AI Market Intelligence
              </p>

              <p className="text-sm text-green-100 mt-1">
                Products marked HIGH demand are currently showing stronger
                buyer interest in the selected market.
              </p>
            </div>

          </div>

        </div>

        {/* Search & Filters */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Search */}
            <div className="md:col-span-2">

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Search Produce
              </label>

              <div className="relative">

                <span className="absolute left-4 top-3.5">
                  🔍
                </span>

                <input
                  type="text"
                  placeholder="Search tomato, potato, farmer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500"
                />

              </div>

            </div>

            {/* Location */}
            <div>

              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Location
              </label>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white outline-none focus:ring-2 focus:ring-green-500"
              >
                <option>All Locations</option>
                <option>Ghaziabad</option>
                <option>Meerut</option>
                <option>Bulandshahr</option>
                <option>Muzaffarnagar</option>
                <option>Noida</option>
                <option>Hapur</option>
              </select>

            </div>

          </div>

        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-4">

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Available Produce
            </h3>

            <p className="text-sm text-slate-500">
              {filteredProducts.length} listings found
            </p>
          </div>

        </div>

        {/* Product Cards */}
        {filteredProducts.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {filteredProducts.map((product) => (

              <div
                key={product.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md transition"
              >

                {/* Product top */}
                <div className="p-6">

                  <div className="flex items-start justify-between">

                    <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-4xl">
                      {product.emoji}
                    </div>

                    <span
                      className={`text-xs font-bold px-3 py-2 rounded-full ${
                        product.demand === "HIGH"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {product.demand} DEMAND
                    </span>

                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mt-5">
                    {product.crop}
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {product.quality}
                  </p>

                  {/* Farmer */}
                  <div className="mt-5 space-y-3">

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Farmer
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {product.farmer}
                      </span>
                    </div>

                    <div className="flex justify-between gap-3">
                      <span className="text-sm text-slate-500">
                        Location
                      </span>

                      <span className="text-sm font-semibold text-slate-800 text-right">
                        📍 {product.location}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm text-slate-500">
                        Available
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {product.quantity} kg
                      </span>
                    </div>

                  </div>

                  {/* Price */}
                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-end justify-between">

                    <div>
                      <p className="text-xs text-slate-400">
                        Direct Farmer Price
                      </p>

                      <p className="text-2xl font-bold text-green-700">
                        ₹{product.price}
                        <span className="text-sm text-slate-400 font-normal">
                          /kg
                        </span>
                      </p>
                    </div>

                  </div>

                </div>

                {/* Button */}
                <div className="px-6 pb-6">

                  <button
                    onClick={() => openOrder(product)}
                    className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold hover:bg-green-800 transition"
                  >
                    Place Order →
                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">

            <div className="text-5xl mb-4">
              🌾
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No produce found
            </h3>

            <p className="text-slate-500 mt-2">
              Try another crop or location.
            </p>

          </div>

        )}

      </main>

      {/* Order Modal */}
      {selectedProduct && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-5 z-50">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6">

            {!orderPlaced ? (

              <>
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm text-slate-500">
                      Place Order
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      {selectedProduct.emoji} {selectedProduct.crop}
                    </h3>
                  </div>

                  <button
                    onClick={closeOrder}
                    className="text-slate-400 hover:text-slate-700 text-xl"
                  >
                    ✕
                  </button>

                </div>

                <div className="bg-slate-50 rounded-xl p-4 mt-5">

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Farmer
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedProduct.farmer}
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-500">
                      Price
                    </span>

                    <span className="text-sm font-semibold text-green-700">
                      ₹{selectedProduct.price}/kg
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-500">
                      Available
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedProduct.quantity} kg
                    </span>
                  </div>

                </div>

                <form onSubmit={placeOrder}>

                  <label className="block text-sm font-semibold text-slate-700 mt-6 mb-2">
                    Order Quantity (kg)
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.quantity}
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(e.target.value)}
                    placeholder={`Maximum ${selectedProduct.quantity} kg`}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 outline-none focus:ring-2 focus:ring-green-500"
                  />

                  {orderQuantity && (
                    <div className="mt-4 p-4 bg-green-50 rounded-xl">

                      <div className="flex justify-between">

                        <span className="text-sm text-green-800">
                          Estimated Total
                        </span>

                        <span className="font-bold text-green-800">
                          ₹{totalAmount.toLocaleString()}
                        </span>

                      </div>

                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-green-700 text-white py-3.5 rounded-xl font-semibold mt-5 hover:bg-green-800 transition"
                  >
                    Confirm Order
                  </button>

                </form>
              </>

            ) : (

              <div className="text-center py-6">

                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✓
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mt-5">
                  Order Placed!
                </h3>

                <p className="text-slate-500 mt-2">
                  Your order for{" "}
                  <strong>
                    {orderQuantity} kg of {selectedProduct.crop}
                  </strong>{" "}
                  has been submitted.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mt-5 text-left">

                  <div className="flex justify-between">
                    <span className="text-sm text-slate-500">
                      Farmer
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedProduct.farmer}
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-500">
                      Quantity
                    </span>

                    <span className="text-sm font-semibold">
                      {orderQuantity} kg
                    </span>
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-slate-500">
                      Total
                    </span>

                    <span className="text-sm font-bold text-green-700">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>

                </div>

                <button
                  onClick={closeOrder}
                  className="w-full bg-green-700 text-white py-3 rounded-xl font-semibold mt-5 hover:bg-green-800"
                >
                  Continue Shopping
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
      }
