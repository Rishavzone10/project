import mongoose from 'mongoose';

const conditionSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true
  },
  operator: {
    type: String,
    enum: ['gt', 'lt', 'eq', 'gte', 'lte'],
    required: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  conjunction: {
    type: String,
    enum: ['AND', 'OR'],
    required: true
  }
});

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  messageTemplate: {
    type: String,
    required: true
  },
  conditions: [conditionSchema],
  audienceSize: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['draft', 'running', 'completed'],
    default: 'draft'
  },
  stats: {
    sent: {
      type: Number,
      default: 0
    },
    failed: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Campaign', campaignSchema);