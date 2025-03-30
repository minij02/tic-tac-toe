import Game from '../components/Game';
import { useSearchParams, Navigate } from 'react-router-dom';

function GamePage() {
  const [params] = useSearchParams();

  const playerType = params.get('player');
  const gameTime = Number(params.get('time'));

   // 필수 값이 없으면 홈으로 리다이렉트
   if (!playerType || !gameTime) {
    return <Navigate to="/" replace />;
  }

  return <Game playerType={playerType} gameTime={gameTime} />;
}

export default GamePage;