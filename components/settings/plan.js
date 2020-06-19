import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

export default function Plan() {
  const { user } = useUser();
  const [scope] = useScope();
  return <>Plan</>;
}
