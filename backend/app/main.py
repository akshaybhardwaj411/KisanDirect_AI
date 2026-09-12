from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.models.farmer import Farmer
from app.models.produce import Produce
from app.models.order import Order
from app.routes import price

from app.routes.farmers import router as farmer_router
from app.routes.produce import router as produce_router
from app.routes.orders import router as order_router
from app.routes.orders import router as price_router


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="KisanDirect AI API",
    description=(
        "Backend API for direct farmer-to-buyer marketplace, "
        "AI insights and logistics."
    ),
    version="1.0.0",
)


# Frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routes
app.include_router(farmer_router)
app.include_router(produce_router)
app.include_router(order_router)
app.include_router(price_router)


@app.get("/")
def root():
    return {
        "message": "KisanDirect AI API is running",
        "status": "online",
        "version": "1.0.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "KisanDirect AI Backend",
    }
