/**
 * Panel de avisos y notificaciones
 */
import React from 'react';
import { getPendingAlerts, getUpcomingAlerts } from '../../services/alertService';

interface AlertsPanelProps {
  detailData: ReturnType<typeof import('../../hooks/useElementDetail').useElementDetail>;
}

/**
 * Panel de avisos
 */
export const AlertsPanel: React.FC<AlertsPanelProps> = ({ detailData }) => {
  const pendingAlerts = getPendingAlerts(detailData.alerts);
  const upcomingAlerts = getUpcomingAlerts(pendingAlerts, 7);
  const overdueAlerts = detailData.alerts.filter(
    (alert) => !alert.completed && new Date(alert.dueDate) < new Date()
  );

  if (pendingAlerts.length === 0) {
    return (
      <div className="alerts-panel">
        <h3>Avisos</h3>
        <p className="empty-state">No hay avisos pendientes</p>
      </div>
    );
  }

  return (
    <div className="alerts-panel">
      <h3>Avisos</h3>
      {overdueAlerts.length > 0 && (
        <div className="alerts-section">
          <h4 className="alert-overdue">Vencidos</h4>
          <ul className="alerts-list">
            {overdueAlerts.map((alert) => (
              <li key={alert.id} className="alert-item overdue">
                <div className="alert-message">{alert.message}</div>
                <div className="alert-date">
                  {new Date(alert.dueDate).toLocaleDateString('es-ES')}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {upcomingAlerts.length > 0 && (
        <div className="alerts-section">
          <h4 className="alert-upcoming">Próximos (7 días)</h4>
          <ul className="alerts-list">
            {upcomingAlerts.map((alert) => (
              <li key={alert.id} className="alert-item upcoming">
                <div className="alert-message">{alert.message}</div>
                <div className="alert-date">
                  {new Date(alert.dueDate).toLocaleDateString('es-ES')}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

