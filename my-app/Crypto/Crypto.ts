"use server";
import { AddCreditCard } from "@/app/ServerAction/ServerAction";
import * as CryptoJS from "crypto-js";

export const encryptAES = (plaintext: string): string => {
  if (!process.env.Crypto_KEY) {
    throw new Error("Encryption key is undefined");
  }
  const encrypted = CryptoJS.AES.encrypt(
    plaintext,
    process.env.Crypto_KEY
  ).toString();
  return encrypted;
};

export const decryptAES = (encryptedText: string): string => {
  if (!process.env.Crypto_KEY) {
    throw new Error("Encryption key is undefined");
  }
  const decrypted = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.Crypto_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export const EncryptAndUploadData = async (
  cardNumber: string,
  Cvv: string,
  Exp: string
) => {
  if (!process.env.Crypto_KEY) {
    throw new Error("Encryption key is undefined");
  }
  const lastFourDigits = cardNumber.slice(-4);
  const Encrypted = encryptAES(cardNumber);
  await AddCreditCard(Encrypted, Cvv, Exp, lastFourDigits);
};
