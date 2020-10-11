// * Libraries
const cheerio = require("cheerio");
const htmlparser2 = require("htmlparser2");
import prisma from "@lib/api/db/prisma";

// * Utilities
import stripProtocol from "@lib/client/stripProtocol";

// * Middleware
import verify from "@lib/api/token/verify";
import withSentry from "@lib/api/middleware/withSentry";
import isMember from "@lib/api/middleware/isMember";

const getCardMetadata = async (req, res) => {
  const { uri } = JSON.parse(req.body);

  // * Remove protocol to search database
  const url = stripProtocol(uri);

  // * Check the 'cards' table for a URL match
  const metadata = await prisma.metadata.findOne({
    where: { url },
  });

  // * If metadata present in database, send as response
  if (metadata !== null) {
    console.log("Returned metadata from database for:", url);

    // TODO Run a check to refresh metadata and update database

    res.status(200).json(metadata);
  } else {
    // * Fetch document for URL and load virtual DOM
    // TODO Find out why the fuck fetch can take so long - USA > UK perhaps?
    const resp = await fetch(uri);
    const respText = await resp.text();
    const dom = htmlparser2.parseDOM(respText, {});
    const $ = cheerio.load(dom);

    const post = {
      // * Get canonical URL
      canonical: $('link[rel="canonical"]').attr("href") || null,

      // * Get OG Values
      og_description:
        $('meta[property="og:description"]').attr("content") || null,
      og_img: $('meta[property="og:image"]').attr("content") || null,
      og_title: $('meta[property="og:title"]').attr("content") || null,
      og_type: $('meta[property="og:type"]').attr("content") || null,
      og_url: $('meta[property="og:url"]').attr("content") || null,

      // * Get Twitter Values
      twitter_app_name_googleplay:
        $('meta[name="twitter:app:name:googleplay"]').attr("content") ||
        $('meta[property="twitter:app:name:googleplay"]').attr("content") ||
        null,
      twitter_app_id_googleplay:
        $('meta[name="twitter:app:id:googleplay"]').attr("content") ||
        $('meta[property="twitter:app:id:googleplay"]').attr("content") ||
        null,
      twitter_app_url_googleplay:
        $('meta[name="twitter:app:url:googleplay"]').attr("content") ||
        $('meta[property="twitter:app:url:googleplay"]').attr("content") ||
        null,
      twitter_app_name_iphone:
        $('meta[name="twitter:app:name:iphone"]').attr("content") ||
        $('meta[property="twitter:app:name:iphone"]').attr("content") ||
        null,
      twitter_app_id_iphone:
        $('meta[name="twitter:app:id:iphone"]').attr("content") ||
        $('meta[property="twitter:app:id:iphone"]').attr("content") ||
        null,
      twitter_app_url_iphone:
        $('meta[name="twitter:app:url:iphone"]').attr("content") ||
        $('meta[property="twitter:app:url:iphone"]').attr("content") ||
        null,
      twitter_app_name_ipad:
        $('meta[name="twitter:app:name:ipad"]').attr("content") ||
        $('meta[property="twitter:app:name:ipad"]').attr("content") ||
        null,
      twitter_app_id_ipad:
        $('meta[name="twitter:app:id:ipad"]').attr("content") ||
        $('meta[property="twitter:app:id:ipad"]').attr("content") ||
        null,
      twitter_app_url_ipad:
        $('meta[name="twitter:app:url:ipad"]').attr("content") ||
        $('meta[property="twitter:app:url:ipad"]').attr("content") ||
        null,
      twitter_card:
        $('meta[name="twitter:card"]').attr("content") ||
        $('meta[property="twitter:card"]').attr("content") ||
        null,
      twitter_creator:
        $('meta[name="twitter:creator"]').attr("content") ||
        $('meta[property="twitter:creator"]').attr("content") ||
        null,
      twitter_creator_id:
        $('meta[name="twitter:creator:id"]').attr("content") ||
        $('meta[property="twitter:creator:id"]').attr("content") ||
        null,
      twitter_description:
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[property="twitter:description"]').attr("content") ||
        null,
      twitter_domain:
        $('meta[name="twitter:domain"]').attr("content") ||
        $('meta[property="twitter:domain"]').attr("content") ||
        null,
      twitter_img:
        $('meta[name="twitter:image"]').attr("content") ||
        $('meta[property="twitter:image"]').attr("content") ||
        null,
      twitter_img_alt:
        $('meta[name="twitter:image:alt"]').attr("content") ||
        $('meta[property="twitter:image:alt"]').attr("content") ||
        null,
      twitter_img_src:
        $('meta[name="twitter:image:src"]').attr("content") ||
        $('meta[property="twitter:image:src"]').attr("content") ||
        null,
      twitter_player:
        $('meta[name="twitter:player"]').attr("content") ||
        $('meta[property="twitter:player"]').attr("content") ||
        null,
      twitter_player_height:
        $('meta[name="twitter:player:height"]').attr("content") ||
        $('meta[property="twitter:player:height"]').attr("content") ||
        null,
      twitter_player_stream:
        $('meta[name="twitter:player:stream"]').attr("content") ||
        $('meta[property="twitter:player:stream"]').attr("content") ||
        null,
      twitter_player_width:
        $('meta[name="twitter:player:width"]').attr("content") ||
        $('meta[property="twitter:player:width"]').attr("content") ||
        null,
      twitter_site:
        $('meta[name="twitter:site"]').attr("content") ||
        $('meta[property="twitter:site"]').attr("content") ||
        null,
      twitter_site_id:
        $('meta[name="twitter:site:id"]').attr("content") ||
        $('meta[property="twitter:site:id"]').attr("content") ||
        null,
      twitter_title:
        $('meta[name="twitter:title"]').attr("content") ||
        $('meta[property="twitter:title"]').attr("content") ||
        null,
      // Get Facebook Values
      // fb_appid: $('meta[property="fb:app_id"]').attr("content"),
      // fb_pages: $('meta[property="fb:pages"]').attr("content"),
    };
    console.log("Returned metadata not in database for:", url);

    res.status(200).json(post);
  }
};

export default verify(isMember(withSentry(getCardMetadata)));
