import { FC, MouseEvent, useEffect, useRef } from 'react';
import UsaMap from './assets/usa-map.svg?react';

interface Props {
  onStateClick?: (stateName: string) => void;
  colorMap?: Record<string, string>;
}

const USMap: FC<Props> = ({ onStateClick, colorMap = {} }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // 动态设置每个 path 的样式
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');

    paths.forEach((path) => {
      const title = path.querySelector('title');
      const name = title?.textContent;
      
      // 设置基础样式
      path.style.transition = 'all 0.3s ease';
      path.style.stroke = 'rgba(0, 0, 0, 0.5)';
      path.style.strokeWidth = '2.5px';
      path.style.fillOpacity = '0.9';
      path.style.cursor = 'pointer';
      
      // 设置颜色
      if (name && colorMap[name]) {
        path.style.fill = colorMap[name];
      } else {
        path.style.fill = '#ffffff';
      }
    });
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
    <div className="map-wrapper" style={{ width: '100%', overflowX: 'auto' }}>
      <UsaMap
        ref={svgRef}
        onClick={handleClick}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1000px',
          minWidth: '600px',
          display: 'block',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default USMap;
