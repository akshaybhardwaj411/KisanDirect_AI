import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { products } from "../data/mockData";

export default function Marketplace() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredProducts = products.filter((product) => {
    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      product.crop.toLowerCase().includes(searchText) ||
      product.farmer.toLowerCase().includes(searchText);

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
    setOrderPlaced(false);
  };

  const placeOrder = (e) => {
    e.preventDefault();

    if (!selectedProduct) return;

    const quantity = Number(orderQuantity);

    if (
      !quantity ||
      quantity <= 0 ||
      quantity > selectedProduct.quantity
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
      {/* Navbar */}
      <Navbar />

      {/* Main */}
      <main className="page-container py-8">
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

        {/* AI Banner */}
        <div className="bg-green-700 text-white rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center text-xl shrink-0">
              🤖
            </div>

            <div>
              <p className="font-bold">
                AI Market Intelligence
              </p>

              <p className="text-sm text-green-100 mt-1">
                Products marked HIGH demand are currently showing
                stronger buyer interest in the selected market.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="card p-5 mb-6">
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
                  className="input-field pl-11"
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
                className="input-field bg-white"
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

        {/* Results Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Available Produce
            </h3>

            <p className="text-sm text-slate-500">
              {filteredProducts.length} listings found
            </p>
          </div>

          <Link
            to="/farmer"
            className="hidden sm:inline-flex text-sm font-semibold text-green-700 hover:underline"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Product Cards */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={openOrder}
              />
            ))}
          </div>
        ) : (
          <div className="card p-12 text-center">
            <div className="text-5xl mb-4">
              🌾
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              No produce found
            </h3>

            <p className="text-slate-500 mt-2">
              Try another crop, farmer or location.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setLocation("All Locations");
              }}
              className="mt-5 text-green-700 font-semibold hover:underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Order Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 sm:p-5 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeOrder();
            }
          }}
        >
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">
            {!orderPlaced ? (
              <>
                {/* Modal Header */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-500">
                      Place Order
                    </p>

                    <h3 className="text-2xl font-bold text-slate-900 mt-1">
                      {selectedProduct.emoji}{" "}
                      {selectedProduct.crop}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={closeOrder}
                    className="w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Product Information */}
                <div className="bg-slate-50 rounded-xl p-4 mt-5">
                  <div className="flex justify-between gap-3">
                    <span className="text-sm text-slate-500">
                      Farmer
                    </span>

                    <span className="text-sm font-semibold text-right">
                      {selectedProduct.farmer}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 mt-2">
                    <span className="text-sm text-slate-500">
                      Location
                    </span>

                    <span className="text-sm font-semibold text-right">
                      {selectedProduct.location}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 mt-2">
                    <span className="text-sm text-slate-500">
                      Quality
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedProduct.quality}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 mt-2">
                    <span className="text-sm text-slate-500">
                      Price
                    </span>

                    <span className="text-sm font-semibold text-green-700">
                      ₹{selectedProduct.price}/kg
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 mt-2">
                    <span className="text-sm text-slate-500">
                      Available
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedProduct.quantity.toLocaleString()} kg
                    </span>
                  </div>
                </div>

                {/* Order Form */}
                <form onSubmit={placeOrder}>
                  <label className="block text-sm font-semibold text-slate-700 mt-6 mb-2">
                    Order Quantity (kg)
                  </label>

                  <input
                    type="number"
                    min="1"
                    max={selectedProduct.quantity}
                    value={orderQuantity}
                    onChange={(e) =>
                      setOrderQuantity(e.target.value)
                    }
                    placeholder={`Maximum ${selectedProduct.quantity} kg`}
                    required
                    className="input-field"
                  />

                  {orderQuantity &&
                    Number(orderQuantity) >
                      selectedProduct.quantity && (
                      <p className="text-sm text-red-600 mt-2">
                        Quantity cannot exceed available stock.
                      </p>
                    )}

                  {orderQuantity &&
                    Number(orderQuantity) > 0 &&
                    Number(orderQuantity) <=
                      selectedProduct.quantity && (
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

                  <div className="flex gap-3 mt-5">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={closeOrder}
                      className="flex-1"
                    >
                      Cancel
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={
                        !orderQuantity ||
                        Number(orderQuantity) <= 0 ||
                        Number(orderQuantity) >
                          selectedProduct.quantity
                      }
                    >
                      Confirm Order
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              /* Success */
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
                    {orderQuantity} kg of{" "}
                    {selectedProduct.crop}
                  </strong>{" "}
                  has been submitted.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mt-5 text-left">
                  <div className="flex justify-between gap-3">
                    <span className="text-sm text-slate-500">
                      Farmer
                    </span>

                    <span className="text-sm font-semibold">
                      {selectedProduct.farmer}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 mt-2">
                    <span className="text-sm text-slate-500">
                      Quantity
                    </span>

                    <span className="text-sm font-semibold">
                      {orderQuantity} kg
                    </span>
                  </div>

                  <div className="flex justify-between gap-3 mt-2">
                    <span className="text-sm text-slate-500">
                      Total
                    </span>

                    <span className="text-sm font-bold text-green-700">
                      ₹{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={closeOrder}
                  className="w-full mt-5"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
