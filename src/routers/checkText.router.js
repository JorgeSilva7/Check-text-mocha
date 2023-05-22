import { Router } from "express";
/**
 * Check Text routes
 */

import { checkText, listLogs } from "../controllers/checkText.controller.js";

const router = Router();

router.post("/", checkText);
router.get("/", listLogs);

export default router;
