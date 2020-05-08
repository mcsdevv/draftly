const url = require("is-url");

export default async function getCardType(meta) {
  const imgMeta = meta.twitter_img_src || meta.twitter_img || meta.og_img;
  if (!imgMeta) return { cardType: "text", fallbackImg: false };
  const imgFailed = () => {
    return { cardType: "summary", fallbackImg: true };
  };
  const imgValid = () => {
    if (
      !url(imgMeta) ||
      meta.twitter_card === "summary" ||
      (meta.og_type && !meta.twitter_card)
    ) {
      return { cardType: "summary", fallbackImg: false };
    }
    return { cardType: "summary-large", fallbackImg: false };
  };
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(imgValid());
    img.onerror = () => resolve(imgFailed());
    img.src = imgMeta;
  });
}

// TODO Account for other scenarios
