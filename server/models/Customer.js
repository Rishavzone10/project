import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  totalSpending: {
    type: Number,
    default: 0
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  visitCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Customer', customerSchema);

[
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "totalSpending": 150,
    "lastVisit": "2024-01-15",
    "visitCount": 3
  },
  {
    "name": "Jane Smith",
    "email": "janesmith@example.com",
    "totalSpending": 250,
    "lastVisit": "2024-02-20",
    "visitCount": 5
  },
  {
    "name": "Alice Johnson",
    "email": "alicejohnson@example.com",
    "totalSpending": 100,
    "lastVisit": "2024-03-05",
    "visitCount": 2
  },
  {
    "name": "Bob Williams",
    "email": "bobwilliams@example.com",
    "totalSpending": 300,
    "lastVisit": "2024-04-10",
    "visitCount": 6
  },
  {
    "name": "Charlie Brown",
    "email": "charliebrown@example.com",
    "totalSpending": 50,
    "lastVisit": "2024-05-20",
    "visitCount": 1
  }
]
