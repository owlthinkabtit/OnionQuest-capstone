import Quest from "../models/Quest.js";
import Campaign from "../models/Campaign.js";

export const createQuest = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await Campaign.findById(campaignId);
    if (!campaign || campaign.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'You cannot add quests to this campaign!' });
    }

    const quest = await Quest.create({
      ...req.body,
      campaign: campaignId,
      owner: req.user._id
    });
    res.status(201).json(quest);
  } catch(error) {
    res.status(400).json({ error: 'Failed to create Quest' });
  }
};

export const updateQuest = async (req, res ) => {
  try {
    const quest = await Quest.findById(req.params.id);

    if (!quest) return res.status(404).json({ error: 'Quest not found' });

    if (quest.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not your Quest to change!' });
    }
    const updatedQuest = await Quest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedQuest);
  } catch(error) {
    res.status(400).json({ error: 'Failed to update the Quest' });
  }
};

export const getCampaignQuests = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const quests = await Quest.find({ campaign: campaignId, owner: req.user._id });
    res.status(200).json(quests);
  } catch(error) {
    res.status(500).json({ error: 'Failed to fetch Quests' });
  }
};

export const deleteQuest = async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);

    if (!quest) return res.status(404).json({ error: 'Quest not found' });

    if (quest.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Not authorized to delete this!' });
    }

    await quest.deleteOne();
    res.status(200).json({ message: 'Quest completed and removed from the log.' });
  } catch(error) {
    res.status(500).json({ error: 'Delete failed' });
  }
};