import { useProfile } from "../hooks";

export default function Landing() {
  const { user } = useProfile();
  return (
    <>
      <h1>Really great marketing content...</h1>
    </>
  );
}
