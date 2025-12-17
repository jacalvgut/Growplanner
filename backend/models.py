"""
Modelos de datos para la API
"""
from pydantic import BaseModel
from typing import Optional, List
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
    created_at: str


class CreateElementActivityData(BaseModel):
    type: str
    date: str
    notes: Optional[str] = None


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

