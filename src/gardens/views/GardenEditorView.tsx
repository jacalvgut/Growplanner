import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Rnd } from 'react-rnd';
import type { Garden, GardenDesignElement, GardenElementShape, GardenElementType } from '../types';
import * as gardenService from '../services/gardenService';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function newId() {
  return crypto.randomUUID();
}

const TYPE_LABELS: Record<GardenElementType, string> = {
  bed: 'Bancal',
  tree: 'Árbol',
  compost: 'Compostera',
  greenhouse: 'Invernadero',
  circle: 'Círculo',
  fence: 'Vallado',
  gate: 'Puerta',
  path: 'Camino',
};

function isLineType(t: GardenElementType) {
  return t === 'fence' || t === 'gate' || t === 'path';
}

function lineOrientation(x1: number, y1: number, x2: number, y2: number): 'h' | 'v' {
  return Math.abs(x2 - x1) >= Math.abs(y2 - y1) ? 'h' : 'v';
}

function rotateAround(
  hx: number,
  hy: number,
  px: number,
  py: number,
  rad: number
): { x: number; y: number } {
  const dx = px - hx;
  const dy = py - hy;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return { x: hx + dx * cos - dy * sin, y: hy + dx * sin + dy * cos };
}

function normalizeOrthogonal(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): { x1: number; y1: number; x2: number; y2: number; orientation: 'h' | 'v' } {
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  // Si domina el desplazamiento horizontal -> línea horizontal (misma y)
  if (dx >= dy) {
    return { x1, y1, x2, y2: y1, orientation: 'h' };
  }
  // Si domina el vertical -> línea vertical (misma x)
  return { x1, y1, x2: x1, y2, orientation: 'v' };
}

export const GardenEditorView: React.FC = () => {
  const { gardenId } = useParams<{ gardenId: string }>();
  const navigate = useNavigate();
  const location = useLocation() as unknown as { state?: { draft?: { name: string; showFrutalesButton: boolean } } };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerSize, setContainerSize] = useState<{ w: number; h: number } | null>(null);

  const [garden, setGarden] = useState<Garden | null>(null);
  const [lastSaved, setLastSaved] = useState<Garden | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [snapPreview, setSnapPreview] = useState<{ x: number; y: number } | null>(null);
  const [lengthSnapPreview, setLengthSnapPreview] = useState<{ x: number; y: number } | null>(null);

  const [newType, setNewType] = useState<GardenElementType>('bed');
  const [newShape, setNewShape] = useState<GardenElementShape>('rect');
  const [newLabel, setNewLabel] = useState('Nuevo elemento');

  useEffect(() => {
    // Modo draft (nueva huerta): NO cargar desde backend.
    if (gardenId === 'new') {
      const draft = location.state?.draft ?? { name: 'Nueva huerta', showFrutalesButton: true };
      gardenService.createDefaultGardenDraft(draft).then((g) => {
        setGarden(g);
        setLastSaved(null);
      });
      return;
    }

    if (!gardenId) return;
    let cancelled = false;
    (async () => {
      try {
        const g = await gardenService.getGarden(gardenId);
        if (!cancelled) {
          setGarden(g);
          setLastSaved(g);
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gardenId, location.state]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setContainerSize({ w: rect.width, h: rect.height });
    });
    ro.observe(el);
    const rect = el.getBoundingClientRect();
    setContainerSize({ w: rect.width, h: rect.height });
    return () => ro.disconnect();
  }, []);

  const selected = useMemo(() => {
    if (!garden || !selectedId) return null;
    return garden.elements.find((e) => e.id === selectedId) || null;
  }, [garden, selectedId]);

  if (!gardenId) {
    navigate('/');
    return null;
  }

  const isDirty = (() => {
    if (!garden) return false;
    if (!lastSaved) return true; // draft: siempre “sin guardar”
    return JSON.stringify(garden) !== JSON.stringify(lastSaved);
  })();

  const confirmLeaveIfDirty = (): boolean => {
    if (!isDirty) return true;
    return window.confirm('Tienes cambios sin guardar. ¿Quieres salir sin guardar?');
  };

  const updateElement = (id: string, patch: Partial<GardenDesignElement>) => {
    setGarden((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        elements: prev.elements.map((el) => (el.id === id ? { ...el, ...patch } : el)),
      };
    });
  };

  const snapEndpoint = (
    currentId: string,
    candidate: { x: number; y: number },
    thresholdPct = 1.5
  ) => {
    const others =
      garden?.elements
        .filter((e) => e.id !== currentId && (e.type === 'fence' || e.type === 'gate' || e.type === 'path'))
        .flatMap((e) => [
          { x: e.x1Pct ?? 0, y: e.y1Pct ?? 0 },
          { x: e.x2Pct ?? 0, y: e.y2Pct ?? 0 },
        ]) ?? [];

    let best = candidate;
    let bestD = Infinity;
    for (const p of others) {
      const d = Math.hypot(p.x - candidate.x, p.y - candidate.y);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    const snapped = bestD <= thresholdPct ? best : candidate;
    setSnapPreview(bestD <= thresholdPct ? best : null);
    return snapped;
  };

  const snapLengthToPeers = (
    currentId: string,
    normalized: { x1: number; y1: number; x2: number; y2: number; orientation: 'h' | 'v' },
    movedEnd: 'start' | 'end',
    thresholdPct = 2.0
  ) => {
    const peers =
      garden?.elements
        .filter((e) => e.id !== currentId && (e.type === 'fence' || e.type === 'gate' || e.type === 'path'))
        .map((e) => {
          const x1 = e.x1Pct ?? 0;
          const y1 = e.y1Pct ?? 0;
          const x2 = e.x2Pct ?? 0;
          const y2 = e.y2Pct ?? 0;
          const o = Math.abs(x2 - x1) >= Math.abs(y2 - y1) ? 'h' : 'v';
          const len = o === 'h' ? Math.abs(x2 - x1) : Math.abs(y2 - y1);
          return { o, len };
        })
        .filter((p) => p.len > 0.01 && p.o === normalized.orientation) ?? [];

    if (peers.length === 0) return normalized;

    const currLen =
      normalized.orientation === 'h'
        ? Math.abs(normalized.x2 - normalized.x1)
        : Math.abs(normalized.y2 - normalized.y1);

    let bestLen = currLen;
    let bestD = Infinity;
    for (const p of peers) {
      const d = Math.abs(p.len - currLen);
      if (d < bestD) {
        bestD = d;
        bestLen = p.len;
      }
    }

    if (bestD > thresholdPct) {
      setLengthSnapPreview(null);
      return normalized;
    }

    // Ajustar el extremo movido para que la longitud sea bestLen.
    if (normalized.orientation === 'h') {
      if (movedEnd === 'end') {
        const dir = normalized.x2 >= normalized.x1 ? 1 : -1;
        const x2 = clamp(normalized.x1 + dir * bestLen, 0, 100);
        const out = { ...normalized, x2 };
        setLengthSnapPreview({ x: out.x2, y: out.y2 });
        return out;
      } else {
        const dir = normalized.x1 >= normalized.x2 ? 1 : -1;
        const x1 = clamp(normalized.x2 + dir * bestLen, 0, 100);
        const out = { ...normalized, x1 };
        setLengthSnapPreview({ x: out.x1, y: out.y1 });
        return out;
      }
    } else {
      if (movedEnd === 'end') {
        const dir = normalized.y2 >= normalized.y1 ? 1 : -1;
        const y2 = clamp(normalized.y1 + dir * bestLen, 0, 100);
        const out = { ...normalized, y2 };
        setLengthSnapPreview({ x: out.x2, y: out.y2 });
        return out;
      } else {
        const dir = normalized.y1 >= normalized.y2 ? 1 : -1;
        const y1 = clamp(normalized.y2 + dir * bestLen, 0, 100);
        const out = { ...normalized, y1 };
        setLengthSnapPreview({ x: out.x1, y: out.y1 });
        return out;
      }
    }
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setGarden((prev) => {
      if (!prev) return prev;
      return { ...prev, elements: prev.elements.filter((e) => e.id !== selectedId) };
    });
    setSelectedId(null);
  };

  const handleAdd = () => {
    const baseId = newId();
    const label = newLabel.trim() || TYPE_LABELS[newType];

    const el: GardenDesignElement = isLineType(newType)
      ? {
          id: baseId,
          type: newType,
          label,
          // Segmento inicial
          x1Pct: 10,
          y1Pct: 20,
          x2Pct: 35,
          y2Pct: 20,
          thicknessPct: newType === 'path' ? 3.4 : 0.6,
          gateSwingDeg: newType === 'gate' ? 90 : undefined,
          gateHinge: newType === 'gate' ? 'start' : undefined,
          rotationDeg: null,
        }
      : {
          id: baseId,
          type: newType,
          shape: newShape,
          label,
          xPct: 10,
          yPct: 10,
          wPct: newShape === 'circle' ? 8 : 14,
          hPct: newShape === 'circle' ? 12 : 18,
          rotationDeg: null,
        };
    setGarden((prev) => (prev ? { ...prev, elements: [...prev.elements, el] } : prev));
    setSelectedId(el.id);
  };

  const handleSave = async () => {
    if (!garden) return;
    setSaving(true);
    setError(null);
    try {
      // Si es una huerta nueva (draft), primero crearla en backend.
      if (gardenId === 'new') {
        const normalizedElements = garden.elements.map((e) => ({
          ...e,
          // normalizar ids del draft: reemplazar prefijo "new:" por "<gardenId>:"
          // aquí usamos un placeholder; el backend genera el garden_id, así que usamos ids sin prefijo.
          id: e.id.startsWith('new:') ? e.id.slice(4) : e.id,
        }));

        const saved = await gardenService.createGardenWithOptions({
          name: garden.name,
          showFrutalesButton: garden.showFrutalesButton,
          elements: normalizedElements,
        });
        setGarden(saved);
        setLastSaved(saved);
        navigate(`/garden/${saved.id}/edit`, { replace: true });
      } else {
        const saved = await gardenService.updateGarden(garden.id, {
          name: garden.name,
          showFrutalesButton: garden.showFrutalesButton,
          elements: garden.elements,
        });
        setGarden(saved);
        setLastSaved(saved);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setSaving(false);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    // Click en canvas para deseleccionar (solo si no clicas sobre un elemento)
    if (e.target === containerRef.current) {
      setSelectedId(null);
    }
  };

  return (
    <div className="page">
      <div className="garden-editor">
        <header className="garden-editor__topbar">
          <button
            className="garden-editor__btn"
            onClick={() => {
              if (!confirmLeaveIfDirty()) return;
              // si es draft, volver directo al selector
              if (gardenId === 'new') navigate('/');
              else navigate(`/garden/${gardenId}`);
            }}
          >
            Volver
          </button>
          <div className="garden-editor__title">
            <strong>Editor</strong> · {garden?.name ?? '…'}
          </div>
          <div className="garden-editor__saveState">
            {saving ? 'Guardando…' : isDirty ? 'Sin guardar' : 'Guardado'}
          </div>
          <div className="garden-editor__spacer" />
          <button className="garden-editor__btnPrimary" onClick={handleSave} disabled={saving || !garden}>
            {saving ? 'Guardando…' : 'Guardar'}
          </button>
        </header>

        {error && <div className="garden-editor__error">{error}</div>}

        <div className="garden-editor__content">
          <aside className="garden-editor__panel">
            <div className="garden-editor__panelSection">
              <div className="garden-editor__panelTitle">Añadir elemento</div>
              <label className="garden-editor__field">
                <span>Tipo</span>
                <select value={newType} onChange={(e) => setNewType(e.target.value as GardenElementType)}>
                  {Object.keys(TYPE_LABELS).map((t) => (
                    <option key={t} value={t}>
                      {TYPE_LABELS[t as GardenElementType]}
                    </option>
                  ))}
                </select>
              </label>
              {!isLineType(newType) && (
                <label className="garden-editor__field">
                  <span>Forma</span>
                  <select value={newShape} onChange={(e) => setNewShape(e.target.value as GardenElementShape)}>
                    <option value="rect">Rectángulo</option>
                    <option value="circle">Círculo</option>
                  </select>
                </label>
              )}
              <label className="garden-editor__field">
                <span>Etiqueta</span>
                <input value={newLabel} onChange={(e) => setNewLabel(e.target.value)} />
              </label>
              <button className="garden-editor__btnPrimary" onClick={handleAdd} disabled={!garden}>
                Añadir
              </button>
            </div>

            <div className="garden-editor__panelSection">
              <div className="garden-editor__panelTitle">Opciones de huerta</div>
              <label className="garden-editor__field">
                <span>Nombre</span>
                <input
                  value={garden?.name ?? ''}
                  onChange={(e) => setGarden((prev) => (prev ? { ...prev, name: e.target.value } : prev))}
                  disabled={!garden}
                />
              </label>
              <label className="garden-editor__toggle">
                <input
                  type="checkbox"
                  checked={garden?.showFrutalesButton ?? true}
                  onChange={(e) =>
                    setGarden((prev) => (prev ? { ...prev, showFrutalesButton: e.target.checked } : prev))
                  }
                  disabled={!garden}
                />
                Mostrar botón Frutales
              </label>
            </div>

            <div className="garden-editor__panelSection">
              <div className="garden-editor__panelTitle">Selección</div>
              {!selected ? (
                <div className="garden-editor__muted">Selecciona un elemento en el canvas.</div>
              ) : (
                <>
                  <label className="garden-editor__field">
                    <span>Etiqueta</span>
                    <input
                      value={selected.label}
                      onChange={(e) => updateElement(selected.id, { label: e.target.value })}
                    />
                  </label>
                  <label className="garden-editor__field">
                    <span>Tipo</span>
                    <select
                      value={selected.type}
                      onChange={(e) =>
                        updateElement(selected.id, { type: e.target.value as GardenElementType })
                      }
                    >
                      {Object.keys(TYPE_LABELS).map((t) => (
                        <option key={t} value={t}>
                          {TYPE_LABELS[t as GardenElementType]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="garden-editor__field">
                    <span>Forma</span>
                    <select
                      value={selected.shape}
                      onChange={(e) =>
                        updateElement(selected.id, { shape: e.target.value as GardenElementShape })
                      }
                    >
                      <option value="rect">Rectángulo</option>
                      <option value="circle">Círculo</option>
                    </select>
                  </label>

                  {(selected.type === 'path') && (
                    <label className="garden-editor__field">
                      <span>Ancho del camino</span>
                      <input
                        type="range"
                        min={1.5}
                        max={6}
                        step={0.1}
                        value={selected.thicknessPct ?? 3.4}
                        onChange={(e) => updateElement(selected.id, { thicknessPct: Number(e.target.value) })}
                      />
                    </label>
                  )}

                  {(selected.type === 'gate') && (
                    <>
                      <label className="garden-editor__field">
                        <span>Bisagra</span>
                        <select
                          value={selected.gateHinge ?? 'start'}
                          onChange={(e) => updateElement(selected.id, { gateHinge: e.target.value as 'start' | 'end' })}
                        >
                          <option value="start">Inicio del segmento</option>
                          <option value="end">Final del segmento</option>
                        </select>
                      </label>
                      <label className="garden-editor__field">
                        <span>Apertura</span>
                        <select
                          value={(selected.gateSwingDeg ?? 90) >= 0 ? 'cw' : 'ccw'}
                          onChange={(e) => updateElement(selected.id, { gateSwingDeg: e.target.value === 'cw' ? Math.abs(selected.gateSwingDeg ?? 90) : -Math.abs(selected.gateSwingDeg ?? 90) })}
                        >
                          <option value="cw">Hacia un lado</option>
                          <option value="ccw">Hacia el otro</option>
                        </select>
                      </label>
                    </>
                  )}
                  <button className="garden-editor__btnDanger" onClick={deleteSelected}>
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </aside>

          <main className="garden-editor__canvasWrap">
            <div
              ref={containerRef}
              className="garden-editor__canvas garden-design-canvas"
              onMouseDown={handleCanvasClick}
            >
              {/* Elementos lineales (SVG overlay) */}
              <svg className="garden-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  {/* Textura simple tipo piedra para el camino */}
                  <pattern id="stonePattern" width="6" height="6" patternUnits="userSpaceOnUse">
                    <rect width="6" height="6" fill="rgba(140, 130, 120, 0.20)" />
                    <circle cx="1.2" cy="1.8" r="0.9" fill="rgba(110, 100, 92, 0.55)" />
                    <circle cx="4.6" cy="1.1" r="0.8" fill="rgba(160, 150, 140, 0.55)" />
                    <circle cx="3.4" cy="4.7" r="0.9" fill="rgba(120, 110, 102, 0.55)" />
                    <circle cx="1.2" cy="4.2" r="0.7" fill="rgba(175, 165, 155, 0.5)" />
                  </pattern>
                </defs>

                {/* Puntos de anclaje (extremos) para ayudar a empalmar */}
                {(garden?.elements ?? [])
                  .filter((e) => e.type === 'fence' || e.type === 'gate' || e.type === 'path')
                  .flatMap((e) => [
                    { id: `${e.id}:a`, x: e.x1Pct ?? 0, y: e.y1Pct ?? 0 },
                    { id: `${e.id}:b`, x: e.x2Pct ?? 0, y: e.y2Pct ?? 0 },
                  ])
                  .map((p) => (
                    <circle
                      key={p.id}
                      cx={p.x}
                      cy={p.y}
                      r={0.8}
                      fill="rgba(255,255,255,0.85)"
                      stroke="rgba(0,0,0,0.35)"
                      strokeWidth={0.25}
                    />
                  ))}

                {/* Punto de snap activo (se resalta mientras arrastras) */}
                {snapPreview && (
                  <circle
                    cx={snapPreview.x}
                    cy={snapPreview.y}
                    r={1.6}
                    fill="rgba(27, 94, 32, 0.2)"
                    stroke="#1b5e20"
                    strokeWidth={0.5}
                  />
                )}

                {/* Punto de snap por longitud (guía tipo PowerPoint) */}
                {lengthSnapPreview && (
                  <circle
                    cx={lengthSnapPreview.x}
                    cy={lengthSnapPreview.y}
                    r={1.6}
                    fill="rgba(25, 118, 210, 0.18)"
                    stroke="rgba(25, 118, 210, 0.95)"
                    strokeWidth={0.5}
                  />
                )}

                {(garden?.elements ?? [])
                  .filter((e) => e.type === 'fence' || e.type === 'gate' || e.type === 'path')
                  .map((e) => {
                    const x1 = e.x1Pct ?? 0;
                    const y1 = e.y1Pct ?? 0;
                    const x2 = e.x2Pct ?? 0;
                    const y2 = e.y2Pct ?? 0;
                    const thick = e.thicknessPct ?? (e.type === 'path' ? 3.4 : 0.6);
                    const isSelected = selectedId === e.id;

                    // Gate arc (simple architectural symbol)
                    const isGate = e.type === 'gate';
                    const hinge = e.gateHinge ?? 'start';
                    const deg = e.gateSwingDeg ?? 90;
                    const swingRad = (deg * Math.PI) / 180;
                    const hx = hinge === 'start' ? x1 : x2;
                    const hy = hinge === 'start' ? y1 : y2;
                    const lx = hinge === 'start' ? x2 : x1;
                    const ly = hinge === 'start' ? y2 : y1;
                    const r = Math.hypot(lx - hx, ly - hy);
                    const arcEnd = rotateAround(hx, hy, lx, ly, swingRad);
                    const sweepFlag = deg >= 0 ? 1 : 0;

                    return (
                      <g key={e.id}>
                        {/* hit area */}
                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke="transparent"
                          strokeWidth={Math.max(6, thick * 2)}
                          onPointerDown={(ev) => {
                            ev.stopPropagation();
                            setSelectedId(e.id);
                          }}
                        />

                        <line
                          x1={x1}
                          y1={y1}
                          x2={x2}
                          y2={y2}
                          stroke={
                            e.type === 'path'
                              ? 'url(#stonePattern)'
                              : 'rgba(62, 45, 30, 0.92)'
                          }
                          strokeWidth={e.type === 'path' ? thick : 1.0}
                          strokeLinecap="round"
                          strokeOpacity={1}
                        />

                        {/* Camino: borde sutil para darle volumen */}
                        {e.type === 'path' && (
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(60, 50, 40, 0.35)"
                            strokeWidth={Math.max(1.2, thick + 0.7)}
                            strokeLinecap="round"
                            opacity={0.55}
                          />
                        )}

                        {/* Vallado: postes y doble travesaño (solo para líneas ortogonales) */}
                        {e.type === 'fence' && (() => {
                          const o = lineOrientation(x1, y1, x2, y2);
                          const len = o === 'h' ? Math.abs(x2 - x1) : Math.abs(y2 - y1);
                          const step = 3.6;
                          const count = Math.max(2, Math.floor(len / step));
                          const posts = Array.from({ length: count + 1 }, (_, i) => i);
                          const minX = Math.min(x1, x2);
                          const minY = Math.min(y1, y2);
                          const dir = o === 'h' ? (x2 >= x1 ? 1 : -1) : (y2 >= y1 ? 1 : -1);
                          return (
                            <>
                              {/* travesaños */}
                              <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="rgba(62,45,30,0.95)"
                                strokeWidth={0.8}
                                strokeLinecap="round"
                              />
                              <line
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="rgba(255,255,255,0.10)"
                                strokeWidth={0.25}
                                strokeLinecap="round"
                              />
                              {posts.map((i) => {
                                const t = (i / count) * len;
                                const px = o === 'h' ? x1 + dir * t : x1;
                                const py = o === 'v' ? y1 + dir * t : y1;
                                const size = 1.4;
                                return (
                                  <line
                                    key={`${e.id}:post:${i}`}
                                    x1={o === 'h' ? px : px - size}
                                    y1={o === 'h' ? py - size : py}
                                    x2={o === 'h' ? px : px + size}
                                    y2={o === 'h' ? py + size : py}
                                    stroke="rgba(62,45,30,0.92)"
                                    strokeWidth={0.9}
                                    strokeLinecap="round"
                                  />
                                );
                              })}
                            </>
                          );
                        })()}

                        {isGate && (
                          <>
                            <path
                              d={`M ${hx} ${hy} A ${r} ${r} 0 0 ${sweepFlag} ${arcEnd.x} ${arcEnd.y}`}
                              fill="none"
                              stroke="rgba(62, 45, 30, 0.55)"
                              strokeWidth={0.55}
                              strokeDasharray="1.2 1.1"
                            />
                            <line
                              x1={hx}
                              y1={hy}
                              x2={lx}
                              y2={ly}
                              stroke="rgba(62,45,30,0.95)"
                              strokeWidth={1.15}
                              strokeLinecap="round"
                            />
                            <circle cx={hx} cy={hy} r={0.9} fill="rgba(62,45,30,0.95)" />
                          </>
                        )}

                        {/* Handles */}
                        {isSelected && (
                          <>
                            <circle
                              cx={x1}
                              cy={y1}
                              r={1.5}
                              fill="white"
                              stroke="#1b5e20"
                              strokeWidth={0.5}
                              onPointerDown={(ev) => {
                                ev.stopPropagation();
                                const onMove = (mv: PointerEvent) => {
                                  if (!containerRef.current) return;
                                  const rect = containerRef.current.getBoundingClientRect();
                                  const raw = {
                                    x: clamp(((mv.clientX - rect.left) / rect.width) * 100, 0, 100),
                                    y: clamp(((mv.clientY - rect.top) / rect.height) * 100, 0, 100),
                                  };
                                  const snapped = snapEndpoint(e.id, raw);
                                  const norm0 = normalizeOrthogonal(snapped.x, snapped.y, x2, y2);
                                  const norm = snapLengthToPeers(e.id, norm0, 'start');
                                  updateElement(e.id, { x1Pct: norm.x1, y1Pct: norm.y1, x2Pct: norm.x2, y2Pct: norm.y2 });
                                };
                                const onUp = () => {
                                  setSnapPreview(null);
                                  setLengthSnapPreview(null);
                                  window.removeEventListener('pointermove', onMove);
                                  window.removeEventListener('pointerup', onUp);
                                };
                                window.addEventListener('pointermove', onMove);
                                window.addEventListener('pointerup', onUp);
                              }}
                            />
                            <circle
                              cx={x2}
                              cy={y2}
                              r={1.5}
                              fill="white"
                              stroke="#1b5e20"
                              strokeWidth={0.5}
                              onPointerDown={(ev) => {
                                ev.stopPropagation();
                                const onMove = (mv: PointerEvent) => {
                                  if (!containerRef.current) return;
                                  const rect = containerRef.current.getBoundingClientRect();
                                  const raw = {
                                    x: clamp(((mv.clientX - rect.left) / rect.width) * 100, 0, 100),
                                    y: clamp(((mv.clientY - rect.top) / rect.height) * 100, 0, 100),
                                  };
                                  const snapped = snapEndpoint(e.id, raw);
                                  const norm0 = normalizeOrthogonal(x1, y1, snapped.x, snapped.y);
                                  const norm = snapLengthToPeers(e.id, norm0, 'end');
                                  updateElement(e.id, { x1Pct: norm.x1, y1Pct: norm.y1, x2Pct: norm.x2, y2Pct: norm.y2 });
                                };
                                const onUp = () => {
                                  setSnapPreview(null);
                                  setLengthSnapPreview(null);
                                  window.removeEventListener('pointermove', onMove);
                                  window.removeEventListener('pointerup', onUp);
                                };
                                window.addEventListener('pointermove', onMove);
                                window.addEventListener('pointerup', onUp);
                              }}
                            />
                          </>
                        )}
                      </g>
                    );
                  })}
              </svg>

              {garden?.elements.map((el) => (
                // Elementos lineales se dibujan por SVG
                (el.type === 'fence' || el.type === 'gate' || el.type === 'path') ? null :
                <Rnd
                  key={el.id}
                  bounds="parent"
                  size={
                    containerSize
                      ? {
                          width: ((el.wPct ?? 0) / 100) * containerSize.w,
                          height: ((el.hPct ?? 0) / 100) * containerSize.h,
                        }
                      : { width: 0, height: 0 }
                  }
                  position={
                    containerSize
                      ? {
                          x: ((el.xPct ?? 0) / 100) * containerSize.w,
                          y: ((el.yPct ?? 0) / 100) * containerSize.h,
                        }
                      : { x: 0, y: 0 }
                  }
                  enableResizing
                  disableDragging={false}
                  onDragStart={() => setSelectedId(el.id)}
                  onResizeStart={() => setSelectedId(el.id)}
                  onDragStop={(_, d) => {
                    const parent = containerRef.current?.getBoundingClientRect();
                    if (!parent) return;
                    const xPct = clamp((d.x / parent.width) * 100, 0, 100);
                    const yPct = clamp((d.y / parent.height) * 100, 0, 100);
                    updateElement(el.id, { xPct, yPct });
                  }}
                  onResizeStop={(_, __, ref, ___, position) => {
                    const parent = containerRef.current?.getBoundingClientRect();
                    if (!parent) return;
                    const wPct = clamp((ref.offsetWidth / parent.width) * 100, 1, 100);
                    const hPct = clamp((ref.offsetHeight / parent.height) * 100, 1, 100);
                    const xPct = clamp((position.x / parent.width) * 100, 0, 100);
                    const yPct = clamp((position.y / parent.height) * 100, 0, 100);
                    updateElement(el.id, { wPct, hPct, xPct, yPct });
                  }}
                  style={{
                    borderRadius: el.shape === 'circle' ? '999px' : '6px',
                    border: (() => {
                      if (selectedId === el.id) return '3px solid #1b5e20';
                      return '2px solid rgba(0,0,0,0.35)';
                    })(),
                    background: (() => {
                      if (el.type === 'greenhouse') return 'rgba(144, 238, 144, 0.45)';
                      if (el.type === 'compost') return 'rgba(92, 64, 51, 0.6)';
                      if (el.type === 'bed') return 'rgba(139, 111, 71, 0.55)';
                      return 'rgba(74, 124, 89, 0.55)';
                    })(),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    userSelect: 'none',
                    cursor: 'move',
                    padding: '0.25rem',
                    boxSizing: 'border-box',
                    overflow: 'hidden',
                  }}
                  onMouseDown={() => setSelectedId(el.id)}
                >
                  <div className="garden-editor__elLabel">{el.label}</div>
                </Rnd>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

