export default ({ handleOnClick, loading, text }) => (
  <>
    <button onClick={handleOnClick}>{text}</button>
    <style jsx>{`
      button {
        border: 1px solid black;
        margin: 0.5em;
        padding: 0.5em;
      }
    `}</style>
  </>
);
