import Linkify from "react-linkify";

import CardTop from "../card/top";
import CardBottom from "../card/bottom";

export default function SummaryLarge({
  editing,
  editTweet,
  handleOnChange,
  meta,
  scope,
  text
}) {
  // const url = new URL(meta.url, location)
  return (
    <>
      <section className="summary-large">
        <CardTop handle={scope.handle} name={scope.name} />
        <p className="card-text">
          <Linkify
            properties={{
              target: "_blank",
              style: { color: "red", fontWeight: "bold" }
            }}
          >
            {!editing ? (
              text
            ) : (
              <textarea onChange={handleOnChange} value={editTweet} />
            )}
          </Linkify>
        </p>
        <a className="card-link" href={`https://${meta.url}`}>
          <div className="card-wrapper">
            <div className="card-image">
              <img src={meta.image} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{meta.title}</h3>
              <p className="card-description">{meta.description}</p>
              <div className="card-link">
                <svg viewBox="0 0 24 24" className="link">
                  <g>
                    <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                    <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z"></path>
                  </g>
                </svg>
                {new URL(`https://${meta.url}`, location).hostname}
              </div>
            </div>
          </div>
        </a>
        <CardBottom />
      </section>
      <style jsx>{`
        .summary-large {
          display: flex;
          flex-direction: column;
          font-size: 15px;
          margin-left: 5px;
        }
        .card-text :global(a) {
          color: rgb(27, 149, 224);
          font-size: 15px;
          text-decoration: none;
        }
        .card-text :global(a:hover) {
          text-decoration: underline;
        }
        .card-text :global(a:visited) {
          color: rgb(27, 149, 224);
        }
        .card-link {
          text-decoration: none;
        }
        .card-wrapper {
          border: 1px solid rgb(204, 214, 221);
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
          margin-top: 10px;
        }
        .card-image {
          border-bottom: 1px solid rgb(204, 214, 221);
          height: 187px;
        }
        .card-image img {
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
          height: 100%;
          max-width: 100%;
        }
        .card-content {
          padding: 10px;
        }
        .card-title {
          color: rgb(20, 23, 26);
          font-size: 15px;
          font-weight: 400;
        }
        .card-description {
          color: rgb(101, 119, 134);
          font-weight: 400;
        }
        .card-link {
          display: flex;
          color: rgb(101, 119, 134);
          font-weight: 400;
        }
        .link {
          fill: rgb(101, 119, 134);
          margin-right: 5px;
          margin-top: 2px;
          width: 16.25px;
        }
      `}</style>
    </>
  );
}
