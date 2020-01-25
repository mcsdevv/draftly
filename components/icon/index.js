export default function Icon({ children, onClick }) {
  return <div className={onClick}>{children}</div>;
}
