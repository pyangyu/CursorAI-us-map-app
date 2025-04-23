import { FC, MouseEvent } from 'react';
import UsaMap from './assets/usa-map.svg?react';

const STATE_NAME: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

interface Props {
    onStateClick?: (stateName: string) => void;
    colorMap?: Record<string, string>; // New prop
}

const USMap: FC<Props> = ({ onStateClick, colorMap = {} }) => {
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
            onClick={handleClick}
            style={{
            width: '100%',
            height: 'auto',
            maxWidth: '1000px',
            display: 'block',
            margin: '0 auto',
            cursor: 'pointer',
            }}
            // Pass dynamic coloring via CSS override
        >
            {/* If svg path doesn't reflect fill via props, we’ll inject CSS next */}
        </UsaMap>

        {/* Optional: fallback CSS (if fill isn’t reactive) */}
        <style>
            {Object.entries(colorMap)
            .map(
                ([state, color]) => `
                svg path title:contains("${state}") {
                    fill: ${color};
                }
                `
            )
            .join('\n')}
        </style>
        </div>
    );
};

export default USMap;
