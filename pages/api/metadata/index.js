import request from "request-promise";
import domino from "domino";
import { getMetadata } from "page-metadata-parser";
import { getCardType } from "../_util/getCardType";
import verify from "../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { url } = req.body;
    try {
      console.log("pre card fetch", Date.now());
      const siteOptions = {
        method: "GET",
        uri: url
      };
      const resp = await request(siteOptions);
      console.log("post card fetch", Date.now());
      // ! Why is this taking multiple seconds?
      const doc = domino.createWindow(resp).document;
      const meta = getMetadata(doc, url);
      console.log("Returned metadata:", meta);
      // * Decide whether this is a summary or large image summary card
      const metadata = await getCardType(meta);
      console.log("META META", metadata);
      // ok
      res.status(200).json(metadata);
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
