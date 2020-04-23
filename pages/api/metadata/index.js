import fetch from "node-fetch";
import domino from "domino";
import { getMetadata } from "page-metadata-parser";
import verify from "../_util/token/verify";

const getCardMetadata = async (req, res) => {
  try {
    const { uri } = JSON.parse(req.body);
    const resp = await fetch(uri);
    const respText = await resp.text();
    const doc = domino.createWindow(respText).document;
    const metadata = getMetadata(doc, uri);
    console.log("Returned metadata: ", metadata);
    res.status(200).json(metadata);
  } catch (err) {
    console.error("ERROR - api/metadata -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getCardMetadata);
