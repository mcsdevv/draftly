import { useEffect, useState } from "react";
import { useDrafts } from "../../hooks";

import TweetsTabs from "../../components/tabs/tweets";
import ComposeTweet from "../../components/tweets/compose";
import Draft from "../../components/tweets/draft";

import RequireLogin from "../../lib/requireLogin";

function Drafts() {
  const { drafts, isValidating, revalidateDrafts } = useDrafts();
  const [drafting, setDrafting] = useState(false);
  const [showLoading, setShowLoading] = useState(true);
  const [showNoDrafts, setShowNoDrafts] = useState(false);
  useEffect(() => {
    function getPageState() {
      if (!isValidating && !drafting && drafts && drafts.length === 0) {
        // * No drafts to show
        setShowNoDrafts(true);
        setShowLoading(false);
      }
      if ((drafts && drafts.length !== 0) || drafting) {
        // * Drafts present or drafting currently
        setShowNoDrafts(false);
        setShowLoading(false);
      }
    }
    getPageState();
  }, [drafts, drafting]);
  const startDraft = () => {
    setDrafting(true);
  };
  return (
    <>
      <TweetsTabs />
      {showNoDrafts && <h1>no drafts</h1>}
      {showLoading && <h1>loading</h1>}
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
              <Draft drafts={drafts} revalidate={revalidateDrafts} tweet={d} />
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
          grid-template-rows: 700px;
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
