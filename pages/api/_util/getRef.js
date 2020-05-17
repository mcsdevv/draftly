export const getRef = (ref) => {
  console.log("REFFFFFF", ref);
  const refString = ref.toString();
  const refNums = refString.match(/\d/g);
  const refJoined = refNums.join("");
  return refJoined;
};
