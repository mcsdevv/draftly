const url = require("is-url");

export default async function getCardType(metadata) {
  const imgMeta =
    metadata.twitter_img_src || metadata.twitter_img || metadata.og_img;
  if (!imgMeta && !metadata.og_type)
    return { cardType: "text", fallbackImg: false };
  const imgFailed = () => {
    return { cardType: "summary", fallbackImg: true };
  };
  const imgValid = () => {
    if (
      !url(`https://${imgMeta}`) ||
      metadata.twitter_card === "summary" ||
      (metadata.og_type && !metadata.twitter_card)
    ) {
      return { cardType: "summary", fallbackImg: false };
    }
    return { cardType: "summary-large", fallbackImg: false };
  };
  return new Promise((resolve, reject) => {
    // * Method new Image() not available on server side
    // let img = new Image();
    // img.onload = () => resolve(imgValid());
    // img.onerror = () => resolve(imgFailed());
    // img.src = imgMeta;
    resolve(imgValid());
  });
}

// TODO Account for other scenarios
