const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'], required: true },
  membershipType: { type: String, enum: ['Basic', 'Premium', 'VIP'], required: true },
  feeSubmissionDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', MemberSchema);
