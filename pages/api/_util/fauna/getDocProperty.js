import { q } from ".";

export const getDocProperty = (property, document) => {
  return q.Select(property, document);
};
