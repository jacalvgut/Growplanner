/**
 * Componente principal que renderiza el layout del jardín
 * Organiza todos los elementos interactuables del huerto en su posición correspondiente
 */
import React from 'react';
import { GardenElement } from './GardenElement';
import type { Garden } from '../../gardens/types';
import * as gardenService from '../../gardens/services/gardenService';

/**
 * Layout principal del jardín
 * Renderiza todos los elementos del huerto en el orden correcto
 */
interface GardenLayoutProps {
  gardenId: string;
}

export const GardenLayout: React.FC<GardenLayoutProps> = ({ gardenId }) => {
  const [garden, setGarden] = React.useState<Garden | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const g = await gardenService.getGarden(gardenId);
        if (!cancelled) setGarden(g);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gardenId]);

  return (
    <div className={gardenId === 'default' ? 'garden garden--with-divider' : 'garden'}>
      {error && (
        <div style={{ position: 'absolute', inset: 12, pointerEvents: 'none' }}>
          <div
            style={{
              display: 'inline-block',
              padding: '0.5rem 0.75rem',
              borderRadius: 10,
              background: 'rgba(255, 99, 71, 0.18)',
              border: '1px solid rgba(255, 99, 71, 0.45)',
              fontWeight: 700,
            }}
          >
            Error cargando huerta: {error}
          </div>
        </div>
      )}

      {/* Elementos lineales (vallado/puerta/camino) */}
      <svg className="garden-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="stonePattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="rgba(140, 130, 120, 0.20)" />
            <circle cx="1.2" cy="1.8" r="0.9" fill="rgba(110, 100, 92, 0.55)" />
            <circle cx="4.6" cy="1.1" r="0.8" fill="rgba(160, 150, 140, 0.55)" />
            <circle cx="3.4" cy="4.7" r="0.9" fill="rgba(120, 110, 102, 0.55)" />
            <circle cx="1.2" cy="4.2" r="0.7" fill="rgba(175, 165, 155, 0.5)" />
          </pattern>
        </defs>

        {(garden?.elements ?? [])
          .filter((e) => e.type === 'fence' || e.type === 'gate' || e.type === 'path')
          .map((e) => {
            const x1 = e.x1Pct ?? 0;
            const y1 = e.y1Pct ?? 0;
            const x2 = e.x2Pct ?? 0;
            const y2 = e.y2Pct ?? 0;
            const thick = e.thicknessPct ?? (e.type === 'path' ? 3.4 : 0.6);

            const isGate = e.type === 'gate';
            const hinge = e.gateHinge ?? 'start';
            const deg = e.gateSwingDeg ?? 90;
            const swingRad = (deg * Math.PI) / 180;
            const hx = hinge === 'start' ? x1 : x2;
            const hy = hinge === 'start' ? y1 : y2;
            const lx = hinge === 'start' ? x2 : x1;
            const ly = hinge === 'start' ? y2 : y1;
            const r = Math.hypot(lx - hx, ly - hy);
            const cos = Math.cos(swingRad);
            const sin = Math.sin(swingRad);
            const dx = lx - hx;
            const dy = ly - hy;
            const ax = hx + dx * cos - dy * sin;
            const ay = hy + dx * sin + dy * cos;
            const sweepFlag = deg >= 0 ? 1 : 0;

            return (
              <g key={e.id}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={e.type === 'path' ? 'url(#stonePattern)' : 'rgba(62, 45, 30, 0.92)'}
                  strokeWidth={e.type === 'path' ? thick : 1.0}
                  strokeLinecap="round"
                />
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
                {e.type === 'fence' && (
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(62, 45, 30, 0.95)"
                    strokeWidth={0.9}
                    strokeLinecap="round"
                  />
                )}
                {isGate && (
                  <path
                    d={`M ${hx} ${hy} A ${r} ${r} 0 0 ${sweepFlag} ${ax} ${ay}`}
                    fill="none"
                    stroke="rgba(62, 45, 30, 0.55)"
                    strokeWidth={0.55}
                    strokeDasharray="1.2 1.1"
                  />
                )}
                {isGate && (
                  <>
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
              </g>
            );
          })}
      </svg>

      {/* Elementos de área (bancales, etc.) */}
      {(garden?.elements ?? [])
        .filter((el) => el.type !== 'fence' && el.type !== 'gate' && el.type !== 'path')
        .map((el) => (
          <GardenElement
            key={el.id}
            element={{
              id: el.id as any,
              type: el.type as any,
              name: el.label,
              displayName: el.label,
              className: `zone garden-design-element garden-design-element--${el.type}`,
            }}
            gardenId={gardenId}
            design={el}
          />
        ))}
    </div>
  );
};

