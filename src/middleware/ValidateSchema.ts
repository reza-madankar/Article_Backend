import Joi, { ObjectSchema, string } from "joi";
import { NextFunction, Request, Response } from "express";
import { IAuthor } from "../models/Author";
import { IBook } from "../models/Book";
import { ITag } from "../models/Tag";
import Logging from "../assistant/Logging";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  author: {
    create: Joi.object<IAuthor>({
      name: Joi.string().required(),
      email: Joi.string()
        .lowercase()
        .email({
          minDomainSegments: 2,
          tlds: {
            allow: ["com", "net", "in", "co"],
          },
        })
        .required(),
      password: Joi.string().min(5).required(),
    }),
    update: Joi.object<IAuthor>({
      name: Joi.string().required(),
      email: Joi.string()
        .lowercase()
        .email({
          minDomainSegments: 2,
          tlds: {
            allow: ["com", "net", "in", "co"],
          },
        })
        .required(),
      password: Joi.string().min(5).required(),
    }),
    login: Joi.object<IAuthor>({
      password: Joi.string().required(),
      email: Joi.string()
        .lowercase()
        .email({
          minDomainSegments: 2,
          tlds: {
            allow: ["com", "net", "in", "co"],
          },
        })
        .required(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required(),
    }),
    update: Joi.object<IBook>({
      author: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
      title: Joi.string().required(),
    }),
    addTags: Joi.object<IBook>({
      tags: Joi.array()
        .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
        .required(),
    }),
  },
  tag: {
    create: Joi.object<ITag>({
      title: Joi.string().required(),
    }),
    update: Joi.object<ITag>({
      title: Joi.string().required(),
    }),
  },
};
