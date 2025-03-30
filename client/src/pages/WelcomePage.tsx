import Welcome from '../components/Welcome';
import { useNavigate } from 'react-router-dom';

function WelcomePage() {
  const navigate = useNavigate();
  return <Welcome onStart={() => navigate('/options')} />;
}

export default WelcomePage;