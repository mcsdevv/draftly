import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  //   const getSecret = async () => {
  //     const res = await fetch("/api/data/secret");
  //     const secret = await res.text();
  //     const newProfile = { ...profile, secret };
  //     setProfile(newProfile);
  //   };
  const connectTwitter = () => {
    window.location = "http://localhost:3000/api/auth/twitter/connect";
  };
  return (
    <>
      <main>
        {user && user.secret && <p>{user.secret}</p>}
        <div className="handle">
          <button onClick={connectTwitter}>Connect Twitter</button>
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
