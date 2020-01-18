import CardTop from "../card/top";

export default function SummaryLarge({ meta, scope }) {
  return (
    <>
      <section className="summary-large">
        <CardTop handle={scope.handle} name={scope.name} />
        <p>{meta.text}</p>
        {meta.image && (
          <div className="card-wrapper">
            <div className="card-image">
              <img src={meta.image} />
            </div>
            <div className="card-content">
              <h3>{meta.title}</h3>
              <p>{meta.description}</p>
              <p>{meta.url}</p>
            </div>
          </div>
        )}
      </section>
      <style jsx>{`
        .summary-large {
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </>
  );
}
