export const farmer = {
  id: "F001",
  name: "Raj Kumar",
  location: "Ghaziabad, Uttar Pradesh",
  type: "Individual Farmer",
  phone: "+91 XXXXX XXXXX",
};

export const products = [
  {
    id: "P001",
    crop: "Tomato",
    emoji: "🍅",
    farmer: "Raj Kumar",
    location: "Ghaziabad, UP",
    quantity: 500,
    price: 30,
    quality: "Grade A",
    demand: "HIGH",
    harvestDate: "2026-09-10",
  },
  {
    id: "P002",
    crop: "Potato",
    emoji: "🥔",
    farmer: "Suresh Kumar",
    location: "Meerut, UP",
    quantity: 800,
    price: 24,
    quality: "Grade A",
    demand: "HIGH",
    harvestDate: "2026-09-12",
  },
  {
    id: "P003",
    crop: "Onion",
    emoji: "🧅",
    farmer: "Amit Singh",
    location: "Bulandshahr, UP",
    quantity: 650,
    price: 28,
    quality: "Grade A",
    demand: "MEDIUM",
    harvestDate: "2026-09-11",
  },
  {
    id: "P004",
    crop: "Wheat",
    emoji: "🌾",
    farmer: "Vikas Sharma",
    location: "Muzaffarnagar, UP",
    quantity: 1200,
    price: 27,
    quality: "Grade A",
    demand: "MEDIUM",
    harvestDate: "2026-09-15",
  },
  {
    id: "P005",
    crop: "Carrot",
    emoji: "🥕",
    farmer: "Rohit Kumar",
    location: "Noida, UP",
    quantity: 400,
    price: 32,
    quality: "Grade A",
    demand: "HIGH",
    harvestDate: "2026-09-09",
  },
  {
    id: "P006",
    crop: "Cauliflower",
    emoji: "🥦",
    farmer: "Deepak Singh",
    location: "Hapur, UP",
    quantity: 350,
    price: 26,
    quality: "Grade B",
    demand: "MEDIUM",
    harvestDate: "2026-09-13",
  },
];

export const orders = [
  {
    id: "KD-1001",
    crop: "Tomato",
    emoji: "🍅",
    farmer: "Raj Kumar",
    location: "Ghaziabad, UP",
    quantity: 100,
    price: 30,
    total: 3000,
    status: "Confirmed",
    date: "07 Sep 2026",
    logistics: "Pickup scheduled",
  },
  {
    id: "KD-1002",
    crop: "Potato",
    emoji: "🥔",
    farmer: "Suresh Kumar",
    location: "Meerut, UP",
    quantity: 200,
    price: 24,
    total: 4800,
    status: "In Transit",
    date: "06 Sep 2026",
    logistics: "Vehicle assigned",
  },
  {
    id: "KD-1003",
    crop: "Onion",
    emoji: "🧅",
    farmer: "Amit Singh",
    location: "Bulandshahr, UP",
    quantity: 150,
    price: 28,
    total: 4200,
    status: "Delivered",
    date: "04 Sep 2026",
    logistics: "Delivered successfully",
  },
];

export const aiInsights = {
  crop: "Tomato",
  location: "Ghaziabad, UP",

  availableSupply: 5000,
  predictedDemand: 7200,

  demandLevel: "HIGH",

  suggestedPrice: {
    min: 28,
    max: 32,
  },

  confidence: 87,

  supplyGap: 2200,

  recommendation:
    "Demand is currently higher than estimated supply. Farmers may consider targeting high-demand buyer locations.",

  highDemandLocations: [
    {
      name: "Noida Sector 62",
      demand: 2400,
      level: "HIGH",
    },
    {
      name: "Ghaziabad",
      demand: 1850,
      level: "HIGH",
    },
    {
      name: "Delhi NCR",
      demand: 1400,
      level: "MEDIUM",
    },
  ],

  factors: [
    {
      title: "Demand Trend",
      icon: "📈",
      description:
        "Recent buyer demand is showing an upward trend.",
    },
    {
      title: "Price Signals",
      icon: "💰",
      description:
        "Historical market prices support the recommended range.",
    },
    {
      title: "Location Demand",
      icon: "📍",
      description:
        "Nearby high-demand markets can reduce unnecessary transport.",
    },
  ],
};

export const logistics = {
  originalDistance: 84,
  optimizedDistance: 61,
  distanceSaved: 23,

  estimatedSaving: 460,

  totalProduce: 500,
  deliveryStops: 3,

  estimatedTime: "2h 15m",

  vehicle: {
    number: "UP-14-AB-4582",
    capacity: 1000,
    load: 500,
    utilization: 50,
  },

  stops: [
    {
      number: 1,
      name: "Raj Kumar Farm",
      location: "Ghaziabad, UP",
      type: "Pickup",
      quantity: "500 kg",
    },
    {
      number: 2,
      name: "Buyer — Sector 62",
      location: "Noida, UP",
      type: "Delivery",
      quantity: "250 kg",
    },
    {
      number: 3,
      name: "Buyer — Sector 18",
      location: "Noida, UP",
      type: "Delivery",
      quantity: "150 kg",
    },
    {
      number: 4,
      name: "Buyer — Delhi NCR",
      location: "Delhi, NCR",
      type: "Delivery",
      quantity: "100 kg",
    },
  ],
};

export const markets = [
  {
    name: "Noida Sector 62",
    demand: "2,400 kg",
    level: "HIGH",
  },
  {
    name: "Ghaziabad",
    demand: "1,850 kg",
    level: "HIGH",
  },
  {
    name: "Delhi NCR",
    demand: "1,400 kg",
    level: "MEDIUM",
  },
  {
    name: "Meerut",
    demand: "950 kg",
    level: "MEDIUM",
  },
];

export const adminStats = {
  activeFarmers: 1248,
  activeBuyers: 684,
  produceListed: "24.8K kg",
  ordersProcessed: 3426,

  aggregatedOrders: 782,
  routesOptimized: 526,
  deliveriesToday: 143,
  aiPredictions: 1892,
};

export const cropAnalytics = [
  {
    name: "Tomato",
    emoji: "🍅",
    supply: 5000,
    demand: 7200,
  },
  {
    name: "Potato",
    emoji: "🥔",
    supply: 6800,
    demand: 6100,
  },
  {
    name: "Onion",
    emoji: "🧅",
    supply: 4200,
    demand: 5600,
  },
  {
    name: "Wheat",
    emoji: "🌾",
    supply: 9000,
    demand: 8400,
  },
];

export default {
  farmer,
  products,
  orders,
  aiInsights,
  logistics,
  markets,
  adminStats,
  cropAnalytics,
};
