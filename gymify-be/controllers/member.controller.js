const Member = require('../models/Member');

// ✅ Create a new member
exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Get all members
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get single member by ID
exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get member by name and phone
exports.getMemberByNameAndPhone = async (req, res) => {
  const { name, phone } = req.query;
  console.log("Searching for:", name, phone); // 🔍 Debug

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required." });
  }

  try {
    const member = await Member.findOne({phone });

    if (!member) {
      return res.status(404).json({ message: "No member found." });
    }

    res.status(200).json(member);
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// ✅ Update a member
exports.updateMember = async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete a member
exports.deleteMember = async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Get members whose fee is overdue (more than 29 days)
exports.getOverdueMembers = async (req, res) => {
  try {
    const today = new Date();
    const thresholdDate = new Date(today.setDate(today.getDate() - 29));

    const overdueMembers = await Member.find({
      feeSubmissionDate: { $lt: thresholdDate }
    });

    res.status(200).json(overdueMembers);
  } catch (err) {
    console.error('Error fetching overdue members:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
