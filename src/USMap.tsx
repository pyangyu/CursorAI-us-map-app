import { FC, MouseEvent, useEffect, useRef } from 'react';
import UsaMap from './assets/usa-map.svg?react';

interface Props {
  onStateClick?: (stateName: string) => void;
  colorMap?: Record<string, string>;
}

const USMap: FC<Props> = ({ onStateClick, colorMap = {} }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const scaleRef = useRef(1.001); // 初始缩放值
  const animationFrameRef = useRef<number | undefined>(undefined);

  // 动态调整州的大小
  const adjustStateSize = () => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');
    scaleRef.current += 0.0002; // 每次增加一点点

    paths.forEach((path) => {
      path.style.transform = `scale(${scaleRef.current})`;
    });

    // 继续动画，直到达到最大值
    if (scaleRef.current < 1.005) { // 减小最大缩放值
      animationFrameRef.current = requestAnimationFrame(adjustStateSize);
    }
  };

  // 动态设置每个 path 的样式
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');
    
    // 首先设置所有路径的基础样式
    paths.forEach((path) => {
      path.style.transition = 'all 0.3s ease';
      path.style.stroke = '#666666';
      path.style.strokeWidth = '2px';
      path.style.cursor = 'pointer';
      path.style.fill = '#ffffff';
      path.style.transformOrigin = 'center';
      path.style.transformBox = 'fill-box';
    });

    // 启动动画
    animationFrameRef.current = requestAnimationFrame(adjustStateSize);

    // 然后设置颜色映射
    paths.forEach((path) => {
      const title = path.querySelector('title');
      const name = title?.textContent;
      
      if (name && colorMap[name]) {
        path.style.fill = colorMap[name];
      }
    });

    // 清理函数
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [colorMap]);

  const handleClick = (e: MouseEvent<SVGElement>) => {
    const target = e.target as SVGGraphicsElement;
    const title = target.querySelector('title');
    const stateName = title?.textContent;

    if (stateName) {
      onStateClick?.(stateName);
    }
  };

  return (
    <div className="map-wrapper" style={{ 
      width: '100%', 
      overflowX: 'auto',
      padding: '1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        overflow: 'hidden', // 添加overflow控制
        position: 'relative' // 确保内容不会溢出
      }}>
        <UsaMap
          ref={svgRef}
          onClick={handleClick}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            transform: 'scale(0.98)', // 整体稍微缩小一点
            transformOrigin: 'center',
            shapeRendering: 'crispEdges',
          }}
        />
      </div>
    </div>
  );
};

export default USMap;
