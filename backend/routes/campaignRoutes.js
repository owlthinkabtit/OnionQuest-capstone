import express from "express";
import { createCampaign, getMyCampaigns, updateCampaign, deleteCampaign } from "../controllers/campaignController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createCampaign)
  .get(getMyCampaigns);

router.route('/:id')
  .put(updateCampaign)
  .delete(deleteCampaign);
  
export default router;
