import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb://localhost:27017/`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3500;

const JWT_MESSAGE_SECRET_KEY = process.env.JWT_MESSAGE_SECRET_KEY || "";
const JWT_TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY || "";
const JWT_TOKEN_EXPIRE = process.env.JWT_TOKEN_EXPIRE || "";

const EMAIL = process.env.EMAIL || "";
const EMAIL_SERVICE = process.env.EMAIL_SERVICE || "";
const EMAIL_USER_NAME = process.env.EMAIL_USER_NAME || "";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";

const GOOGLE_RECAPTCHA_KEY = process.env.GOOGLE_RECAPTCHA_KEY || "";
const GOOGLE_TOKEN = process.env.GOOGLE_TOKEN || "";

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    prot: SERVER_PORT,
  },
  jwt: {
    secretKey: JWT_MESSAGE_SECRET_KEY,
    secretTokenKey: JWT_TOKEN_SECRET_KEY,
    expire: JWT_TOKEN_EXPIRE,
  },
  email: {
    baseEmail: EMAIL,
    service: EMAIL_SERVICE,
    username: EMAIL_USER_NAME,
    password: EMAIL_PASSWORD,
  },
  google: {
    recaptchaKey: GOOGLE_RECAPTCHA_KEY,
    token: GOOGLE_TOKEN,
  },
};
