import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const connectTwitter = () => {
    window.location = "/api/auth/twitter/connect";
  };
  return (
    <>
      <main>
        {user && user.secret && <p>{user.secret}</p>}
        <div className="handle">
          <button onClick={connectTwitter}>Add Team</button>
        </div>
      </main>
      <style jsx>{`
        .buttons {
          display: flex;
          justify-content: space-between;
        }
        .handle {
          display: flex;
          flex-direction: column;
          margin-top: 16px;
        }
      `}</style>
    </>
  );
}
