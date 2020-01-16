import domino from "domino";
import { getMetadata } from "page-metadata-parser";
import { getCardType } from "../_util/getCardType";
import verify from "../_util/token/verify";

import fetch from "node-fetch";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { url } = req.body;
    try {
      const resp = await fetch(url);
      const respText = await resp.text();
      const doc = domino.createWindow(respText).document;
      const meta = getMetadata(doc, url);
      console.log("Returned metadata:", meta);
      // * Decide whether this is a summary or large image summary card
      const metadata = await getCardType(meta);
      // ok
      res.status(200).json(metadata);
    } catch (e) {
      // something went wrong
      res.status(500).json({ error: e.message });
    }
  });
};
