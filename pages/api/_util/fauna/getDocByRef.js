import { q } from ".";
import { getDocRef } from "./queries";

export const getDocByRef = (collection, ref) => {
  return q.Get(getDocRef(collection, ref));
};
