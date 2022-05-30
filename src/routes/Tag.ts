import express from "express";
import controller from "../controllers/Tag";
import { Schemas, ValidateSchema } from "../middleware/ValidateSchema";

const router = express.Router();

router.post(
  "/create",
  ValidateSchema(Schemas.tag.create),
  controller.createTag
);
router.get("/get/:tagId", controller.readTag);
router.get("/getbyBookId/:bookId", controller.readAllTagByBookId);
router.patch(
  "/update/:tagId",
  ValidateSchema(Schemas.author.update),
  controller.updateTag
);
router.delete("/delete/:tagId", controller.deleteTag);

export = router;
