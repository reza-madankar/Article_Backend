const nodemailer = require("nodemailer");
const jwtSimple = require("jwt-simple");
import { config } from "../config/config";

exports.sendMail = (to: string, title: string, body: string) => {
  var transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.username,
      pass: config.email.password,
    },
  });

  const emailOptions = {
    from: config.email.baseEmail,
    to: to,
    subject: title,
    html: `<div>${body}</div>`,
  };

  try {
    transporter.sendMail(emailOptions, function (error: any) {
      if (error) {
        return false;
      } else {
        return true;
      }
    });
  } catch (ex) {
    return false;
  }
};

export const encodeMessage = (msg: string) => {
  return jwtSimple.encode(msg, config.jwt.secretKey);
};

export const decodeMessage = (token: string) => {
  return jwtSimple.decode(token, config.jwt.secretKey);
};
