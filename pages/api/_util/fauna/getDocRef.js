import { q } from ".";

export const getDocRef = (collection, ref) => {
  return q.Ref(q.Collection(collection), ref);
};
