import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import styles from "@styles/pages/settings.module.css";
import RequireLogin from "@lib/client/requireLogin";

import Members from "@components/settings/members";

function TeamMembers() {
  const [scope] = useScope();
  const { teams, user } = useUser();
  return (
    <div className={styles.container}>
      {scope && teams && user ? <Members loading={!!user} /> : null}
    </div>
  );
}

export default () => RequireLogin(TeamMembers);
