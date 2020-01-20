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
      `}</style>
    </>
  );
}
