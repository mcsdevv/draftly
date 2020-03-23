import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = process.env.ENCRYPTION_KEY;

const encrypt = plainText => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  const cipherText = cipher.update(plainText);
  const encrypted = Buffer.concat([cipherText, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

const decrypt = plainText => {
  // TODO handle decrypt errors
  const textParts = plainText.split(":");
  const iv = Buffer.from(textParts.shift(), "hex");
  const encryptedText = Buffer.from(textParts.join(":"), "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);
  const decipherText = decipher.update(encryptedText);
  const decrypted = Buffer.concat([decipherText, decipher.final()]);
  return decrypted.toString();
};

module.exports = { decrypt, encrypt };
