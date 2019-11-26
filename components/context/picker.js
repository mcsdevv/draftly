import { useContextState } from "../../hooks/useContextState";

export default function ContextPicker({ contextList }) {
  const { context, setContext } = useContextState(contextList);
  return (
    <select value={context} onChange={setContext}>
      {contextList &&
        contextList.map(t => (
          <option key={t.name} value={t.name}>
            {t.name}
          </option>
        ))}
    </select>
  );
}
