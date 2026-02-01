import { useParams } from 'react-router-dom';
import { alertsMock } from '../data/DataContract';
import '../scss/pages/AlertDetails.css';
function AlertDetails() {
  const { id } = useParams<{ id: string }>();
  const alertData = alertsMock.find((alert) => alert.id === id);
  return (
    <div className="alert-details">
      {alertData ? (
        <>
          <div className="alert-details__container">
            <h1 className="alert-details--title">Alert Details</h1>
            <span className="alert-details--item">id: {id}</span>
            <span className="alert-details--item">
              Title: {alertData.title}
            </span>
            <span className="alert-details--item">
              Severity: {alertData.severity}
            </span>
            <span className="alert-details--item">
              Status: {alertData.status}
            </span>
            <span className="alert-details--item">
              Summary: {alertData.summary}
            </span>
            <span className="alert-details--item">
              Actor: {alertData.actor.agentName} {alertData.actor.agentName}
            </span>
            <span>Created At: {alertData.createdAt}</span>
          </div>
          <div className="alert-details__evidence">
            <h2 className="alert-details--title">evidence items</h2>
            <span className="alert-details--item">kind: </span>
            <span className="alert-details--item">timestamp: </span>
            <span className="alert-details--item">snipped: </span>
          </div>{' '}
        </>
      ) : (
        <div className="alert-details--not-found">Alert not found</div>
      )}
    </div>
  );
}

export default AlertDetails;
