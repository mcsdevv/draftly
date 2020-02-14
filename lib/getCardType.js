export default async function getCardType(meta) {
  if (!meta.image) return "text";
  const getDimensions = obj => {
    if (obj.height < 150 || obj.width < 280) return "summary";
    return "summary-large";
  };
  const imgFailed = () => {
    console.log("Image failed to load.");
    return meta.description ? "summary" : "text";
  };
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(getDimensions(img));
    img.onerror = () => resolve(imgFailed());
    img.src = meta.image;
  });
}
