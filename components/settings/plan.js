import { useScope, useUser } from "../../hooks";

export default function Plan() {
  const { user } = useUser();
  const [scope] = useScope();
  return <>Plan</>;
}
