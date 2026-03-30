import express from "express";
import { createCampaign, getMyCampaigns } from "../controllers/campaignController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createCampaign)
  .get(getMyCampaigns);

export default router;
