import { useProfile, useScope } from "../../hooks";
import styles from "../../styles/pages/settings.module.css";
import RequireLogin from "../../lib/requireLogin";

import Page from "../../components/page";

import Members from "../../components/settings/members";

function TeamMembers() {
  const { scope } = useScope();
  const { teams, user } = useProfile();
  const isOwner = scope?.owners.includes(user && user.email);
  return (
    <Page name="Settings - Team Members">
      <div className={styles.container}>
        {scope && teams && user ? <Members loading={!!user} /> : null}
      </div>
    </Page>
  );
}

export default () => RequireLogin(TeamMembers);