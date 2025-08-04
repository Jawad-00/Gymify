const Member = require('../models/Member');

exports.createMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
exports.updateMember = async (req, res) => {
  try {
    const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const deleted = await Member.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Member not found' });
    res.status(200).json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
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

exports.updateFeeDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { feeSubmissionDate } = req.body;

    const member = await Member.findById(id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    member.feeSubmissionDate = new Date(feeSubmissionDate);
    await member.save();

    res.status(200).json({
      message: 'Fee submission date updated successfully',
      member
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const allMembers = await Member.find({});
    const totalMembers = allMembers.length;

    const maleCount = allMembers.filter(m => m.gender === 'Male').length;
    const femaleCount = allMembers.filter(m => m.gender === 'Female').length;

    const todayCollectedFee = allMembers.filter(m => {
      const feeDate = new Date(m.feeSubmissionDate);
      return feeDate >= startOfToday;
    }).length * 3000;

    const monthlyCollectedFee = allMembers.filter(m => {
      const feeDate = new Date(m.feeSubmissionDate);
      return feeDate >= startOfMonth;
    }).length * 3000;

    const pastMonthsCollectedFee = allMembers.filter(m => {
      const feeDate = new Date(m.feeSubmissionDate);
      return feeDate < startOfMonth;
    }).length * 3000;

    res.status(200).json({
      totalMembers,
      maleCount,
      femaleCount,
      todayCollectedFee,
      monthlyCollectedFee,
      pastMonthsCollectedFee
    });
  } catch (err) {
    console.error('Dashboard stats error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
