import { useState } from 'react';
import USMap from './USMap';
import './App.css';

export default function App() {
  const [selected, setSelected] = useState<string | null>(null);
  const [colorMap, setColorMap] = useState<Record<string, string>>({});

  const assignRandomColor = (state: string) => {
    // If already colored, keep it
    if (colorMap[state]) {
      setSelected(state);
      return;
    }

    // Generate random color
    const color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

    // Update state
    setColorMap((prev) => ({ ...prev, [state]: color }));
    setSelected(state);
  };

  const clearColors = () => {
    setColorMap({});
    setSelected(null);
  };

  return (
    <main style={styles.wrapper}>
      <h1 style={styles.title}>Clickable US Map (Coloring)</h1>

      {/* 地图组件 */}
      <USMap
        onStateClick={assignRandomColor}
        colorMap={colorMap} // Pass color map down
      />

      <section style={styles.info}>
        <p>
          {selected
            ? `You clicked: ${selected} and the color is ${colorMap[selected]}`
            : 'Click any state to see its name.'}
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
    fontFamily: 'sans-serif',
  },
  title: {
    marginBottom: '1.5rem',
    fontSize: '2rem',
    fontWeight: 700,
  },
  info: {
    marginTop: '1rem',
    fontSize: '1.1rem',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1.2rem',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#444',
    color: 'white',
  },
  footer: {
    marginTop: '2.5rem',
    fontSize: '0.9rem',
    color: '#666',
  },
};
