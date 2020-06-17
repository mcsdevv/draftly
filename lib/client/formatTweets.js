import { getRef } from "./getRef";

export const formatTweets = (data) => {
  const formatted = data
    .map((d) => {
      return {
        ...d.data,
        ref: getRef(d.ref),
        updated: d.ts,
      };
    })
    .reverse();
  return formatted;
};
