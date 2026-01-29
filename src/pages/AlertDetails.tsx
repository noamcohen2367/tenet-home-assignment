import { useParams } from 'react-router-dom';

function AlertDetails() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Alert {id}</h1>
    </div>
  );
}

export default AlertDetails;
