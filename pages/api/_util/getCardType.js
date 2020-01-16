const requestImageSize = require("request-image-size");

export const getCardType = async meta => {
  const { image } = meta;
  if (!image) return { cardType: "text", ...meta };
  console.log("IS THIS SLOW?", Date.now());
  const { height, width } = await requestImageSize(
    "http://nodejs.org/images/logo.png"
  );
  console.log("YES", Date.now());
  console.log("HEIGHT", height);
  console.log("WIDTH", width);
  if (height < 150 || width < 280) return { cardType: "summary", ...meta };
  return { cardType: "summary-large", ...meta };
};
