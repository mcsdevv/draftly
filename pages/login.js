import { useProfile } from "../hooks";

export default function Landing() {
  const { user } = useProfile();
  console.log("USER", user);
  return (
    <>
      <h1>Really great marketing content...</h1>
    </>
  );
}
