const Characters = ({
  progress = 50,
  animate = true,
  animationDuration = "1s",
  showPercentage = true,
  showPercentageSymbol = true,
  progressColor = "rgb(76, 154, 255)",
  bgColor = "#ecedf0",
  textColor = "#6b778c",
  roundedStroke = false,
  responsive = false,
  size = "50",
  lineWidth = "25",
  percentSpacing = 10,
}) => {
  const radius = 175;
  const diameter = Math.round(Math.PI * radius * 2);
  const getOffset = (val = 0) =>
    Math.round(((100 - Math.min(val, 100)) / 100) * diameter);

  const strokeDashoffset = getOffset(progress);
  const transition = animate
    ? `stroke-dashoffset ${animationDuration} ease-out`
    : undefined;
  const strokeLinecap = roundedStroke ? "round" : "butt";
  const svgSize = responsive ? "100%" : size;

  return (
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
        style={{ strokeDashoffset, transition }}
      />
    </svg>
  );
};

export default Characters;
