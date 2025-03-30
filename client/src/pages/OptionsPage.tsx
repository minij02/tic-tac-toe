import Options from '../components/Options';
import { useNavigate } from 'react-router-dom';

function OptionsPage() {
  const navigate = useNavigate();

  const startGame = (playerType: string, gameTime: number) => {
    // URL에 쿼리로 정보 전달하거나 상태 관리 라이브러리로 저장 가능
    navigate(`/game?player=${playerType}&time=${gameTime}`);
  };

  return <Options onConfirm={startGame} />;
}

export default OptionsPage;