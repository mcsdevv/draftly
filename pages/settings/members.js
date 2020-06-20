import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import styles from "@styles/pages/settings.module.css";
import RequireLogin from "@lib/client/requireLogin";

import Page from "@components/page";

import Members from "@components/settings/members";

function TeamMembers() {
  const [scope] = useScope();
  const { teams, user } = useUser();
  return (
    <Page name="Settings - Team Members">
      <div className={styles.container}>
        {scope && teams && user ? <Members loading={!!user} /> : null}
      </div>
    </Page>
  );
}

export default () => RequireLogin(TeamMembers);
