// * Libraries
import useSWR from "swr";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

interface useTweetsProps {
  draftLimit?: number;
  draftPage?: number;
  publishedLimit?: number;
  publishedPage?: number;
}

export default function useTweets(
  draftLimit = 10,
  draftPage = 1,
  publishedLimit = 10,
  publishedPage = 1
): useTweetsProps {
  const { scope } = useScope();
  const tuid = scope?.tuid;

  const { data, revalidate: revalidateTweets, mutate: setTweets } = useSWR(
    tuid
      ? `/api/tweets?draftLimit=${draftLimit}&draftPage=${draftPage}&publishedLimit=${publishedLimit}&publishedPage=${publishedPage}`
      : null,
    fetcher
  );

  return { ...data, revalidateTweets, setTweets };
}
