import styles from "./characters.module.css";

interface CharactersProps {
  progress: number;
}

const Characters = ({ progress = 0 }: CharactersProps) => {
  const radius = 175;
  const diameter = Math.round(Math.PI * radius * 2);
  const getOffset = (val = 0) =>
    Math.round(((100 - Math.min(val, 100)) / 100) * diameter);
  const progressColor = "rgb(76, 154, 255)";
  const bgColor = "#ecedf0";
  const strokeDashoffset = getOffset(progress);
  const strokeLinecap = "round";
  const svgSize = 18;
  const lineWidth = 30;
  return (
    <div className={styles.characters}>
      <svg width={svgSize} height={svgSize} viewBox="-25 -25 400 400">
        <circle
          stroke={bgColor}
          cx="175"
          cy="175"
          r="175"
          strokeWidth={lineWidth}
          fill="none"
        />
        <circle
          stroke={progressColor}
          transform="rotate(-90 175 175)"
          cx="175"
          cy="175"
          r="175"
          strokeDasharray="1100"
          strokeWidth={lineWidth}
          strokeDashoffset="1100"
          strokeLinecap={strokeLinecap}
          fill="none"
          style={{ strokeDashoffset }}
        />
      </svg>
    </div>
  );
};

export default Characters;

// https://github.com/zzarcon/react-circle/blob/master/src/circle.tsx
