import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import USMap from './USMap';
import { PlayerScores, ColorMaps, StateCount } from './types';
import './App.css';

// 从 localStorage 加载数据的函数
const loadFromLocalStorage = () => {
  try {
    const savedColorMaps = localStorage.getItem('colorMaps');
    const savedScores = localStorage.getItem('scores');
    const savedStateCount = localStorage.getItem('stateCount');
    const savedCurrentPlayer = localStorage.getItem('currentPlayer');

    return {
      colorMaps: savedColorMaps ? JSON.parse(savedColorMaps) : null,
      scores: savedScores ? JSON.parse(savedScores) : null,
      stateCount: savedStateCount ? JSON.parse(savedStateCount) : null,
      currentPlayer: savedCurrentPlayer || 'puyu'
    };
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

// 保存数据到 localStorage 的函数
const saveToLocalStorage = (colorMaps: ColorMaps, scores: PlayerScores, stateCount: StateCount, currentPlayer: string) => {
  try {
    localStorage.setItem('colorMaps', JSON.stringify(colorMaps));
    localStorage.setItem('scores', JSON.stringify(scores));
    localStorage.setItem('stateCount', JSON.stringify(stateCount));
    localStorage.setItem('currentPlayer', currentPlayer);
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

const getDistinctColor = (state: string, currentColors: Record<string, string>) => {
  // 预定义一组明显不同的颜色
  const baseColors = [
    '#FF6B6B', // 鲜红
    '#4ECDC4', // 青绿
    '#45B7D1', // 天蓝
    '#96CEB4', // 薄荷绿
    '#FFD93D', // 明黄
    '#FF8B94', // 粉红
    '#6C5B7B', // 紫色
    '#C06C84', // 玫瑰红
    '#2E86AB', // 深蓝
    '#A8E6CF', // 浅绿
    '#FFAAA5', // 珊瑚色
    '#FF9999', // 浅红
    '#88D8B0', // 翠绿
    '#FFC75F', // 橙黄
    '#B5EAD7', // 薄荷奶绿
  ];

  // 获取已使用的颜色
  const usedColors = Object.values(currentColors);
  
  // 找到一个未使用的颜色
  const availableColors = baseColors.filter(color => !usedColors.includes(color));
  
  // 如果还有未使用的颜色，随机选择一个
  if (availableColors.length > 0) {
    return availableColors[Math.floor(Math.random() * availableColors.length)];
  }
  
  // 如果所有颜色都已使用，生成一个随机的明亮颜色
  const hue = Math.random() * 360; // 随机色相
  const saturation = 70 + Math.random() * 20; // 70-90% 饱和度
  const lightness = 45 + Math.random() * 15; // 45-60% 亮度
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export default function App() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  
  // 初始化状态时尝试从 localStorage 加载数据
  const [colorMaps, setColorMaps] = useState<ColorMaps>(() => {
    const saved = loadFromLocalStorage();
    return saved?.colorMaps || {
      puyu: {},
      jindian: {},
      zifei: {},
      yuting: {},
      shuyu: {}
    };
  });

  const [scores, setScores] = useState<PlayerScores>(() => {
    const saved = loadFromLocalStorage();
    return saved?.scores || {
      puyu: 0,
      jindian: 0,
      zifei: 0,
      yuting: 0,
      shuyu: 0
    };
  });

  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const saved = loadFromLocalStorage();
    return saved?.currentPlayer || 'puyu';
  });

  const [stateCount, setStateCount] = useState<StateCount>(() => {
    const saved = loadFromLocalStorage();
    return saved?.stateCount || {
      puyu: {},
      jindian: {},
      zifei: {},
      yuting: {},
      shuyu: {}
    };
  });

  // 当数据变化时保存到 localStorage
  useEffect(() => {
    saveToLocalStorage(colorMaps, scores, stateCount, currentPlayer);
  }, [colorMaps, scores, stateCount, currentPlayer]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    // 保留游戏数据，不清除
    navigate('/login');
  };

  const assignRandomColor = (state: string) => {
    // If already colored by current player, return early
    if (colorMaps[currentPlayer][state]) {
      setSelected(state);
      return;
    }

    // Get distinct color
    const newColor = getDistinctColor(state, colorMaps[currentPlayer]);

    // Update color map for current player
    setColorMaps((prev) => ({
      ...prev,
      [currentPlayer]: {
        ...prev[currentPlayer],
        [state]: newColor
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
    setColorMaps((prev) => {
      const newColorMaps = {
        ...prev,
        [currentPlayer]: {}
      };
      saveToLocalStorage(newColorMaps, scores, stateCount, currentPlayer);
      return newColorMaps;
    });
    
    setSelected(null);
    
    // Clear only current player's state count
    setStateCount((prev) => {
      const newStateCount = {
        ...prev,
        [currentPlayer]: {}
      };
      saveToLocalStorage(colorMaps, scores, newStateCount, currentPlayer);
      return newStateCount;
    });
    
    // Clear only current player's score
    setScores((prev) => {
      const newScores = {
        ...prev,
        [currentPlayer]: 0
      };
      saveToLocalStorage(colorMaps, newScores, stateCount, currentPlayer);
      return newScores;
    });
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
