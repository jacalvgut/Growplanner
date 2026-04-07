from __future__ import annotations

import json
import os
import threading
from pathlib import Path
from typing import Dict, List, Optional
from datetime import datetime

from models import Garden, GardenDesignElement, GardenFruitTree


_lock = threading.Lock()


def _data_dir() -> Path:
    base = Path(__file__).resolve().parent
    return base / "data"


def _gardens_path() -> Path:
    return _data_dir() / "gardens.json"


def _now_iso() -> str:
    return datetime.now().isoformat()


def _atomic_write(path: Path, data: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp_path = path.with_suffix(path.suffix + ".tmp")
    tmp_path.write_text(data, encoding="utf-8")
    os.replace(tmp_path, path)


def _seed_default_garden() -> Dict[str, Garden]:
    """
    Crea la huerta inicial "Mi huerta" basada en el layout actual (CSS).
    Las posiciones están expresadas como porcentajes del contenedor `.garden`.
    """
    updated_at = _now_iso()
    garden_id = "default"

    def el(
        *,
        id: str,
        type: str,
        label: str,
        shape: str,
        xPct: float,
        yPct: float,
        wPct: float,
        hPct: float,
    ) -> GardenDesignElement:
        return GardenDesignElement(
            id=id,
            type=type,  # type: ignore[arg-type]
            label=label,
            shape=shape,  # type: ignore[arg-type]
            xPct=xPct,
            yPct=yPct,
            wPct=wPct,
            hPct=hPct,
        )

    elements: List[GardenDesignElement] = [
        # Invernadero
        el(
            id="greenhouse",
            type="greenhouse",
            label="Invernadero",
            shape="rect",
            xPct=6,
            yPct=6,
            wPct=18,
            hPct=60,
        ),
        # Bancales
        el(
            id="bed-1",
            type="bed",
            label="Bancal 1",
            shape="rect",
            xPct=27,
            yPct=6,
            wPct=11,
            hPct=60,
        ),
        el(
            id="bed-2",
            type="bed",
            label="Bancal 2",
            shape="rect",
            xPct=41,
            yPct=6,
            wPct=11,
            hPct=60,
        ),
        el(
            id="bed-3",
            type="bed",
            label="Bancal 3",
            shape="rect",
            xPct=55,
            yPct=6,
            wPct=11,
            hPct=60,
        ),
        el(
            id="bed-4",
            type="bed",
            label="Bancal 4",
            shape="rect",
            xPct=10,
            yPct=79,  # bottom 6% + height 15% => y=79%
            wPct=26,
            hPct=15,
        ),
        el(
            id="bed-5",
            type="bed",
            label="Bancal 5",
            shape="rect",
            xPct=40,
            yPct=79,
            wPct=26,
            hPct=15,
        ),
        # Composteras
        el(
            id="compost-north",
            type="compost",
            label="Compostera",
            shape="rect",
            xPct=69,  # right 21% + width 10% => x=69%
            yPct=6,
            wPct=10,
            hPct=30,
        ),
        el(
            id="compost-south",
            type="compost",
            label="Compostera",
            shape="rect",
            xPct=69,
            yPct=79,
            wPct=10,
            hPct=15,
        ),
        # Círculos (árboles/zonas circulares)
        el(
            id="circle-bottom-left",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=2,
            yPct=84,  # bottom 6% + height 10% => y=84%
            wPct=7,
            hPct=10,
        ),
        el(
            id="circle-in-1",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=71,  # right 22% + width 7% => x=71%
            yPct=40,
            wPct=7,
            hPct=12,
        ),
        el(
            id="circle-in-2",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=71,
            yPct=55,
            wPct=7,
            hPct=12,
        ),
        el(
            id="circle-right-1",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=90,  # right 3% + width 7% => x=90%
            yPct=6,
            wPct=7,
            hPct=12,
        ),
        el(
            id="circle-right-2",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=90,
            yPct=22,
            wPct=7,
            hPct=12,
        ),
        el(
            id="circle-right-3",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=90,
            yPct=38,
            wPct=7,
            hPct=12,
        ),
        el(
            id="circle-right-4",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=90,
            yPct=54,
            wPct=7,
            hPct=12,
        ),
        # Este círculo estaba dentro del wrapper `right-bottom-rect`.
        # En el nuevo sistema lo colocamos aproximado en la esquina inferior derecha.
        el(
            id="circle-bottom-right",
            type="tree",
            label="Árbol",
            shape="circle",
            xPct=91,
            yPct=83,
            wPct=7,
            hPct=12,
        ),
    ]

    garden = Garden(
        id=garden_id,
        name="Mi huerta",
        updatedAt=updated_at,
        showFrutalesButton=True,
        fruitTrees=[],
        elements=elements,
    )
    return {garden_id: garden}


def _load_all_unlocked() -> Dict[str, Garden]:
    path = _gardens_path()
    if not path.exists():
        gardens = _seed_default_garden()
        _save_all_unlocked(gardens)
        return gardens

    raw = json.loads(path.read_text(encoding="utf-8") or "{}")
    gardens: Dict[str, Garden] = {}
    for garden_id, g in raw.items():
        gardens[garden_id] = Garden(**g)
    if not gardens:
        gardens = _seed_default_garden()
        _save_all_unlocked(gardens)
    return gardens


def _save_all_unlocked(gardens: Dict[str, Garden]) -> None:
    payload = {gid: g.model_dump() for gid, g in gardens.items()}
    _atomic_write(_gardens_path(), json.dumps(payload, ensure_ascii=False, indent=2))


def list_gardens() -> List[Garden]:
    with _lock:
        gardens = _load_all_unlocked()
        return list(gardens.values())


def get_garden(garden_id: str) -> Optional[Garden]:
    with _lock:
        gardens = _load_all_unlocked()
        return gardens.get(garden_id)


def create_garden(
    *,
    garden_id: str,
    name: str,
    show_frutales_button: bool = True,
    elements: Optional[List[GardenDesignElement]] = None,
    fruit_trees: Optional[List[GardenFruitTree]] = None,
) -> Garden:
    with _lock:
        gardens = _load_all_unlocked()
        if garden_id in gardens:
            raise ValueError("Garden already exists")
        # Por defecto NO crear vallado/puertas/caminos: el usuario los añadirá.
        elements_to_save: List[GardenDesignElement] = elements or []
        garden = Garden(
            id=garden_id,
            name=name,
            updatedAt=_now_iso(),
            showFrutalesButton=show_frutales_button,
            fruitTrees=fruit_trees or [],
            elements=elements_to_save,
        )
        gardens[garden_id] = garden
        _save_all_unlocked(gardens)
        return garden


def update_garden(
    *,
    garden_id: str,
    name: Optional[str] = None,
    show_frutales_button: Optional[bool] = None,
    elements: Optional[List[GardenDesignElement]] = None,
    fruit_trees: Optional[List[GardenFruitTree]] = None,
) -> Garden:
    with _lock:
        gardens = _load_all_unlocked()
        if garden_id not in gardens:
            raise KeyError("Garden not found")
        garden = gardens[garden_id]
        if name is not None:
            garden.name = name
        if show_frutales_button is not None:
            garden.showFrutalesButton = show_frutales_button
        if elements is not None:
            garden.elements = elements
        if fruit_trees is not None:
            garden.fruitTrees = fruit_trees
        garden.updatedAt = _now_iso()
        gardens[garden_id] = garden
        _save_all_unlocked(gardens)
        return garden


def delete_garden(garden_id: str) -> None:
    with _lock:
        gardens = _load_all_unlocked()
        if garden_id not in gardens:
            raise KeyError("Garden not found")
        del gardens[garden_id]
        _save_all_unlocked(gardens)

