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

export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if(!campaign) return res.status(404).json({ error: 'Campaign not found.' });

    if (campaign.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized to change this!' });
    }
     const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
     res.status(200).json(updatedCampaign);
  } catch(error) {
    res.status(400).json({ error: 'Update failed' });
  }
};

export const getMyCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ owner: req.user.id });
    res.status(200).json(campaigns);
  } catch(error) {
    res.status(500).json({ error: 'Could not retrieve the campaign scrolls.' });
  }
};

export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });

    if (campaign.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized to delete this!' });
    }

    await campaign.deleteOne();
    res.status(200).json({ message: 'Campaign deleted from the history books.' });
  } catch(error) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

export const getCampaignById = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found.' });
    }

    if (campaign.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'This is not your story to read!' });
    }

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Could not retrieve campaign details.' });
  }
};