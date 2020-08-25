// * Libraries
import useSWR from "swr";

// * Helpers
import fetcher from "@lib/client/fetcher";

// * Hooks
import useScope from "./use-scope";

export default function useTweets(
  draftLimit: number = 10,
  draftPage: number = 1,
  publishedLimit: number = 10,
  publishedPage: number = 1
): any {
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
