/**
 * Timeline de actividades recientes
 */
import React from 'react';
import { useActivities } from '../../hooks/useActivities';
import { GardenElementId } from '../../types';

interface ActivityTimelineProps {
  detailData: ReturnType<typeof import('../../hooks/useElementDetail').useElementDetail>;
}

/**
 * Timeline de actividades
 */
export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  detailData,
}) => {
  const { getRecentActivities } = useActivities(
    detailData.elementId as GardenElementId
  );
  const activities = getRecentActivities(10);

  if (activities.length === 0) {
    return (
      <div className="activity-timeline">
        <h3>Actividades recientes</h3>
        <p className="empty-state">No hay actividades registradas aún</p>
      </div>
    );
  }

  return (
    <div className="activity-timeline">
      <h3>Actividades recientes</h3>
      <ul className="activity-list">
        {activities.map((activity) => {
          const date = new Date(activity.date);
          const formattedDate = date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });

          return (
            <li key={activity.id} className="activity-item">
              <div className="activity-type">{activity.type}</div>
              <div className="activity-date">{formattedDate}</div>
              {activity.notes && (
                <div className="activity-notes">{activity.notes}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

