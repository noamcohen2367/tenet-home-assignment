import { useNavigate, useParams } from 'react-router-dom';
import {
  alertsMock,
  type AlertStatus,
  type Severity,
} from '../data/DataContract';
import { IoIosArrowBack } from 'react-icons/io';

import '../css/pages/AlertDetails.css';
function AlertDetails() {
  const { id } = useParams<{ id: string }>();
  const alertData = alertsMock.find((alert) => alert.id === id);
  const navigate = useNavigate();
  const severityClassMap: Record<Severity, string> = {
    low: 'severity--low',
    medium: 'severity--medium',
    high: 'severity--high',
    critical: 'severity--critical',
  };
  const statusClassMap: Record<AlertStatus, string> = {
    open: 'status--open',
    acknowledged: 'status--acknowledged',
  };
  return (
    <div className="alert-details">
      {alertData ? (
        <>
          <div className="alert-details--header">
            <button onClick={() => navigate('/alerts')}>
              <IoIosArrowBack />
              {'back'}
            </button>
            <h1 className="alert-details--title">
              {`Alert Details (#${id})`}
            </h1>{' '}
          </div>
          <div className="alert-details__container">
            <div className="alert-details--sub-header">
              <h3 className="alert-details__item">{alertData.title}</h3>
              <span
                className={`alert-details__item__${severityClassMap[alertData.severity]}`}
              >
                {alertData.severity}
              </span>
              <span
                className={`alert-details__item__${statusClassMap[alertData.status]}`}
              >
                {alertData.status}
              </span>
            </div>

            <h3 className="alert-details__item--summary">
              {alertData.summary}
            </h3>
            <h4 className="alert-details__item">
              {alertData.actor.agentName} | {alertData.actor.environment}
            </h4>
            <span>{alertData.createdAt}</span>
          </div>
          <div className="alert-details__evidence">
            <h2 className="alert-details--title">Evidence Items</h2>
            <span className="alert-details--item">kind: </span>
            <span className="alert-details--item">timestamp: </span>
            <span className="alert-details--item">snipped: </span>
          </div>{' '}
        </>
      ) : (
        <>
          <div className="alert-details--not-found">Alert not found</div>
          <button onClick={() => navigate('/')}>
            <IoIosArrowBack />
            {'back to home'}
          </button>
        </>
      )}
    </div>
  );
}

export default AlertDetails;
