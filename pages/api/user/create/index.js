import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify";

const createUser = async (req, res) => {
  try {
    const { email, name, picture } = JSON.parse(req.body);
    console.log(req.body);
    // * Create user account
    const dbs = await client.query(
      q.Create(q.Collection("users"), {
        data: {
          email,
          name,
          picture,
          teams: [],
        },
      })
    );
    console.log("User created:", dbs.data);
    console.log(dbs);
    res.status(200).json(dbs);
  } catch (err) {
    console.error("ERROR - api/user/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createUser);
