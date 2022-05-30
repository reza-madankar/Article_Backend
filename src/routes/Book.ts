import express from "express";
import controller from "../controllers/Book";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post(
  "/create",
  ValidateSchema(Schemas.book.create),
  controller.createBook
);
router.get("/get/:bookId", controller.readBook);
router.get("/get", controller.readAllBooks);
router.patch(
  "/update/:bookId",
  ValidateSchema(Schemas.book.create),
  controller.updateBook
);
router.patch(
  "/addTagtoBook/:bookId",
  ValidateSchema(Schemas.book.addTags),
  controller.addTagtoBook
);
router.delete("/delete/:bookId", controller.deleteBook);
router.delete(
  "/deleteTagfromBook/:bookId/:tagId",
  controller.deleteTagfromBook
);

export = router;
