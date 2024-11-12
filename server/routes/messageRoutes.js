import express from 'express';
import { getMessageStatus, sendDeliveryReceipt } from '../controllers/messageController.js';

const router = express.Router();

// Get message status
router.get('/:id/status', getMessageStatus);

// Delivery receipt API
router.post('/:id/delivery-receipt', sendDeliveryReceipt);

export default router;
