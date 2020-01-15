import request from "request-promise";
import verify from "../_util/token/verify";
import domino from "domino";
import { getMetadata } from "page-metadata-parser";

export default (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { url } = req.body;
    try {
      const siteOptions = {
        method: "GET",
        url,
        json: true
      };
      const resp = await request(siteOptions);
      const doc = domino.createWindow(resp).document;
      const metadata = getMetadata(doc, url);
      console.log("Returned metadata:", metadata);
      // ok
      res.status(200).json(metadata);
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
