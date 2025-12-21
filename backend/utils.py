"""
Utilidades para conversión de formatos
"""
from typing import Dict, Any, List


def plant_to_camel_case(plant_dict: Dict[str, Any]) -> Dict[str, Any]:
    """Convierte un diccionario de planta de snake_case a camelCase"""
    return {
        "id": plant_dict["id"],
        "elementId": plant_dict["element_id"],
        "variety": plant_dict["variety"],
        "commonName": plant_dict["common_name"],
        "position": plant_dict["position"],
        "plantedDate": plant_dict["planted_date"],
        "germinatedFromSeed": plant_dict["germinated_from_seed"],
        "seedOrigin": plant_dict.get("seed_origin"),
        "seedOriginDetails": plant_dict.get("seed_origin_details"),
        "status": plant_dict["status"],
        "notes": plant_dict.get("notes"),
        "isPlanted": plant_dict.get("is_planted", False),
        "createdAt": plant_dict["created_at"],
        "updatedAt": plant_dict["updated_at"],
    }


def activity_to_camel_case(activity_dict: Dict[str, Any]) -> Dict[str, Any]:
    """Convierte un diccionario de actividad de snake_case a camelCase"""
    result = {
        "id": activity_dict["id"],
        "elementId": activity_dict.get("element_id"),
        "type": activity_dict["type"],
        "date": activity_dict["date"],
        "notes": activity_dict.get("notes"),
        "createdAt": activity_dict["created_at"],
    }
    if "plant_id" in activity_dict:
        result["plantId"] = activity_dict["plant_id"]
    if "plant_ids" in activity_dict and activity_dict["plant_ids"] is not None:
        result["plantIds"] = activity_dict["plant_ids"]
    if "quantity" in activity_dict:
        result["quantity"] = activity_dict["quantity"]
    if "unit" in activity_dict:
        result["unit"] = activity_dict["unit"]
    return result

