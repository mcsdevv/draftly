import fetch from "node-fetch";
import domino from "domino";
import { getMetadata } from "page-metadata-parser";
import verify from "../_util/token/verify-new";

const getMetadata = async (req, res) => {
  const { uri } = JSON.parse(req.body);
  try {
    const resp = await fetch(uri);
    const respText = await resp.text();
    const doc = domino.createWindow(respText).document;
    const metadata = getMetadata(doc, uri);
    console.log("Returned metadata: ", metadata);
    res.status(200).json(metadata);
  } catch (err) {
    console.log("ERROR - api/metadata -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(getMetadata);
