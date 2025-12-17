from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import routes

app = FastAPI(title="GrowPlanner API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rutas
app.include_router(routes.router, prefix="/api", tags=["elements"])


@app.get("/api/health")
def health_check() -> dict:
    """
    Endpoint sencillo para comprobar que el backend está vivo.
    """
    return {"status": "ok"}



