import Linkify from "react-linkify";

import CardTop from "../card/top";
import CardBottom from "../card/bottom";

export default function Text({ meta, scope, text }) {
  return (
    <>
      <section className="text">
        <CardTop handle={scope.handle} name={scope.name} />
        <p className="card-text">
          <Linkify
            properties={{
              target: "_blank",
              style: { color: "red", fontWeight: "bold" }
            }}
          >
            {text}
          </Linkify>
        </p>
        <CardBottom />
      </section>
      <style jsx>{`
        .text {
          display: flex;
          flex-direction: column;
          font-size: 15px;
          margin-left: 5px;
          width: 100%;
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
        }
        .card-image img {
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
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
