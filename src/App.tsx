import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import USMap from './USMap';
import { PlayerScores, ColorMaps, StateCount } from './types';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const [colorMaps, setColorMaps] = useState<ColorMaps>({
    puyu: {},
    jindian: {},
    zifei: {},
    yuting: {},
    shuyu: {}
  });
  const [scores, setScores] = useState<PlayerScores>({
    puyu: 0,
    jindian: 0, 
    zifei: 0,
    yuting: 0,
    shuyu: 0
  });
  const [currentPlayer, setCurrentPlayer] = useState('puyu');
  const [stateCount, setStateCount] = useState<StateCount>({
    puyu: {},
    jindian: {},
    zifei: {},
    yuting: {},
    shuyu: {}
  });

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const assignRandomColor = (state: string) => {
    // If already colored by current player, return early
    if (colorMaps[currentPlayer][state]) {
      setSelected(state);
      return;
    }

    // Generate random color
    const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

    // Update color map for current player
    setColorMaps((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        [state]: color
      }
    }));
    
    // Update state count for current player
    setStateCount((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        [state]: (prev[currentPlayer][state] || 0) + 1
      }
    }));

    // Update score only when state is clicked first time
    if (!stateCount[currentPlayer][state]) {
      setScores((prev) => ({
        ...prev,
        [currentPlayer]: prev[currentPlayer] + 1
      }));
    }
    
    setSelected(state);
  };

  const clearColors = () => {
    // Clear only the current player's colors
    setColorMaps((prev) => ({
      ...prev,
      [currentPlayer]: {}
    }));
    
    setSelected(null);
    
    // Clear only current player's state count
    setStateCount((prev) => ({
      ...prev,
      [currentPlayer]: {}
    }));
    
    // Clear only current player's score
    setScores((prev) => ({
      ...prev,
      [currentPlayer]: 0
    }));
  };

  return (
    <main style={styles.wrapper}>
      <div className="header">
        <h1 className="title">Travel Ranking US Map (Coloring)</h1>
        <button onClick={handleLogout} className="button logoutButton">
          Logout
        </button>
      </div>

      <div style={styles.content}>
        <div className="rankingContainer">
          {Object.entries(scores).map(([name, score]) => (
            <div key={name} style={styles.rankingItem}>
              <select 
                className="select"
                value={name}
                onChange={(e) => name === currentPlayer && setCurrentPlayer(e.target.value)}
                onClick={() => setCurrentPlayer(name)}
              >
                <option value={name}>{name}</option>
              </select>
              <span className="score" style={{
                color: name === currentPlayer ? '#3498db' : '#242424'
              }}>{score}</span>
            </div>
          ))}
        </div>

        <div className="mapContainer">
          <USMap
            onStateClick={assignRandomColor}
            colorMap={colorMaps[currentPlayer]}
          />
        </div>

        <section className="info">
          <p className="text">
            {selected
              ? `${currentPlayer} clicked: ${selected} (${stateCount[currentPlayer][selected] || 0} times) and the color is ${colorMaps[currentPlayer][selected]}`
              : `Current player: ${currentPlayer} - Click any state to score!`}
          </p>
          <button className="button" onClick={clearColors}>
            Clear
          </button>
        </section>
      </div>

      <footer className="footer">
        <span>Built with React + Vite ⚡</span>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    textAlign: 'center', 
    padding: '1rem',
    fontFamily: "'Poppins', sans-serif",
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    width: '100vw',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowX: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1200px',
    gap: '1rem',
  },
  rankingItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
    gap: '0.5rem',
  },
};
