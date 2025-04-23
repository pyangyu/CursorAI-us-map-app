import { FC, MouseEvent, useEffect, useRef } from 'react';
import UsaMap from './assets/usa-map.svg?react';

interface Props {
  onStateClick?: (stateName: string) => void;
  colorMap?: Record<string, string>;
}

const USMap: FC<Props> = ({ onStateClick, colorMap = {} }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // 动态设置每个 path 的 fill
  useEffect(() => {
    if (!svgRef.current) return;

    const paths = svgRef.current.querySelectorAll('path');

    paths.forEach((path) => {
      const title = path.querySelector('title');
      const name = title?.textContent;
      if (name && colorMap[name]) {
        path.setAttribute('fill', colorMap[name]);
      } else {
        path.setAttribute('fill', '#fff'); // reset to white or default
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
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <UsaMap
        ref={svgRef} // 把 SVG 挂上 ref
        onClick={handleClick}
        style={{
          width: '100%',
          height: 'auto',
          maxWidth: '1000px',
          display: 'block',
          margin: '0 auto',
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default USMap;
