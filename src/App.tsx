import { useState } from 'react';
import USMap from './USMap';
import './App.css';

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [colorMaps, setColorMaps] = useState<Record<string, Record<string, string>>>({
    puyu: {},
    jindian: {},
    zifei: {},
    yuting: {},
    shuyu: {}
  });
  const [scores, setScores] = useState({
    puyu: 0,
    jindian: 0, 
    zifei: 0,
    yuting: 0,
    shuyu: 0
  });
  const [currentPlayer, setCurrentPlayer] = useState('puyu');
  const [stateCount, setStateCount] = useState<Record<string, Record<string, number>>>({
    puyu: {},
    jindian: {},
    zifei: {},
    yuting: {},
    shuyu: {}
  });

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
      <div style={styles.rankingContainer}>
        {Object.entries(scores).map(([name, score]) => (
          <div key={name} style={styles.rankingItem}>
            <select 
              style={styles.select}
              value={name}
              onChange={(e) => name === currentPlayer && setCurrentPlayer(e.target.value)}
              onClick={() => setCurrentPlayer(name)}
            >
              <option value={name}>{name}</option>
            </select>
            <span style={{
              ...styles.score,
              color: name === currentPlayer ? '#3498db' : '#242424'
            }}>{score}</span>
          </div>
        ))}
      </div>

      <h1 style={styles.title}>Travel Ranking US Map (Coloring)</h1>

      <USMap
        onStateClick={assignRandomColor}
        colorMap={colorMaps[currentPlayer]}
      />

      <section style={styles.info}>
        <p style={styles.text}>
          {selected
            ? `${currentPlayer} clicked: ${selected} (${stateCount[currentPlayer][selected] || 0} times) and the color is ${colorMaps[currentPlayer][selected]}`
            : `Current player: ${currentPlayer} - Click any state to score!`}
        </p>
        <button style={styles.button} onClick={clearColors}>
          Clear
        </button>
      </section>

      <footer style={styles.footer}>
        <span>Built with React + Vite ⚡</span>
      </footer>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrapper: {
    textAlign: 'center', 
    padding: '2rem 1rem',
    fontFamily: "'Poppins', sans-serif",
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    width: '100vw',
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rankingContainer: {
    position: 'fixed',
    left: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  rankingItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '0.5rem',
    gap: '0.5rem',
  },
  select: {
    padding: '0.3rem',
    borderRadius: '5px',
    border: '1px solid #ddd',
    cursor: 'pointer',
  },
  score: {
    fontWeight: 'bold',
    color: '#242424',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#2c3e50',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    letterSpacing: '1px',
    position: 'relative',
  },
  info: {
    marginTop: '1rem',
    fontSize: '1.1rem',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    color: '#242424'
  },
  text: {
    color: '#242424'
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '25px',
    backgroundColor: '#3498db',
    color: 'white',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  footer: {
    marginTop: '2.5rem',
    fontSize: '1rem',
    color: '#242424',
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '1rem 2rem',
    borderRadius: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
};
