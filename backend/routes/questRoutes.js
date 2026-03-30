import express from "express";
import { createQuest, getCampaignQuests, updateQuest, deleteQuest } from "../controllers/questController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router({ mergeParams: true });

router.use(protect);

router.route('/')
  .post(createQuest)
  .get(getCampaignQuests);
router.route('/:id')
  .put(updateQuest)
  .delete(deleteQuest);
export default router;