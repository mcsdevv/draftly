import { useContextState } from "../../hooks/useContextState";

export default function ContextPicker() {
  const { contexts, setContext } = useContextState();
  console.log(contexts);
  return contexts ? (
    <select value={contexts.selected} onChange={setContext}>
      {contexts.list.map(c => (
        <option key={c.name} value={c.name}>
          {c.name}
        </option>
      ))}
    </select>
  ) : null;
}
