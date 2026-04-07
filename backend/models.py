"""
Modelos de datos para la API
"""
from pydantic import BaseModel
from typing import Optional, List, Literal
from datetime import datetime


class PlantPosition(BaseModel):
    x: float
    y: float


class Plant(BaseModel):
    id: str
    element_id: str
    variety: str
    common_name: str
    position: PlantPosition
    planted_date: str
    germinated_from_seed: bool
    seed_origin: Optional[str] = None
    seed_origin_details: Optional[str] = None
    status: str
    notes: Optional[str] = None
    is_planted: Optional[bool] = False
    created_at: str
    updated_at: str


class CreatePlantData(BaseModel):
    variety: str
    common_name: str
    position: PlantPosition
    planted_date: str
    germinated_from_seed: bool
    seed_origin: Optional[str] = None
    seed_origin_details: Optional[str] = None
    notes: Optional[str] = None


class CreateMultiplePlantsData(BaseModel):
    count: int
    variety: str
    common_name: str
    planted_date: str
    germinated_from_seed: bool
    seed_origin: Optional[str] = None
    seed_origin_details: Optional[str] = None
    notes: Optional[str] = None


class ElementActivity(BaseModel):
    id: str
    element_id: str
    type: str
    date: str
    notes: Optional[str] = None
    plant_ids: Optional[List[str]] = None
    created_at: str


class CreateElementActivityData(BaseModel):
    type: str
    date: str
    notes: Optional[str] = None
    plant_ids: Optional[List[str]] = None


class PlantActivity(BaseModel):
    id: str
    plant_id: str
    type: str
    date: str
    notes: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None
    created_at: str


class CreatePlantActivityData(BaseModel):
    type: str
    date: str
    notes: Optional[str] = None
    quantity: Optional[float] = None
    unit: Optional[str] = None


class Recurrence(BaseModel):
    type: str  # 'days', 'weeks', 'months'
    interval: int


class ActionPlan(BaseModel):
    id: str
    element_id: str
    plant_id: Optional[str] = None
    plan_type: str  # 'element' or 'plant'
    activity_type: str
    recurrence: Recurrence
    start_date: str
    end_date: Optional[str] = None
    enabled: bool
    notes: Optional[str] = None
    created_at: str
    updated_at: str


class CreateActionPlanData(BaseModel):
    element_id: str
    plant_id: Optional[str] = None
    plan_type: str
    activity_type: str
    recurrence: Recurrence
    start_date: str
    end_date: Optional[str] = None
    notes: Optional[str] = None


class Alert(BaseModel):
    id: str
    plan_id: str
    element_id: str
    plant_id: Optional[str] = None
    activity_type: str
    due_date: str
    message: str
    completed: bool
    completed_date: Optional[str] = None
    created_at: str


class ElementDetailResponse(BaseModel):
    element_id: str
    plants: List[Plant]
    element_activities: List[ElementActivity]
    plant_activities: List[PlantActivity]
    action_plans: List[ActionPlan]
    alerts: List[Alert]
    last_updated: str


# ============================
#  Diseños de huertas (Gardens)
# ============================


GardenElementType = Literal[
    "bed",
    "tree",
    "compost",
    "greenhouse",
    "circle",
    "fence",
    "gate",
    "path",
]

GardenElementShape = Literal["rect", "circle"]


class GardenDesignElement(BaseModel):
    """
    Elemento de diseño (posición/tamaño en % del contenedor).
    """

    id: str
    type: GardenElementType
    label: str
    # Elementos rect/circle
    shape: Optional[GardenElementShape] = None
    xPct: Optional[float] = None
    yPct: Optional[float] = None
    wPct: Optional[float] = None
    hPct: Optional[float] = None

    # Elementos lineales (vallado/puerta/camino)
    x1Pct: Optional[float] = None
    y1Pct: Optional[float] = None
    x2Pct: Optional[float] = None
    y2Pct: Optional[float] = None
    thicknessPct: Optional[float] = None
    gateSwingDeg: Optional[float] = None
    gateHinge: Optional[Literal["start", "end"]] = None

    rotationDeg: Optional[float] = None


class GardenFruitTree(BaseModel):
    id: str
    name: str
    displayName: str


class Garden(BaseModel):
    id: str
    name: str
    updatedAt: str
    showFrutalesButton: bool = True
    fruitTrees: List[GardenFruitTree] = []
    elements: List[GardenDesignElement]


class GardenSummary(BaseModel):
    id: str
    name: str
    updatedAt: str
    showFrutalesButton: bool = True


class CreateGardenRequest(BaseModel):
    name: str
    showFrutalesButton: bool = True
    elements: Optional[List[GardenDesignElement]] = None
    fruitTrees: Optional[List[GardenFruitTree]] = None


class UpdateGardenRequest(BaseModel):
    name: Optional[str] = None
    showFrutalesButton: Optional[bool] = None
    elements: Optional[List[GardenDesignElement]] = None
    fruitTrees: Optional[List[GardenFruitTree]] = None

