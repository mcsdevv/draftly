import verify from "@lib/api/token/verify";
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");

const getCardMetadata = async (req, res) => {
  try {
    console.time("getCardMetadata");
    const { uri } = JSON.parse(req.body);
    const resp = await fetch(uri);
    const respText = await resp.text();
    const dom = htmlparser2.parseDOM(respText, {});
    const $ = cheerio.load(dom);

    const post = {
      canonical: $('link[rel="canonical"]').attr("href"),
      // * Get OG Values
      og_description: $('meta[property="og:description"]').attr("content"),
      og_img: $('meta[property="og:image"]').attr("content"),
      og_title: $('meta[property="og:title"]').attr("content"),
      og_type: $('meta[property="og:type"]').attr("content"),
      og_url: $('meta[property="og:url"]').attr("content"),

      // * Get Twitter Values
      twitter_app_name_googleplay:
        $('meta[name="twitter:app:name:googleplay"]').attr("content") ||
        $('meta[property="twitter:app:name:googleplay"]').attr("content"),
      twitter_app_id_googleplay:
        $('meta[name="twitter:app:id:googleplay"]').attr("content") ||
        $('meta[property="twitter:app:id:googleplay"]').attr("content"),
      twitter_app_url_googleplay:
        $('meta[name="twitter:app:url:googleplay"]').attr("content") ||
        $('meta[property="twitter:app:url:googleplay"]').attr("content"),
      twitter_app_name_iphone:
        $('meta[name="twitter:app:name:iphone"]').attr("content") ||
        $('meta[property="twitter:app:name:iphone"]').attr("content"),
      twitter_app_id_iphone:
        $('meta[name="twitter:app:id:iphone"]').attr("content") ||
        $('meta[property="twitter:app:id:iphone"]').attr("content"),
      twitter_app_url_iphone:
        $('meta[name="twitter:app:url:iphone"]').attr("content") ||
        $('meta[property="twitter:app:url:iphone"]').attr("content"),
      twitter_app_name_ipad:
        $('meta[name="twitter:app:name:ipad"]').attr("content") ||
        $('meta[property="twitter:app:name:ipad"]').attr("content"),
      twitter_app_id_ipad:
        $('meta[name="twitter:app:id:ipad"]').attr("content") ||
        $('meta[property="twitter:app:id:ipad"]').attr("content"),
      twitter_app_url_ipad:
        $('meta[name="twitter:app:url:ipad"]').attr("content") ||
        $('meta[property="twitter:app:url:ipad"]').attr("content"),
      twitter_card:
        $('meta[name="twitter:card"]').attr("content") ||
        $('meta[property="twitter:card"]').attr("content"),
      twitter_creator:
        $('meta[name="twitter:creator"]').attr("content") ||
        $('meta[property="twitter:creator"]').attr("content"),
      twitter_creator_id:
        $('meta[name="twitter:creator:id"]').attr("content") ||
        $('meta[property="twitter:creator:id"]').attr("content"),
      twitter_description:
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[property="twitter:description"]').attr("content"),
      twitter_domain:
        $('meta[name="twitter:domain"]').attr("content") ||
        $('meta[property="twitter:domain"]').attr("content"),
      twitter_img:
        $('meta[name="twitter:image"]').attr("content") ||
        $('meta[property="twitter:image"]').attr("content"),
      twitter_img_alt:
        $('meta[name="twitter:image:alt"]').attr("content") ||
        $('meta[property="twitter:image:alt"]').attr("content"),
      twitter_img_src:
        $('meta[name="twitter:image:src"]').attr("content") ||
        $('meta[property="twitter:image:src"]').attr("content"),
      twitter_player:
        $('meta[name="twitter:player"]').attr("content") ||
        $('meta[property="twitter:player"]').attr("content"),
      twitter_player_height:
        $('meta[name="twitter:player:height"]').attr("content") ||
        $('meta[property="twitter:player:height"]').attr("content"),
      twitter_player_stream:
        $('meta[name="twitter:player:stream"]').attr("content") ||
        $('meta[property="twitter:player:stream"]').attr("content"),
      twitter_player_width:
        $('meta[name="twitter:player:width"]').attr("content") ||
        $('meta[property="twitter:player:width"]').attr("content"),
      twitter_site:
        $('meta[name="twitter:site"]').attr("content") ||
        $('meta[property="twitter:site"]').attr("content"),
      twitter_site_id:
        $('meta[name="twitter:site:id"]').attr("content") ||
        $('meta[property="twitter:site:id"]').attr("content"),
      twitter_title:
        $('meta[name="twitter:title"]').attr("content") ||
        $('meta[property="twitter:title"]').attr("content"),
      // Get Facebook Values
      // fb_appid: $('meta[property="fb:app_id"]').attr("content"),
      // fb_pages: $('meta[property="fb:pages"]').attr("content"),
    };
    console.timeEnd("getCardMetadata");
    console.log("Returned metadata:", post);
    res.status(200).json(post);
  } catch (err) {
    console.error("ERROR - api/metadata/twitter -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getCardMetadata);
