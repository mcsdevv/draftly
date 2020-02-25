import fetch from "node-fetch";
import domino from "domino";
import { getMetadata } from "page-metadata-parser";
import verify from "../_util/token/verify";

export default async (req, res) => {
  verify(req.headers.authorization || req.cookies.access_token, async error => {
    if (error) res.status(400).json({ error });
    const { uri } = JSON.parse(req.body);
    try {
      const resp = await fetch(uri);
      const respText = await resp.text();
      const doc = domino.createWindow(respText).document;
      const metadata = getMetadata(doc, uri);
      console.log("Returned metadata: ", metadata);
      res.status(200).json(metadata);
    } catch (e) {
      console.log("ERROR - api/metadata -", e.message);
      res.status(500).json({ error: e.message });
    }
  });
};
