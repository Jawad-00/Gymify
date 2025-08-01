const Member = require('../models/Member');

// Create a new member
exports.createMember = async (req, res) => {
  try {
    const member = new Member(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get members with overdue fees (feeSubmissionDate > 29 days)
exports.getOverdueMembers = async (req, res) => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 29);
    const overdue = await Member.find({ feeSubmissionDate: { $lte: cutoffDate } });
    res.status(200).json(overdue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update fee submission date
exports.updateFeeDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { feeSubmissionDate } = req.body;
    const updated = await Member.findByIdAndUpdate(id, { feeSubmissionDate }, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
