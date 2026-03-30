import Campaign from "../models/Campaign.js";

export const createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create({
      ...req.body,
      owner: req.user._id
    });
    res.status(201).json(campaign);
  } catch(error) {
    res.status(400).json({ error: 'Could not start the Campaign.' });
  }
};

export const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user._id });
    res.status(200).json(campaigns);
  } catch(error) {
    res.status(500).json({ error: 'Could not find your map!' });
  }
};