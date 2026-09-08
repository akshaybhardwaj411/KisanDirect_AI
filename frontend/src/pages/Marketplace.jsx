import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Button from "../components/Button";
import { products as mockProducts } from "../data/mockData";
import { getProducts, createOrder } from "../services/api";

export default function Marketplace() {
  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(true);
  const [apiConnected, setApiConnected] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerLocation, setBuyerLocation] = useState("");

  const [ordering, setOrdering] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  // Load products from live backend
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProducts();

        const backendProducts = response.data || [];

        if (backendProducts.length > 0) {
          const formattedProducts = backendProducts.map((product) => ({
            id: String(product.id),
            crop: product.crop,
            emoji: getCropEmoji(product.crop),
            farmer: `Farmer #${product.farmer_id}`,
            location: product.location,
            quantity: product.quantity,
            price: product.price,
            quality: product.quality,
            demand: "MEDIUM",
            harvestDate: product.harvest_date,
          }));

          setProducts(formattedProducts);
        } else {
          setProducts([]);
        }

        setApiConnected(true);
      } catch (err) {
        console.error("Failed to load products:", err);

        setApiConnected(false);
        setError(
          "Live marketplace unavailable. Showing demo marketplace data."
        );

        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(products.map((product) => product.location)),
    ];

    return ["All", ...uniqueLocations];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.crop
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesLocation =
        location === "All" || product.location === location;

      return matchesSearch && matchesLocation;
    });
  }, [products, search, location]);

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setQuantity("");
    setBuyerName("");
    setBuyerPhone("");
    setBuyerLocation("");
    setOrderSuccess(null);
  };

  const closeOrderModal = () => {
    if (!ordering) {
      setSelectedProduct(null);
      setOrderSuccess(null);
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!selectedProduct) return;

    const requestedQuantity = Number(quantity);

    if (!buyerName.trim()) {
      alert("Please enter buyer name.");
      return;
    }

    if (!buyerPhone.trim()) {
      alert("Please enter buyer phone.");
      return;
    }

    if (!buyerLocation.trim()) {
      alert("Please enter buyer location.");
      return;
    }

    if (!requestedQuantity || requestedQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (requestedQuantity > Number(selectedProduct.quantity)) {
      alert("Requested quantity exceeds available produce.");
      return;
    }

    try {
      setOrdering(true);

      const response = await createOrder({
        produce_id: Number(selectedProduct.id),
        buyer_name: buyerName.trim(),
        buyer_phone: buyerPhone.trim(),
        buyer_location: buyerLocation.trim(),
        quantity: requestedQuantity,
      });

      setOrderSuccess(response.data);

      // Update displayed stock immediately
      setProducts((previousProducts) =>
        previousProducts
          .map((product) => {
            if (String(product.id) !== String(selectedProduct.id)) {
              return product;
            }

            const remainingQuantity =
              Number(product.quantity) - requestedQuantity;

            return {
              ...product,
              quantity: remainingQuantity,
            };
          })
          .filter((product) => Number(product.quantity) > 0)
      );
    } catch (err) {
      console.error("Order failed:", err);

      const message =
        err?.response?.data?.detail ||
        "Unable to place order. Please try again.";

      alert(message);
    } finally {
      setOrdering(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setLocation("All");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="page-container py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-green-700">
              DIRECT FARMER MARKET
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-1">
              Fresh Produce Marketplace 🛒
            </h2>

            <p className="text-slate-500 mt-2 max-w-2xl">
              Discover produce directly from farmers and place orders without
              unnecessary intermediaries.
            </p>
          </div>

          <Link
            to="/farmer/add-produce"
            className="inline-flex items-center justify-center bg-green-700 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            + List Your Produce
          </Link>
        </div>

        {/* Connection Status */}
        <div className="mt-6">
          {apiConnected ? (
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
              Live marketplace connected
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
              <span className="w-2.5 h-2.5 bg-amber-500 rounded-full" />
              Demo marketplace mode
            </div>
          )}
        </div>

        {/* Error / Fallback */}
        {error && (
          <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {/* Filters */}
        <section className="card mt-7 p-5">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_220px_auto] gap-3">
            <input
              type="text"
              placeholder="Search crop..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field"
            />

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input-field bg-white"
            >
              {locations.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All Locations" : item}
                </option>
              ))}
            </select>

            <Button
              variant="secondary"
              onClick={clearFilters}
              className="md:px-6"
            >
              Clear
            </Button>
          </div>
        </section>

        {/* Products */}
        <section className="mt-7">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Available Produce
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {filteredProducts.length} listing
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>

          {loading ? (
            <div className="card p-10 text-center">
              <div className="text-4xl">🌾</div>
              <p className="font-semibold text-slate-700 mt-4">
                Loading live marketplace...
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Connecting to KisanDirect AI backend.
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="card p-10 text-center">
              <div className="text-4xl">🔍</div>
              <h3 className="font-bold text-slate-800 mt-4">
                No produce found
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Try changing your search or location filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOrder={openOrderModal}
                />
              ))}
            </div>
          )}
        </section>

        {/* Prototype Notice */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4">
          <p className="text-xs text-green-800">
            <strong>Live Backend:</strong> Marketplace listings and orders are
            now connected to the FastAPI backend. AI demand and price
            intelligence will be connected after the ML models are trained.
          </p>
        </div>
      </main>

      {/* Order Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
          onClick={closeOrderModal}
        >
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">
                    Place Direct Order
                  </p>

                  <h3 className="text-2xl font-bold text-slate-900 mt-1">
                    {selectedProduct.emoji} {selectedProduct.crop}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeOrderModal}
                  disabled={ordering}
                  className="w-9 h-9 rounded-lg hover:bg-slate-100 text-slate-500"
                >
                  ✕
                </button>
              </div>
            </div>

            {orderSuccess ? (
              <div className="p-7">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mx-auto">
                  ✅
                </div>

                <h3 className="text-xl font-bold text-slate-900 text-center mt-4">
                  Order Created Successfully
                </h3>

                <p className="text-center text-slate-500 mt-2">
                  Your order has been saved to the KisanDirect AI database.
                </p>

                <div className="bg-slate-50 rounded-xl p-4 mt-5 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Order</span>
                    <strong>{orderSuccess.order?.order_number}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Quantity</span>
                    <strong>{orderSuccess.order?.quantity} kg</strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">Total</span>
                    <strong>
                      ₹{orderSuccess.order?.total_amount}
                    </strong>
                  </div>
                </div>

                <Button
                  className="w-full mt-5"
                  onClick={closeOrderModal}
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleOrder} className="p-6">
                <div className="bg-green-50 rounded-xl p-4 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Price</span>
                    <strong className="text-green-700">
                      ₹{selectedProduct.price}/kg
                    </strong>
                  </div>

                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-slate-500">Available</span>
                    <strong>
                      {Number(selectedProduct.quantity).toLocaleString()} kg
                    </strong>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Buyer Name
                    </label>

                    <input
                      type="text"
                      value={buyerName}
                      onChange={(e) => setBuyerName(e.target.value)}
                      placeholder="e.g. Delhi Fresh Mart"
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Buyer Phone
                    </label>

                    <input
                      type="tel"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="e.g. 8888888888"
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Buyer Location
                    </label>

                    <input
                      type="text"
                      value={buyerLocation}
                      onChange={(e) => setBuyerLocation(e.target.value)}
                      placeholder="e.g. Noida Sector 62"
                      required
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Quantity (kg)
                    </label>

                    <input
                      type="number"
                      min="1"
                      max={selectedProduct.quantity}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="e.g. 100"
                      required
                      className="input-field"
                    />
                  </div>
                </div>

                {quantity && Number(quantity) > 0 && (
                  <div className="mt-5 border-t border-slate-200 pt-5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">
                        Estimated Total
                      </span>

                      <strong className="text-xl text-green-700">
                        ₹
                        {(
                          Number(quantity) *
                          Number(selectedProduct.price)
                        ).toLocaleString()}
                      </strong>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <Button
                    type="submit"
                    disabled={ordering}
                    className="flex-1"
                  >
                    {ordering ? "Creating Order..." : "Confirm Order"}
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={closeOrderModal}
                    disabled={ordering}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function getCropEmoji(crop) {
  const emojis = {
    Tomato: "🍅",
    Potato: "🥔",
    Onion: "🧅",
    Wheat: "🌾",
    Rice: "🌾",
    Carrot: "🥕",
    Cauliflower: "🥦",
  };

  return emojis[crop] || "🌾";
}
