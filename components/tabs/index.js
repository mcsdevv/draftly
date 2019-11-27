export default function Tabs({ tabNames, setTab }) {
  return (
    <div>
      {tabNames.map(t => (
        <button key={t} onClick={() => setTab(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}
