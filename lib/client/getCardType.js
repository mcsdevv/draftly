const url = require("is-url");

export default async function getCardType(metadata) {
  // * Image types consolidated based on preference order
  const imgMeta =
    metadata.twitter_img_src || metadata.twitter_img || metadata.og_img;

  // * If no image, type or twitter card specified, must be text
  if (!imgMeta && !metadata.og_type && !metadata.twitter_card)
    return { cardType: "text", fallbackImg: false };

  // * If image doesn't load apply fallback
  const imgFailed = () => {
    return { cardType: "summary", fallbackImg: true };
  };

  // * If image valid, figure out what the type should be
  const imgValid = () => {
    // * If no image, card type set to summary or no card with type set - summary
    if (
      !url(`https://${imgMeta}`) ||
      metadata.twitter_card === "summary" ||
      (metadata.og_type && !metadata.twitter_card)
    ) {
      return { cardType: "summary", fallbackImg: false };
    }

    // * If not summary then must be summary-large
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
