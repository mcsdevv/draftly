import useScope from "@hooks/use-scope";
import useUser from "@hooks/use-user";

import styles from "@styles/pages/settings.module.css";
import RequireLogin from "@lib/client/requireLogin";

import Page from "@components/page";

import ChangeUserName from "@components/settings/user/changeName";
import DeleteUser from "@components/settings/user/delete";
import ChangeTeamName from "@components/settings/team/changeName";
import DeleteTeam from "@components/settings/team/delete";
import Members from "@components/settings/members";
// import Plan from "@components/settings/plan";
import Reviews from "@components/settings/reviews";

function Settings() {
  const [scope] = useScope();
  const { user } = useUser();
  const isOwner = scope?.owners.includes(user && user.email);
  return (
    <Page name="Settings - General">
      <div className={styles.container}>
        {scope && user ? (
          <>
            <ChangeUserName loading={!!user} />
            <DeleteUser loading={!!user} />
            <ChangeTeamName disabled={!isOwner} loading={!!user} />
            <DeleteTeam disabled={!isOwner} loading={!!user} />
            <Reviews disabled={!isOwner} loading={!!user} />
            {/* <Plan disabled={!isOwner} loading={!!user} /> */}
            <Members disabled={!isOwner} loading={!!user} />
          </>
        ) : null}
      </div>
    </Page>
  );
}

export default () => RequireLogin(Settings);
