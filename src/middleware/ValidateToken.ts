import Author from "../models/Author";
import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { config } from "../config/config";
const JWT = require("jsonwebtoken");

export const validateGoogleToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.googletoken && req.headers.googletoken != "undefined") {
    await axios
      .get(
        `https://www.google.com/recaptcha/api/siteverify?secret=${config.google.recaptchaKey}&response=${config.google.token}`
      )
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK")
          return next();

        return res.status(400).send({
          message: "Authentication failed. Please refresh and try again.",
        });
      })
      .catch((ex) => {
        return res
          .status(500)
          .send({ message: "An error occurred, please try again." });
      });
  } else {
    return res.status(400).send({
      message: "Authentication failed. Please refresh and try again.",
    });
  }
};

export const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.headers.token && req.headers.token != "undefined") {
      let token = JWT.verify(req.headers.token, config.jwt.secretTokenKey);

      return await Author.findById(token.id)
        .then((author) =>
          author ? next() : res.status(403).json({ message: "Access denied." })
        )
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res
        .status(404)
        .send({ message: "Session expired. Please sign in again." });
    }
  } catch (ex) {
    return res
      .status(500)
      .send({ message: "An error occurred, please try again." });
  }
};

export const createToken = async (id: string) => {
  try {
    return await JWT.sign(id, config.jwt.secretTokenKey, config.jwt.expire);
  } catch (ex) {
    return null;
  }
};
