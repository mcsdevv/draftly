import { client, q } from "../../_util/fauna";
import verify from "../../_util/token/verify-new";

const createUser = async (req, res) => {
  const { email, name, picture } = req.body;
  try {
    // * Create user account
    const dbs = await client.query(
      q.Create(q.Collection("users"), {
        data: {
          email,
          name,
          picture,
          teams: []
        }
      })
    );
    console.log("User created: ", dbs.data);
    res.status(200).json(dbs.data);
  } catch (err) {
    console.error("ERROR - api/user/create -", err.message);
    res.status(500).json({ err: err.message });
  }
};

export default verify(createUser);
