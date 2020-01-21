import { useContext, useState } from "react";
import ScopeContext from "../../context/scopeContext";
import { useDrafts, useProfile } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";
import ComposeTweet from "../../components/tweets/compose";
import Draft from "../../components/tweets/draft";

import RequireLogin from "../../lib/requireLogin";

function Drafts() {
  const [drafting, setDrafting] = useState(false);
  const { drafts, revalidateDrafts } = useDrafts();
  // const { user } = useProfile();
  // const { scope } = useContext(ScopeContext);
  const startDraft = () => {
    setDrafting(true);
  };
  return (
    <>
      <TweetsTabs />
      <div className="draft-list">
        <div className="draft-holder">
          <ComposeTweet
            drafting={drafting}
            revalidate={revalidateDrafts}
            setDrafting={setDrafting}
            startDraft={startDraft}
          />
        </div>
        {drafts ? (
          drafts.map(d => (
            <div className="draft-holder" key={d.ref}>
              <Draft revalidate={revalidateDrafts} size="small" tweet={d} />
            </div>
          ))
        ) : (
          <h2>Loading drafts...</h2>
        )}
      </div>
      <style jsx>{`
        .draft-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: 500px;
        }
        .draft-holder {
          align-self: center;
          justify-self: center;
        }
      `}</style>
    </>
  );
}

export default () => RequireLogin(Drafts);
