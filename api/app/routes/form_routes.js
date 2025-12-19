import express from "express";
import {
  addFormSchema,
  getFormSchema,
  deleteFormSchema,
} from "../controllers/form_schema_controller.js";

const router = express.Router();

router.post("/submit-schema", addFormSchema);
router.get("/get-schema", getFormSchema);
router.delete("/delete-schema/:id", deleteFormSchema);

export default router;
