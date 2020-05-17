import { q } from ".";

export const getDocRefByIndex = (index, identifier) => {
  return q.Ref(q.Index(index), identifier);
};
