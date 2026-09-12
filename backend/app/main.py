from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

# Models
from app.models.farmer import Farmer
from app.models.produce import Produce
from app.models.order import Order

# Routes
from app.routes.farmers import router as farmer_router
from app.routes.produce import router as produce_router
from app.routes.orders import router as order_router
from app.routes.price import router as price_router


# ==========================================
# Create database tables
# ==========================================

Base.metadata.create_all(bind=engine)


# ==========================================
# FastAPI Application
# ==========================================

app = FastAPI(
    title="KisanDirect AI API",
    description=(
        "Backend API for direct farmer-to-buyer marketplace, "
        "AI price prediction, AI insights and smart logistics."
    ),
    version="1.0.0",
)


# ==========================================
# CORS - Frontend Access
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# Register API Routes
# ==========================================

app.include_router(farmer_router)
app.include_router(produce_router)
app.include_router(order_router)
app.include_router(price_router)


# ==========================================
# Root Endpoint
# ==========================================

@app.get("/")
def root():
    return {
        "message": "KisanDirect AI API is running",
        "status": "online",
        "version": "1.0.0",
    }


# ==========================================
# Health Check
# ==========================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "KisanDirect AI Backend",
    }
