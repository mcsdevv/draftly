export default function CardTop({ handle, name }) {
  return (
    <>
      <div className="card-top">
        <h4 className="name">{name}</h4>
        <svg viewBox="0 0 24 24" className="padlock">
          <g>
            <path d="M19.75 7.31h-1.88c-.19-3.08-2.746-5.526-5.87-5.526S6.32 4.232 6.13 7.31H4.25C3.01 7.31 2 8.317 2 9.56v10.23c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V9.56c0-1.242-1.01-2.25-2.25-2.25zm-7 8.377v1.396c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.396c-.764-.3-1.307-1.04-1.307-1.91 0-1.137.92-2.058 2.057-2.058 1.136 0 2.057.92 2.057 2.056 0 .87-.543 1.61-1.307 1.91zM7.648 7.31C7.838 5.06 9.705 3.284 12 3.284s4.163 1.777 4.352 4.023H7.648z"></path>
          </g>
        </svg>
        <h4 className="handle">@{handle}</h4>
        <div className="dot">.</div>
        <h4>{Date.now()}</h4>
      </div>
      <style jsx>{`
        .card-top {
          display: flex;
          font-size: 15px;
        }
        .name {
          font-weight: 700;
        }
        .padlock {
          margin-left: 2px;
          width: 18.75px;
        }
        .handle {
          color: rgb(101, 119, 134);
          margin-left: 5px;
        }
        .dot {
          color: rgb(101, 119, 134);
          padding: 0px 5px 0px 5px;
          height: 15px;
          display: grid;
          align-content: center;
        }
      `}</style>
    </>
  );
}

function Icon() {
  return (
    <svg viewBox="0 0 24 24">
      <g>
        <path d="M19.75 7.31h-1.88c-.19-3.08-2.746-5.526-5.87-5.526S6.32 4.232 6.13 7.31H4.25C3.01 7.31 2 8.317 2 9.56v10.23c0 1.24 1.01 2.25 2.25 2.25h15.5c1.24 0 2.25-1.01 2.25-2.25V9.56c0-1.242-1.01-2.25-2.25-2.25zm-7 8.377v1.396c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.396c-.764-.3-1.307-1.04-1.307-1.91 0-1.137.92-2.058 2.057-2.058 1.136 0 2.057.92 2.057 2.056 0 .87-.543 1.61-1.307 1.91zM7.648 7.31C7.838 5.06 9.705 3.284 12 3.284s4.163 1.777 4.352 4.023H7.648z"></path>
      </g>
    </svg>
  );
}
