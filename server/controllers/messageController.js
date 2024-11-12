import asyncHandler from 'express-async-handler';
import Message from '../models/Message.js';

// @desc    Get message status
// @route   GET /api/messages/:id/status
// @access  Public
export const getMessageStatus = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  res.json({ status: message.status });
});

// @desc    Simulate Delivery Receipt with Random Status
// @route   POST /api/messages/:id/delivery-receipt
// @access  Public
export const sendDeliveryReceipt = asyncHandler(async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }

  // Simulate delivery status with 90% chance of "SENT" and 10% chance of "FAILED"
  const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';

  // Update the message status in the database
  message.status = status;
  await message.save();

  res.json({ status: message.status });
});