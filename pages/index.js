import { useUser } from "../hooks";

export default function Landing() {
  const { user } = useUser();
  return (
    <>
      <h1>Really great marketing content...</h1>
    </>
  );
}
