export default function SummaryLarge({ meta }) {
  return (
    <>
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
      <style jsx>{`
        // .draft {
        //   border: 1px solid rgb(230, 236, 240);
        //   display: flex;
        //   max-width: 600px;
        //   padding 10px 15px;
        // }
        // .avatar {
        //   height: 100%;
        //   margin-right: 5px;
        // }
        // img {
        //   border-radius: 50%;
        //   height: 49px;
        //   width: 49px;
        // }
      `}</style>
    </>
  );
}
