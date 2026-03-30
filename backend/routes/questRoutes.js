import express from "express";
import { createQuest, getCampaignQuests } from "../controllers/questController.js";
import { protect } from "../middleware/auth.js";

// const 