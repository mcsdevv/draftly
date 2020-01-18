export default async function getCardType(meta) {
  if (!meta.image) return "text";
  const getDimensions = obj => {
    if (obj.height < 150 || obj.width < 280) return "summary";
    return "summary-large";
  };
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(getDimensions(img));
    img.onerror = reject;
    img.src = meta.image;
  });
}
