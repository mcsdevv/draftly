export default function Form({ children, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button type="submit">Update</button>
    </form>
  );
}
