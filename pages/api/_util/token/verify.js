import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { decrypt } from "../token/encryption";

const key = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJYelU+LDpagJcMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi01NTgzcXotMC5ldS5hdXRoMC5jb20wHhcNMTkwODA5MDk0MzA4WhcN
MzMwNDE3MDk0MzA4WjAkMSIwIAYDVQQDExlkZXYtNTU4M3F6LTAuZXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAo2HmZVvd1DHWQNdd
mR8CeetFirEWVwydso2wXqhrk+srkl9KSDlRSDDcDF4SnDTDUNgyCYvcQoeuvvcf
Yq7uKEqksp4jRAQMvS9drcaonSmIoS5lOnkt8IXx4elHl9XwNR94lPoZVVor84k1
fT5wHCIFe/GBgLM9cyOOWE3qLeosvDugdYReoqecVDQ/vfumKoxsqU+AA2D+d8At
KLPD3vyFQjjK5JVpO3tapLLnL7X32OF49+Ue7G/4WwEA+awDVb3xi+pKzerzvNjl
NidhHvzR3nJoYTEt9X/FC9O8OROfOGmkb0fUN5N6xoyx+OGFvyDqYjmwjKXAYy6n
MNOrSwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBR3R/8BMzfk
YLrnaWk3rCkqEflQrDAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
AB4IIwfNBXhgUs2i3rUoosd8IGGAUwgz4zpnkkZpPE2gh6oS6AFafU5X8ROkQm7B
DqxEmLYmFlY9v9G0bgQ/zG9E4wanp6FOrBacyo68dX35kcura2m4i9DPyzbEsG8D
sNhuHUTe3eFaV/NxeWwo4AzK9muGdoLT+GWPSOkCGvSC3VOoYZcH06SUUdSQTiaT
LmuX9ZZUscFrvd+kcRhetU9xNsiVFxD7utAzIoTFqVeYpOQpRb0apwavrSSaZRHU
e/grFCkagbo/LBaBtO2X67dv2lVIihwO7yceZpL5lipIeVkwXOvY9fUFl8DMkyjP
0eU7F/FBUVKFZfQJDAen4RE=
-----END CERTIFICATE-----`;

// TODO Accept scope parameter, check as part of JWT validation

module.exports = async (token, callback) => {
  // * Create a client to retrieve secret keys
  const client = jwksClient({
    cache: true,
    cacheMaxEntries: 10,
    cacheMaxAge: 86400000, // 24 hours
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  });
  // * Create a function that uses the secret keys
  function getKey(header, callback) {
    const start = new Date();
    client.getSigningKey(header.kid, function(err, key) {
      console.log("TIME TAKEN TO GET KEY:", (new Date() - start) / 1000);
      const signingKey = key.publicKey || key.rsaPublicKey;
      console.log("SIGNING KEY", signingKey);
      callback(null, signingKey);
    });
  }
  // * Provide additional options to verify the JWT with
  const options = {
    algorithms: ["RS256"],
    maxAge: "1 day"
  };
  // * Check token length != false,
  if (!!token.length) {
    // * Decrypt token
    const tokenDecrypted = decrypt(token);
    try {
      // * Decode decrypted token
      const tokenDecoded = jwt.decode(tokenDecrypted);
      console.log("TOKENNNNN", tokenDecoded);
      // * Verify audience correct
      if (!tokenDecoded.aud.includes(process.env.AUTH0_AUDIENCE)) {
        const err = "Incorrect audience.";
        callback(err);
        return;
      }
      // * Verify JWT using about methods
      jwt.verify(tokenDecrypted, key);
      return callback();
    } catch (err) {
      console.log("Error verifying:", err.message);
      callback(err.message);
      return;
    }
  } else {
    // * Supply callback with error if token length != true
    callback("No token present");
    return;
  }
};
