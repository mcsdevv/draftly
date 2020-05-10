import { q } from ".";

export const getDocByIndex = (index, identifier) => {
  return q.Get(q.Match(q.Index(index), identifier));
};
