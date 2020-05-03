// export default async function getCardType(meta) {
//   if (!meta.image) return "text";
//   const getDimensions = (obj) => {
//     console.log({
//       height: obj.height,
//       width: obj.width,
//       hbyw: obj.height / obj.width,
//       wbyh: obj.width / obj.height,
//     });
//     if (obj.height < 150 || obj.width < 280) return "summary";
//     return "summary-large";
//   };
//   const imgFailed = () => {
//     console.log("Image failed to load.");
//     return meta.description ? "summary" : "text";
//   };
//   return new Promise((resolve, reject) => {
//     let img = new Image();
//     img.onload = () => resolve(getDimensions(img));
//     img.onerror = () => resolve(imgFailed());
//     img.src = meta.image;
//   });
// }

export default async function getCardType(meta) {
  if (!meta.og_img) return "text";
  if (!meta.twitter_card || meta.twitter_card === "summary") return "summary";
  return "summary-large";
}
