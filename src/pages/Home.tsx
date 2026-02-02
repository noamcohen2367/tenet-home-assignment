import { useNavigate } from 'react-router-dom';
import { BsInboxFill } from 'react-icons/bs';

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/alerts')}>
        inbox
        <BsInboxFill />
      </button>
    </div>
  );
}

export default Home;
