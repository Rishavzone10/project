import express from 'express';
import {
  getCampaigns,
  createCampaign,
  sendCampaignMessages
} from '../controllers/campaignController.js';

const router = express.Router();

router.route('/')
  .get(getCampaigns)
  .post(createCampaign);

router.route('/:id/send')
  .post(sendCampaignMessages);

export default router;