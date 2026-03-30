import express from "express";
import { createQuest, getCampaignQuests } from "../controllers/questController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .post(createQuest)
  .get(getCampaignQuests);

export default router;