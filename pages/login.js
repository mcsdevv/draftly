import { useUser } from "../hooks/useUser";

export default function Landing() {
  const user = useUser();
  console.log("USER", user);
  return (
    <>
      <h1>Really great marketing content...</h1>
    </>
  );
}
