const inviteCode = () => {
  const code =
    Math.random().toString(14).substring(2, 7) +
    Math.random().toString(14).substring(2, 7);
  return code;
};

export default inviteCode;
