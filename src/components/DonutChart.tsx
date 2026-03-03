"use client";

interface DonutChartProps {
  distribution: Record<string, number>;
  colorMap: Record<string, string>;
  size?: number;
}

// Tailwind class → hex color mapping for SVG
const CLASS_TO_HEX: Record<string, string> = {
  "bg-emerald-400": "#34d399",
  "bg-blue-400": "#60a5fa",
  "bg-amber-400": "#fbbf24",
  "bg-red-400": "#f87171",
  "bg-slate-300": "#cbd5e1",
};

function getHex(twClass: string): string {
  return CLASS_TO_HEX[twClass] || "#cbd5e1";
}

export default function DonutChart({
  distribution,
  colorMap,
  size = 64,
}: DonutChartProps) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  const radius = size / 2;
  const strokeWidth = size * 0.18;
  const innerRadius = radius - strokeWidth;
  const circumference = 2 * Math.PI * innerRadius;

  // Build segments
  const segments: { key: string; count: number; color: string; offset: number; length: number }[] = [];
  let accumulated = 0;

  for (const [key, count] of Object.entries(distribution)) {
    if (count <= 0) continue;
    const fraction = count / total;
    segments.push({
      key,
      count,
      color: getHex(colorMap[key] || "bg-slate-300"),
      offset: accumulated,
      length: fraction * circumference,
    });
    accumulated += fraction * circumference;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
    >
      {segments.map((seg) => (
        <circle
          key={seg.key}
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill="none"
          stroke={seg.color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${seg.length} ${circumference - seg.length}`}
          strokeDashoffset={-seg.offset}
          transform={`rotate(-90 ${radius} ${radius})`}
          strokeLinecap="butt"
        >
          <title>{`${seg.key}: ${seg.count} (${Math.round((seg.count / total) * 100)}%)`}</title>
        </circle>
      ))}
      {/* Center label: total count */}
      <text
        x={radius}
        y={radius}
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-slate-700"
        fontSize={size * 0.22}
        fontWeight="600"
      >
        {total}
      </text>
    </svg>
  );
}

