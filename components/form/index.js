export default function Form({ buttonText, children, disabled, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      {children}
      <button disabled={disabled} type="submit">
        {buttonText || "Update"}
      </button>
    </form>
  );
}
