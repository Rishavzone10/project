import asyncHandler from 'express-async-handler';
import Campaign from '../models/Campaign.js';
import Customer from '../models/Customer.js';
import Message from '../models/Message.js';

// Existing function to calculate audience size
export const calculateAudienceSize = asyncHandler(async (conditions) => {
  let query = {};

  conditions.forEach((condition, index) => {
    const { field, operator, value, conjunction } = condition;

    let operatorQuery = {};
    switch (operator) {
      case 'gt':
        operatorQuery = { $gt: value };
        break;
      case 'lt':
        operatorQuery = { $lt: value };
        break;
      case 'eq':
        operatorQuery = { $eq: value };
        break;
      case 'gte':
        operatorQuery = { $gte: value };
        break;
      case 'lte':
        operatorQuery = { $lte: value };
        break;
    }

    if (index === 0) {
      query[field] = operatorQuery;
    } else {
      if (conjunction === 'AND') {
        query[field] = { ...query[field], ...operatorQuery };
      } else {
        query = {
          $or: [query, { [field]: operatorQuery }]
        };
      }
    }
  });

  const count = await Customer.countDocuments(query);
  return count;
});

// Modified createCampaign function to include sendCampaignMessages
export const createCampaign = asyncHandler(async (req, res) => {
  const { name, messageTemplate, conditions } = req.body;

  // Step 1: Create and save the new campaign
  const campaign = await Campaign.create({
    name,
    messageTemplate,
    conditions
  });

  // Step 2: Calculate audience size and update the campaign
  const audienceSize = await calculateAudienceSize(conditions);
  campaign.audienceSize = audienceSize;
  await campaign.save();

  // Step 3: Call sendCampaignMessages to send messages and update stats
  await sendCampaignMessages({ params: { id: campaign._id } }, res);

  res.status(201).json(campaign);
});

// Function to send messages in a campaign
export const sendCampaignMessages = asyncHandler(async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    res.status(404);
    throw new Error('Campaign not found');
  }

  // Update campaign status
  campaign.status = 'running';
  await campaign.save();

  // Get matching customers
  const customers = await getMatchingCustomers(campaign.conditions);

  // Create and send messages
  const messages = await Promise.all(
    customers.map(async (customer) => {
      const content = campaign.messageTemplate.replace('[Name]', customer.name);

      const message = await Message.create({
        campaign: campaign._id,
        customer: customer._id,
        content
      });

      // Simulate message sending with 90% success rate
      const success = Math.random() < 0.9;
      message.status = success ? 'sent' : 'failed';
      await message.save();

      // Update campaign stats
      if (success) {
        campaign.stats.sent += 1;
      } else {
        campaign.stats.failed += 1;
      }
    })
  );

  campaign.status = 'completed';
  await campaign.save();

  res.json({
    message: 'Campaign messages sent',
    stats: campaign.stats
  });
});


// @desc    Get all campaigns
// @route   GET /api/campaigns
// @access  Public
export const getCampaigns = asyncHandler(async (req, res) => {
  const campaigns = await Campaign.find({});
  res.json(campaigns);
});

export const getMatchingCustomers = async (conditions) => {
  let query = {};

  conditions.forEach((condition, index) => {
    const { field, operator, value, conjunction } = condition;

    let operatorQuery = {};
    switch (operator) {
      case 'gt':
        operatorQuery = { $gt: value };
        break;
      case 'lt':
        operatorQuery = { $lt: value };
        break;
      case 'eq':
        operatorQuery = { $eq: value };
        break;
      case 'gte':
        operatorQuery = { $gte: value };
        break;
      case 'lte':
        operatorQuery = { $lte: value };
        break;
    }

    if (index === 0) {
      // First condition initializes the query
      query[field] = operatorQuery;
    } else {
      if (conjunction === 'AND') {
        // Add condition with AND logic
        query[field] = { ...query[field], ...operatorQuery };
      } else {
        // Add condition with OR logic
        query = {
          $or: [query, { [field]: operatorQuery }],
        };
      }
    }
  });

  // Query the Customer collection based on the built query
  const matchingCustomers = await Customer.find(query);
  return matchingCustomers;
};