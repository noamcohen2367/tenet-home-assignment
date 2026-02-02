import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';

import type {
  AlertDetails as AlertDetailsType,
  AlertStatus,
  Severity,
} from '../data/DataContract';
import { acknowledgeAlert, getAlertDetails } from '../api/alertsApi';

import '../css/pages/AlertDetails.css';

type PageStatus = 'loading' | 'ready' | 'error' | 'not_found';

function AlertDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const severityClassMap: Record<Severity, string> = useMemo(
    () => ({
      low: 'severity--low',
      medium: 'severity--medium',
      high: 'severity--high',
      critical: 'severity--critical',
    }),
    [],
  );

  const statusClassMap: Record<AlertStatus, string> = useMemo(
    () => ({
      open: 'status--open',
      acknowledged: 'status--acknowledged',
    }),
    [],
  );

  const [pageStatus, setPageStatus] = useState<PageStatus>('loading');
  const [alertData, setAlertData] = useState<AlertDetailsType | null>(null);
  const [isAckLoading, setIsAckLoading] = useState(false);

  const load = async () => {
    if (!id) {
      setPageStatus('not_found');
      setAlertData(null);
      return;
    }

    setPageStatus('loading');
    try {
      const data = await getAlertDetails(id);
      setAlertData(data);
      setPageStatus('ready');
    } catch (err) {
      const message = err instanceof Error ? err.message : '';
      if (message === 'NOT_FOUND') {
        setPageStatus('not_found');
        setAlertData(null);
      } else {
        setPageStatus('error');
      }
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // --- states ---
  if (pageStatus === 'loading') {
    return <div className="alert-details">Loading...</div>;
  }

  if (pageStatus === 'error') {
    return (
      <div className="alert-details">
        <div className="alert-details--not-found">Something went wrong.</div>
        <button onClick={load}>Retry</button>
        <button onClick={() => navigate('/alerts')}>
          <IoIosArrowBack /> back to alerts
        </button>
      </div>
    );
  }

  if (pageStatus === 'not_found' || !alertData) {
    return (
      <div className="alert-details--not-found">
        <h2>Alert not found</h2>
        <button onClick={() => navigate('/alerts')}>
          <IoIosArrowBack /> back to alerts
        </button>
      </div>
    );
  }

  const isAcknowledged = alertData.status === 'acknowledged';

  return (
    <div className="alert-details">
      <div className="alert-details--header">
        <button onClick={() => navigate('/alerts')}>
          <IoIosArrowBack />
          back
        </button>

        <h1 className="alert-details--title">{`Alert Details (#${id})`}</h1>
      </div>

      <div className="alert-details__container">
        <div className="alert-details--sub-header">
          <h3 className="alert-details__item">{alertData.title}</h3>

          <span
            className={`alert-details__badge ${severityClassMap[alertData.severity]}`}
          >
            {alertData.severity}
          </span>

          <span
            className={`alert-details__badge ${statusClassMap[alertData.status]}`}
          >
            {alertData.status}
          </span>
        </div>

        <button
          className="alert-details__ack-btn"
          disabled={isAcknowledged || isAckLoading}
          onClick={async () => {
            if (!id) return;
            if (isAcknowledged) return;

            setIsAckLoading(true);
            try {
              const updated = await acknowledgeAlert(id);
              setAlertData(updated);
            } finally {
              setIsAckLoading(false);
            }
          }}
        >
          {isAckLoading
            ? 'Acknowledging...'
            : isAcknowledged
              ? 'Acknowledged'
              : 'Acknowledge'}
        </button>

        <h3 className="alert-details__item--summary">{alertData.summary}</h3>

        <h4 className="alert-details__item">
          {alertData.actor.agentName} | {alertData.actor.environment}
        </h4>

        <span className="alert-details__item">{alertData.createdAt}</span>
      </div>

      {/* Evidence Items section */}
      <div className="alert-details__evidence">
        <h2 className="alert-details--title">
          Evidence Items ({alertData.evidence.length})
        </h2>

        {alertData.evidence.length === 0 ? (
          <div className="alert-details__empty">
            No evidence for this alert.
          </div>
        ) : (
          <ul className="evidence-list">
            {alertData.evidence.map((ev) => (
              <li key={ev.id} className="evidence-item">
                <div className="evidence-item__header">
                  <span className={`evidence-kind evidence-kind--${ev.kind}`}>
                    {ev.kind}
                  </span>

                  <time className="evidence-time" dateTime={ev.timestamp}>
                    {new Date(ev.timestamp).toLocaleString()}
                  </time>
                </div>

                <pre className="evidence-snippet">{ev.snippet}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AlertDetails;
