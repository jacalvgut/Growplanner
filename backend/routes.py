"""
Rutas de la API para gestión de elementos
"""
from fastapi import APIRouter, HTTPException
from typing import List
from utils import plant_to_camel_case, activity_to_camel_case
from models import (
    Plant,
    CreatePlantData,
    CreateMultiplePlantsData,
    ElementActivity,
    CreateElementActivityData,
    PlantActivity,
    CreatePlantActivityData,
    ActionPlan,
    CreateActionPlanData,
    Alert,
    ElementDetailResponse,
)
import uuid
from datetime import datetime

router = APIRouter()

# Almacenamiento temporal en memoria (reemplazar con base de datos)
storage = {
    "plants": {},
    "element_activities": {},
    "plant_activities": {},
    "action_plans": {},
    "alerts": {},
}


@router.get("/elements/{element_id}")
async def get_element_detail(element_id: str):
    """Obtiene todos los datos de un elemento"""
    plants = [p for p in storage["plants"].values() if p["element_id"] == element_id]
    element_activities = [
        a
        for a in storage["element_activities"].values()
        if a["element_id"] == element_id
    ]
    plant_ids = [p["id"] for p in plants]
    plant_activities = [
        a for a in storage["plant_activities"].values() if a["plant_id"] in plant_ids
    ]
    action_plans = [
        p
        for p in storage["action_plans"].values()
        if p["element_id"] == element_id
    ]
    alerts = [
        a for a in storage["alerts"].values() if a["element_id"] == element_id
    ]

    # Convertir a formato camelCase para el frontend
    return {
        "elementId": element_id,
        "plants": [plant_to_camel_case(p) for p in plants],
        "elementActivities": [activity_to_camel_case(a) for a in element_activities],
        "plantActivities": [activity_to_camel_case(a) for a in plant_activities],
        "actionPlans": [],  # Por ahora vacío, se implementará después
        "alerts": [],  # Por ahora vacío, se implementará después
        "lastUpdated": datetime.now().isoformat(),
    }


@router.post("/elements/{element_id}/plants")
async def create_plant(element_id: str, data: CreatePlantData):
    """Crea una nueva planta"""
    plant_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    plant = {
        "id": plant_id,
        "element_id": element_id,
        "variety": data.variety,
        "common_name": data.common_name,
        "position": data.position.dict(),
        "planted_date": data.planted_date,
        "germinated_from_seed": data.germinated_from_seed,
        "seed_origin": data.seed_origin,
        "seed_origin_details": data.seed_origin_details,
        "status": "germinando",
        "notes": data.notes,
        "created_at": now,
        "updated_at": now,
    }
    storage["plants"][plant_id] = plant
    return plant_to_camel_case(plant)


@router.post("/elements/{element_id}/plants/batch")
async def create_multiple_plants(
    element_id: str, data: CreateMultiplePlantsData
):
    """Crea múltiples plantas a la vez"""
    plants = []
    now = datetime.now().isoformat()

    for i in range(data.count):
        plant_id = str(uuid.uuid4())
        # Distribuir plantas en el espacio (simple grid)
        cols = int(data.count ** 0.5) + 1
        x = ((i % cols) + 1) * (100 / (cols + 1))
        y = ((i // cols) + 1) * (100 / (cols + 1))

        plant = {
            "id": plant_id,
            "element_id": element_id,
            "variety": data.variety,
            "common_name": data.common_name,
            "position": {"x": x, "y": y},
            "planted_date": data.planted_date,
            "germinated_from_seed": data.germinated_from_seed,
            "seed_origin": data.seed_origin,
            "seed_origin_details": data.seed_origin_details,
            "status": "germinando",
            "notes": data.notes,
            "created_at": now,
            "updated_at": now,
        }
        storage["plants"][plant_id] = plant
        plants.append(plant_to_camel_case(plant))

    return {"plants": plants}


@router.patch("/elements/{element_id}/plants/{plant_id}")
async def update_plant(
    element_id: str, plant_id: str, updates: dict
):
    """Actualiza una planta"""
    if plant_id not in storage["plants"]:
        raise HTTPException(status_code=404, detail="Planta no encontrada")

    plant = storage["plants"][plant_id]
    # Convertir camelCase a snake_case si es necesario
    snake_case_updates = {}
    for key, value in updates.items():
        if key == "position":
            snake_case_updates["position"] = value
        elif key == "plantedDate":
            snake_case_updates["planted_date"] = value
        elif key == "germinatedFromSeed":
            snake_case_updates["germinated_from_seed"] = value
        elif key == "seedOrigin":
            snake_case_updates["seed_origin"] = value
        elif key == "seedOriginDetails":
            snake_case_updates["seed_origin_details"] = value
        else:
            snake_case_updates[key] = value
    
    plant.update(snake_case_updates)
    plant["updated_at"] = datetime.now().isoformat()
    return plant_to_camel_case(plant)


@router.delete("/elements/{element_id}/plants/{plant_id}")
async def delete_plant(element_id: str, plant_id: str):
    """Elimina una planta"""
    if plant_id not in storage["plants"]:
        raise HTTPException(status_code=404, detail="Planta no encontrada")

    del storage["plants"][plant_id]
    # Eliminar actividades asociadas
    storage["plant_activities"] = {
        k: v
        for k, v in storage["plant_activities"].items()
        if v["plant_id"] != plant_id
    }
    return {"message": "Planta eliminada"}


@router.post("/elements/{element_id}/activities")
async def create_element_activity(
    element_id: str, data: CreateElementActivityData
):
    """Crea una actividad a nivel de elemento"""
    activity_id = str(uuid.uuid4())
    activity = {
        "id": activity_id,
        "element_id": element_id,
        "type": data.type,
        "date": data.date,
        "notes": data.notes,
        "created_at": datetime.now().isoformat(),
    }
    storage["element_activities"][activity_id] = activity
    return activity_to_camel_case(activity)


@router.delete("/elements/{element_id}/activities/{activity_id}")
async def delete_element_activity(element_id: str, activity_id: str):
    """Elimina una actividad de elemento"""
    if activity_id not in storage["element_activities"]:
        raise HTTPException(status_code=404, detail="Actividad no encontrada")

    del storage["element_activities"][activity_id]
    return {"message": "Actividad eliminada"}


@router.post(
    "/elements/{element_id}/plants/{plant_id}/activities",
)
async def create_plant_activity(
    element_id: str, plant_id: str, data: CreatePlantActivityData
):
    """Crea una actividad a nivel de planta"""
    activity_id = str(uuid.uuid4())
    activity = {
        "id": activity_id,
        "plant_id": plant_id,
        "type": data.type,
        "date": data.date,
        "notes": data.notes,
        "quantity": data.quantity,
        "unit": data.unit,
        "created_at": datetime.now().isoformat(),
    }
    storage["plant_activities"][activity_id] = activity
    return PlantActivity(**activity)


@router.delete(
    "/elements/{element_id}/plants/{plant_id}/activities/{activity_id}"
)
async def delete_plant_activity(
    element_id: str, plant_id: str, activity_id: str
):
    """Elimina una actividad de planta"""
    if activity_id not in storage["plant_activities"]:
        raise HTTPException(status_code=404, detail="Actividad no encontrada")

    del storage["plant_activities"][activity_id]
    return {"message": "Actividad eliminada"}


@router.post("/action-plans", response_model=ActionPlan)
async def create_action_plan(data: CreateActionPlanData):
    """Crea un plan de acción"""
    plan_id = str(uuid.uuid4())
    now = datetime.now().isoformat()
    plan = {
        "id": plan_id,
        "element_id": data.element_id,
        "plant_id": data.plant_id,
        "plan_type": data.plan_type,
        "activity_type": data.activity_type,
        "recurrence": data.recurrence.dict(),
        "start_date": data.start_date,
        "end_date": data.end_date,
        "enabled": True,
        "notes": data.notes,
        "created_at": now,
        "updated_at": now,
    }
    storage["action_plans"][plan_id] = plan
    return ActionPlan(**plan)


@router.patch("/action-plans/{plan_id}", response_model=ActionPlan)
async def update_action_plan(plan_id: str, updates: dict):
    """Actualiza un plan de acción"""
    if plan_id not in storage["action_plans"]:
        raise HTTPException(status_code=404, detail="Plan no encontrado")

    plan = storage["action_plans"][plan_id]
    plan.update(updates)
    plan["updated_at"] = datetime.now().isoformat()
    return ActionPlan(**plan)


@router.delete("/action-plans/{plan_id}")
async def delete_action_plan(plan_id: str):
    """Elimina un plan de acción"""
    if plan_id not in storage["action_plans"]:
        raise HTTPException(status_code=404, detail="Plan no encontrado")

    del storage["action_plans"][plan_id]
    # Eliminar avisos asociados
    storage["alerts"] = {
        k: v for k, v in storage["alerts"].items() if v["plan_id"] != plan_id
    }
    return {"message": "Plan eliminado"}


@router.get("/elements/{element_id}/alerts", response_model=List[Alert])
async def get_alerts(element_id: str):
    """Obtiene los avisos de un elemento"""
    alerts = [
        a for a in storage["alerts"].values() if a["element_id"] == element_id
    ]
    return [Alert(**a) for a in alerts]


@router.patch("/elements/{element_id}/alerts/{alert_id}/complete")
async def mark_alert_completed(
    element_id: str, alert_id: str, completed_date: str
):
    """Marca un aviso como completado"""
    if alert_id not in storage["alerts"]:
        raise HTTPException(status_code=404, detail="Aviso no encontrado")

    alert = storage["alerts"][alert_id]
    alert["completed"] = True
    alert["completed_date"] = completed_date
    return Alert(**alert)

